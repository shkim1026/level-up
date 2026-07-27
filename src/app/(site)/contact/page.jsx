"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", orderNumber: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-dark-gray">
      <h1 className="text-3xl font-black uppercase tracking-wider mb-2">
        Contact Support
      </h1>
      <p className="text-gray-600 mb-8 text-sm sm:text-base">
        Have a question about an order, sizing, or returns? Drop us a message below and our support team will get back to you within 24 hours.
      </p>

      {submitted ? (
        <div aria-live="polite" className="bg-green-50 border border-green-300 rounded-lg p-6 text-center text-green-900">
          <h3 className="text-lg font-bold uppercase mb-2">Message Sent!</h3>
          <p className="text-sm">Thank you for reaching out. We've received your request and will respond shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 bg-gray-50 p-6 sm:p-8 rounded-xl border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-dark-gray focus-visible:ring-2 focus-visible:ring-dark-gray"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-dark-gray focus-visible:ring-2 focus-visible:ring-dark-gray"
                placeholder="jane@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-order-number" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Order # (Optional)
            </label>
            <input
              id="contact-order-number"
              type="text"
              value={formData.orderNumber}
              onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-dark-gray focus-visible:ring-2 focus-visible:ring-dark-gray"
              placeholder="#1001"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              How can we help? *
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-dark-gray focus-visible:ring-2 focus-visible:ring-dark-gray"
              placeholder="Describe your inquiry..."
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto bg-dark-gray text-white hover:bg-hover-gray font-semibold px-8 py-3 rounded-lg uppercase tracking-wider text-xs transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-dark-gray"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
