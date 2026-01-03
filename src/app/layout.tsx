import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0F172A" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${golosText.variable} ${bebasNeue.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
