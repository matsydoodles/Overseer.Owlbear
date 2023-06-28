function targetDefenceMapper(value: string | null):number {
    switch (value) {
        case "0":
            return 1;
        case "1":
            return 2;
      }
      
      throw new Error('Invalid Number');
  };
  
  export default targetDefenceMapper;