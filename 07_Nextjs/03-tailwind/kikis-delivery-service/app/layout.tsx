import { Cherry_Bomb_One, Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from 'next-themes'

const cherryBomb = Cherry_Bomb_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cherry-bomb-one"
});

const jetBrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono"
});

import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeChanger } from "@/components/ThemeChanger";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export default function RootLayout({ children }: LayoutProps<"/">) {
  const className = [
    cherryBomb.variable,
    jetBrains.variable
  ].join(" ");
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(className, "font-sans", inter.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header>
            <h1 className="text-3xl text-red-500">Kiki’s Delivery Service</h1>
            <ThemeChanger />
          </header>
          {children}
        </ThemeProvider>
      </body>
        <footer>
        </footer>
    </html>
  );
}
