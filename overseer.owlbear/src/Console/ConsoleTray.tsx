import OBR from "@owlbear-rodeo/sdk";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import React from "react";
import ConsoleService from "./ConsoleService";

// import { PopoverTray } from "./PopoverTray";
// import { getPluginId } from "./getPluginId";

export function ConsoleTray() {
  //const [players, setPlayers] = useState<Player[]>([]);

  // useEffect(() => {
  //   OBR.party.getPlayers().then(setPlayers);
  // }, []);
  // useEffect(() => OBR.party.onChange(setPlayers), []);

  //const [visibleTrays, setVisibleTrays] = useState<string[]>([]);

  // useEffect(() => {
  //   const playerIds = players.map((p) => p.connectionId);
  //   setVisibleTrays((visible) =>
  //     visible.filter((id) => playerIds.includes(id))
  //   );
  // }, [players]);

//   function handleTrayToggle(connectionId: string, shown: boolean) {
//     if (shown) {
//       setVisibleTrays((visible) =>
//         visible.includes(connectionId) ? visible : [...visible, connectionId]
//       );
//     } else {
//       setVisibleTrays((visible) => visible.filter((id) => id !== connectionId));
//     }
//   }

//   function handleTrayOpen(connectionId: string) {
//     if (window.BroadcastChannel) {
//       OBR.action.open();
//       const channel = new BroadcastChannel(getPluginId("focused-tray"));
//       channel.postMessage(connectionId);
//       channel.close();
//     }
//   }

  // Hide popover when no trays are visible
  // const hidden = visibleTrays.length === 0;
  // useEffect(() => {
  //   if (hidden) {
  //     OBR.popover.setHeight("com.overseer.console.console", 0);
  //     OBR.popover.setWidth("com.overseer.console.console", 0);
  //   } else {
  //     // Height = Tray + Name + Bottom
  //     OBR.popover.setHeight("com.overseer.console.console", 298);
  //     // Width = Tray + Right
  //     OBR.popover.setWidth("com.overseer.console.console", 266);
  //   }
  // }, [hidden]);

  // const consoleService = ConsoleService.getInstance();

  // const [messages, setMessages] = useState<string[]>([]);

  // useEffect(() => {
  //   const handleNewMessage = (message: string) => {
  //     // Height = Tray + Name + Bottom
  //     OBR.popover.setHeight("com.overseer.console", 298);
  //     // Width = Tray + Right
  //     OBR.popover.setWidth("com.overseer.console", 266);

  //     setMessages((prevMessages) => [...prevMessages, message]);
  //   };

  //   consoleService.onMessage(handleNewMessage);

  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     console.log("ConsoleTray is being unmounted.");
  //     consoleService.offMessage(handleNewMessage);
  //   };
  // }, []);

  return (
    <Box
      component="div"
      position="absolute"
      bottom="0"
      left="0"
      right="0"
      top="0"
      overflow="hidden"
      sx={{ backgroundColor: 'hotpink' }}
      height="50"
      width="50"
    >
      Hello
    {/* {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))} */}
    </Box>
  );
}