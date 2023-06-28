import { Distance } from "./DistanceEnum";

function weaponRangeDifficulty(target: Distance, weapon: Distance):number {
    const targetIndex = Object.values(Distance).indexOf(target);
    const weaponIndex = Object.values(Distance).indexOf(weapon);
    
    const difference = Math.abs(targetIndex - weaponIndex);
    
    if (difference === 0) {
      return 0;
    } else if (difference === 1) {
      return 1;
    } else if (difference === 2) {
      return 2;
    } else if (difference === 3) {
      return 3;
    } else {
      throw new Error('Invalid Number');
    }
  };
  
  export default weaponRangeDifficulty;