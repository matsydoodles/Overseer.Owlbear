import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React, { useEffect, useState } from "react";
import "./CombatHelper.css";
import Typography from "@mui/material/Typography";
import Box  from "@mui/material/Box";
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import targetDefenceMapper from "./CombatHelper/TargetDefenceMapper";
import weaponDistanceMapper from "./CombatHelper/WeaponDistanceMapper";
import targetDistanceMapper from "./CombatHelper/TargetDistanceMapper";
import weaponRangeDifficulty from "./CombatHelper/WeaponRangeDifficulty";
import hitLocationMapper from "./CombatHelper/HitLocationMapper";
import Dice from "./CombatHelper/Dice";
import HitLocationRoller from "./CombatHelper/HitLocationRoller";

export function CombatHelper() {

  const [difficulty, setDifficulty] = React.useState('');
  const [targetDefence, setTargetDefence] = useState('0');
  const [targetDistance, setTargetDistance] = useState<string>('1');
  const [weaponDistance, setWeaponDistance] = useState<string>('1');
  const [hitLocation, setHitLocation] = React.useState<string>('0');
  const [targetRange, setTargetRange] = useState<number>(0);
  const [numberOfDie, setNumberOfDie] = useState<number>(2);
  const [diceFace, setDiceFace] = useState(1);
  const [rolling, setRolling] = useState(false);

// https://mui.com/material-ui/react-toggle-button/

  const handleTargetDefence = (
    _event: React.MouseEvent<HTMLElement>,
    newDefence: string,
  ) => {
    if(newDefence !== null) {
      setTargetDefence(newDefence);
    }
  };

  const handleTargetDistance = (
    _event: React.MouseEvent<HTMLElement>,
    newTargetDistance: string,
  ) => {
    if(newTargetDistance !== null) {
      setTargetDistance(newTargetDistance);
    }
  };

  const handleWeaponDistance = (
    _event: React.MouseEvent<HTMLElement>,
    newWeaponDistance: string,
  ) => {
    if(newWeaponDistance !== null) {
      setWeaponDistance(newWeaponDistance);
    }
  };

  const handleHitLocation = (
    _event: React.MouseEvent<HTMLElement>,
    newHitLocation: string,
  ) => {
    if(newHitLocation !== null) {
      setHitLocation(newHitLocation);
    }
  };

  useEffect(() => {
    calculateDifficulty();
  }, [targetDefence, weaponDistance, targetDistance, hitLocation]);

  const calculateDifficulty = () => {
    var n_targetDefence = targetDefenceMapper(targetDefence);
    var n_weaponDistance = weaponDistanceMapper(weaponDistance);
    var n_targetDistance = targetDistanceMapper(targetDistance);
    var n_weaponDifficulty = weaponRangeDifficulty(n_targetDistance, n_weaponDistance);
    var n_hitLocation = hitLocationMapper(hitLocation);

    var total = n_targetDefence + n_weaponDifficulty + n_hitLocation;
    setDifficulty(total.toString());
  };

  const NUMERIC_REGEX = /^[0-9]+$/;
  const handleTargetRange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTargetRange = event.target.value;
    if (newTargetRange !== "" && !NUMERIC_REGEX.test(newTargetRange)) {
      setTargetRange(0);
      return;
    }
    var actualTargetRange = parseInt(newTargetRange, 10);

    setTargetRange(actualTargetRange);
  };

  const handleDieSelectionChanged = (event: SelectChangeEvent<number>) => {
    const value = parseInt(event.target.value.toString(), 10);
    setNumberOfDie(value);
  };

    const handleAttemptTest = () => {
      if (rolling) return;
  
      setRolling(true);
  
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
    <Box sx={{ margin: 1 }}>
      <Typography variant="h4">Making an Attack</Typography>

      <hr className="group-divider" />

      <div>
        <Typography variant="h5">1. Choose Weapon and Target</Typography>
          <div className="sub-group">
            <div className="row">
              <div className="the-label-container">
                <Typography variant="h6">Target Defence:</Typography>
              </div>
              <div className="right-hand-content">
              <ToggleButtonGroup exclusive
                                 value={targetDefence}
                                 onChange={handleTargetDefence}
                                 aria-label="target defense">
                <ToggleButton value="0" aria-label="1">
                  <label>1</label>
                </ToggleButton>
                <ToggleButton value="1" aria-label="2">
                  <label>2</label>
                </ToggleButton>
              </ToggleButtonGroup>
              </div>
            </div> 

            <div className="row">
              <div className="the-label-container">
                <Typography variant="h6">Target Distance:</Typography>
              </div>
                <div className="right-hand-content">
                  <ToggleButtonGroup exclusive
                                     value={targetDistance}
                                     onChange={handleTargetDistance}
                                     aria-label="target distance">
                    <ToggleButton value="0" aria-label="1" sx={{fontSize: 11}}>Close</ToggleButton>
                    <ToggleButton value="1" aria-label="2" sx={{fontSize: 11}}>Medium</ToggleButton>
                    <ToggleButton value="2" aria-label="3" sx={{fontSize: 11}}>Long</ToggleButton>
                    <ToggleButton value="3" aria-label="4" sx={{fontSize: 11}}>Extreme</ToggleButton>
                  </ToggleButtonGroup>
                </div>
            </div>

            <div className="row">
              <div className="the-label-container">
                <Typography variant="h6">Weapon Range:</Typography>
              </div>
              <div className="right-hand-content">
              <ToggleButtonGroup exclusive
                                 value={weaponDistance}
                                 onChange={handleWeaponDistance}
                                 aria-label="weapon distance">
                    <ToggleButton value="0" aria-label="1" sx={{fontSize: 11}}>Close</ToggleButton>
                    <ToggleButton value="1" aria-label="2" sx={{fontSize: 11}}>Medium</ToggleButton>
                    <ToggleButton value="2" aria-label="3" sx={{fontSize: 11}}>Long</ToggleButton>
                    <ToggleButton value="3" aria-label="4" sx={{fontSize: 11}}>Extreme</ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>

            <div className="row">
            <div className="the-label-container">
                <Typography variant="h6">Hit Location:</Typography>
              </div>
              <div className="right-hand-content">
                <ToggleButtonGroup exclusive
                                   value={hitLocation}
                                   onChange={handleHitLocation}
                                   aria-label="hit location">
                  <ToggleButton value="0" aria-label="1" sx={{fontSize: 11}}>Random</ToggleButton>
                  <ToggleButton value="1" aria-label="2" sx={{fontSize: 11}}>Location</ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
          </div>
      </div>

      <hr className="group-divider" />

      <div>
        <Typography variant="h5">2. Attempt Test</Typography>
        <Box display="flex" justifyContent="space-between" gap={2} sx={{ marginTop: '10px', alignItems: 'center' }}>
          <Box textAlign="center">
            <TextField label="Difficulty"
                       value={difficulty}
                       variant="outlined"
                       size="small"
                       sx={{input: {textAlign: "center"}}} />
          </Box>
          <Box>
            <TextField label="Target Range"
                       value={targetRange}
                       variant="outlined"
                       size="small"
                       sx={{input: {textAlign: "center"}}}
                       onChange={handleTargetRange} />
          </Box>
          <Box>
            <Select value={numberOfDie} onChange={handleDieSelectionChanged} size="small">
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
              <Dice key={index} rolling={rolling} targetRange={targetRange} />
            ))}
          </div>
        </div>
        <div className="roll-button-group">
          <Button variant="outlined" disabled={rolling} onClick={handleAttemptTest}>Roll</Button>
        </div>
      </div>

      <hr className="group-divider" />

      <div>
        <Typography variant="h5">3. Determine Hit Location</Typography>
        <HitLocationRoller />
      </div>

      <hr className="group-divider" />

      <div>
      <Typography variant="h5">4. Inflict Damage</Typography>
        <div className="group-content">
        </div>
      </div>

      <hr className="group-divider" />

      <div>
        <Typography variant="h5">5. Reduce Ammo</Typography>
        <div className="group-content">
        {/* Reduce ammo controls go here */}
        </div>
      </div>
      
      <div className="remaining-space">
        {/* Content for the remaining space */}
      </div>
    </Box>
    );
}