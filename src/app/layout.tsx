import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CustomCursor } from "./components/ui/CustomCursor";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RDMD & Co. — Automatización IA para empresas",
  description:
    "Construimos sistemas de automatización con IA para empresas en Latinoamérica. Especializados en agencias de marketing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-fg font-sans">
        <CustomCursor />
        {children}
        {/* ELU Analytics: product analytics + session replay. Detecta dónde
            los usuarios se traban y permite que el coding agent reciba
            sugerencias via MCP. Ver https://elu.dev */}
        <Script
          src="https://elu.dev/v1/elu_pk_live_D1ZYRDeC6K5iRcZNakMgMAowdx.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
