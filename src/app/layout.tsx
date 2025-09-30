import type { Metadata } from "next";
import { Ubuntu, Ubuntu_Mono } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu-sans",
  subsets: ["latin"],
});

const ubuntuMono = Ubuntu_Mono({
  weight: "400",
  variable: "--font-ubuntu-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BrainThrive - Advanced Photobiomodulation Therapy",
  description: "Experience the healing power of light therapy. Professional photobiomodulation treatments for enhanced brain function and wellness. HIPAA compliant, FDA-cleared treatments.",
  keywords: "photobiomodulation, light therapy, brain health, ADHD treatment, concussion recovery, medical therapy",
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
        className={`${ubuntu.variable} ${ubuntuMono.variable} antialiased font-medical`}
      >
        {children}
      </body>
    </html>
  );
}
