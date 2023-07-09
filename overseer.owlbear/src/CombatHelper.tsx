import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React, { useEffect, useState } from "react";
import "./CombatHelper.css";
import Typography from "@mui/material/Typography";
import Box  from "@mui/material/Box";
import targetDefenceMapper from "./CombatHelper/TargetDefenceMapper";
import weaponDistanceMapper from "./CombatHelper/WeaponDistanceMapper";
import targetDistanceMapper from "./CombatHelper/TargetDistanceMapper";
import weaponRangeDifficulty from "./CombatHelper/WeaponRangeDifficulty";
import hitLocationMapper from "./CombatHelper/HitLocationMapper";
import HitLocationRoller from "./CombatHelper/HitLocationRoller";
import CombatRoller from "./CombatHelper/CombatRoller";
import AttemptHitTestRoller from "./CombatHelper/AttemptHitTestRoller";

export function CombatHelper() {

  const [difficulty, setDifficulty] = React.useState(0);
  const [targetDefence, setTargetDefence] = useState('0');
  const [targetDistance, setTargetDistance] = useState<string>('1');
  const [weaponDistance, setWeaponDistance] = useState<string>('1');
  const [hitLocation, setHitLocation] = React.useState<string>('0');
  const [hitTestrolling, setHitTestRolling] = useState(false);

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

  const handleHitTestStarted = () => {
    setHitTestRolling(true);
  };

  const handleHitTestComplete = () => {
    setHitTestRolling(false);
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
    setDifficulty(total);
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
                                 disabled={hitTestrolling}
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
                                     disabled={hitTestrolling}
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
                                 disabled={hitTestrolling}
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
                                   disabled={hitTestrolling}
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
        <AttemptHitTestRoller difficulty={difficulty}
                              onHitTestStarted={handleHitTestStarted}
                              onHitTestComplete={handleHitTestComplete}  />
      </div>

      <hr className="group-divider" />

      <div>
        <Typography variant="h5">3. Determine Hit Location</Typography>
        <HitLocationRoller />
      </div>

      <hr className="group-divider" />

      <div>
      <Typography variant="h5">4. Inflict Damage</Typography>
        <CombatRoller/>
      </div>

      <hr className="group-divider" />

      {/* <div>
        <Typography variant="h5">5. Reduce Ammo</Typography>
        <div className="group-content">
        </div>
      </div> */}
      
      <div className="remaining-space">
        {/* Content for the remaining space */}
      </div>
    </Box>
    );
}