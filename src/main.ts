import React from "react";
import ReactDOM from "react-dom/client";

import "./styles.scss";
import "@fontsource-variable/inter";

import { Provider as JotaiProvider } from "jotai";

import App from "./app";

ReactDOM.createRoot(document.getElementById("root")!).render(
  React.createElement(JotaiProvider, {
    children: React.createElement(App),
  }),
);
