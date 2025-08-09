import React, { useState } from "react";

export default function InputBox({ onSend, disabled }) {
  const [text, setText] = useState("");
  const submit = (e) => {
    e?.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  };
  return (
    <form className="controls" onSubmit={submit}>
      <input className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask something..." />
      <button className="btn" type="submit" disabled={disabled}>Send</button>
    </form>
  );
}
