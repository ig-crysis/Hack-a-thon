import { TestimonialsSection } from "@/components/ui/testinomail-marique";

const testimonials = [
  {
    author: {
      name: "Ritika Kumari",
      handle: "@RitikaKumari",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    text: "MedSecure has revolutionized how we manage patient care. The AI-powered insights are incredibly accurate and have improved our decision-making process.",
    href: "https://twitter.com/emmaai",
  },
  {
    author: {
      name: "Ankit Kumar",
      handle: "@Ankitbihar21",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    text: "The platform's user-friendly interface makes it easy for both patients and healthcare providers to navigate. It's a game-changer for our clinic.",
    href: "https://twitter.com/davidtech",
  },
  {
    author: {
      name: "Anant Bhatnagar",
      handle: "@Anantbhatnagar",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    },
    text: "MedSecure's AI health assistant is a lifesaver! It provides personalized recommendations that have greatly improved patient outcomes.",
  },
];

export function Testimonials() {
  return (
    <TestimonialsSection
      title="Trusted by healthcare professionals and patients"
      description="Join thousands of users who are already experiencing better healthcare with MedSecure"
      testimonials={testimonials}
    />
  );
}
