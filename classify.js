// classify.js：字符分类（英文字母 / 数字 / 空格与制表符 / 其他）
export function kindOf(char) {
  if ((char >= "a" && char <= "z") || (char >= "A" && char <= "Z")) return "letter";
  if (char >= "0" && char <= "9") return "digit";
  if (char === " " || char === "\t") return "space";
  return "other";
}
