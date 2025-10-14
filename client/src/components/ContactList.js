import React, { useEffect, useState } from "react";
import api from "../api/api";
import ContactCard from "./ContactCard";
import ContactForm from "./ContactForm";
import "./ContactList.css";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    try {
      const res = await api.get("/contacts");
      setContacts(res.data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  }

  const addContact = (c) => setContacts((prev) => [c, ...prev]);
  const removeContact = (id) =>
    setContacts((prev) => prev.filter((p) => p._id !== id));
  const updateContactInList = (updated) =>
    setContacts((prev) =>
      prev.map((p) => (p._id === updated._id ? updated : p))
    );

  return (
    <div className="contact-list-container">
      <div className="contact-list-header">
        <strong>Contacts</strong>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close" : "New Contact"}
        </button>
      </div>
      {showForm && (
        <div className="form-wrapper">
        <ContactForm
        contacts={contacts} // pass current contacts for duplicate check
        onAdded={(c) => {
          addContact(c);
          setShowForm(false);
        }}
      />
    </div>
  )}

   

      {contacts.length === 0 && (
        <div className="no-contacts">No contacts yet</div>
      )}

      <div className="contact-cards">
        {contacts.map((c) => (
          <ContactCard
            key={c._id}
            contact={c}
            onDeleted={removeContact}
            onUpdated={updateContactInList}
          />
        ))}
      </div>
    </div>
  );
}
