import { click, Macro } from "../../memuMacro";
import { getSlotPosition } from "../constants";

export interface IClickSlotOption {
  slot: number;
}

export const clickSlot = (option: IClickSlotOption) =>
  click({ position: getSlotPosition(option.slot) });
