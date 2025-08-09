import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import InputBox from "./InputBox";
import { getBotReply } from "../bot/botEngine";

const STORAGE_KEY = "nivebot_history_v1";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setMessages(JSON.parse(stored));
    else {
      // initial bot greeting
      setMessages([{
        id: Date.now(),
        sender: "bot",
        text: "Hi! I'm NiveBot — a demo chatbot. Try: 'what is your name' or 'what can you do'.",
        time: Date.now()
      }]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    // scroll to bottom when messages change
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = (text) => {
    const userMsg = { id: Date.now()+1, sender: "user", text, time: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);
    // simulate thinking
    setTimeout(() => {
      const reply = getBotReply(text);
      const botMsg = { id: Date.now()+2, sender: "bot", text: reply, time: Date.now() };
      setMessages(prev => [...prev, botMsg]);
      setTyping(false);
    }, 600 + Math.random()*400);
  };

  const downloadTranscript = () => {
    const blobText = messages.map(m => `${m.sender === "user" ? "You" : "NiveBot"} (${new Date(m.time).toLocaleString()}):\n${m.text}\n`).join("\n");
    const blob = new Blob([blobText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nivebot-transcript.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setMessages([{
      id: Date.now(),
      sender: "bot",
      text: "Conversation reset. Hi — I'm NiveBot. Try asking a question!",
      time: Date.now()
    }]);
  };

  return (
    <div className="chat-card">
      <div className="chat-top">
        <div className="bot-avatar">N</div>
        <div className="bot-info">
          <div className="bot-name">NiveBot</div>
          <div className="bot-desc">Demo rule-based chatbot</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button className="smallbtn" onClick={downloadTranscript}>Download</button>
          <button className="smallbtn" onClick={reset}>Reset</button>
        </div>
      </div>

      <div className="messages" ref={containerRef}>
        <div style={{paddingBottom:8}}>
          <div className="quick-row">
            <button className="smallbtn" onClick={()=>send("what is your name")}>Who are you?</button>
            <button className="smallbtn" onClick={()=>send("what can you do")}>Show features</button>
            <button className="smallbtn" onClick={()=>send("how to reset")}>How to reset?</button>
          </div>
        </div>

        {messages.map(m => <Message key={m.id} m={m} />)}

        {typing && (
          <div className="message bot typing" style={{alignSelf:"flex-start"}}>
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <div style={{width:8,height:8,background:"#cbd5e1",borderRadius:999,animation:"blink 1s infinite"}}></div>
              <div style={{width:8,height:8,background:"#cbd5e1",borderRadius:999,animation:"blink 1s .2s infinite"}}></div>
              <div style={{width:8,height:8,background:"#cbd5e1",borderRadius:999,animation:"blink 1s .4s infinite"}}></div>
            </div>
          </div>
        )}
      </div>

      <InputBox onSend={send} disabled={typing} />
    </div>
  );
}
