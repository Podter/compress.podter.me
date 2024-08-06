import React from "react";
import ReactDOM from "react-dom/client";

import "./styles.scss";

import App from "./app";
import { FFmpegProvider } from "./providers/ffmpeg";
import { FileProvider } from "./providers/file";

ReactDOM.createRoot(document.getElementById("root")!).render(
  React.createElement(FFmpegProvider, {
    children: React.createElement(FileProvider, {
      children: React.createElement(App),
    }),
  }),
);
