import { compressToBase64, decompressFromBase64 } from "lz-string";
import { IMacroGroup } from "../interfaces/macroGroup";

export const exportMacroItems: (s: IMacroGroup[]) => string = (source: IMacroGroup[]) => {
  return compressToBase64(JSON.stringify(source));
};

export const importMacroItems: (s: string) => IMacroGroup[] = (source: string) => {
  return JSON.parse(decompressFromBase64(source)) as IMacroGroup[];
};
