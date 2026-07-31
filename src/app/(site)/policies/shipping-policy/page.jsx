export const metadata = {
  title: "Shipping Policy | Level Up",
  description: "Level Up Shipping, Fulfillment, and Delivery Times.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-dark-gray">
      <h1 className="text-3xl font-black uppercase tracking-wider mb-6">
        Shipping Policy
      </h1>

      <div className="space-y-6 text-sm sm:text-base leading-relaxed text-gray-700">
        <p>
          All <strong>Level Up</strong> apparel items are printed on demand and custom packed for each customer.
        </p>

        <h2 className="text-xl font-bold uppercase text-dark-gray mt-8 mb-2">
          1. Processing & Fulfillment Times
        </h2>
        <p>
          Standard fulfillment takes <strong>2–5 business days</strong> before shipment. During peak season, fulfillment may take up to 7 business days.
        </p>

        <h2 className="text-xl font-bold uppercase text-dark-gray mt-8 mb-2">
          2. Domestic & International Shipping Rates
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Standard Shipping (US):</strong> 3–6 business days after fulfillment.</li>
          <li><strong>International Shipping:</strong> 7–15 business days depending on customs processing in the destination country.</li>
        </ul>

        <h2 className="text-xl font-bold uppercase text-dark-gray mt-8 mb-2">
          3. Order Tracking
        </h2>
        <p>
          Once your order ships, a tracking link will be emailed to you and will be available under your <a href="/account" className="underline font-semibold text-dark-gray">Account Dashboard</a>.
        </p>
      </div>
    </div>
  );
}
