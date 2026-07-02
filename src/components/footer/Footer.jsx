"use client";
import Link from "next/link";
import { useConsent } from "@/context/ConsentContext";

export default function Footer() {
  const { openPreferences } = useConsent();

  return (
    <footer className="w-full bg-gray-100 p-4 text-center text-sm text-gray-600">
      <nav className="flex justify-center gap-4 mb-2">
        <Link href="/faq" className="text-dark-gray underline">FAQ</Link>
        <button onClick={openPreferences} className="text-dark-gray underline cursor-pointer">
          Cookie Preferences
        </button>
      </nav>
      © {new Date().getFullYear()} Level Up
    </footer>
  );
}