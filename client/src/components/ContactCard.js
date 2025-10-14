import React, { useState } from "react";
import api from "../api/api";
import NotesModal from "./NotesModal";
import "./ContactList.css"; // add this line if not already imported anywhere

export default function ContactCard({ contact, onDeleted, onUpdated }) {
  const [showNotes, setShowNotes] = useState(false);

  async function deleteContact() {
    if (!window.confirm("Delete contact?")) return;
    await api.delete(`/contacts/${contact._id}`);
    onDeleted(contact._id);
  }

  async function markContacted() {
    await api.post(`/contacts/${contact._id}/interact`);
    const updated = (await api.get(`/contacts/${contact._id}`)).data;
    onUpdated(updated);
  }

  return (
    <div className="contact-card">
      {/* Left side info */}
      <div className="contact-info">
        <div className="contact-name">
          {contact.name}{" "}
          {contact.tags?.length > 0 && (
            <span className="badge">{contact.tags.join(", ")}</span>
          )}
        </div>

        <div className="contact-meta">
          {contact.phone} • {contact.email}
        </div>

        <div className="contact-health">
          Health Score: <strong>{contact.healthScore}</strong>
        </div>
      </div>

      {/* Right side buttons */}
      <div className="contact-actions">
        <button className="btn note" onClick={() => setShowNotes(true)}>
          Notes
        </button>
        <button className="btn contacted" onClick={markContacted}>
          Contacted
        </button>
        <button className="btn delete" onClick={deleteContact}>
          Delete
        </button>
      </div>

      {/* Notes modal */}
      {showNotes && (
        <NotesModal
          contact={contact}
          onClose={() => setShowNotes(false)}
          onUpdated={onUpdated}
        />
      )}
    </div>
  );
}
