// count.js：一次扫描统计四类计数与最长连续同类长度
import { kindOf } from "./classify.js";

const KIND_INDEX = { letter: 0, digit: 1, space: 2, other: 3 };

export function countKinds(text) {
  const counts = [0, 0, 0, 0];
  let longestRun = 0;
  let run = 0;
  let prevIndex = -1;

  // 按 UTF-16 码元遍历，保证四类计数之和 === text.length；
  // 每个码元只调用一次 kindOf（非英文文字/标点/代理项均落入其他）。
  for (let i = 0; i < text.length; i += 1) {
    const index = KIND_INDEX[kindOf(text[i])];
    counts[index] += 1;
    if (index === prevIndex) {
      run += 1;
    } else {
      run = 1;
      prevIndex = index;
    }
    if (run > longestRun) longestRun = run;
  }

  // 去掉空白（字母 + 数字 + 其他均为零）即为空：含纯空白串与空串
  if (counts[0] + counts[1] + counts[3] === 0) {
    const error = new Error("文本去掉空白后为空");
    error.code = "E_EMPTY_TEXT";
    throw error;
  }

  return { counts: counts, longest_run: longestRun };
}
