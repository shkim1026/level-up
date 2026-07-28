export default function ProductCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl p-4 bg-white flex flex-col items-center animate-pulse w-full">
      {/* Shimmer Overlay */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-10" />

      {/* Image Placeholder */}
      <div className="relative w-full aspect-square bg-gray-200 rounded-lg" />

      {/* Series Tag Placeholder */}
      <div className="w-20 h-3 bg-gray-200 rounded my-2" />

      {/* Title Placeholder */}
      <div className="w-32 h-4 bg-gray-200 rounded mb-1" />

      {/* Price Placeholder */}
      <div className="w-16 h-4 bg-gray-200 rounded mt-1" />
    </div>
  );
}

