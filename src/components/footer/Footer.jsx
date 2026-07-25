"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useConsent } from "@/context/ConsentContext";
import {
  FaInstagram,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaCcApplePay,
} from "react-icons/fa6";
import { FiArrowRight, FiCheck, FiMail } from "react-icons/fi";

export default function Footer() {
  const { openPreferences } = useConsent();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 600);
  };

  return (
    <footer className="w-full bg-dark-gray text-white border-t border-gray-800">
      {/* Newsletter Banner */}
      <div className="border-b border-gray-800 py-12 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left max-w-lg">
            <h3 className="text-2xl font-bold tracking-wider uppercase text-white">
              Level Up Your Inbox
            </h3>
            <p className="text-gray-400 text-sm mt-2">
              Subscribe for exclusive drop alerts, early access, and 10% off your first order.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex-1 max-w-md">
            {status === "success" ? (
              <div className="flex items-center justify-center md:justify-start gap-2 text-green-400 bg-green-950/40 border border-green-800 rounded-lg p-3 text-sm font-medium">
                <FiCheck className="text-lg" />
                <span>You're in! Use code <strong className="underline">LEVELUP10</strong> at checkout.</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-900 text-white placeholder-gray-400 pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-white transition-colors text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="bg-white text-dark-gray hover:bg-gray-200 font-semibold px-6 py-3 rounded-lg uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>{status === "submitting" ? "Joining..." : "Subscribe"}</span>
                  <FiArrowRight className="text-base" />
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-6xl mx-auto py-12 px-6 sm:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-sm">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-black uppercase tracking-widest text-white">
              LEVEL UP
            </span>
          </Link>
          <p className="text-gray-400 max-w-sm text-xs sm:text-sm leading-relaxed">
            Elevate your everyday streetwear. Built with premium materials, designed for maximum comfort, and tailored to level up your wardrobe.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-gray-400 hover:text-white transition-colors text-lg"
            >
              <FaInstagram />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="text-gray-400 hover:text-white transition-colors text-lg"
            >
              <FaTiktok />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
              className="text-gray-400 hover:text-white transition-colors text-lg"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="text-gray-400 hover:text-white transition-colors text-lg"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="font-bold uppercase tracking-wider text-xs text-white mb-4">
            Shop
          </h4>
          <ul className="space-y-2.5 text-gray-400">
            <li>
              <Link href="/new-arrivals" className="hover:text-white transition-colors">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link href="/best-sellers" className="hover:text-white transition-colors">
                Best Sellers
              </Link>
            </li>
            <li>
              <Link href="/apparel" className="hover:text-white transition-colors">
                All Apparel
              </Link>
            </li>
            <li>
              <Link href="/collections" className="hover:text-white transition-colors">
                Collections
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care Column */}
        <div>
          <h4 className="font-bold uppercase tracking-wider text-xs text-white mb-4">
            Customer Care
          </h4>
          <ul className="space-y-2.5 text-gray-400">
            <li>
              <Link href="/account" className="hover:text-white transition-colors">
                Order Tracking
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white transition-colors">
                Shipping & FAQs
              </Link>
            </li>
            <li>
              <Link href="/faq#returns" className="hover:text-white transition-colors">
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal & Policies Column */}
        <div>
          <h4 className="font-bold uppercase tracking-wider text-xs text-white mb-4">
            Policies
          </h4>
          <ul className="space-y-2.5 text-gray-400">
            <li>
              <Link href="/policies/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/policies/refund-policy" className="hover:text-white transition-colors">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link href="/policies/terms-of-service" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/policies/shipping-policy" className="hover:text-white transition-colors">
                Shipping Policy
              </Link>
            </li>
            <li>
              <button
                onClick={openPreferences}
                className="text-gray-400 hover:text-white transition-colors text-left cursor-pointer"
              >
                Cookie Preferences
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Sub-Footer / Payment Badges */}
      <div className="border-t border-gray-800 bg-black/40 py-6 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            © {new Date().getFullYear()} LEVEL UP. All rights reserved. Powered by Shopify.
          </div>

          <div className="flex items-center gap-3 text-2xl text-gray-400">
            <FaCcVisa title="Visa" className="hover:text-white transition-colors" />
            <FaCcMastercard title="Mastercard" className="hover:text-white transition-colors" />
            <FaCcAmex title="American Express" className="hover:text-white transition-colors" />
            <FaCcApplePay title="Apple Pay" className="hover:text-white transition-colors" />
            <FaCcPaypal title="PayPal" className="hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
}