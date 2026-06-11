import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import SetBodyVersion from "@/components/versions/SetBodyVersion";
import SkipNav from "@/components/versions/SkipNav";
import VersionAnimationProvider from "@/components/versions/VersionAnimationProvider";
import VersionSwitcher from "@/components/versions/VersionSwitcher";
import { SITE } from "@/lib/content/site";
import Footer from "./_components/Footer";
import Header from "./_components/Header";

/**
 * Fraunces is loaded here (not in the root layout) so its payload is scoped
 * to the /v1 subtree. Exposed as --font-fraunces, consumed by the
 * .v1-display utility appended to globals.css.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Data-driven neurofeedback and photobiomodulation in Choctaw, Oklahoma. Gentle, drug-free brain training grounded in objective measurement.",
};

export default function V1Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      data-version="v1"
      className={`${fraunces.variable} min-h-screen bg-white font-[family-name:var(--font-golos)] text-brand-navy antialiased`}
    >
      <SetBodyVersion version="v1" />
      <VersionAnimationProvider
        lenis={false}
        scrollTriggerDefaults={{ once: true }}
      >
        <SkipNav />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <VersionSwitcher />
      </VersionAnimationProvider>
    </div>
  );
}
