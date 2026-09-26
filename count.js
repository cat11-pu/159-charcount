// count.js：计数（基线：一律给零）
import { kindOf } from "./classify.js";

export function countKinds(text) {
  return { counts: [0, 0, 0, 0], longest_run: 0 };
}
