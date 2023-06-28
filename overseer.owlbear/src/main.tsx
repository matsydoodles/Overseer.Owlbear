import React from "react";
import ReactDOM from "react-dom/client";

import "./main.css";
// import './style.css'
// import './main.css'
// import typescriptLogo from './typescript.svg'
// import { setupCounter } from './counter.ts'
// import { hitLocator, setupHitList } from './hit-locator.ts'
// import OBR from '@owlbear-rodeo/sdk';
import { PluginThemeProvider } from "./PluginThemeProvider";
import { PluginGate } from "./PluginGate.tsx";
import { App } from "./App.tsx";

// const generateRandomNumber = (): number => {
//   const min = 1;
//   const max = 20;
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PluginGate>
      <PluginThemeProvider>
        <App />
      </PluginThemeProvider>
    </PluginGate>
  </React.StrictMode>
);

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
// <div class="container">
//   <h1 class="css-1va96c6">Making an Attack</h1>

//   <hr class="group-divider" />

//   <div class="group-box">
//     <div class="group-title">1. Choose Weapon and Target</div>
//     <div class="group-content">
//       <div class="toggle-group">
//         <div class="row">
//           <label>Target Defence:</label>
//           <div class="toggle-buttons">
//             <button id="button1" class="toggle-button toggle-group-btn">1</button>
//             <button id="button2" class="toggle-button toggle-group-btn">2</button>
//           </div>
//         </div>

//         <div class="row">
//           <label>Target Range:</label>
//             <div class="toggle-buttons">
//               <button id="target1" class="toggle-button target-range-btn">Close</button>
//               <button id="target2" class="toggle-button target-range-btn">Medium</button>
//               <button id="target3" class="toggle-button target-range-btn">Long</button>
//               <button id="target4" class="toggle-button target-range-btn">Extreme</button>
//             </div>
//         </div>

//         <div class="row">
//           <label>Weapon Range:</label>
//           <div class="toggle-buttons">
//             <button class="toggle-button" id="close-range">Close</button>
//             <button class="toggle-button" id="medium-range">Medium</button>
//             <button class="toggle-button" id="long-range">Long</button>
//             <button class="toggle-button" id="extreme-range">Extreme</button>
//           </div>
//         </div>

//         <div class="row">
//           <label>Hit Location:</label>
//           <div class="toggle-buttons">
//             <button class="toggle-button" id="random-hit">Random</button>
//             <button class="toggle-button" id="chosen-hit">Chosen</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>

//   <hr class="group-divider" />

//   <div class="group-box another-group-box">
//       <div class="group-title">2. Attempt Test</div>
//       <div class="group-content">
//         <div class="label-value-group">
//           <div class="label">Difficulty</div>
//           <div class="label-value">X</div>
//         </div>
//         <div class="label-group">
//           <div class="label">Target Range</div>
//           <input type="text" class="text-input" />
//         </div>
//         <div class="dice-to-roll-group">
//           <div class="label">Dice to Roll</div>
//           <select class="dropdown">
//             <option value="2">2 x D20</option>
//             <option value="3">3 x D20</option>
//             <option value="4">4 x D20</option>
//             <option value="5">5 x D20</option>
//           </select>
//         </div>
//       </div>
//       <div class="roll-button-group">
//         <button class="roll-button">Roll</button>
//       </div>
//     </div>

//   <div class="group-box">
//     <div class="group-title">3. Determine Hit Location</div>
//     <div class="roll-button-group-content">
//       <div class="roll-button-group">
//         <button class="roll-button">Roll</button>
//       </div>
//     </div>
//   </div>

//   <hr class="group-divider" />

//   <div class="group-box">
//     <div class="group-title">4. Inflict Damage</div>
//     <div class="group-content">
//       <!-- Inflict damage controls go here -->
//     </div>
//   </div>

//   <hr class="group-divider" />

//   <div class="group-box">
//     <div class="group-title">5. Reduce Ammo</div>
//     <div class="group-content">
//       <!-- Reduce ammo controls go here -->
//     </div>
//   </div>
  
//   <div class="remaining-space">
//     <!-- Content for the remaining space -->
//   </div>

// </div>
// `

// <div class="card">
// <p id="emoji">❓</p>
// <button id="hitlocator" type="button"></button>
// <ul id="hits-list" class="emoji-list"></ul>
// </div>

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
// // hitLocator(document.querySelector<HTMLButtonElement>('#hitlocator')!, 
// //            document.querySelector<HTMLUListElement>('#hits')!,
// //            document.querySelector<HTMLParagraphElement>('#emoji')!)

// OBR.onReady(() => {
//   //setupContextMenu();
//   OBR.notification.show(`Ready`);
//   setupHitList(document.querySelector<HTMLUListElement>("#hits-list")!);
//   hitLocator(document.querySelector<HTMLButtonElement>('#hitlocator')!, 
//               //document.querySelector<HTMLUListElement>('#hits')!,
//               document.querySelector<HTMLParagraphElement>('#emoji')!);
  
// });
