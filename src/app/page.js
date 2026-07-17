"use client"

import Image from "next/image";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchFeaturedShopifyProducts } from "@/data/fetchFeaturedShopifyProducts";
import Header from "@/components/layout/Header";

const MotionImage = motion.create(Image);
const ProductCard = dynamic(() => import("@/components/product/ProductCard"));

const productVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const [products, setProducts] = useState([]);

useEffect(() => {
  fetchFeaturedShopifyProducts().then((data) => {
    setProducts(data);
  });
}, []);


  return (
    <div>
      <Header />
      
      <div className="relative w-full min-h-[50vh] flex flex-col items-center text-white">
        <Link href="/collections/warhammer" className="block w-full">
          <MotionImage 
            src="/Hero-6-2-26.png"
            alt="hero"
            width={1920}
            height={1080}
            size="100vw"
            style={{ width: "100%", height: "auto" }}
            priority
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </Link>
      </div>

      <h1 className="text-3x1 text-dark-gray font-bold mb-3 p-6 max-w-container my-0 mx-auto">Featured Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-1 pb-10 max-w-container my-0 mx-auto">
        {products.map((product, i) => (
            <motion.div
              key={product.id}
              variants={productVariants}
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
          )
        )}
      </div>
    </div>
  )
}