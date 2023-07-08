import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import CombatDice from './CombatDice';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const CombatRoller: React.FC = () => {
  const [numberOfDie, setNumberOfDie] = useState<number>(1);
  const [rolling, setRolling] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [effects, setEffects] = useState<number>(0);
  const [resetFace, setResetFace] = useState(false);

  const handleSliderChanged = (_event: Event, newValue: number | number[]) => {
    const value = parseInt(newValue.toString(), 10);
    setNumberOfDie(value);
    setTotal(0);
    setEffects(0);
    setResetFace(true);
  };

  const handleAttemptTest = () => {
    if (rolling) {
      return;
    }
  
    setRolling(true);
    setTotal(0);
    setEffects(0);
    setResetFace(false);
  
    setTimeout(() => {
      setRolling(false);
    }, 2000);
  };
  
  const parseValue = (value: string): number => {
    if (value === '1') {
      return 1;
    } else if (value === '2') {
      return 2;
    } else if (value === '1*') {
      return 1;
    } else if(value === ' ') {
      return 0;
    }
  
    throw new Error('Invalid Value');
  };

  const effectValue = (value: string): number => {
    if (value === '1*') {
      return 1;
    } else {
      return 0;
    }
  };

  const handleRollComplete = (value: string) => {
    if(value === ' ') {
      return;
    }

    const parsedEffectValue = effectValue(value);
    setEffects((prevTotal) => (prevTotal !== null ? prevTotal + parsedEffectValue : parsedEffectValue));
    const parsedValue = parseValue(value);
    setTotal((prevTotal) => (prevTotal !== null ? prevTotal + parsedValue : parsedValue));
  };

  return (
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
  <div style={{ display: 'flex', gap: '20px', alignItems: 'center', width: '100%' }}>
    <Button variant="outlined" 
            onClick={handleAttemptTest}
            disabled={rolling}>
      ROLL
    </Button>
    <div style={{ width: '100%', marginRight: '15px' }}>
      <Slider value={numberOfDie}
              min={1}
              max={12}
              onChange={handleSliderChanged}
              valueLabelDisplay="auto"
              marks
              step={1} 
              disabled={rolling} />
    </div>
  </div>
  <Box display="flex" justifyContent="center">
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
      {Array.from({ length: numberOfDie }).map((_, index) => (
        <div key={index} style={{ margin: '5px' }}>
          <CombatDice rolling={rolling} 
                      onRollComplete={handleRollComplete} 
                      resetFace={resetFace}/>
        </div>
      ))}
    </div>
  </Box>
  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
  <Typography variant="h6" component="div">
    {total > 0 ? total : 0} Damage
  </Typography>
  <Typography variant="h6" component="div">
    {effects > 0 ? effects : 0} Effect
  </Typography>
</div>
</div>
  );
};

export default CombatRoller;