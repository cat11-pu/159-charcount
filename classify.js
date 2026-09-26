// classify.js：字符分类（英文ASCII字母 / 0-9 / 空格与制表符 / 其余一律其他）
export const KINDS = ["letter", "digit", "space", "other"];

export function kindOf(char) {
  if ((char >= "a" && char <= "z") || (char >= "A" && char <= "Z")) return "letter";
  if (char >= "0" && char <= "9") return "digit";
  if (char === " " || char === "\t") return "space";
  return "other";
}
