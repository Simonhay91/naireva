import type { BlogPost } from "@prisma/client";
import { JournalCard } from "@/components/journal/JournalCard";
import type { Locale, Dictionary } from "@/lib/i18n/dictionaries";

export function JournalPreview({ posts, locale, dict }: { posts: BlogPost[]; locale: Locale; dict: Dictionary }) {
  if (!posts.length) return null;

  return (
    <section className="section">
      <div className="wrap">
        <div className="mb-10">
          <p className="kicker">{dict.home.journal.kicker}</p>
          <h2 className="font-serif text-[clamp(34px,5.5vw,58px)]">{dict.home.journal.title}</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <JournalCard key={post.id} post={post} index={i} locale={locale} dict={dict} />
          ))}
        </div>
      </div>
    </section>
  );
}
