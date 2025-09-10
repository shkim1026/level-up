import { Geist, Geist_Mono } from "next/font/google";
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
        <header className="w-full bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-x1 text-gray-800 font-bold">Level Up</h1>
          <nav className="text-gray-800">
            <Link href="/" className="mr-4">Home</Link>
            <a href="/cart">Cart</a>
          </nav>
        </header>

        <main className="max-w-6x1 mx-auto p-6">{children}</main>
        <footer className="w-full bg-gray-100 p-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Level Up Threads
        </footer>
      </body>
    </html>
  );
}
