import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import './dice.css';

interface DiceProps {
  rolling: boolean;
  onRollComplete: (value: string) => void;
  resetFace: boolean;
}

function determineResult(value: number): string {
  if (value === 1) {
    return '1';
  } else if (value === 2) {
    return '2';
  } else if (value >= 3 && value <= 4) {
    return ' '
  } else if(value >= 5 && value <= 6) {
    return '1*'
  }

  throw new Error('Invalid Value');
}

const CombatDice: React.FC<DiceProps> = ({ rolling, onRollComplete, resetFace }) => {
const [face, setFace] = useState<string>('❓');
const [rollInterval, setRollInterval] = useState<number>(-1);
const theme = useTheme();

  function determineColor() {
    if (face === '1' || face === '2' || face === '1*') {
      return theme.palette.success.main;
    } else {
      return theme.palette.error.main;
    }
  }

  useEffect(() => {
    if (rolling) {
      setRollInterval(setInterval(() => {
        let random = Math.floor(Math.random() * 6) + 1;
        let result = determineResult(random);
        setFace(result);
      }, 100));
    }
    else {
      if(resetFace) {
        setFace('❓');
        return;
      }

      if(rollInterval === -1) {
        return;
      }

      clearInterval(rollInterval);
      setRollInterval(-1);
      onRollComplete(face);
    }
  }, [rolling, onRollComplete, resetFace]);

  return (
<div className="base-dice" 
     style={{ borderColor: determineColor(),
              color: determineColor()  }}>
      {face !== null ? face : '❓'}
    </div>
  );
};

export default CombatDice;
