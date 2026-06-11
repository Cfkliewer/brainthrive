import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import SetBodyVersion from "@/components/versions/SetBodyVersion";
import SkipNav from "@/components/versions/SkipNav";
import VersionAnimationProvider from "@/components/versions/VersionAnimationProvider";
import VersionSwitcher from "@/components/versions/VersionSwitcher";
import { SITE } from "@/lib/content/site";
import Footer from "./_components/Footer";
import Header from "./_components/Header";

/**
 * Bebas Neue is loaded here (not in the root layout) so its payload is
 * scoped to the /v3 subtree. Exposed as --font-bebas-v3, consumed by the
 * .v3-display utility appended to globals.css.
 */
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-v3",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Cinematic, data-driven brain wellness in Choctaw, Oklahoma. qEEG-guided neurofeedback and photobiomodulation — measure it, train it, prove it.",
};

export default function V3Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      data-version="v3"
      className={`${bebas.variable} min-h-screen bg-medical-secondary text-white antialiased`}
    >
      <SetBodyVersion version="v3" />
      <VersionAnimationProvider lenis={{ duration: 1.15 }}>
        <SkipNav />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <VersionSwitcher />
      </VersionAnimationProvider>
    </div>
  );
}
