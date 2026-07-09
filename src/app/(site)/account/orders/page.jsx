"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAccount } from "@/components/account/AccountContext";
import { formatPrice } from "@/utils/FormatPrice";
import { fetchAllShopifyProducts } from "@/data/fetchAllShopifyProducts";

export default function OrdersPage() {
  const { customer, isLoading, login } = useAccount();
  const [handleById, setHandleById] = useState({});

  // Build a productId -> handle lookup so line items can link to their product page.
  // The Customer Account API's LineItem only exposes productId (a raw GID), not handle,
  // so we match it against the product catalog we already fetch elsewhere.
  useEffect(() => {
    async function loadHandles() {
      try {
        const products = await fetchAllShopifyProducts();
        const map = {};
        products.forEach((p) => {
          if (p.id && p.handle) map[p.id] = p.handle;
        });
        setHandleById(map);
      } catch (err) {
        console.log("Error loading product handles for order links:", err);
      }
    }
    loadHandles();
  }, []);

  if (isLoading) {
    return <p className="p-8 text-center text-gray-500">Loading order history...</p>;
  }

  if (!customer) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600 mb-4">Log in to view your order history.</p>
        <button
          onClick={login}
          className="px-6 py-2 bg-dark-gray text-white rounded-lg hover:bg-hover-gray transition cursor-pointer uppercase text-sm"
        >
          Log In
        </button>
      </div>
    );
  }

  const orders = customer.orders?.edges ?? [];

  return (
    <main className="mx-auto max-w-4xl px-4 md:px-8 py-10">
      <h1 className="text-2xl font-bold uppercase mb-8 text-center">Order History</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(({ node: order }) => {
            const itemCount = order.lineItems?.edges?.reduce(
              (sum, e) => sum + (e.node?.quantity || 0),
              0
            ) ?? 0;

            return (
              <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="flex flex-wrap justify-between items-center gap-2 px-5 py-4 bg-gray-50 border-b border-gray-200">
                  <div>
                    <p className="font-semibold">Order {order.name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.processedAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      {" \u00b7 "}
                      {itemCount} {itemCount === 1 ? "item" : "items"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {formatPrice(order.totalPrice?.amount, order.totalPrice?.currencyCode)}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {order.financialStatus?.toLowerCase()}
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {order.lineItems?.edges?.map(({ node: item }, i) => {
                    const handle = handleById[item.productId];

                    const thumbnail = item.image?.url ? (
                      <img
                        src={item.image.url}
                        alt={item.image.altText || item.title}
                        className="w-14 h-14 object-cover rounded-md flex-shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-gray-200 rounded-md flex-shrink-0" />
                    );

                    const details = (
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm text-dark-gray truncate ${handle ? "hover:underline" : ""}`}>
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    );

                    return handle ? (
                      <Link
                        key={i}
                        href={`/products/${handle}`}
                        className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50"
                      >
                        {thumbnail}
                        {details}
                      </Link>
                    ) : (
                      <div key={i} className="flex items-center gap-4 px-5 py-3">
                        {thumbnail}
                        {details}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link href="/apparel" className="text-sm underline hover:text-gray-600">
          Continue shopping
        </Link>
      </div>
    </main>
  );
}

