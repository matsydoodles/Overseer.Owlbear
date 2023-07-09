import DiceState from "./DiceState";

declare global {
  interface Array<T> {
    hasComplication(): boolean;
  }
}

Array.prototype.hasComplication = function (): boolean {
  for (const result of this) {
    if (result.face === 20 && result.result === DiceState.COMPLICATION) {
      return true;
    }
  }
  return false;
};
