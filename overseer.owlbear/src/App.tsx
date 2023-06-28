import React, { useEffect, useState } from "react";

import OBR from "@owlbear-rodeo/sdk";
import { CombatHelper } from "./CombatHelper";
import { CombatHelperHeader } from "./CombatHelperHeader";


export function App() {
  const [sceneReady, setSceneReady] = useState(false);
  useEffect(() => {
    OBR.scene.isReady().then(setSceneReady);
    return OBR.scene.onReadyChange(setSceneReady);
  }, []);

  if (sceneReady) {
    return <CombatHelper />;
  } else {
    // Show a basic header when the scene isn't ready
    return (
      <CombatHelperHeader subtitle="Open a scene to use the initiative tracker" />
    );
  }
}