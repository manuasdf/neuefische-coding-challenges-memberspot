import { Cherry_Bomb_One } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  const className = [
    cherryBomb.variable,
    jetBrains.variable
  ].join(" ");
  return (
    <html lang="en" className={className}>
      <body>
        <header>
          <h1>Kiki’s Delivery Service</h1>
        </header>
        {children}
        </body>
    </html>
  );
}
