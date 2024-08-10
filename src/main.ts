import React from "react";
import ReactDOM from "react-dom/client";

import "./styles.scss";
import "@fontsource-variable/inter";

import { Provider as JotaiProvider } from "jotai";

import App from "./app";
import { TooltipProvider } from "./components/ui/tooltip";

ReactDOM.createRoot(document.getElementById("root")!).render(
  React.createElement(JotaiProvider, {
    children: React.createElement(TooltipProvider, {
      children: React.createElement(App),
    }),
  }),
);
