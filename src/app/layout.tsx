import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap", // WCAG: Ensure text remains visible during webfont load
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Handcrafted Haven | Artisan Marketplace",
  description: "Discover unique, handcrafted treasures from talented artisans. Support local makers and find one-of-a-kind products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${lora.variable}`}>
        {/* Skip Link for Keyboard Navigation - WCAG 2.4.1 */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        {/* Live region for dynamic content announcements */}
        <div 
          aria-live="polite" 
          aria-atomic="true" 
          className="sr-live-region"
          id="announcements"
        />
        
        {children}
      </body>
    </html>
  );
}
