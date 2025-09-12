"use client";
import { FiUser, FiSearch, FiShoppingCart } from 'react-icons/fi';
import { TfiClose, TfiMenu, TfiShoppingCart, TfiSearch } from 'react-icons/tfi';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [promoBannerIsOpen, setPromoBannerIsOpen] = useState(true);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleSearchBar = () => setIsSearchBarOpen(!isSearchBarOpen);

  const navLinks = [
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Cart", href: "/cart" },
  ];

  const navLinksDesktop = [
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Best Sellers", href: "/best-sellers" },
    { label: "Shop", href: "/shop" },
  ]

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
  };
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <header>
      <nav>
        {promoBannerIsOpen && (
          <div className="promoBanner">
            <p className="text-xs text-center p-2 uppercase bg-black">Free shipping on all orders $200+</p>
          </div>
        )}

        {/* Mobile Navigation */}
        <div className="relative flex items-center justify-between bg-white h-16 lg:hidden">
          <div className="flex gap-5 items-center ml-6 text-black">
            <button onClick={toggleMobileMenu}>
              <TfiMenu className="text-2xl cursor-pointer" />
            </button>
          </div>
          <a href="/" className="w-15 absolute left-1/2 -translate-x-1/2"><img src="mockLogo.jpg"/></a>
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
                key="overlay"
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
                >
                  <TfiClose className="text-lg cursor-pointer mb-10" onClick={() => setIsMobileMenuOpen(false)} />
                  
                  <motion.input 
                    key="mobile-search-bar"
                    type="text" 
                    placeholder="Search..." 
                    className="w-full border rounded-sm p-1 bg-gray-200"
                    variants={itemVariants}
                  />

                  {navLinks.map(({ label, href }) => (
                    <motion.li
                      key={label}
                      className="py-3 mb-0"
                      variants={itemVariants}
                    >
                      <a href={href} className="hover:text-gray-400">
                        {label}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Desktop navigation */}
        <div className="relative items-center justify-between bg-white h-16 hidden lg:flex">
          <a href="/" className="w-15 justify-start ml-10"><img src="mockLogo.jpg"/></a>
          {navLinksDesktop.map(({ label, href }) => (
            <a key={label} href={href} className="text-black">{label}</a>
          ))}
          <div className="flex gap-5 items-center mr-10 text-black">
            <button onClick={toggleSearchBar}><FiSearch className="text-2xl cursor-pointer"/></button>
            <button><FiUser className="text-2xl cursor-pointer"/></button>
            <button><FiShoppingCart className="text-2xl cursor-pointer" /></button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchBarOpen && (
            <>
              <motion.div
                key="overlay"
                className="fixed inset-0 translate-y-30 bg-black z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsSearchBarOpen(false)}
              />
              <motion.div 
                className="flex items-center justify-between absolute w-full py-5 border-t border-gray-300 px-6 bg-white text-black z-50"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 50 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex">
                  <FiSearch className="text-2xl text-gray-500 mr-3"/>
                  <input type="text" placeholder="Search For..." className="focus:outline-none"/>
                </div>
                <button className="flex justify-end">
                  <TfiClose className="text-lg cursor-pointer justify-end" onClick={() => setIsSearchBarOpen(false)} />
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}