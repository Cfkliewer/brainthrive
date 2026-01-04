import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AnimationProvider from "@/components/AnimationProvider";

// Golos Text - Secondary font from brand guide
const golosText = Inter({
  weight: ["400", "500", "600", "700"],
  variable: "--font-golos",
  subsets: ["latin"],
  display: "swap",
});

// Note: Bebas Neue Pro requires Adobe Fonts subscription
// Using a fallback for now - you can add the Adobe Fonts link or use Bebas Neue from Google Fonts
const bebasNeue = Inter({
  weight: ["700"],
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brain Thrive Wellness | Prioritizing Brain Health",
  description: "Brain Thrive Wellness is a premier integrative clinic prioritizing brain health through advanced diagnostics, neurofeedback, and metabolic optimization.",
  keywords: "brain health, neurofeedback, QEEG, photobiomodulation, brain mapping, ADHD, anxiety, TBI recovery, cognitive enhancement",
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F172A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${golosText.variable} ${bebasNeue.variable} antialiased`}
      >
        <AnimationProvider>{children}</AnimationProvider>
      </body>
    </html>
  );
}
