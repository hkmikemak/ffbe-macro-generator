import { drag, IPosition, Macro, MacroConfig } from "../../memuMacro";
import { calculateHeight, calculateWidth } from "../constants";

const ROW_HEIGHT = 120;
const START_POSITION = { x: 350, y: 1150 } as IPosition;

export interface IScrollRowOption {
  rows: number;
  direction: string;
}

export const scrollRow = (option: IScrollRowOption) =>
  (source: Macro, config: MacroConfig) => {

    const calculatedStartPosition = {x : calculateWidth(START_POSITION.x, config), y: calculateHeight(START_POSITION.y, config) } as IPosition;
    const calculatedRowHeight = calculateHeight(ROW_HEIGHT, config);

    let rowCounter = option.rows;
    const drags = [];

    while (rowCounter > 3) {
      const tempEndPosition = { x: calculatedStartPosition.x, y: calculatedStartPosition.y - 3 * calculatedRowHeight } as IPosition;
      drags.push(drag({
        easingFunction: "easeOut",
        endPosition: option.direction === "down" ? tempEndPosition : calculatedStartPosition,
        startPosition: option.direction === "down" ? calculatedStartPosition : tempEndPosition,
      }));
      rowCounter -= 3;
    }

    const endPosition = { x: calculatedStartPosition.x, y: calculatedStartPosition.y - rowCounter * calculatedRowHeight } as IPosition;
    drags.push(drag({
      easingFunction: "easeOut",
      endPosition: option.direction === "down" ? endPosition : calculatedStartPosition,
      startPosition: option.direction === "down" ? calculatedStartPosition : endPosition,
    }));

    return source.pipe(config, ...drags);
  };
