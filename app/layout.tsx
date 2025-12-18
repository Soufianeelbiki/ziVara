import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ScrollProgress } from "@/components/scroll-progress";
import { BackToTop } from "@/components/back-to-top";
import { RobeEntrance } from "@/components/robe-entrance";
import { CornerSilhouettes } from "@/components/corner-silhouettes";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "ZIVARA | Stylisme exclusif pour l’élite",
  description:
    "Une excellence sélectionnée pour celles et ceux qui exigent l’extraordinaire. Un stylisme personnel qui dépasse la mode.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${playfair.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <RobeEntrance />
        <CornerSilhouettes />
        <ScrollProgress />
        <BackToTop />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
