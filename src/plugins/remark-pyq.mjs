import { visit } from "unist-util-visit";

/**
 * Lets cheat sheets author practice questions as plain text instead of
 * hand-written HTML:
 *
 * ```pyq
 * Q: Which sorting algorithm is stable?
 * A) Quick sort
 * *B) Merge sort
 * C) Heap sort
 * D) Selection sort
 * Explain: Merge sort preserves the relative order of equal elements.
 * ```
 *
 * A leading * on an option marks it correct. Converts every ```pyq fence
 * directly into static HTML at build time (.pyq / .pyq-label / .pyq-q /
 * .pyq-options / .pyq-explain classes, styled in global.css) — no client JS.
 *
 * Note: this only handles visual HTML. FAQPage schema is built separately in
 * src/utils/parsePyq.ts, which re-parses the raw markdown body directly at
 * page-render time — Astro's Content Layer loader computes an entry's `data`
 * from frontmatter before remark plugins run on the body, so data injected
 * here can't flow back into entry.data.
 */
export default function remarkPyq() {
  return (tree) => {
    visit(tree, "code", (node, index, parent) => {
      if (node.lang !== "pyq" || !parent) return;

      const lines = node.value
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l !== "");

      let question = "";
      let explain = "";
      const options = [];

      lines.forEach((line) => {
        if (line.startsWith("Q:")) {
          question = line.slice(2).trim();
        } else if (/^\*?[A-Za-z]\)/.test(line)) {
          const correct = line.startsWith("*");
          options.push({ text: correct ? line.slice(1).trim() : line, correct });
        } else if (line.startsWith("Explain:")) {
          explain = line.slice("Explain:".length).trim();
        }
      });

      if (!question) return;

      const optionsHtml = options
        .map((opt) => `<li${opt.correct ? ' class="correct"' : ""}>${escapeHtml(opt.text)}</li>`)
        .join("\n    ");

      const explainHtml = explain
        ? `<p class="pyq-explain"><strong>Why:</strong> ${escapeHtml(explain)}</p>`
        : "";

      const html = [
        '<div class="pyq">',
        '  <p class="pyq-label">PYQ</p>',
        `  <p class="pyq-q">${escapeHtml(question)}</p>`,
        '  <ul class="pyq-options">',
        `    ${optionsHtml}`,
        "  </ul>",
        `  ${explainHtml}`,
        "</div>"
      ].join("\n");

      parent.children[index] = { type: "html", value: html };
    });
  };
}

function escapeHtml(str) {
  const escaped = str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return escaped.replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}
