import type { Metadata } from "next";
import { Bebas_Neue, Oswald, Barlow_Condensed } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from '@clerk/nextjs';
import "../globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === 'en';
  
  return {
    title: isEnglish 
      ? "Glute Project - Train with 24/7 professional guidance"
      : "Glute Project - Treina com acompanhamento profissional 24/7",
    description: isEnglish
      ? "Train with 24/7 professional guidance in a private studio that becomes your community. Private fitness studio in Matosinhos."
      : "Treina com acompanhamento profissional 24/7 num estúdio privado que se torna a tua comunidade. Private fitness studio in Matosinhos.",
    keywords: ["gym", "fitness", "personal training", "Matosinhos", "Portugal", "ginásio", "treino"],
    icons: {
      icon: '/favicon.svg',
      apple: '/favicon.svg',
    },
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

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <body
        className={`${oswald.variable} ${bebasNeue.variable} ${barlowCondensed.variable} antialiased`}
      >
        <ClerkProvider>
          <a href="#main" className="skip-link">
            {locale === 'en' ? 'Skip to main content' : 'Ir para o conteúdo principal'}
          </a>
          {children}
          <Analytics />
        </ClerkProvider>
      </body>
    </html>
  );
}