import type { Metadata, Viewport } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export const metadata: Metadata = {
  title: "BRIIZZ — The Next Business Experience | Coming Soon",
  description: "Something powerful is coming. BRIIZZ is an all-in-one unified business ecosystem connecting products, operations, workspace, digital engineering, and scale.",
  keywords: ["BRIIZZ", "Business Ecosystem", "Pre-Launch", "Next Gen Business", "Coming Soon"],
  authors: [{ name: "BRIIZZ" }],
  openGraph: {
    title: "BRIIZZ — The Next Business Experience",
    description: "BRIIZZ is coming. Enter the pre-launch experience.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${syne.variable} bg-[#050505] text-[#f5f5f7] antialiased selection:bg-[#ff1e27] selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
