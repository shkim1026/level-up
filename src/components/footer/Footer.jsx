import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 p-4 text-center text-sm text-gray-600">
      <nav>
        <Link href="/faq" className="text-dark-gray">FAQ</Link>
      </nav>
      © {new Date().getFullYear()} Level Up
    </footer>
  )
}