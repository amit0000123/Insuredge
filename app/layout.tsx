import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans-custom",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-display-custom",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "InsurEdge | 100% Unbiased Insurance Platform",
  description: "Discover the best term, health, and savings insurance plans. Get guidance from real experts and personalized claims service. 100% unbiased and independent.",
  keywords: ["insurance", "term insurance", "health insurance", "mutual funds", "SIP", "financial advisor", "unbiased insurance reviews"],
  authors: [{ name: "InsurEdge Team" }],
  openGraph: {
    title: "InsurEdge | Smart Financial Protection",
    description: "No confusion. No spam. Just honest advisory to help you protect what matters.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} ${bricolage.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-text-primary transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow pt-[68px]">
            {children}
          </main>
          <ChatWidget />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

