import FAQAccordion from "@/components/faq/FAQAccordion";
import { faqData } from "@/components/faq/faqData";

export const metadata = {
  title: "FAQ",
  description: "Answers to common questions about shipping, returns, sizing, and more.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions | Level Up",
    description: "Answers to common questions about shipping, returns, sizing, and more.",
    url: "/faq",
  },
};

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.flatMap((category) =>
      category.items.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer,
        },
      }))
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FAQAccordion />
    </>
  );
}