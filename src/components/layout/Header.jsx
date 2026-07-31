"use client";

import { FiUser, FiSearch } from 'react-icons/fi';
import { TfiClose, TfiMenu, TfiShoppingCart } from 'react-icons/tfi';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from "next/navigation";
import SearchResults from '../searchbar/SearchResults';
import { fetchAllShopifyProducts } from '@/data/fetchAllShopifyProducts';
import { useCart } from "@/components/cart/CartContext";
import Link from 'next/link';
import Image from 'next/image';
import AccountMenu from '@/components/account/AccountMenu';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [promoBannerIsOpen, setPromoBannerIsOpen] = useState(true);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const barRef = useRef(null);
  const searchButtonRef = useRef(null);
  const router = useRouter();
  const { toggleCart, cartItems } = useCart();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleSearchBar = () => setIsSearchBarOpen((prev) => !prev);

  const navLinks = [
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Best Sellers", href: "/best-sellers" },
    { label: "Shop", href: "/apparel" },
    { label: "About", href: "/about" },
    { label: "Cart", href: "/cart" },
  ];

  const navLinksDesktop = [
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Best Sellers", href: "/best-sellers" },
    { label: "Shop", href: "/apparel" },
  ]

  function handleShopifyLogin() {
    window.location.href =
      `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/account/login`;
  }

  // Fetch products on mount
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchAllShopifyProducts();
        setProducts(data);
      } catch (error) {
        console.log("Error fetching products:", error);
        Sentry.captureException(error);
      }
    }
    loadProducts();
  }, []);

  // Search bar query
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    const timeout = setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      const filtered = products.filter((p) => {
        const titleMatch = p.title.toLowerCase().includes(lowerQuery);
        const tagMatch = p.tags?.some((tag) =>
          tag.toLowerCase().includes(lowerQuery)
        );
        return titleMatch || tagMatch;
      });
      setResults(filtered);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, products]);

  // Handle search query enter key router
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      e.preventDefault();
      router.push(`/search?query=${encodeURIComponent(query)}`);
      setIsSearchBarOpen(false);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsSearchBarOpen(false);
      }
    };
    if (isMobileMenuOpen || isSearchBarOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMobileMenuOpen, isSearchBarOpen]);

  // Focus on search bar text input and outside-click handler
  function FocusSearchBar({ isSearchBarOpen, onClose, query, setQuery, searchButtonRef }) {
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
      if (isSearchBarOpen && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isSearchBarOpen])

    useEffect(() => {
      function handleClickOutside(e) {
        if (
          containerRef.current && 
          !containerRef.current.contains(e.target) &&
          (!searchButtonRef.current || !searchButtonRef.current.contains(e.target)) &&
          !e.target.closest('[data-search-results]')
        ) {
          onClose();
        }
      }
      if (isSearchBarOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [isSearchBarOpen, onClose, searchButtonRef]);

    return (
      <div className="flex grow" ref={containerRef}>
        <FiSearch className="text-2xl text-gray-500 mr-3" aria-hidden="true" />
        <input 
          ref={inputRef} 
          type="text" 
          placeholder="Search For..." 
          aria-label="Search products"
          className="search-input-no-ring focus:outline-none focus-visible:outline-none grow uppercase" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    )
  }

  // Mobile menu animation
  const listVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <header>
      <nav>
        {promoBannerIsOpen && (
          <div className="promoBanner z-50">
            <a href="/apparel">
              <p className="text-xs text-center text-white p-2 uppercase bg-dark-gray hover:underline">Free shipping on all orders $100+</p>
            </a>
          </div>
        )}

        {/* Mobile Navigation */}
        <div className="relative flex items-center justify-between bg-white h-16 lg:hidden z-40 border-b border-gray-300">
          <div className="flex gap-5 items-center ml-6 text-dark-gray">
            <button onClick={toggleMobileMenu} aria-label="Open navigation menu" aria-expanded={isMobileMenuOpen}>
              <TfiMenu className="text-2xl cursor-pointer" />
            </button>
          </div>
          <Link href="/" className="w-15 absolute left-1/2 -translate-x-1/2">
            <Image src="/Level_up_logo.png" alt="Level up logo" width={60} height={24} style={{ width: "auto", height: "auto" }}/>
          </Link>
          <div className="flex gap-5 items-center mr-6 text-dark-gray">
            <button onClick={toggleSearchBar} ref={searchButtonRef} aria-label="Open search bar" aria-expanded={isSearchBarOpen}>
              <FiSearch className="text-2xl cursor-pointer"/>
            </button>
            
            <AccountMenu iconClassName="text-2xl cursor-pointer" />
            
            <button onClick={toggleCart} aria-label={`Open cart (${cartItems.length} items)`} className="relative">
              <TfiShoppingCart className="text-2xl cursor-pointer" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Background overlay */}
              <motion.div
                key="mobile-menu-overlay"
                className="fixed inset-0 bg-dark-gray z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
              />
              {/* Sliding menu panel */}
              <motion.div
                key="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                className="fixed top-0 left-0 bg-white h-screen max-w-[92vw] sm:max-w-md z-50 text-dark-gray"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ width: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut"}}
              >
                <motion.ul 
                  className="flex flex-col space-y-2 m-5" 
                  variants={listVariants} 
                  initial="hidden" 
                  animate="visible"
                  exit="exit"
                >
                  <li>
                    <button
                      type="button"
                      aria-label="Close navigation menu"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="mb-10 text-dark-gray hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-dark-gray p-1 rounded-sm"
                    >
                      <TfiClose className="text-lg cursor-pointer" />
                    </button>
                  </li>

                  {navLinks.map(({ label, href }) => (
                    <motion.li
                      key={label}
                      className="py-3 mb-0 uppercase text-sm"
                      variants={itemVariants}
                    >
                      <Link href={href} className="cursor-pointer hover:text-gray-400">
                        {label}
                      </Link>
                      <hr className="text-gray-300 mt-6"/>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Desktop navigation */}
        <div className="bg-white hidden lg:block border-b border-gray-300 bg-white z-50">
          <div className="relative items-center justify-between h-16 flex max-w-[1920px] mx-auto">
            <div className="flex items-center">
              <Link href="/" className="w-15 justify-start ml-10 mr-10">
                <Image src="/Level_up_logo.png" alt="Level up logo" width={60} height={24} style={{ width: "auto", height: "auto" }}/>
              </Link>
              {navLinksDesktop.map(({ label, href }) => (
                <Link 
                  key={label} 
                  href={href} 
                  className="
                    relative
                    text-dark-gray
                    hover:text-hover-gray
                    font-semibold
                    mr-8 
                    uppercase 
                    text-sm 
                    tracking-wide 
                    duration-300 
                    before:absolute 
                    before:-bottom-6
                    before:left-0 
                    before:w-0 
                    before:h-0.75 
                    before:bg-hover-gray 
                    before:transition-all 
                    before:duration-300 
                    hover:before:w-full
                  "
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="flex gap-5 items-center mr-10 text-dark-gray">
              <button onClick={toggleSearchBar} ref={searchButtonRef} aria-label="Open search bar" aria-expanded={isSearchBarOpen}>
                <FiSearch className="text-2xl cursor-pointer hover:text-hover-gray ease-in-out duration-300"/>
              </button>

              <AccountMenu iconClassName="text-2xl cursor-pointer hover:text-hover-gray ease-in-out duration-300" />

              <button onClick={toggleCart} aria-label={`Open cart (${cartItems.length} items)`} className="relative">
                <TfiShoppingCart className="text-2xl cursor-pointer hover:text-hover-gray ease-in-out duration-300" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchBarOpen && (
            <>
              <motion.div
                key="desktop-search-bar-overlay"
                className="fixed inset-0 bg-dark-gray z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsSearchBarOpen(false)}
                aria-hidden="true"
              />

              <motion.div 
                role="dialog"
                aria-modal="true"
                aria-label="Search"
                className="flex items-center justify-between absolute w-full py-5 px-6 sm:px-10 bg-white text-dark-gray z-50 border-b border-gray-200"
                initial={{ opacity: 0, maxHeight: 0 }}
                animate={{ opacity: 1, maxHeight: 200 }}
                exit={{ opacity: 0, maxHeight: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div ref={barRef} className="relative flex items-center justify-between w-full max-w-[1920px] mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1"
                  >
                    <FocusSearchBar 
                      isSearchBarOpen={isSearchBarOpen} 
                      onClose={() => setIsSearchBarOpen(false)} 
                      searchButtonRef={searchButtonRef}
                      query={query}
                      setQuery={setQuery}
                    />
                  </motion.div>
                  <motion.button 
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                    aria-label="Close search"
                    className="flex justify-end p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-dark-gray rounded-sm ml-4"
                    onClick={() => setIsSearchBarOpen(false)}
                  >
                    <TfiClose className="text-lg cursor-pointer" />
                  </motion.button>

                  <SearchResults 
                    isSearchBarOpen={isSearchBarOpen} 
                    results={results} 
                    query={query}
                    onItemClick={() => setIsSearchBarOpen(false)}
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}