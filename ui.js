// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let text = spec.text || "";
  parts.log.textContent = "文本长度 " + text.length + "，点计数看四类字符。";

  function draw() {
    let view = null;
    try {
      view = render(Object.assign({}, spec, { text: text }));
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.names.forEach(function (name, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = name;
      row.appendChild(head);
      const bar = document.createElement("span");
      bar.className = "bar";
      const fill = document.createElement("i");
      fill.style.width = Math.min(100, view.counts[spot] * 10) + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
      const mark = document.createElement("span");
      mark.className = "chip ok";
      mark.textContent = view.counts[spot] + " 个";
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "最长连续同类 " + view.longest_run + "，总长 " + view.length;
    parts.log.textContent = "是否都统计到 " + view.same_total;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "分类计数";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "末尾加一个字母";
  addButton.addEventListener("click", function () {
    text = text + "z";
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一个字符";
  dropButton.addEventListener("click", function () {
    text = text.slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一段文本";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "ab12 cd";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { text: box.value }));
      parts.out.textContent = box.value + " 的四类计数 " + JSON.stringify(view.counts);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看最长连续同类";
  readButton.addEventListener("click", function () {
    const view = render(Object.assign({}, spec, { text: text }));
    parts.out.textContent = "最长连续同类 " + view.longest_run + "，总长 " + view.length;
  });
  parts.controls.appendChild(readButton);

  draw();
}
