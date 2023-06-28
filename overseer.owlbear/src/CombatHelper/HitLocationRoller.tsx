import React, { useState } from 'react';
import { Button } from '@mui/material';

const emojis = ['🤯', '🦺', '💪', '🦵'];

const generateRandomNumber = (): number => {
    return Math.floor(Math.random() * 20) + 1;
};

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
      return 'Invalid Value ' + value ;
    }
}

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

const HitLocationRoller: React.FC = () => {
    const [emoji, setEmoji] = useState('❓');
    const [rolling, setRolling] = useState(false);

    const changeEmoji = () => {
        const randomIndex = Math.floor(Math.random() * emojis.length) + 1;
        let emoji = getBodyPart(randomIndex);
        setEmoji(emoji)
      };

    let result = 0
    let intervalId: number;
    const onRoll = () => {
        if (rolling) return;
  
        setRolling(true);

        let delay = 100;
  
        intervalId = setInterval(async () => {
          changeEmoji();
          delay += 50; // Increase the delay to slow down the changes
          if (delay >= 1000) {
            clearInterval(intervalId);
  
            result = generateRandomNumber();
            let emoji1 = getBodyPartAndText(result);
            setEmoji(emoji1);
            setRolling(false);
          }
        }, delay);
    }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ marginBottom: '10px' }}>{emoji}</div>
        <Button variant="outlined" onClick={onRoll} disabled={rolling}>ROLL</Button>
    </div>
  );
};

export default HitLocationRoller;