import React from "react";
import ContactList from "./components/ContactList";
import "./App.css"; // Make sure to import the CSS

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Clix - Contact Manager</h1>
      </header>
      <main className="app-main">
        <ContactList />
      </main>
      <footer className="app-footer">
        &copy; 2025 Clix Inc.
      </footer>
    </div>
  );
}

export default App;
