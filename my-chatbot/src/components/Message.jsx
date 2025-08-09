import React from "react";

export default function Message({ m }) {
  return (
    <div className={`message ${m.sender === "user" ? "user" : "bot"}`}>
      <div className="text">{m.text}</div>
      <span className="time">{new Date(m.time).toLocaleTimeString()}</span>
    </div>
  );
}
