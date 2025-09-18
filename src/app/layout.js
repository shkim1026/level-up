import { Geist, Geist_Mono } from "next/font/google";
import Header from "../components/layout/Header.jsx";
import "./globals.css";
import Link from 'next/link'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Level Up Threads",
  description: "Level up with Level Up Threads",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
        <Header />

        <main className="max-w-6x1 mx-auto bg-white text-black min-h-screen">{children}</main>

        <footer className="w-full bg-gray-100 p-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Level Up
        </footer>
      </body>
    </html>
  );
}
