import { Suspense } from "react";
import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";
import ApparelData from "./ApparelData"; 

export default function ApparelPage() {
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ApparelData />
    </Suspense>
  );
}