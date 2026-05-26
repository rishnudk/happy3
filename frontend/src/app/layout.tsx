import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { StoreProvider } from "@/lib/store/StoreProvider";
import { Toaster } from "sonner";
import "./globals.css";
import "../styles/background.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Happiness Coaching Academy",
  description: "Discover the art of happiness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable}`}>
      <body className="background-wrapper font-jakarta antialiased">
        <div className="animated-gradient" />

        <div className="bg-purple-glow" />
        <div className="bg-yellow-glow" />
        <div className="bg-grid" />

        <StoreProvider>
          {children}
          <Toaster richColors position="top-right" />
        </StoreProvider>
      </body>
    </html>
  );
}