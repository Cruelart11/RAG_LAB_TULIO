# Pasig City DRRMO Preparedness Portal

A responsive React implementation of the supplied Pasig City DRRMO Figma design. It includes disaster-preparedness content, evacuation-center listings, clickable emergency hotlines, and a working demo chatbot designed for a future RAG API connection.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Public website

The `main` branch deploys automatically to GitHub Pages through `.github/workflows/deploy.yml`.

Public URL: <https://cruelart11.github.io/RAG_LAB_TULIO/>

## Connecting the RAG backend

The original notebook is never modified. Use the API-enabled copy at `notebooks/RAB_LAB_PT_M1_TULIO_API.ipynb`:

1. Upload the copied notebook to Colab.
2. Upload the RAG source documents into its `my_data/` directory.
3. Run Cells 1–9 to build the RAG chain and API.
4. Create an ngrok account and copy its authtoken from the ngrok dashboard.
5. Run Cell 10, enter the token securely, and copy the printed `RAG_API_URL`.
6. Run Cell 11 to verify both `/health` and `/chat`.
7. In the GitHub repository, open **Settings → Secrets and variables → Actions → Variables**.
8. Create or update `VITE_RAG_API_URL` with the printed URL.
9. Open **Actions → Deploy website to GitHub Pages → Run workflow** to rebuild the site.

The chatbot visibly reports `RAG online`, `Checking RAG…`, or `Demo mode · RAG offline`. If a live RAG request fails, it provides a labelled local demo response so an evaluator can see exactly what happened.

The ngrok address is temporary and stops when Colab disconnects. Never add Groq or ngrok credentials to `.env`, React source files, GitHub variables, or commits.

For local UI testing without running Colab, start `npm run mock:rag` in one terminal and run the site with `VITE_RAG_API_URL=http://127.0.0.1:8787` in another.
