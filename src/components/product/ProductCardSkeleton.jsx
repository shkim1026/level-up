export default function ProductCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl p-4 bg-white flex flex-col items-center animate-pulse">
      {/* Shimmer Overlay */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      {/* Image Placeholder */}
      <div className="relative w-full aspect-square mb-3">
        <div className="w-full h-full bg-gray-200 rounded-lg" />
      </div>

      {/* Series Tag */}
      <div className="w-24 h-3 bg-gray-200 rounded mb-2" />

      {/* Title */}
      <div className="w-32 h-4 bg-gray-300 rounded mb-2" />

      {/* Price */}
      <div className="w-20 h-4 bg-gray-200 rounded" />
    </div>
  );
}
