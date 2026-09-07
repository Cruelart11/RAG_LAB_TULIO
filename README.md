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

The chat UI calls `sendChatMessage` in `src/services/chatService.js`. Replace that demo implementation with an HTTP request to the deployed RAG endpoint while preserving the function's promise-based string response. The React chat components do not otherwise need to change.
