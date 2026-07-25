export const metadata = {
  title: "Privacy Policy | Level Up",
  description: "Level Up Privacy Policy and Cookie Consent Details.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-dark-gray">
      <h1 className="text-3xl font-black uppercase tracking-wider mb-6">
        Privacy Policy
      </h1>

      <div className="space-y-6 text-sm sm:text-base leading-relaxed text-gray-700">
        <p>
          At <strong>Level Up</strong>, we respect your privacy and are committed to protecting your personal data. This privacy policy informs you about how we handle your personal information when you visit our storefront.
        </p>

        <h2 className="text-xl font-bold uppercase text-dark-gray mt-8 mb-2">
          1. Information We Collect
        </h2>
        <p>
          We collect personal data you provide when interacting with our site, including name, shipping/billing address, email, phone number, and payment details during checkout. Technical data such as IP address, browser type, and cookie consent preferences are also collected.
        </p>

        <h2 className="text-xl font-bold uppercase text-dark-gray mt-8 mb-2">
          2. How We Use Your Data
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>To fulfill orders and arrange shipping via Printful.</li>
          <li>To process transactions via Shopify Checkout.</li>
          <li>To communicate order status updates and customer support responses.</li>
          <li>To improve website performance and deliver tailored promotional offers (with your consent).</li>
        </ul>

        <h2 className="text-xl font-bold uppercase text-dark-gray mt-8 mb-2">
          3. Cookies & Analytics
        </h2>
        <p>
          We use cookies to maintain your shopping cart, save account sessions, and analyze traffic via Google Analytics. You can adjust your consent preferences at any time using the Cookie Preferences link in our footer.
        </p>

        <h2 className="text-xl font-bold uppercase text-dark-gray mt-8 mb-2">
          4. Contact Us
        </h2>
        <p>
          If you have questions about this privacy policy or wish to exercise your data privacy rights, please reach out via our <a href="/contact" className="underline font-semibold text-dark-gray">Contact Support</a> page.
        </p>
      </div>
    </div>
  );
}
