import React from "react";
import ChatWindow from "./components/ChatWindow";

export default function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>NiveBot — Demo Chatbot</h1>
        <p className="subtitle">Rule-based demo for interviews</p>
      </header>

      <main className="main-area">
        <ChatWindow />
      </main>
    </div>
  );
}
