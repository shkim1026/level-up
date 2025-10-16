"use client";
import { FiUser, FiSearch, FiShoppingCart } from 'react-icons/fi';
import { TfiClose, TfiMenu, TfiShoppingCart, TfiSearch } from 'react-icons/tfi';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchResults from '../searchbar/SearchResults';
import Products from '@/data/mockProducts.json';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [promoBannerIsOpen, setPromoBannerIsOpen] = useState(true);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const barRef = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleSearchBar = () => setIsSearchBarOpen((prev) => !prev);

  const searchButtonRef = useRef(null);

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

  // Search bar query
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    const timeout = setTimeout(() => {
      const filtered = Products.filter((p) => 
        p.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  // Focus on search bar text input and close search bar when clicked outside of div
  function FocusSearchBar({ isSearchBarOpen, onClose, query, setQuery }) {
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
          (!searchButtonRef.current || !searchButtonRef.current.contains(e.target))
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
        <FiSearch className="text-2xl text-gray-500 mr-3"/>
        <input 
          ref={inputRef} 
          type="text" 
          placeholder="Search For..." 
          className="focus:outline-none grow uppercase" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
          <div className="promoBanner">
            <p className="text-xs text-center text-white p-2 uppercase bg-black">Free shipping on all orders $200+</p>
          </div>
        )}

        {/* Mobile Navigation */}
        <div className="relative flex items-center justify-between bg-white h-16 lg:hidden">
          <div className="flex gap-5 items-center ml-6 text-black">
            <button onClick={toggleMobileMenu}>
              <TfiMenu className="text-2xl cursor-pointer" />
            </button>
          </div>
          <a href="/" className="w-15 absolute left-1/2 -translate-x-1/2"><img src="mockLogo.jpg" alt="logo"/></a>
          <div className="flex gap-5 items-center mr-6 text-black">
            <button><FiUser className="text-2xl cursor-pointer"/></button>
            <button><TfiShoppingCart className="text-2xl cursor-pointer" /></button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Background overlay */}
              <motion.div
                key="mobile-menu-overlay"
                className="fixed inset-0 bg-black z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              {/* Sliding menu panel */}
              <motion.div
                key="mobile-menu"
                className="fixed top-0 left-0 bg-white h-screen max-w-[92vw] sm:max-w-md z-50 text-black"
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
                  <TfiClose className="text-lg cursor-pointer mb-10" onClick={() => setIsMobileMenuOpen(false)} />
                  
                  <motion.input 
                    key="mobile-search-bar"
                    type="text" 
                    placeholder="Search..." 
                    className="w-full border rounded-sm p-1 bg-gray-200"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  />

                  {navLinks.map(({ label, href }) => (
                    <motion.li
                      key={label}
                      className="py-3 mb-0 uppercase text-sm"
                      variants={itemVariants}
                    >
                      <a href={href} className="cursor-pointer hover:text-gray-400">
                        {label}
                      </a>
                      <hr className="text-gray-300 mt-6"/>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Desktop navigation */}
        <div className="relative items-center justify-between bg-white h-16 hidden lg:flex z-50 border-b border-gray-300">
          <div className="flex items-center">
            <a href="/" className="w-15 justify-start ml-10 mr-10"><img src="mockLogo.jpg"/></a>
            {navLinksDesktop.map(({ label, href }) => (
              <a key={label} href={href} className="text-black mr-8 uppercase text-sm tracking-wide">{label}</a>
            ))}
          </div>
          <div className="flex gap-5 items-center mr-10 text-black">
            <button onClick={toggleSearchBar} ref={searchButtonRef}><FiSearch className="text-2xl cursor-pointer"/></button>
            <button><FiUser className="text-2xl cursor-pointer"/></button>
            <button><FiShoppingCart className="text-2xl cursor-pointer" /></button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchBarOpen && (
            <>
              <motion.div
                key="desktop-search-bar-overlay"
                className="fixed inset-0 bg-black z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsSearchBarOpen(false)}
              />

              <motion.div 
                ref={barRef}
                className="flex items-center justify-between absolute w-full py-5 px-6 bg-white text-black z-50"
                initial={{ opacity: 0, maxHeight: 0 }}
                animate={{ opacity: 1, maxHeight: 200 }}
                exit={{ opacity: 0, maxHeight: 0 }}
                transition={{ duration: 0.3 }}
              >
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
                  className="flex justify-end"
                  onClick={() => setIsSearchBarOpen(false)}
                >
                  <TfiClose className="text-lg cursor-pointer" />
                </motion.button>
              </motion.div>

              <SearchResults anchorRef={barRef} isSearchBarOpen={isSearchBarOpen} results={results} query={query}/>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}