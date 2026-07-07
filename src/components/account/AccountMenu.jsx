"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser } from "react-icons/fi";
import { useAccount } from "@/components/account/AccountContext";

export default function AccountMenu({ iconClassName }) {
  const { customer, login, logout } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  console.log("customer:", customer); // TODO: remove once shape is confirmed

  const handleClick = () => {
    if (!customer) {
      login();
      return;
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button onClick={handleClick}>
        <FiUser className={iconClassName} />
      </button>

      <AnimatePresence>
        {isOpen && customer && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 text-dark-gray"
          >
            <div className="px-4 py-3 border-b border-gray-200">
              <p className="text-sm font-semibold truncate">
                {customer?.firstName || customer?.email || "Account"}
              </p>
              {customer?.email && (
                <p className="text-xs text-gray-500 truncate">{customer.email}</p>
              )}
            </div>
            <button
              onClick={logout}
              className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}