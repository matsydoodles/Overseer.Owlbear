import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import './dice.css';

interface DiceProps {
  rolling: boolean;
  targetRange: number;
  skillRange: number;
}

function determineResult(value: number): string {
  if (value === 20) {
    return '💩';
  } else if (value === 1) {
    return '⭐';
  } else if (value >= 2 && value <= 19) {
    return value.toString();
  }
    return 'Invalid Value ' + value ;
}

const Dice: React.FC<DiceProps> = ({ rolling, targetRange, skillRange }) => {
  const [face, setFace] = useState<string>('❓');
  const [range, setRange] = useState<number>(0);
  const [skill, setSkill] = useState<number>(0);
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

  useEffect(() => {
    if (rolling) {
      const rollInterval = setInterval(() => {
        let random = Math.floor(Math.random() * 20) + 1;
        let result = determineResult(random);
        setFace(result);
      }, 100);

      setTimeout(() => {
        clearInterval(rollInterval);
      }, 2000);
    }
  }, [rolling]);

  return (
<div className="base-dice" 
     style={{ borderColor: determineColor(),
              color: determineColor()  }}>
      {face !== null ? face : '❓'}
    </div>
  );
};

export default Dice;
