import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LocaleSuggestionBanner } from "@/components/i18n/LocaleSuggestionBanner";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const locale = getLocale();
  const dict = getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main>{children}</main>
      <Footer dict={dict} />
      <LocaleSuggestionBanner current={locale} banner={dict.localeBanner} />
    </>
  );
}
