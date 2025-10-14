import React, { useState } from "react";
import api from "../api/api";
import "./ContactForm.css";

export default function ContactForm({ onAdded, contacts = [] }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [tags, setTags] = useState("");

  async function submit(e) {
    e.preventDefault();

    // Name validation
    if (!name.trim()) return alert("Name is required");

    // Email validation
    if (!email.includes("@gmail.com")) {
      return alert("Email must contain @gmail.com");
    }

    // Phone validation (optional, only if entered)
    if (phone && !/^\d{10}$/.test(phone)) {
      return alert("Phone number must contain exactly 10 digits");
    }

    // Duplicate check: email OR phone
    const duplicate = contacts.find(
      (c) => c.email === email || (phone && c.phone === phone)
    );
    if (duplicate) {
      return alert(
        "A contact with this email or phone number already exists!"
      );
    }

    try {
      const res = await api.post("/contacts", { name, phone, email, tags });
      onAdded(res.data);

      // Reset form
      setName("");
      setPhone("");
      setEmail("");
      setTags("");
    } catch (err) {
      console.error("Error adding contact:", err);
      alert("Failed to add contact. Please try again.");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row">
        <input
          placeholder="Name (required)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Phone (10 digits)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="form-row">
        <input
          placeholder="Email (@gmail.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <div className="form-actions">
        <button type="submit">Create</button>
      </div>
    </form>
  );
}
