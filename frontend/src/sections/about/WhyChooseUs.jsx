
import React from "react";
import {
  Leaf,
  FileText,
  Compass,
  ShieldCheck,
  Mountain,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const cards = [
  {
    icon: Leaf,
    title: "About Us",
    desc: "Learn more about Gateway Treks, our story, values, and commitment to creating unforgettable Himalayan experiences.",
    cta: "Learn More",
    image: "/images/sustainable-tourism.png",
    path: "/pagedetail/about-us",
  },
  {
    icon: FileText,
    title: "Legal Documents",
    desc: "View our official registrations, certifications, licenses, and other important legal documents.",
    cta: "View Documents",
    image: "/images/registrations.jpg",
    path: "/pagedetail/legal-documents",
  },
  {
    icon: Mountain,
    title: "Contact Us",
    desc: "Get in touch with our team for a free consultation, trip planning assistance, or any questions about your adventure.",
    cta: "Contact Us",
    image: "/images/adventure.jpg",
    path: "/pagedetail/contact-us",
  },
  {
    icon: Compass,
    title: "Why Travel with GATEs",
    desc: "Discover what makes Gateway Treks different, from local expertise and personalized service to safety and unforgettable experiences.",
    cta: "Discover Why",
    image: "/images/gateway-expertise.jpg",
    path: "/pagedetail/why-travel-with-us",
  },
  {
    icon: FileText,
    title: "Terms and Conditions",
    desc: "Review our booking policies, cancellation terms, responsibilities, and other important conditions before your trip.",
    cta: "Read More",
    image: "/images/terms-conditions.jpg",
    path: "/pagedetail/terms-conditions",
  },
  {
    icon: ShieldCheck,
    title: "Privacy Policy",
    desc: "Learn how Gateway Treks collects, uses, protects, and manages your personal information.",
    cta: "Read Policy",
    image: "/images/privacy-policy.jpg",
    path: "/pagedetail/privacy-policy",
  },


];

const WhyChooseUs = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <section
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
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
            }}
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
            ({ icon: Icon, title, desc, cta, image, path }) => (
              <div
                key={path}
                className="group flex min-h-[440px] flex-col overflow-hidden rounded-xl border border-[#DAD4C4] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#2F4732] hover:shadow-lg"
              >

                {/* ================= IMAGE ================= */}

                <div className="relative h-44 w-full shrink-0 overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />

                  {/* Image Overlay */}

                  <div className="absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-black/30" />

                  {/* Icon */}

                  <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-lg bg-white/90 text-[#2F4732] shadow-sm transition-all duration-300 group-hover:bg-[#2F4732] group-hover:text-white">
                    <Icon
                      size={20}
                      strokeWidth={1.75}
                    />
                  </div>
                </div>

                {/* ================= CONTENT ================= */}

                <div className="flex flex-1 flex-col p-7">

                  {/* Title */}

                  <h2 className="mb-2 text-lg font-semibold leading-snug text-[#2A2A24]">
                    {title}
                  </h2>

                  {/* Animated Underline */}

                  <span className="mb-4 block h-[2px] w-0 bg-[#2F4732] transition-all duration-300 group-hover:w-10" />

                  {/* Description */}

                  <p className="text-sm leading-7 text-[#6B6A5F]">
                    {desc}
                  </p>

                  {/* CTA */}

                  <div className="mt-auto pt-7">
                    <button
                      type="button"
                      onClick={() => handleNavigate(path)}
                      className="group/button flex items-center gap-2 text-sm font-semibold text-[#2F4732] transition-colors duration-300 hover:text-[#1f3023]"
                    >
                      {cta}

                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover/button:translate-x-1"
                      />
                    </button>
                  </div>

                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

