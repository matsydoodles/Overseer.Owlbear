import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { DiceResult } from './DiceResult';
import './dice.css';
import DiceState from './DiceState';

interface DiceProps {
  rolling: boolean;
  targetRange: number;
  skillRange: number;
  resetFace: boolean;
  onRollComplete: (diceResult: DiceResult) => void;
}

function valueToString(value: number): string {
  if (value === 20) {
    return '💩';
  } else if (value === 1) {
    return '⭐';
  } else if (value >= 2 && value <= 19) {
    return value.toString();
  }
    return 'Invalid Value ' + value ;
}

const Dice: React.FC<DiceProps> = ({ rolling, targetRange, skillRange, resetFace, onRollComplete }) => {
  const [face, setFace] = useState<string>('❓');
  const [range, setRange] = useState<number>(0);
  const [skill, setSkill] = useState<number>(0);
  const valueRef = useRef<number>(0);
  const theme = useTheme();

  useEffect(() => {
    setRange(targetRange);
  }, [targetRange]);

  useEffect(() => {
    setSkill(skillRange);
  }, [skillRange]);

  function determineColor() {
    let faceValue = parseInt(face);
    var critical = faceValue <= skill;
    var result = faceValue <= range;
    if (face === '💩') {
      return theme.palette.poo.main;
    } else if (face === '⭐') {
      return theme.palette.star.main;
    } else if(critical) {
      return theme.palette.star.main;
    } else if (result) {
      return  theme.palette.success.main; 
    } else if(!result) {
      return theme.palette.error.main;
    }
    throw new Error('Invalid Value');
   }

  function determineResult (value: number, range: number, skill: number): DiceState {
    if (value === 20) {
      return DiceState.COMPLICATION;
    } else if (value === 1) {
      return DiceState.CRITICAL;
    } else if(value <= skill) {
      return DiceState.CRITICAL;
    } else if (value <= range) {
      return DiceState.SUCCESS;
    }
      return DiceState.FAILURE;
  }

  useEffect(() => {
    if (rolling) {
      const rollInterval = setInterval(() => {
        let random = Math.floor(Math.random() * 20) + 1;
        let result = valueToString(random);

        valueRef.current = random;
        setFace(result);
      }, 100);

      setTimeout(() => {
        clearInterval(rollInterval);

        let result = { face: valueRef.current, result: determineResult(valueRef.current, range, skill) }

        onRollComplete(result);
      }, 1850);
    }
    else {
      if(resetFace) {
        setFace('❓');
        return;
      }
    }
  }, [rolling, resetFace, onRollComplete]);

  return (
<div className="base-dice" 
     style={{ borderColor: determineColor(),
              color: determineColor()  }}>
      {face !== null ? face : '❓'}
    </div>
  );
};

export default Dice;
