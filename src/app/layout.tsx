import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "MatMaster",
  description: "MatMaster",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/MatMaster-60x60.svg" />
      </head>
      <UserProvider>
        <body className={workSans.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </UserProvider>
    </html>
  );
}
