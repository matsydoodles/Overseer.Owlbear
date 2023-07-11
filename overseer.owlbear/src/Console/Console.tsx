import React from "react";
import ReactDOM from "react-dom/client";

import { PluginThemeProvider } from "../PluginThemeProvider";
import { PluginGate } from "../PluginGate";
import { ConsoleTray } from "./ConsoleTray";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PluginThemeProvider>
      <PluginGate>
        <ConsoleTray />
      </PluginGate>
    </PluginThemeProvider>
  </React.StrictMode>
);