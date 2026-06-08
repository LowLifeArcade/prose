import { layoutWithLines, prepareWithSegments } from "@chenglou/pretext";

const helloText = "Hello world from Pretext";
const helloFont = "32px Arial";
const helloLineHeight = 40;
const helloWidth = 280;

const output = document.querySelector<HTMLElement>(".pretext-output");
const packageName = document.querySelector<HTMLElement>('[data-field="packageName"]');
const lineCount = document.querySelector<HTMLElement>('[data-field="lineCount"]');
const measuredHeight = document.querySelector<HTMLElement>('[data-field="height"]');

if (output && packageName && lineCount && measuredHeight) {
  const prepared = prepareWithSegments(helloText, helloFont);
  const layout = layoutWithLines(prepared, helloWidth, helloLineHeight);

  output.style.setProperty("--measure-width", `${helloWidth}px`);
  output.style.setProperty("--measure-height", `${layout.height}px`);
  output.setAttribute("aria-label", helloText);

  for (let index = 0; index < layout.lines.length; index++) {
    const line = layout.lines[index];
    const element = document.createElement("p");
    element.style.setProperty("--y", `${index * helloLineHeight}px`);
    element.textContent = line.text;
    // @ts-ignore
    output.append(element);
  }

  packageName.textContent = "@chenglou/pretext";
  lineCount.textContent = String(layout.lineCount);
  measuredHeight.textContent = `${layout.height}px`;
}
