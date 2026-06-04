import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shashank | Engineering & CS Student",
  description:
    "Portfolio of Shashank — an engineering student from India passionate about computer science, programming, and international education. Head Boy, problem-solver, global thinker.",
  keywords: [
    "Shashank",
    "portfolio",
    "engineering student",
    "computer science",
    "programming",
    "JEE",
    "India",
  ],
  authors: [{ name: "Shashank" }],
  openGraph: {
    title: "Shashank | Engineering & CS Student",
    description:
      "Portfolio of Shashank — engineering student, Head Boy, and aspiring global engineer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
