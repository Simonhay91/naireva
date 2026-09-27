import { redirect } from "next/navigation";

/**
 * Product decision (assumption, flagged for review): the spec lists
 * "Procedures" and "Rhinoplasty" as separate top-level pages, but Rhinoplasty
 * is also the first entity in the Procedure table (spec §5 — "architecture
 * must allow adding procedures later"). Rather than maintaining two versions
 * of the same content, /rhinoplasty is a canonical-friendly redirect to the
 * data-driven /procedures/rhinoplasty page. Once more procedures exist this
 * still gives rhinoplasty its own memorable URL for marketing/ads.
 */
export default function RhinoplastyRedirect() {
  redirect("/procedures/rhinoplasty");
}
