// count.js：单遍扫描统计四类计数与最长连续同类段（预算五万字符，每字符只分类一次）
import { kindOf } from "./classify.js";

const KIND_INDEX = { letter: 0, digit: 1, space: 2, other: 3 };

export function countKinds(text) {
  const counts = [0, 0, 0, 0];
  let longestRun = 0;
  let currentRun = 0;
  let previous = -1;
  let nonSpace = 0;

  for (let i = 0; i < text.length; i++) {
    const kind = kindOf(text.charAt(i));
    const index = Object.prototype.hasOwnProperty.call(KIND_INDEX, kind) ? KIND_INDEX[kind] : 3;
    counts[index] += 1;
    if (index !== 2) nonSpace += 1;
    if (index === previous) {
      currentRun += 1;
    } else {
      currentRun = 1;
      previous = index;
    }
    if (currentRun > longestRun) longestRun = currentRun;
  }

  if (nonSpace === 0) {
    const error = new Error("文本去掉空白后为空");
    error.code = "E_EMPTY_TEXT";
    throw error;
  }

  return { counts: counts, longest_run: longestRun };
}
