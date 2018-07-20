import { ClickMacroAction } from "../actions/click/macroAction";
import { ClickMultipleSlotsMacroAction } from "../actions/clickMultipleSlots/macroAction";
import { ClickSlotMacroAction } from "../actions/clickSlot/macroAction";
import { DelayMacroAction } from "../actions/delay/macroAction";
import { OpenSkillDrawerMacroAction } from "../actions/openSkillDrawer/macroAction";
import { ScrollRowMacroAction } from "../actions/scrollRow/macroAction";

export const ALL_ACTIONS = {
  "Click": ClickMacroAction,
  "Click Multiple Slot": ClickMultipleSlotsMacroAction,
  "Click Slot": ClickSlotMacroAction,
  "Delay": DelayMacroAction,
  "Open Skill Drawer": OpenSkillDrawerMacroAction,
  "Scroll Rows": ScrollRowMacroAction,
};
