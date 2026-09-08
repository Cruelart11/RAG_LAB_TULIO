import { createServer } from 'node:http';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Content-Type': 'application/json',
};

createServer((request, response) => {
  if (request.method === 'OPTIONS') {
    response.writeHead(204, headers);
    response.end();
    return;
  }

  if (request.method === 'GET' && request.url === '/health') {
    response.writeHead(200, headers);
    response.end(JSON.stringify({ status: 'online', rag: 'ready' }));
    return;
  }

  if (request.method === 'POST' && request.url === '/chat') {
    let body = '';
    request.on('data', (chunk) => { body += chunk; });
    request.on('end', () => {
      const { message } = JSON.parse(body);
      response.writeHead(200, headers);
      response.end(JSON.stringify({ answer: `Mock RAG response: ${message}`, mode: 'rag', sources: [] }));
    });
    return;
  }

  response.writeHead(404, headers);
  response.end(JSON.stringify({ detail: 'Not found' }));
}).listen(8787, '127.0.0.1', () => {
  console.log('Mock RAG API listening on http://127.0.0.1:8787');
});
