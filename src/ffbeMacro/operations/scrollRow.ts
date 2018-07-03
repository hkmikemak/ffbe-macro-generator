import { drag, IPosition, Macro } from "../../memuMacro";

const ROW_HEIGHT = 120;
const START_POSITION = { x: 350, y: 1150 } as IPosition;

export interface IScrollRowOption {
  rows: number;
  direction: string;
}

export const scrollRow = (option: IScrollRowOption) =>
  (source: Macro) => {
    let rowCounter = option.rows;
    const drags = [];

    while (rowCounter > 3) {
      const tempEndPosition = { x: START_POSITION.x, y: START_POSITION.y - 3 * ROW_HEIGHT } as IPosition;
      drags.push(drag({
        easingFunction: "easeOut",
        endPosition: option.direction === "down" ? tempEndPosition : START_POSITION,
        startPosition: option.direction === "down" ? START_POSITION : tempEndPosition,
      }));
      rowCounter -= 3;
    }

    const endPosition = { x: START_POSITION.x, y: START_POSITION.y - rowCounter * ROW_HEIGHT } as IPosition;
    drags.push(drag({
      easingFunction: "easeOut",
      endPosition: option.direction === "down" ? endPosition : START_POSITION,
      startPosition: option.direction === "down" ? START_POSITION : endPosition,
    }));

    return source.pipe(...drags);
  };
