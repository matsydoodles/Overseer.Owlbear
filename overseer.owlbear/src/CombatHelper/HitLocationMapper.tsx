function hitLocationMapper(value: string | null):number {
    switch (value) {
        case "0":
            return 0;
        case "1":
            return 1;
      }
      
      throw new Error('Invalid Number');
  };
  
  export default hitLocationMapper;