import { Distance } from "./DistanceEnum";

function weaponDistanceMapper(value: string):Distance {
    switch (value) {
        case "0":
            return Distance.Close;
        case "1":
            return Distance.Medium;
        case "2":
            return Distance.Long;  
        case "3":
            return Distance.Extreme;  
      }
      
      throw new Error('Invalid Number');
  };
  
  export default weaponDistanceMapper;