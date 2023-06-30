import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';

interface DiceProps {
  rolling: boolean;
  targetRange: number;
}

function determineResult(value: number): string {
  if (value === 1) {
    return '💩';
  } else if (value === 20) {
    return '⭐';
  } else if (value >= 2 && value <= 19) {
    return value.toString();
  }
    return 'Invalid Value ' + value ;
}

const Dice: React.FC<DiceProps> = ({ rolling, targetRange }) => {
  const [face, setFace] = useState<string>('❓');
  const [range, setRange] = useState<number>(0);
  const theme = useTheme();

  useEffect(() => {
    setRange(targetRange);
  }, [targetRange]);

  function determineColor() {
    let faceValue = parseInt(face);
    var result = faceValue <= range;
    if (face === '💩') {
      return theme.palette.poo.main;
    } else if (face === '⭐') {
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
    <div
      style={{
        width: '50px',
        height: '50px',
        border: `1px solid`,
        borderRadius: '5px',
        borderColor: determineColor(),
        fontSize: '24px',
        fontWeight: 'bold',
        transition: 'font-size 2s ease-in-out',
        marginRight: '10px',
        color: parseInt(face) <= range ? theme.palette.success.main : theme.palette.error.main,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      {face !== null ? face : '❓'}
    </div>
  );
};

export default Dice;
