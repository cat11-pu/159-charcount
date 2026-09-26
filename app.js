// app.js：渲染结果
import { kindOf } from "./classify.js";
import { countKinds } from "./count.js";

export function render(spec) {
  const text = spec.text || "";
  const view = countKinds(text);
  const counts = view.counts || [0, 0, 0, 0];
  return { names: ["字母", "数字", "空白", "其他"], counts: counts,
           longest_run: view.longest_run || 0, length: text.length,
           same_total: counts.reduce((sum, item) => sum + item, 0) === text.length };
}
