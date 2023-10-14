//import packages
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

import "./styles.css";
import NotesProvider from "./context/notes.context";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <NotesProvider>
    <App />
  </NotesProvider>
);
