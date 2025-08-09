import { faqs } from "../data/faqs";

function simpleMatch(text) {
  text = text.toLowerCase();
  // FAQ match by substring
  for (const f of faqs) {
    if (text.includes(f.q)) return f.a;
  }
  // keyword rules
  if (/(hi|hello|hey)\b/.test(text)) {
    return ["Hi! I'm NiveBot 👋", "Hello — how can I help?"][Math.floor(Math.random()*2)];
  }
  if (/(time|date)/.test(text)) {
    return `Current time: ${new Date().toLocaleString()}`;
  }
  if (/help|what can you do/.test(text)) {
    return "I answer FAQs, do small talk, and provide a demo experience. Try: 'what is your name' or 'how to reset'.";
  }
  // best-effort contains question word match
  for (const f of faqs) {
    const keyWords = f.q.split(" ").slice(0,3);
    if (keyWords.every(k => text.includes(k))) return f.a;
  }
  // fallback
  return "Sorry — I didn't understand. Try asking: 'what can you do' or 'what is your name'.";
}

export function getBotReply(userText) {
  return simpleMatch(userText);
}
