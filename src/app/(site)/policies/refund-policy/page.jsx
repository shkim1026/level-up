export const metadata = {
  title: "Refund & Return Policy | Level Up",
  description: "Level Up Refund, Return, and Exchange Policy.",
};

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-dark-gray">
      <h1 className="text-3xl font-black uppercase tracking-wider mb-6">
        Refund & Return Policy
      </h1>

      <div className="space-y-6 text-sm sm:text-base leading-relaxed text-gray-700">
        <p>
          We want you to love your apparel. Because all <strong>Level Up</strong> garments are made to order, please review our refund and exchange guidelines below.
        </p>

        <h2 className="text-xl font-bold uppercase text-dark-gray mt-8 mb-2">
          1. Damaged or Defective Items
        </h2>
        <p>
          If your item arrives damaged, misprinted, or defective, please notify us within <strong>30 days</strong> of receiving your shipment. We will send a free replacement or issue a full refund immediately upon verification.
        </p>

        <h2 className="text-xl font-bold uppercase text-dark-gray mt-8 mb-2">
          2. Size Exchanges & Customer Preference Returns
        </h2>
        <p>
          Because items are printed on demand, we strongly encourage checking our Size Guide before placing an order. If you need a different size or wish to make an exchange, please contact support within 14 days of delivery.
        </p>

        <h2 className="text-xl font-bold uppercase text-dark-gray mt-8 mb-2">
          3. How to Submit a Claim
        </h2>
        <p>
          To initiate a return or exchange claim, submit your order number and photo of the issue through our <a href="/contact" className="underline font-semibold text-dark-gray">Contact Support</a> page or email us directly.
        </p>
      </div>
    </div>
  );
}
