import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
};

export const metadata: Metadata = {
  title: "Suriyan R | Frontend Developer",
  description: "Personal portfolio website of Suriyan R. Turning thoughts into beautiful web stories.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
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
      className={cn("h-full antialiased", "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-bg-canvas text-text-primary">
        <ThemeProvider>
          <Nav />
          <main className="flex-grow flex flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
