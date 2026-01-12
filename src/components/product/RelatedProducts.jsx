"use client";
import { useEffect, useState } from 'react';
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

export default function RelatedProducts({ allProducts, currentProduct }) {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (!currentProduct) return;

    const relatedProducts = [];
    const targetTags = currentProduct.tags || [];

    for (const tag of targetTags) {
      const matches = allProducts.filter(
        p => p.id !== currentProduct.id && p.tags?.includes(tag)
      );

      for (const match of matches) {
        if (!relatedProducts.some(r => r.id === match.id)) {
          relatedProducts.push(match);
        }
        if (relatedProducts.length >= 4) break;
      }

      if (relatedProducts.length >= 4) break;
    }

    setRelated(relatedProducts);
  }, [currentProduct, allProducts]);

  return (
    <section>
      <hr className="my-13 text-gray-300"/>
      <h1 className="flex justify-center uppercase text-2xl text-gray-600 font-medium tracking-wider">Related Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-1 mx-6">
        {related.map((product, i) => (
          <motion.div
            key={product.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              delay: i * 0.1,
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}