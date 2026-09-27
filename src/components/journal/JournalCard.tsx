import Link from "next/link";
import type { BlogPost } from "@prisma/client";
import { formatDate } from "@/lib/utils";
import type { Locale, Dictionary } from "@/lib/i18n/dictionaries";
import { localized, intlLocale } from "@/lib/i18n/localized";

const gradients = [
  "linear-gradient(140deg,#7a685c,#2f2925)",
  "linear-gradient(140deg,#b39f86,#5d4c42)",
  "linear-gradient(140deg,#8b7a6d,#25211f)"
];

type CardPost = Pick<
  BlogPost,
  "title" | "titleRu" | "titleEs" | "titleAr" | "slug" | "excerpt" | "excerptRu" | "excerptEs" | "excerptAr" | "category" | "heroImage" | "publishedAt"
>;

export function JournalCard({ post, index = 0, locale, dict }: { post: CardPost; index?: number; locale: Locale; dict: Dictionary }) {
  return (
    <Link href={`/journal/${post.slug}`} className="group overflow-hidden rounded-3xl border border-line bg-paper">
      <div
        className="h-[220px] bg-cover bg-center sm:h-[240px]"
        style={{
          background: post.heroImage ? `url(${post.heroImage}) center/cover` : gradients[index % gradients.length]
        }}
      />
      <div className="p-6">
        <small className="text-[11px] tracking-[0.12em] text-wine">{dict.categories[post.category]}</small>
        <h3 className="mt-2 font-serif text-[24px] leading-tight transition group-hover:text-wine">
          {localized(locale, post.title, post.titleRu, post.titleEs, post.titleAr)}
        </h3>
        <p className="mt-3 text-sm text-muted">{localized(locale, post.excerpt, post.excerptRu, post.excerptEs, post.excerptAr)}</p>
        {post.publishedAt && (
          <p className="mt-4 text-xs text-[#9a938a]">{formatDate(post.publishedAt, intlLocale(locale))}</p>
        )}
      </div>
    </Link>
  );
}
