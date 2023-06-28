import OBR, { Metadata } from "@owlbear-rodeo/sdk";

const ID = "com.overseer.hit-locator";

const emojis = ['🤯', '🦺', '💪', '🦵'];
const hits: string[] = [];

const generateRandomNumber = (): number => {
    const min = 1;
    const max = 20;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getBodyPartAndText(value: number): string {
    if (value === 1 || value === 2) {
      return 'Head 🤯';
    } else if (value >= 3 && value <= 8) {
      return 'Torso 🦺 ';
    } else if (value >= 9 && value <= 11) {
      return 'Left Arm 💪 ';
    } else if (value >= 12 && value <= 14) {
      return 'Right Arm 💪';
    } else if (value >= 15 && value <= 17) {
      return 'Left Leg 🦵';
    } else if (value >= 18 && value <= 20) {
      return 'Right Leg 🦵';
    } else {
      return 'Invalid Value';
    }
}

function getBodyPart(value: number): string {
    if (value === 1 || value === 2) {
      return '🤯';
    } else if (value >= 3 && value <= 8) {
      return '🦺 ';
    } else if (value >= 9 && value <= 11) {
      return '💪 ';
    } else if (value >= 12 && value <= 14) {
      return '💪';
    } else if (value >= 15 && value <= 17) {
      return '🦵';
    } else if (value >= 18 && value <= 20) {
      return '🦵';
    } else {
      return 'Invalid Value';
    }
}

const changeEmoji = (emoji: HTMLParagraphElement) => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    setEmoji(emoji, emojis[randomIndex])
  };

const setEmoji = (emojiElement: HTMLParagraphElement, emoji: string) => {
    emojiElement.textContent = emoji
};

async function getMetadata() {
  const metadata = await OBR.scene.getMetadata();
  if(metadata == undefined) {
    OBR.notification.show(`metadata undefined`);
    let testMeta: Metadata = {}; 
    testMeta[`${ID}/data`] = new hitLocatorData(); 

    return testMeta;
  } 
  else {
    OBR.notification.show(`metadata defined`);
  }

  return metadata;
}

async function updateMetaData(data: IHitLocatorData) {
  let testMeta: Metadata = {}; 
  testMeta[`${ID}/data`] = data; 
  await OBR.scene.setMetadata(testMeta);
}

interface IHitLocatorData {
  hits: string[];
}

class hitLocatorData implements IHitLocatorData {
  hits: string[];

  constructor() {
    this.hits = [];
  }
}

export async function setupHitList(element: HTMLUListElement) {
  // const metadata = await OBR.tool.getMetadata(`${ID}/data`);
  // if(metadata == undefined) {
  //   OBR.notification.show(`metadata undefined`);
  //   let testMeta: Metadata = {}; 
  //   testMeta[`${ID}/data`] = { hits: [] }; 
  // } 
  // else {
  //   OBR.notification.show(`metadata defined`);
  // }
  const renderList = async () => {
    OBR.notification.show(`renderList`);
    let metadata = await getMetadata();
    let data = metadata[`${ID}/data`] as IHitLocatorData;
    // Get the name and initiative of any item with
    // our initiative metadata
    const hitItems = [];
    for (const hit of data.hits) {
      //const metadata = item.metadata[`${ID}/metadata`];
      if (metadata) {
        hitItems.push({
          hit
          // player: metadata.player,
          // location: metadata.location,
        });
      }
    }

        // Create new list nodes for each initiative item
        const nodes = [];
        for (const hitItem of hitItems) {
          const node = document.createElement("li");
          node.innerHTML = `${hitItem.hit}`;
          nodes.push(node);
        }
        element.replaceChildren(...nodes);

    // Create new list nodes for each initiative item
    // const nodes = [];
    // for (const hitItem of hitItems) {
    //   const node = document.createElement("li");
    //   node.innerHTML = `${hitItem.player} 🎯 ${hitItem.location}`;
    //   nodes.push(node);
    // }
    // element.replaceChildren(...nodes);
  };
  //OBR.scene.items.onChange(renderList);
  OBR.scene.onMetadataChange(renderList);
}

export function hitLocator(button: HTMLButtonElement, 
    //list: HTMLUListElement,
    emojiElement: HTMLParagraphElement) {
  let result = 0
  let output = ""
  let emoji = "❓"
  let intervalId: number;
  const roll = () => {
    let delay = 100;

    intervalId = setInterval(async () => {
        changeEmoji(emojiElement);
        delay += 50; // Increase the delay to slow down the changes
        if (delay >= 1000) {
          clearInterval(intervalId);

          result = generateRandomNumber();
          emoji = getBodyPart(result);
          setEmoji(emojiElement, emoji);
          
          output = getBodyPartAndText(result);

          let name = await OBR.player.getName();

          let metadata = await getMetadata();
          let data = metadata[`${ID}/data`] as IHitLocatorData;
          data.hits.push(output);
          updateMetaData(data);
          // const listItem = document.createElement('li');
    
          // listItem.textContent = `${name} hit ` + output.toString();
          // list.appendChild(listItem);
         // OBR.scene.items

        // const metadata = await OBR.tool.getMetadata(`${ID}/metadata`);
        // if(metadata == undefined) {
        //   OBR.notification.show(`metadata undefined`);
        // } 
        // else {

        // }

        //  OBR.scene.setMetadata({
        //   [`${ID}/metadata`]: 
        // });

          OBR.notification.show(`${name} 🎯 ${output}`);
          
        }
      }, delay);


    // result = generateRandomNumber();
    // output = getBodyPart(result);
    // hits.push(output);

    // const listItem = document.createElement('li');
    // listItem.textContent = output.toString();
    // list.appendChild(listItem);

    //OBR.notification.show(`${output}`);
  }
  button.addEventListener('click', () => roll())
  button.innerHTML = `Hit Location`
}
