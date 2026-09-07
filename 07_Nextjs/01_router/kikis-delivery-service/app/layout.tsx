import { Cherry_Bomb_One } from "next/font/google";

const cherryBomb = Cherry_Bomb_One({
  weight: "400",
  subsets: ["latin"],
});

import "./globals.css";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cherryBomb.className}>
      <body>
        <header>
          <h1>Kiki’s Delivery Service</h1>
        </header>
        {children}
        </body>
    </html>
  );
}
