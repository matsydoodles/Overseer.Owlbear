import OBR from "@owlbear-rodeo/sdk";
//import { getPluginId } from "./plugin/getPluginId";

OBR.onReady(() => {
  console.log(`Ready...`, OBR.isReady)
  OBR.popover.open({
    id: "com.overseer.console",//getPluginId("popover"),
    url: "/Console.html",
    width: 0,
    height: 0,
    anchorOrigin: { horizontal: "RIGHT", vertical: "BOTTOM" },
    transformOrigin: { horizontal: "RIGHT", vertical: "BOTTOM" },
    disableClickAway: true,
    hidePaper: true,
    marginThreshold: 0,
  });
});