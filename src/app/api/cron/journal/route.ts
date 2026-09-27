import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { generateAndPublishJournalPost } from "@/lib/journal/generate";
import { revalidatePath } from "next/cache";

/**
 * Triggered by an external scheduler (see .github/workflows/daily-journal.yml)
 * once a day. Not user-facing — protected by a bearer token, never linked
 * from the site, and excluded from the sitemap/robots via /api's blanket
 * disallow in robots.ts.
 */
export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const expected = process.env.CRON_SECRET;

  if (!expected) {
    return NextResponse.json({ error: "CRON_SECRET is not configured on the server." }, { status: 500 });
  }
  if (auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const post = await generateAndPublishJournalPost();
    revalidatePath("/journal");
    revalidatePath("/");
    return NextResponse.json({ ok: true, id: post.id, slug: post.slug, category: post.category });
  } catch (err) {
    console.error("Daily journal generation failed", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
  }
}
