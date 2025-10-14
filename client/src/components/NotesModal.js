import React, { useState } from "react";
import api from "../api/api";

export default function NotesModal({ contact, onClose, onUpdated }) {
  const [text, setText] = useState("");
  const [files, setFiles] = useState(null);

  async function submit(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("text", text);
    if (files) {
      for (let i = 0; i < files.length; i++) form.append("files", files[i]);
    }
    const res = await api.post(`/contacts/${contact._id}/notes`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    onUpdated(res.data);
    setText("");
    setFiles(null);
    onClose();
  }

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          maxWidth: 600,
          margin: "40px auto",
          background: "white",
          padding: 16,
          borderRadius: 8,
        }}
      >
        <h3>Notes for {contact.name}</h3>
        <div style={{ maxHeight: 250, overflow: "auto", marginBottom: 8 }}>
          {contact.notes?.length === 0 && <div>No notes yet</div>}
          {contact.notes?.map((n, i) => (
            <div
              key={i}
              style={{
                borderTop: "1px solid #eee",
                paddingTop: 8,
                marginTop: 8,
              }}
            >
              <div>{n.text}</div>
              <div style={{ fontSize: 12, color: "#888" }}>
                {new Date(n.createdAt).toLocaleString()}
              </div>
              <div>
                {n.files?.map((f, idx) => (
                  <a key={idx} href={f} target="_blank" rel="noreferrer">
                    {f.split("/").pop()}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={submit}>
          <textarea
            rows={3}
            placeholder="Write a note..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />
          <div style={{ marginTop: 10, textAlign: "right" }}>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save Note</button>
          </div>
        </form>
      </div>
    </div>
  );
}
