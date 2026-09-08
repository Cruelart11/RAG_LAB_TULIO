# Colab RAG Integration Design

## Objective

Connect the existing React chatbot to a temporary Google Colab-hosted RAG API without changing the user's original notebook. Make the active response mode visible so an evaluator can immediately tell whether the RAG pipeline is online or the chatbot is using local demonstration responses.

## Source Preservation

The original notebook at `C:\Users\justine\Downloads\RAB_LAB_PT_M1_TULIO.ipynb` is read-only input for this work and will not be modified. A separate copy named `notebooks/RAB_LAB_PT_M1_TULIO_API.ipynb` will be added to the repository.

The copied notebook will retain the original seven cells and add API-specific cells after the RAG pipeline. It will continue to obtain the Groq key interactively instead of embedding credentials.

## Colab API

The copied notebook will add FastAPI, Uvicorn, pyngrok, and nest-asyncio. It will expose:

- `GET /health`, returning an online status after the RAG chain has been created.
- `POST /chat`, accepting a JSON message and optional conversation history.
- A normalized response containing the generated answer and source metadata derived from the retrieved documents.

The chat endpoint will call the notebook's existing `rag_chain.invoke({"input": message})` operation. Empty messages will be rejected. Pipeline failures will produce a controlled server error without exposing API keys or sensitive stack traces.

CORS will explicitly permit `https://cruelart11.github.io` and local Vite development origins. The ngrok authentication token will be collected securely at runtime and will not be saved in the notebook.

## React Client

The API base URL will be read from `VITE_RAG_API_URL`. No private token will be stored in React or committed to GitHub. The chat service will expose separate health-check and message functions while keeping local demo-response logic as a fallback.

The chatbot will show one of these connection states:

- `Checking RAG…`: the health check is in progress.
- `RAG online`: the configured backend passed its health check.
- `Demo mode · RAG offline`: no endpoint is configured or the health check failed.

A `Check connection` control will trigger another health check. When the backend is marked online, each message will first be sent to the RAG endpoint. If that request fails or returns an invalid response, the client will keep the conversation usable by adding a local demo response and an explicit `RAG request failed · Demo response used` notice.

When the endpoint is not configured or is already offline, messages will use the local demo adapter without making a network request. The existing typing, retry, and keyboard behavior will remain intact.

## Configuration and Deployment

The repository will include `.env.example` with a non-secret example URL. For GitHub Pages, `VITE_RAG_API_URL` must be configured as a GitHub Actions repository variable and passed into the Vite build step. The public endpoint URL is not a secret; Groq and ngrok credentials remain exclusively in Colab.

Because ngrok URLs can change when Colab restarts, the workflow can be manually re-run after the repository variable is updated. The site will remain available in honest demo mode whenever Colab is stopped.

## Verification

Verification will cover:

- The original notebook's checksum remains unchanged.
- The copied notebook parses as valid notebook JSON and retains the original cells.
- The added API cells reference the existing `rag_chain` correctly.
- The React production build succeeds with and without `VITE_RAG_API_URL`.
- The widget displays checking, online, and offline states correctly.
- A failed RAG request visibly falls back to a demo answer.
- The manual connection check updates the indicator.
- No API keys, ngrok tokens, or credential values are committed.

## Completion Criteria

The integration is complete when the repository contains the separate API-enabled notebook, a configurable React RAG adapter, clear evaluator-facing connection indicators, documented Colab and GitHub configuration instructions, and a passing production build. The original notebook must remain unchanged.
