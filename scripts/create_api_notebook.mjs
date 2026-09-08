import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const [, , sourcePath, destinationPath] = process.argv;

if (!sourcePath || !destinationPath) {
  throw new Error('Usage: node scripts/create_api_notebook.mjs <source.ipynb> <destination.ipynb>');
}

const source = JSON.parse(await readFile(resolve(sourcePath), 'utf8'));
const notebook = structuredClone(source);

const markdownCell = (text) => ({
  cell_type: 'markdown',
  metadata: {},
  source: text.split(/(?<=\n)/),
});

const codeCell = (code) => ({
  cell_type: 'code',
  execution_count: null,
  metadata: {},
  outputs: [],
  source: code.split(/(?<=\n)/),
});

notebook.cells.push(
  markdownCell(`## Web API integration\n\nThe cells below expose the existing \`rag_chain\` through a temporary HTTPS API for the React website. Run all original cells first and ensure documents were loaded into \`my_data/\`. The tunnel exists only while this Colab runtime is active.\n`),
  codeCell(`# Cell 8: Install API dependencies\n\n!pip install -q fastapi uvicorn pyngrok nest-asyncio\n`),
  codeCell(`# Cell 9: Create the RAG API\n\nfrom typing import Any\n\nfrom fastapi import FastAPI, HTTPException\nfrom fastapi.middleware.cors import CORSMiddleware\nfrom pydantic import BaseModel, Field\n\nif "rag_chain" not in globals():\n    raise RuntimeError("Run Cells 1–6 first so rag_chain is available.")\n\napp = FastAPI(title="Pasig DRRMO RAG API", version="1.0.0")\n\napp.add_middleware(\n    CORSMiddleware,\n    allow_origins=[\n        "https://cruelart11.github.io",\n        "http://localhost:5173",\n        "http://127.0.0.1:5173",\n    ],\n    allow_credentials=False,\n    allow_methods=["GET", "POST", "OPTIONS"],\n    allow_headers=["Content-Type"],\n)\n\nclass ChatRequest(BaseModel):\n    message: str = Field(min_length=1, max_length=2000)\n    history: list[dict[str, Any]] = Field(default_factory=list)\n\n@app.get("/health")\ndef health():\n    return {"status": "online", "rag": "ready"}\n\n@app.post("/chat")\ndef chat(request: ChatRequest):\n    try:\n        result = rag_chain.invoke({"input": request.message.strip()})\n        sources = []\n\n        for document in result.get("context", []):\n            metadata = document.metadata or {}\n            sources.append({\n                "source": str(metadata.get("source", "Unknown")),\n                "page": metadata.get("page"),\n            })\n\n        return {\n            "answer": result.get("answer", "I cannot answer based on the provided domain data."),\n            "sources": sources,\n            "mode": "rag",\n        }\n    except Exception:\n        raise HTTPException(\n            status_code=500,\n            detail="The RAG pipeline could not answer this request.",\n        )\n`),
  codeCell(`# Cell 10: Start a temporary ngrok tunnel\n\nimport getpass\nimport threading\nimport time\n\nimport nest_asyncio\nimport uvicorn\nfrom pyngrok import ngrok\n\nnest_asyncio.apply()\n\nif "_rag_api_server" in globals():\n    _rag_api_server.should_exit = True\n    time.sleep(1)\n\nngrok.kill()\nngrok_token = getpass.getpass("Enter your ngrok authtoken: ")\nngrok.set_auth_token(ngrok_token)\n\n_rag_api_config = uvicorn.Config(\n    app,\n    host="0.0.0.0",\n    port=8000,\n    log_level="info",\n)\n_rag_api_server = uvicorn.Server(_rag_api_config)\n_rag_api_thread = threading.Thread(\n    target=_rag_api_server.run,\n    daemon=True,\n)\n_rag_api_thread.start()\ntime.sleep(2)\n\n_rag_api_tunnel = ngrok.connect(8000, "http")\nRAG_API_URL = _rag_api_tunnel.public_url\n\nprint("RAG API is online:", RAG_API_URL)\nprint("Health check:", f"{RAG_API_URL}/health")\nprint("Set the GitHub Actions variable VITE_RAG_API_URL to this base URL.")\n`),
  codeCell(`# Cell 11: Test the public endpoint\n\nimport requests\n\nhealth_response = requests.get(f"{RAG_API_URL}/health", timeout=15)\nchat_response = requests.post(\n    f"{RAG_API_URL}/chat",\n    json={"message": "What should be inside a Go-Bag?", "history": []},\n    timeout=90,\n)\n\nprint("Health:", health_response.status_code, health_response.json())\nprint("Chat:", chat_response.status_code, chat_response.json())\n`),
);

await mkdir(dirname(resolve(destinationPath)), { recursive: true });
await writeFile(resolve(destinationPath), `${JSON.stringify(notebook, null, 2)}\n`, 'utf8');

console.log(`Created ${resolve(destinationPath)} with ${notebook.cells.length} cells.`);
