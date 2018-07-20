import { IPosition } from "../../memuMacro";

const SLOT_POSITION: IPosition[] = [
  { x: 166, y: 832 },
  { x: 166, y: 960 },
  { x: 166, y: 1088 },
  { x: 504, y: 832 },
  { x: 504, y: 960 },
  { x: 504, y: 1088 },
];

export const getSlotPosition = (slot: number): IPosition => ({ ...SLOT_POSITION[slot - 1] });

export const COMMON_BUTTONS = {
  "Depart": { x: 360, y: 1122 } as IPosition,
  "First Friend": { x: 360, y: 442 } as IPosition,
  "Next": { x: 360, y: 1126 } as IPosition,
  "Raid": { x: 360, y: 733 } as IPosition,
  "Raid Refill Yes": { x: 504, y: 738 } as IPosition,
  "Reload": { x: 450, y: 1230 } as IPosition,
  "Repeat": { x: 270, y: 1230 } as IPosition,
};
