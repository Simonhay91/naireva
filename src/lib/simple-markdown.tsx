import { Fragment } from "react";

/**
 * Deliberately not a full Markdown pipeline — content here is authored by
 * the internal team via the admin panel (`BlogPost.body` / `Procedure.content`),
 * not arbitrary user input, so a small block-level parser covering headings,
 * bullet lists and paragraphs is enough. Swap for a real renderer (MDX,
 * remark) if editorial needs grow past this.
 */
export function renderSimpleMarkdown(source: string) {
  const blocks = source.trim().split(/\n{2,}/);

  return blocks.map((block, i) => {
    const trimmed = block.trim();

    if (trimmed.startsWith("## ")) {
      return (
        <h2 key={i} className="mt-14 font-serif text-[40px] leading-tight">
          {trimmed.slice(3)}
        </h2>
      );
    }
    if (trimmed.startsWith("### ")) {
      return (
        <h3 key={i} className="mt-9 font-serif text-[26px] leading-tight">
          {trimmed.slice(4)}
        </h3>
      );
    }
    if (trimmed.split("\n").every((line) => line.trim().startsWith("- "))) {
      const lines = trimmed.split("\n");
      return (
        <ul key={i} className="mt-5 list-disc space-y-2 pl-5 text-[17px] text-[#504b46]">
          {lines.map((line, j) => (
            <li key={j}>{line.trim().slice(2)}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className="mt-5 text-[17px] leading-[1.75] text-[#504b46]">
        {trimmed.split("\n").map((line, j) => (
          <Fragment key={j}>
            {j > 0 && <br />}
            {line}
          </Fragment>
        ))}
      </p>
    );
  });
}
