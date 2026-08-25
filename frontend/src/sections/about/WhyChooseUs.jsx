import React from "react";
import {
  Leaf,
  FileText,
  Compass,
  Users,
  ShieldCheck,
  Mountain,
  ArrowRight,
} from "lucide-react";

const cards = [
  {
    icon: Leaf,
    title: "Sustainable Tourism & CSR",
    desc: "Our commitment to responsible travel, environmental conservation, and community development in the Himalayas.",
    cta: "Learn More",
    image: "/images/sustainable-tourism.png",
  },
  {
    icon: FileText,
    title: "Terms & Conditions",
    desc: "Transparent booking policies, cancellation terms, and everything you need to know before your trek.",
    cta: "Read More",
    image: "/images/terms-conditions.jpg",
  },
  {
    icon: Compass,
    title: "Why Travel With Gateway",
    desc: "Local expertise, personalized service, safety-first approach, and unforgettable Himalayan experiences.",
    cta: "Discover Why",
    image: "/images/gateway-expertise.jpg",
  },
  {
    icon: Users,
    title: "Meet Our Team",
    desc: "Meet the passionate guides and support staff who make every trek safe, enjoyable, and memorable.",
    cta: "Meet The Team",
    image: "/images/trekking-team.jpg",
  },
  {
    icon: ShieldCheck,
    title: "Registrations & Affiliations",
    desc: "Government licensed, NMA & TAN member, and certified for your safety and peace of mind.",
    cta: "View Credentials",
    image: "/images/registrations.jpg",
  },
  {
    icon: Mountain,
    title: "Ready to Start Your Adventure?",
    desc: "Get in touch with our experts for a free consultation and start planning your dream trek today.",
    cta: "Contact Us",
    image: "/images/adventure.jpg",
  },
];

const WhyChooseUs = () => {
  return (
    <div
      className="px-6 py-20 sm:px-10 lg:px-16"
      style={{ backgroundColor: "#F4F0E7" }}
    >
      <div className="mx-auto max-w-6xl">

        {/* ================= HEADER ================= */}
        <div className="mb-14 text-center">
          <h4 className="mb-3 text-xs font-semibold tracking-[0.25em] text-[#6E7F5E]">
            — DISCOVER MORE
          </h4>

          <h1
            className="mb-5 text-3xl font-semibold text-[#2A2A24] sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            Why Choose Gateway Treks
          </h1>

          <p className="mx-auto max-w-xl text-base leading-relaxed text-[#6B6A5F]">
            Learn about our values, commitments, and what makes us different
          </p>
        </div>

        {/* ================= CARDS ================= */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(
            ({ icon: Icon, title, desc, cta, image }, i) => (
              <div
                key={i}
                className="group flex min-h-[440px] flex-col overflow-hidden rounded-xl border border-[#DAD4C4] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#2F4732] hover:shadow-lg"
              >
                {/* ================= IMAGE ================= */}
                <div className="relative h-44 w-full shrink-0 overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-black/30" />

                  {/* Icon */}
                  <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-lg bg-white/90 text-[#2F4732] shadow-sm transition-all duration-300 group-hover:bg-[#2F4732] group-hover:text-white">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                </div>

                {/* ================= CONTENT ================= */}
                <div className="flex flex-1 flex-col p-7">
                  <h2 className="mb-2 text-lg font-semibold leading-snug text-[#2A2A24]">
                    {title}
                  </h2>

                  {/* Animated underline */}
                  <span className="mb-4 block h-[2px] w-0 bg-[#2F4732] transition-all duration-300 group-hover:w-10" />

                  <p className="text-sm leading-7 text-[#6B6A5F]">
                    {desc}
                  </p>

                  {/* CTA pushed to bottom */}
                  <div className="mt-auto pt-7">
                    <button className="flex items-center gap-2 text-sm font-semibold text-[#2F4732]">
                      {cta}

                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;