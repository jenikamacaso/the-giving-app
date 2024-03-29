import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

function App() {

  // const [profileInfo, setProfileInfo] = useState(null);

  function send() {
    window.api.getProfileInfo({ username: "admin", password: "admin" });
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button type="button" onClick={() => send()}>
          Send
        </button>
      </header>
    </div>
  );
}

export default App;
