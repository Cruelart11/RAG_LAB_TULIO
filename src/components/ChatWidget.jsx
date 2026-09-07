import { useEffect, useRef, useState } from 'react';
import { sendChatMessage } from '../services/chatService';

const suggestions = ['What goes in a Go-Bag?', 'What should I do during a flood?', 'Where can I evacuate?'];
const welcomeMessage = { role: 'assistant', text: 'Kumusta! I’m the Pasig preparedness assistant. Ask me about hazards, Go-Bags, evacuation, or emergency contacts.' };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([welcomeMessage]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const [failedMessage, setFailedMessage] = useState('');
  const inputRef = useRef(null);
  const logRef = useRef(null);

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
      const reply = await sendChatMessage(trimmed);
      setMessages((items) => [...items, { role: 'assistant', text: reply }]);
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
            <div><span className="chat-avatar" aria-hidden="true">PC</span><div><h2 id="chat-title">Preparedness assistant</h2><p><span className="status-dot" />Demo mode</p></div></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </header>
          <div className="chat-log" ref={logRef} aria-live="polite">
            {messages.map((message, index) => <p className={`message message--${message.role}`} key={`${message.role}-${index}`}>{message.text}</p>)}
            {pending && <p className="message message--assistant message--typing" aria-label="Assistant is typing"><span /><span /><span /></p>}
            {failedMessage && <div className="chat-error">Something went wrong. <button type="button" onClick={() => submitMessage(failedMessage)}>Try again</button></div>}
          </div>
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
