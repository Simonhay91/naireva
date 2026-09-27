import { db } from "@/lib/db";
import type { BlogCategory } from "@prisma/client";

const CATEGORIES: BlogCategory[] = ["RHINOPLASTY", "RECOVERY", "ARMENIA", "CONSULTATION", "TRAVEL", "AESTHETIC_SURGERY"];

const LOCALIZED_ARTICLE_FIELDS = {
  type: "object",
  properties: {
    title: { type: "string", description: "40-70 characters, no clickbait, no pricing claims" },
    excerpt: { type: "string", description: "1-2 sentence summary, 100-160 characters" },
    body: { type: "string", description: "600-900 word article body in Markdown (## headings, paragraphs, no H1)" },
    seoTitle: { type: "string", description: "Under 60 characters" },
    seoDescription: { type: "string", description: "Under 155 characters" }
  },
  required: ["title", "excerpt", "body", "seoTitle", "seoDescription"]
} as const;

const ARTICLE_TOOL = {
  name: "publish_journal_article",
  description: "Publish one new NAIREVA journal article, fully written and localized into English, Russian, Spanish and Arabic.",
  input_schema: {
    type: "object",
    properties: {
      category: { type: "string", enum: CATEGORIES },
      slug: { type: "string", description: "URL-safe English slug: lowercase, hyphen-separated, no dates, 3-8 words" },
      en: LOCALIZED_ARTICLE_FIELDS,
      ru: LOCALIZED_ARTICLE_FIELDS,
      es: LOCALIZED_ARTICLE_FIELDS,
      ar: LOCALIZED_ARTICLE_FIELDS
    },
    required: ["category", "slug", "en", "ru", "es", "ar"]
  }
} as const;

interface LocalizedFields {
  title: string;
  excerpt: string;
  body: string;
  seoTitle: string;
  seoDescription: string;
}

interface GeneratedArticle {
  category: BlogCategory;
  slug: string;
  en: LocalizedFields;
  ru: LocalizedFields;
  es: LocalizedFields;
  ar: LocalizedFields;
}

const SYSTEM_PROMPT = `You write SEO-oriented journal articles for NAIREVA, a private concierge service coordinating aesthetic surgery (starting with rhinoplasty) in Yerevan, Armenia, for international patients.

Brand facts you must respect:
- NAIREVA is a concierge and coordination service. It does not perform surgery, does not employ the surgeon, and does not operate the clinic.
- Never state or imply pricing, exact costs, or guaranteed outcomes.
- Never give medical advice, a diagnosis, or a candidacy guarantee.
- Tone: calm, precise, reassuring, upscale — never salesy or hyperbolic.
- Cover only these topics, rotating naturally: rhinoplasty (technique, recovery, candidacy in general terms), aesthetic surgery more broadly, Armenia as a destination (culture, travel, why Yerevan), the medical-travel/concierge journey (what coordination looks like, what to expect).

Write a genuinely useful, specific article — not generic filler. Then translate it faithfully into Russian, Spanish and Arabic (proper native-quality translation, not machine-literal) using the same structure. Call the publish_journal_article tool with the complete result.`;

function buildUserPrompt(recentTitles: string[], recentCategories: string[]) {
  const avoid =
    recentTitles.length > 0
      ? `Recently published articles (avoid repeating these topics or titles):\n${recentTitles.map((t) => `- ${t}`).join("\n")}\n\nRecent categories used, prefer a different one if it fits naturally: ${recentCategories.join(", ")}`
      : "This is the first article — pick any topic from the allowed list.";
  return `Write today's new journal article.\n\n${avoid}`;
}

async function callClaude(recentTitles: string[], recentCategories: string[]): Promise<GeneratedArticle> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set.");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-sonnet-5",
      max_tokens: 8000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildUserPrompt(recentTitles, recentCategories) }],
      tools: [ARTICLE_TOOL],
      tool_choice: { type: "tool", name: "publish_journal_article" }
    })
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Anthropic API error ${res.status}: ${text}`);
  }

  const data = await res.json();
  const toolUse = (data.content as Array<{ type: string; input?: unknown }>)?.find((block) => block.type === "tool_use");
  if (!toolUse?.input) throw new Error("Claude did not return a tool_use block with article content.");

  return toolUse.input as GeneratedArticle;
}

async function uniqueSlug(base: string): Promise<string> {
  let slug = base;
  let suffix = 2;
  while (await db.blogPost.findUnique({ where: { slug }, select: { id: true } })) {
    slug = `${base}-${suffix}`;
    suffix += 1;
  }
  return slug;
}

/** Generates one new journal article via Claude and publishes it immediately. */
export async function generateAndPublishJournalPost() {
  const recent = await db.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    take: 15,
    select: { title: true, category: true }
  });

  const article = await callClaude(
    recent.map((p) => p.title),
    Array.from(new Set(recent.slice(0, 5).map((p) => p.category)))
  );

  const slug = await uniqueSlug(article.slug);

  const post = await db.blogPost.create({
    data: {
      slug,
      category: article.category,
      status: "PUBLISHED",
      publishedAt: new Date(),

      title: article.en.title,
      excerpt: article.en.excerpt,
      body: article.en.body,
      seoTitle: article.en.seoTitle,
      seoDescription: article.en.seoDescription,

      titleRu: article.ru.title,
      excerptRu: article.ru.excerpt,
      bodyRu: article.ru.body,
      seoTitleRu: article.ru.seoTitle,
      seoDescriptionRu: article.ru.seoDescription,

      titleEs: article.es.title,
      excerptEs: article.es.excerpt,
      bodyEs: article.es.body,
      seoTitleEs: article.es.seoTitle,
      seoDescriptionEs: article.es.seoDescription,

      titleAr: article.ar.title,
      excerptAr: article.ar.excerpt,
      bodyAr: article.ar.body,
      seoTitleAr: article.ar.seoTitle,
      seoDescriptionAr: article.ar.seoDescription
    }
  });

  return post;
}
