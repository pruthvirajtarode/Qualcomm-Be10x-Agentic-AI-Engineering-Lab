import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Qualcomm | Agentic AI Engineering Lab",
  description: "An interactive, hands-on enterprise workshop covering Agentic AI, LLMs, Retrieval-Augmented Generation (RAG), and modern AI application architecture.",
  keywords: ["Qualcomm", "AI Workshop", "Agentic AI", "LLMs", "RAG", "Enterprise AI", "Machine Learning", "AI Agents"],
  authors: [{ name: "Qualcomm" }],
  openGraph: {
    title: "Qualcomm | Agentic AI Engineering Lab",
    description: "Build intelligent systems that reason, retrieve, and act. A comprehensive workshop on Agentic AI and LLM architectures.",
    type: "website",
    siteName: "Qualcomm Agentic AI Lab",
    images: [
      {
        url: "/assets/qualcomm logo.png",
        width: 1200,
        height: 630,
        alt: "Qualcomm AI Workshop",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qualcomm | Agentic AI Engineering Lab",
    description: "Build intelligent systems that reason, retrieve, and act. A comprehensive workshop on Agentic AI.",
    images: ["/assets/qualcomm logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <TooltipProvider>
          {children}
        </TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
