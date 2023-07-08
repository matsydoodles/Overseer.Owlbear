import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dice from './Dice';

  interface AttemptHitTestRollerProps {
    difficulty: number;
  }

const AttemptHitTestRoller:  React.FC<AttemptHitTestRollerProps> = ({ difficulty }) => {
    const [localDifficulty, setLocalDifficulty] = React.useState(0);
    const [targetRange, setTargetRange] = useState<number>(0);
    const [taggedSkill, setTaggedSkill] = useState<number>(0);
    const [numberOfDie, setNumberOfDie] = useState<number>(2);
    const [diceFace, setDiceFace] = useState(1);
    const [rolling, setRolling] = useState(false);
    const [resetFace, setResetFace] = useState(false);

    useEffect(() => {
      setLocalDifficulty(difficulty)
      setResetFace(true);
    }, [difficulty]);

    const NUMERIC_REGEX = /^[0-9]+$/;
    const handleTargetRange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newTargetRange = event.target.value;
      if (newTargetRange !== "" && !NUMERIC_REGEX.test(newTargetRange)) {
        setTargetRange(0);
        return;
      }
      var actualTargetRange = parseInt(newTargetRange, 10);
  
      setTargetRange(actualTargetRange);
      setResetFace(true);
    };
  
    const handleTaggedSkill = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newTaggedSkill = event.target.value;
      if (newTaggedSkill !== "" && !NUMERIC_REGEX.test(newTaggedSkill)) {
        setTaggedSkill(0);
        return;
      }
      var actualTaggedSkill = parseInt(newTaggedSkill, 10);
  
      setTaggedSkill(actualTaggedSkill);
      setResetFace(true);
    };
  
    const handleDieSelectionChanged = (event: SelectChangeEvent<number>) => {
      const value = parseInt(event.target.value.toString(), 10);
      setNumberOfDie(value);
      setResetFace(true);
    };
  
    const handleAttemptTest = () => {
      if (rolling) return;
  
      setRolling(true);
      setResetFace(false);
  
      let currentDiceFace = 1;
      const rollInterval = setInterval(() => {
        if (currentDiceFace === diceFace) {
          setDiceFace(Math.floor(Math.random() * 6) + 1);
          currentDiceFace++;
        } else {
          clearInterval(rollInterval);
          setRolling(false);
        }
      }, 1000);
    };

  return (
    <div>
      <Typography variant="h5">2. Attempt Hit Test</Typography>
      <Box display="flex" justifyContent="space-between" gap={0.5} sx={{ marginTop: '10px', alignItems: 'center' }}>
        <Box textAlign="center">
          <Tooltip title="The number of times you need to beat the Target Range.">
            <TextField label="Difficulty"
                       value={localDifficulty}
                       variant="outlined"
                       size="small"
                       sx={{input: {textAlign: "center"},
                            '.MuiInputLabel-root': { fontSize: '0.89rem' }}} />
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title={
                    <Typography variant="inherit">
                      Enter your Target Range.
                      <br />  <br />
                      The number the dice has to get lower or equal to.
                    </Typography>
                  }>
            <TextField label="Target Range"
                       value={targetRange}
                       variant="outlined"
                       size="small"
                       sx={{ input: {textAlign: "center"},
                             '.MuiInputLabel-root': { fontSize: '0.89rem' }}}
                       onChange={handleTargetRange} />
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title={
                  <Typography variant="inherit">
                    Enter your Tagged Skill value.
                    <br />  <br />
                    Any rolls that are equal to or less than are Critical.
                  </Typography>
                }>
            <TextField label="Tagged Skill"
                       value={taggedSkill}
                       variant="outlined"
                       size="small"
                       sx={{ input: {textAlign: "center"},
                             '.MuiInputLabel-root': { fontSize: '0.89rem' }}}
                       onChange={handleTaggedSkill} />
          </Tooltip>
        </Box>
        <Box>
          <Select value={numberOfDie} 
                  onChange={handleDieSelectionChanged}
                  size="small">
            <MenuItem value="2">2 x D20</MenuItem>
            <MenuItem value="3">3 x D20</MenuItem>
            <MenuItem value="4">4 x D20</MenuItem>
            <MenuItem value="5">5 x D20</MenuItem>
          </Select>
        </Box>
      </Box>
      <div style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex' }}>
          {Array.from({ length: numberOfDie }).map((_, index) => (
            <Dice key={index} 
                  rolling={rolling} 
                  targetRange={targetRange} 
                  skillRange={taggedSkill}
                  resetFace={resetFace} />
          ))}
        </div>
      </div>
      <div className="roll-button-group">
        <Button variant="outlined" disabled={rolling} onClick={handleAttemptTest}>Roll</Button>
      </div>
    </div>
  );
};

export default AttemptHitTestRoller;