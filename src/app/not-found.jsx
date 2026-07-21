import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";

export const metadata = {
  title: "Page Not Found | Level Up",
};

export default function NotFound() {
  return (
    <>
      <Header />

      <main className="flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 max-w-container mx-auto min-h-[60vh]">
        <Image
          src="/Level_up_logo.png"
          alt="Level Up logo"
          width={140}
          height={56}
          className="mb-8 opacity-80"
        />

        <p className="text-sm uppercase tracking-widest text-gray-400 mb-3">
          Error 404
        </p>

        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wide text-dark-gray mb-4">
          Page Not Found
        </h1>

        <p className="text-gray-600 max-w-md mb-10">
          Looks like this page got fulfilled and shipped somewhere else.
          The page you're looking for doesn't exist or may have moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/">
            <button className="text-white py-3 px-6 bg-dark-gray rounded-lg uppercase text-sm cursor-pointer hover:bg-hover-gray w-full sm:w-auto">
              Back to Home
            </button>
          </Link>
          <Link href="/apparel">
            <button className="text-dark-gray py-3 px-6 border border-gray-400 rounded-lg uppercase text-sm cursor-pointer hover:bg-gray-100 w-full sm:w-auto">
              Shop All
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}