import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact Support",
  description: "Get in touch with Level Up customer support. Have questions about an order, sizing, or returns? We're here to help.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Support | Level Up",
    description: "Get in touch with Level Up customer support.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
