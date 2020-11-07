import { IMacroItem } from './macroItem'

export interface IMacroGroup {
  items: IMacroItem[];
  name: string;
  repeat: number;
}
