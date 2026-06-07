import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "CamperRent | Lloguer de Furgonetes Camper Premium",
  description: "Troba la camper dels teus somnis per a la teva propera escapada. Flota de luxe, preus orientatius clars, comentaris reals de clients i atenció personalitzada.",
  keywords: ["camper", "lloguer camper", "furgoneta camper", "camperrent", "roadtrip"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
