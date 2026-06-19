import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import SetBodyVersion from "@/components/versions/SetBodyVersion";
import SkipNav from "@/components/versions/SkipNav";
import VersionAnimationProvider from "@/components/versions/VersionAnimationProvider";
import { SITE } from "@/lib/content/site";
import Footer from "./_components/Footer";
import Header from "./_components/Header";

/**
 * Bebas Neue display font, exposed as --font-bebas-real and consumed by
 * the .v2-display utility in globals.css. Display use only — oversized
 * numerals and section index labels at >=48px.
 */
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-real",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Measure your brain, train it, watch it change. qEEG-guided photobiomodulation and neurofeedback in Choctaw, Oklahoma — drug-free and non-invasive.",
};

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      data-version="v2"
      className={`${bebas.variable} min-h-screen bg-white font-[family-name:var(--font-golos)] text-medical-gray-900 antialiased`}
    >
      <SetBodyVersion version="v2" />
      <VersionAnimationProvider lenis={{ duration: 0.9 }}>
        <SkipNav />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </VersionAnimationProvider>
    </div>
  );
}
