"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser } from "react-icons/fi";
import Link from "next/link";
import { useAccount } from "@/components/account/AccountContext";

export default function AccountMenu({ iconClassName }) {
  const { customer, login, logout } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const buttonRef = useRef(null);

  // Track dropdown position relative to the button, since it's portaled to <body>
  useLayoutEffect(() => {
    if (!isOpen || !buttonRef.current) return;

    const updatePosition = () => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    };

    updatePosition();

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

  // Outside-click handling: exclude the portaled dropdown via data attribute,
  // since it's no longer a DOM descendant of the button's container
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target) &&
        !e.target.closest("[data-account-menu]")
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleClick = () => {
    if (!customer) {
      login();
      return;
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button type="button" ref={buttonRef} onClick={handleClick} className="flex items-center">
        <FiUser className={iconClassName} />
      </button>

      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && customer && (
              <motion.div
                data-account-menu
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="fixed w-56 max-w-[90vw] bg-white border border-gray-200 rounded-lg shadow-lg z-50 text-dark-gray"
                style={{ top: position.top, right: position.right }}
              >
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-semibold truncate">
                    {customer?.firstName || customer?.email || "Account"}
                  </p>
                  {customer?.emailAddress?.emailAddress && (
                    <p className="text-xs text-gray-500 truncate">{customer.emailAddress.emailAddress}</p>
                  )}
                </div>

                <Link
                  href="/account/orders"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-sm hover:bg-gray-100 border-b border-gray-200"
                >
                  Orders
                </Link>

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

