enum DiceState {
    CRITICAL = "critical",
    SUCCESS = "success",
    FAILURE = "failure",
    COMPLICATION = "complication"
  }

  export function isSuccess(value: DiceState): boolean {
  switch(value) {
    case DiceState.CRITICAL:
      return true;
    case DiceState.SUCCESS:
      return true;
    case DiceState.COMPLICATION:
      return false;
    case DiceState.FAILURE:
      return false;
  }
}
  
  export default DiceState