import { ClickMacroAction } from '../actions/click/macroAction';
import { DelayMacroAction } from '../actions/delay/macroAction';
import { ClickSlotMacroAction } from '../actions/clickSlot/macroAction';
import { OpenSkillDrawerMacroAction } from '../actions/openSkillDrawer/macroAction';
import { ScrollRowMacroAction } from '../actions/scrollRow/macroAction';
import { ClickMultipleSlotsMacroAction } from '../actions/clickMultipleSlots/macroAction';

export const ALL_ACTIONS = {
  'Click Multiple Slot': ClickMultipleSlotsMacroAction,
  'Click Slot': ClickSlotMacroAction,
  'Click': ClickMacroAction,
  'Delay': DelayMacroAction,
  'Open Skill Drawer': OpenSkillDrawerMacroAction,
  'Scroll Rows': ScrollRowMacroAction,
};

