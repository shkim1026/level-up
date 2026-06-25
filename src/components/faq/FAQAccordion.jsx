"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqData } from "./faqData";

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-neutral-200">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-sm"
      >
        <span className="text-sm sm:text-base font-medium text-neutral-900">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-2xl leading-none text-neutral-500"
          aria-hidden="true"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-4 pr-8 text-sm text-neutral-600 leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQAccordion() {
  // Tracks open items as "categoryIndex-itemIndex" strings.
  // Multiple items (across or within categories) can be open at once.
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (key) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 mb-2">
        Frequently asked questions
      </h1>
      <p className="text-sm text-neutral-500 mb-10">
        Can't find what you're looking for?{" "}
        <a href="/contact" className="underline hover:text-neutral-700">
          Contact us
        </a>
        .
      </p>

      <div className="space-y-10">
        {faqData.map((group, groupIndex) => (
          <section key={group.category}>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-400 mb-2">
              {group.category}
            </h2>
            <div>
              {group.items.map((item, itemIndex) => {
                const key = `${groupIndex}-${itemIndex}`;
                return (
                  <FAQItem
                    key={key}
                    item={item}
                    isOpen={openItems.has(key)}
                    onToggle={() => toggleItem(key)}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}