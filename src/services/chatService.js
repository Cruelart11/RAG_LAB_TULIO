const RAG_API_URL = import.meta.env.VITE_RAG_API_URL?.trim().replace(/\/+$/, '') ?? '';

const responseLibrary = [
  { keywords: ['go bag', 'go-bag', 'kit', 'pack'], answer: 'A family Go-Bag should cover at least three days. Pack drinking water, ready-to-eat food, medicines, first aid, flashlights, batteries, a radio, masks, hygiene items, copies of documents, chargers, clothes, and small cash. Adjust it for children, older adults, pets, and medical needs.' },
  { keywords: ['flood', 'baha', 'river'], answer: 'During flooding, move to higher ground early and follow official evacuation instructions. Switch off electricity only if it is safe, keep away from waterways, and never walk or drive through moving floodwater. Call Pasig DRRMO at 8643-0000 for emergency assistance.' },
  { keywords: ['earthquake', 'lindol', 'fault'], answer: 'During shaking: Duck, Cover, and Hold. Stay away from glass and heavy objects. When the shaking stops, leave damaged buildings carefully, expect aftershocks, and follow official Pasig City instructions.' },
  { keywords: ['fire', 'sunog', 'smoke'], answer: 'If there is a fire, alert everyone, leave by the nearest safe exit, stay low under smoke, and never use an elevator. Once outside, do not return. Call BFP–Pasig at 0932 779 8621.' },
  { keywords: ['evacuation', 'center', 'where'], answer: 'This page lists designated centers by area. Because centers may be activated depending on the incident, confirm the open receiving center and safest route with your barangay or Pasig DRRMO at 8643-0000 before travelling.' },
  { keywords: ['hotline', 'call', 'contact', 'number'], answer: 'For Pasig disaster emergencies, call DRRMO at 8643-0000. Police: 8477-7953. BFP–Pasig: 0932 779 8621. The full hospital contact list is in the Emergency Hotlines section below.' },
];

const defaultAnswer = 'I can help with Go-Bags, floods, earthquakes, fires, evacuation centers, and Pasig emergency hotlines. This response is from demo mode because the RAG service is not available.';

function getDemoAnswer(message) {
  const normalized = message.toLowerCase();
  return responseLibrary.find(({ keywords }) => keywords.some((keyword) => normalized.includes(keyword)))?.answer ?? defaultAnswer;
}

async function fetchWithTimeout(path, options = {}, timeout = 12000) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(`${RAG_API_URL}${path}`, { ...options, signal: controller.signal });
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export function isRagConfigured() {
  return Boolean(RAG_API_URL);
}

export async function checkRagHealth() {
  if (!RAG_API_URL) return { status: 'offline', reason: 'not-configured' };

  try {
    const response = await fetchWithTimeout('/health', {}, 8000);
    const data = response.ok ? await response.json() : null;
    if (response.ok && data?.status === 'online') return { status: 'online', reason: null };
  } catch {
    // The UI reports the unavailable state without exposing network details.
  }

  return { status: 'offline', reason: 'unreachable' };
}

export async function sendChatMessage(message, history = [], useRag = false) {
  if (RAG_API_URL && useRag) {
    try {
      const response = await fetchWithTimeout('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history: history.map(({ role, text }) => ({ role, content: text })) }),
      }, 90000);

      if (!response.ok) throw new Error('RAG request failed');
      const data = await response.json();
      if (!data?.answer || typeof data.answer !== 'string') throw new Error('Invalid RAG response');

      return { answer: data.answer, mode: 'rag', sources: Array.isArray(data.sources) ? data.sources : [] };
    } catch {
      return { answer: getDemoAnswer(message), mode: 'demo', fallbackReason: 'request-failed', sources: [] };
    }
  }

  await new Promise((resolve) => window.setTimeout(resolve, 450));
  return { answer: getDemoAnswer(message), mode: 'demo', fallbackReason: RAG_API_URL ? 'offline' : 'not-configured', sources: [] };
}
