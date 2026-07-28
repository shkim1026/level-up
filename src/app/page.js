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
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    fetchFeaturedShopifyProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 639px)");
    setIsMobile(mql.matches);

    const handleChange = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handleChange);

    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="pb-[3rem]">
      <Header />
      
      <div className="relative w-full flex flex-col justify-center items-center text-white">
        {isMobile !== null && (
          <Link href="/collections/warhammer" className="block w-full">
            <MotionImage
              src={isMobile ? "/Hero-7-19-26-mobile.jpg" : "/Hero-6-2-26.png"}
              alt="Level Up Warhammer Collection Featured Apparel Banner"
              width={1920}
              height={1080}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              priority
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </Link>
        )}
      </div>

      <h1 className="text-xl text-dark-gray font-bold mt-3 p-6 max-w-container my-0 mx-auto">Featured Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-1 max-w-container my-0 mx-auto">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 max-w-container mx-auto py-[5rem]">
        <Link href="/collections/cowboy-bebop" className="block w-full p-4">
          <MotionImage 
            src="/cowboybebopcollection-banner.jpg" 
            alt="Cowboy Bebop Collection Banner"
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ width: "100%", height: "auto" }}
            width={960}
            height={640}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.3,
              duration: 0.5,
              ease: "easeOut",
            }}
          />
        </Link>
        <Link href="/collections/portal" className="block w-full p-4">
          <MotionImage 
            src="/portalcollection-banner.jpg" 
            alt="Portal Collection Banner"
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ width: "100%", height: "auto" }}
            width={960}
            height={640}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.6,
              duration: 0.5,
              ease: "easeOut",
            }}
          />
        </Link>
      </div>
    </div>
  )
}