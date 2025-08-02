import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isEnglish = locale === 'en';
  
  return {
    title: isEnglish 
      ? "Glute Project - Train with 24/7 professional guidance"
      : "Glute Project - Treina com acompanhamento profissional 24/7",
    description: isEnglish
      ? "Train with 24/7 professional guidance in a private studio that becomes your community. Private fitness studio in Matosinhos."
      : "Treina com acompanhamento profissional 24/7 num estúdio privado que se torna a tua comunidade. Private fitness studio in Matosinhos.",
    keywords: ["gym", "fitness", "personal training", "Matosinhos", "Portugal", "ginásio", "treino"],
    openGraph: {
      title: "Glute Project - Private Fitness Studio",
      description: isEnglish
        ? "Train with 24/7 professional guidance in a private studio"
        : "Treina com acompanhamento profissional 24/7 num estúdio privado",
      locale: locale === 'en' ? "en_US" : "pt_PT",
      alternateLocale: locale === 'en' ? "pt_PT" : "en_US",
      type: "website",
    },
  };
}

export default function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${barlowCondensed.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}