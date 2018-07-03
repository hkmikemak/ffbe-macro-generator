import { drag } from "../../memuMacro";
import { getSlotPosition } from "../constants";

const SWAP_LENGTH = 200;

export interface IOpenSkillDrawerOption {
  slot: number;
}

export const openSkillDrawer = (option: IOpenSkillDrawerOption) => {
  const startPosition = getSlotPosition(option.slot);
  const endPosition = { x: startPosition.x + SWAP_LENGTH, y: startPosition.y };
  return drag({
    endPosition,
    startPosition,
    easingFunction: "easeOut",
  });
};
