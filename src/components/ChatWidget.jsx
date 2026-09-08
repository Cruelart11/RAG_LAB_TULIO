import { useEffect, useRef, useState } from 'react';
import { checkRagHealth, isRagConfigured, sendChatMessage } from '../services/chatService';

const suggestions = ['What goes in a Go-Bag?', 'What should I do during a flood?', 'Where can I evacuate?'];
const welcomeMessage = { role: 'assistant', text: 'Kumusta! I’m the Pasig preparedness assistant. Ask me about hazards, Go-Bags, evacuation, or emergency contacts.' };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([welcomeMessage]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const [failedMessage, setFailedMessage] = useState('');
  const [ragStatus, setRagStatus] = useState(isRagConfigured() ? 'checking' : 'offline');
  const inputRef = useRef(null);
  const logRef = useRef(null);

  const refreshRagStatus = async () => {
    setRagStatus('checking');
    const result = await checkRagHealth();
    setRagStatus(result.status);
  };

  useEffect(() => {
    if (isRagConfigured()) refreshRagStatus();
  }, []);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, pending]);

  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const submitMessage = async (message) => {
    const trimmed = message.trim();
    if (!trimmed || pending) return;
    setMessages((items) => [...items, { role: 'user', text: trimmed }]);
    setInput('');
    setPending(true);
    setFailedMessage('');
    try {
      const result = await sendChatMessage(trimmed, messages, ragStatus === 'online');
      const usedFallback = result.mode === 'demo' && result.fallbackReason === 'request-failed';
      if (usedFallback) setRagStatus('offline');
      setMessages((items) => [...items, {
        role: 'assistant',
        text: result.answer,
        mode: result.mode,
        sources: result.sources,
        notice: usedFallback ? 'RAG request failed · Demo response used' : '',
      }]);
    } catch {
      setFailedMessage(trimmed);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="chat-widget">
      {open && (
        <section className="chat-panel" role="dialog" aria-modal="false" aria-labelledby="chat-title">
          <header className="chat-header">
            <div><span className="chat-avatar" aria-hidden="true">PC</span><div><h2 id="chat-title">Preparedness assistant</h2><p className={`rag-status rag-status--${ragStatus}`} aria-live="polite"><span className="status-dot" />{ragStatus === 'online' ? 'RAG online' : ragStatus === 'checking' ? 'Checking RAG…' : 'Demo mode · RAG offline'}</p></div></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </header>
          <div className="chat-log" ref={logRef} aria-live="polite">
            {messages.map((message, index) => <div className={`message message--${message.role}`} key={`${message.role}-${index}`}>{message.notice && <span className="message__notice">{message.notice}</span>}<p>{message.text}</p>{message.mode === 'rag' && <span className="message__source">Answered by RAG</span>}</div>)}
            {pending && <p className="message message--assistant message--typing" aria-label="Assistant is typing"><span /><span /><span /></p>}
            {failedMessage && <div className="chat-error">Something went wrong. <button type="button" onClick={() => submitMessage(failedMessage)}>Try again</button></div>}
          </div>
          <div className="chat-connection"><span>{ragStatus === 'online' ? 'Notebook connection is working.' : 'Local demo answers are active.'}</span><button type="button" onClick={refreshRagStatus} disabled={ragStatus === 'checking'}>{ragStatus === 'checking' ? 'Checking…' : 'Check connection'}</button></div>
          {messages.length === 1 && <div className="chat-suggestions">{suggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => submitMessage(suggestion)}>{suggestion}</button>)}</div>}
          <form className="chat-form" onSubmit={(event) => { event.preventDefault(); submitMessage(input); }}>
            <label className="sr-only" htmlFor="chat-input">Ask a preparedness question</label>
            <input id="chat-input" ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask a question…" disabled={pending} />
            <button type="submit" disabled={!input.trim() || pending} aria-label="Send message">↑</button>
          </form>
          <p className="chat-disclaimer">Demo guidance only. Follow official emergency instructions.</p>
        </section>
      )}
      <button className="chat-launcher" type="button" aria-label={open ? 'Close preparedness assistant' : 'Open preparedness assistant'} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {open ? <span aria-hidden="true">×</span> : <img src={`${import.meta.env.BASE_URL}assets/icons/chat.svg`} alt="" />}
      </button>
    </div>
  );
}
