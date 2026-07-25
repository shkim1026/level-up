export const metadata = {
  title: "Terms of Service | Level Up",
  description: "Level Up Terms of Service.",
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-dark-gray">
      <h1 className="text-3xl font-black uppercase tracking-wider mb-6">
        Terms of Service
      </h1>

      <div className="space-y-6 text-sm sm:text-base leading-relaxed text-gray-700">
        <p>
          Welcome to <strong>Level Up</strong>. By accessing or purchasing from our storefront, you agree to be bound by the following terms and conditions.
        </p>

        <h2 className="text-xl font-bold uppercase text-dark-gray mt-8 mb-2">
          1. Storefront Usage & Orders
        </h2>
        <p>
          All product listings are subject to availability. Prices for our products are subject to change without notice. We reserve the right to refuse or cancel any order for any reason.
        </p>

        <h2 className="text-xl font-bold uppercase text-dark-gray mt-8 mb-2">
          2. Intellectual Property
        </h2>
        <p>
          All content on this website, including designs, graphics, logos, images, and text, is the property of Level Up and protected by copyright and intellectual property laws.
        </p>

        <h2 className="text-xl font-bold uppercase text-dark-gray mt-8 mb-2">
          3. Governing Law
        </h2>
        <p>
          These Terms of Service and any separate agreements shall be governed by and construed in accordance with the laws of your jurisdiction.
        </p>
      </div>
    </div>
  );
}
