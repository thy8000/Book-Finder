import { Open_Sans, Lato } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-open-sans",
});

const lato = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-lato",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={openSans.variable}>
      <body className={`antialiased bg-neutral-900`}>{children}</body>
    </html>
  );
}
