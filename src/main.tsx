import React from "react";
import ReactDOM from "react-dom/client";

import "./styles.scss";

import App from "./app";
import { FileProvider } from "./providers/file";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FileProvider>
      <App />
    </FileProvider>
  </React.StrictMode>,
);
