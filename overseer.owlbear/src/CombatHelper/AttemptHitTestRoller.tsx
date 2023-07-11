import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dice from './Dice';
import { DiceResult } from './DiceResult';
import DiceState from './DiceState';
import { useTheme }from '@mui/material';
import "./DiceStateExtensions.tsx"
//import ConsoleService from '../Console/ConsoleService.tsx';

  interface AttemptHitTestRollerProps {
    difficulty: number;
    onHitTestComplete: () => void;
    onHitTestStarted: () => void;
  }

const AttemptHitTestRoller:  React.FC<AttemptHitTestRollerProps> = ({ difficulty, onHitTestComplete, onHitTestStarted   }) => {
  
 // const consoleService = ConsoleService.getInstance();
  
  const [localDifficulty, setLocalDifficulty] = React.useState(0);
    const [targetRange, setTargetRange] = useState<number>(0);
    const [taggedSkill, setTaggedSkill] = useState<number>(0);
    const [numberOfDie, setNumberOfDie] = useState<number>(2);
    const [rolling, setRolling] = useState(false);
    const [resetFace, setResetFace] = useState(false);
    const [results, setResults] = useState<DiceResult[]>([]);
    const [totalResults, setTotalResults] = useState<number>(0);
    const [diceRolled, setdiceRolled] = useState<number>(0);
    const [resultMessage, setResultMessage] = useState<string>('❓');
    const [resultColor, setResultColor] = useState('');
    const theme = useTheme();

    useEffect(() => {
      setLocalDifficulty(difficulty)
      setResetFace(true);
      setResultMessage('❓');
    }, [difficulty]);

    useEffect(() => {
      if (diceRolled === numberOfDie) {
        let result = false;

        if(totalResults >= localDifficulty) {
          result = true;
        }

        var hasComplication = results.hasComplication();

        var resultMessage = ``;

        if(result) {
          var actionPoints = totalResults - localDifficulty;
          if(actionPoints > 0) {
            resultMessage = `Pass plus ${actionPoints} Action Points`;
            setResultColor(theme.palette.star.main);
          } else {
            resultMessage = `Pass`;
            setResultColor(theme.palette.success.main);
          }
        } else {
          resultMessage = `Fail`;
          setResultColor(theme.palette.error.main);
        }

        if(hasComplication){
          resultMessage += ` and Complication`
          setResultColor(theme.palette.poo.main);
        }

        setResultMessage(resultMessage);

  //      consoleService.postMessage(resultMessage);

        // reset
        setdiceRolled(0);
        setTotalResults(0);
        setResults([]);
      }
    }, [diceRolled, numberOfDie]);

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
      setResultMessage('❓');
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
      setResultMessage('❓');
    };
  
    const handleDieSelectionChanged = (event: SelectChangeEvent<number>) => {
      const value = parseInt(event.target.value.toString(), 10);
      setNumberOfDie(value);
      setResetFace(true);
      setResultMessage('❓');
    };

    const handleRollComplete = (diceResult: DiceResult) => {
      setRolling(false);
      onHitTestComplete();

      const { result } = diceResult;

      setResults((prevResults) => [...prevResults, diceResult]);

      if(result === DiceState.CRITICAL) {
        setTotalResults((prevTotal) => prevTotal + 2);
      } else if(result == DiceState.SUCCESS) {
        setTotalResults((prevTotal) => prevTotal + 1);
      }

      setdiceRolled((prevCount) => prevCount + 1);
    };
  
    const handleAttemptTest = () => {
      if (rolling) return;
  
      setRolling(true);
      setResetFace(false);
      setResultMessage('❓');
      onHitTestStarted();
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
                       onChange={handleTargetRange}
                       disabled={rolling} />
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
                       onChange={handleTaggedSkill}
                       disabled={rolling} />
          </Tooltip>
        </Box>
        <Box>
          <Select value={numberOfDie} 
                  onChange={handleDieSelectionChanged}
                  size="small"
                  disabled={rolling}>
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
                  resetFace={resetFace}
                  onRollComplete={handleRollComplete}  />
          ))}
        </div>
      </div>
      <div className="roll-button-group">
        <Button disabled={rolling}
                onClick={handleAttemptTest}
                variant="outlined">
                  Roll
        </Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <Typography variant="h6" 
                    component="div"
                    sx={{ color: resultColor }}>
          {resultMessage}
        </Typography>
      </div>
    </div>
  );
};

export default AttemptHitTestRoller;