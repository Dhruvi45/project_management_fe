import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import logo from "../../public/assets/images/logso1.png";

// Keep the `metadata` export outside of "use client" scope, as it's meant for server-side use
export const metadata: Metadata = {
  title: "Project Management",
  description: "Project management system",
  icons:"../../public/assets/images/logo1.png"
};



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 m-0 p-0`}
      >
        {children}
      </body>
    </html>
  );
}
