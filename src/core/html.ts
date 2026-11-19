/* ── src/core/html.ts — htm-bound markup ──────────────────────────────────
   Markup is authored as html`<div class="x">${y}</div>`. htm parses the
   template once, caches it, and calls a factory with (type, props, ...kids);
   the factory below returns real DOM nodes, never a virtual tree, so a mount
   is still replaceChildren and nothing here diffs, reconciles or remembers.

   Interpolated values become text nodes, never innerHTML: the
   no-restricted-syntax rule in eslint.config.js stays satisfiable, and a
   catalogue string cannot become markup.

   Client-only. Nothing here may be imported by build scripts: they run in
   Node, where `document` does not exist.

   Templates have one root element. Siblings go through mount(). */

import htm from "htm";

type AnyProps = Readonly<Record<string, unknown>>;

/** Anything that may sit between two tags. */
export type Child =
  Node | string | number | null | undefined | boolean | readonly Child[];

const SVG_NS = "http://www.w3.org/2000/svg";

/* Created in the SVG namespace. A set rather than a parent lookup, so <svg>
   itself is covered on the first call. */
const SVG_TAGS = new Set([
  "svg",
  "g",
  "defs",
  "path",
  "circle",
  "rect",
  "line",
  "polyline",
  "polygon",
  "text",
  "tspan",
  "use",
  "title",
]);

/* Attributes that do not reflect what the user sees: set the property. */
const AS_PROPERTY = new Set(["value", "checked", "indeterminate"]);

const cssName = (key: string): string =>
  key.startsWith("--")
    ? key
    : key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

function setStyle(node: Element, value: unknown): void {
  if (value == null) {
    node.removeAttribute("style");
    return;
  }
  if (typeof value === "string") {
    node.setAttribute("style", value);
    return;
  }
  const style = (node as HTMLElement | SVGElement).style;
  for (const [k, v] of Object.entries(value as Record<string, string>)) {
    if (v == null || v === "") style.removeProperty(cssName(k));
    else style.setProperty(cssName(k), String(v));
  }
}

function setProp(node: Element, key: string, value: unknown): void {
  if (key === "style") {
    setStyle(node, value);
    return;
  }
  /* onClick / onclick both become one listener. */
  if (key.startsWith("on") && typeof value === "function") {
    node.addEventListener(key.slice(2).toLowerCase(), value as EventListener);
    return;
  }
  if (AS_PROPERTY.has(key)) {
    (node as unknown as Record<string, unknown>)[key] = value;
    return;
  }
  /* Pass ARIA state as a string: aria-pressed=${false} removes the attribute,
     aria-pressed="false" sets it, and only the latter is what you want. */
  if (value == null || value === false) node.removeAttribute(key);
  else if (value === true) node.setAttribute(key, "");
  else node.setAttribute(key, String(value));
}

function appendChildren(parent: Node, children: readonly Child[]): void {
  for (const child of children) {
    if (typeof child === "boolean" || child == null) continue;
    if (Array.isArray(child)) appendChildren(parent, child);
    else if (child instanceof Node) parent.appendChild(child);
    else parent.appendChild(document.createTextNode(String(child)));
  }
}

/** The factory htm calls. Not for hand use. */
function h(
  tag: string | ((props: AnyProps) => Node),
  props: AnyProps | null | undefined,
  ...children: Child[]
): Node {
  if (typeof tag === "function") return tag(props ?? {});
  const node = SVG_TAGS.has(tag)
    ? document.createElementNS(SVG_NS, tag)
    : document.createElement(tag);
  if (props) {
    for (const [key, value] of Object.entries(props)) setProp(node, key, value);
  }
  appendChildren(node, children);
  return node;
}

/* htm types its bound tag as returning a union that also covers sibling
   roots; every call site here is single-root, and the cast is where that
   promise is made. There is no prop typing either way: see the note in
   CONTRIBUTING §3.3. */
export const html = htm.bind(h) as unknown as (
  strings: TemplateStringsArray,
  ...values: readonly unknown[]
) => Node;

/** Siblings that belong in one host without a wrapper element. */
export const mount = (host: Element, ...nodes: Node[]): void => {
  host.replaceChildren(...nodes);
};
