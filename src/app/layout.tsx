import type { Metadata } from "next";
import { headers } from "next/headers";
import { Playfair_Display, DM_Sans, Cairo } from "next/font/google";
import { getLocale } from "@/lib/i18n/get-locale";
import { defaultLocale, isRtl } from "@/lib/i18n/dictionaries";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap"
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap"
});

/** Latin has Playfair/DM Sans; Arabic needs its own family — swapped in for both heading and body via `[dir="rtl"]` in globals.css. */
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-arabic",
  display: "swap"
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://naireva.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NAIREVA — Private Aesthetic Journeys in Armenia",
    template: "%s — NAIREVA"
  },
  description:
    "A private, concierge-led path to aesthetic surgery in Armenia — selected surgical expertise, direct surgeon video consultation and a fully coordinated journey.",
  openGraph: {
    type: "website",
    siteName: "NAIREVA",
    title: "NAIREVA — Private Aesthetic Journeys in Armenia",
    description:
      "A private, concierge-led path to aesthetic surgery in Armenia — selected surgical expertise, direct surgeon video consultation and a fully coordinated journey."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // /admin stays English/LTR regardless of the visitor's public-site locale cookie.
  const isAdmin = headers().get("x-pathname")?.startsWith("/admin") ?? false;
  const locale = isAdmin ? defaultLocale : getLocale();
  const dir = isAdmin ? "ltr" : isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={`${playfair.variable} ${dmSans.variable} ${cairo.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
