import React, { useState } from "react";
import {
  ShieldCheck,
  BadgeCheck,
  Leaf,
  Headphones,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const GuideExpert = () => {
  const experts = [
    {
      image: "/images/Expert1.jpg",
      name: "Ram Lamichane",
      role: "FOUNDER AND LEAD GUIDE, SAGARMATHA TREK",
      description:
        "Adventure with people who know Nepal. Our experienced local team helps you discover the mountains, culture, and hidden gems of Nepal with confidence.",
      experience: "15+ years",
      benefits: [
        {
          title: "No Hidden Charges",
          description: "Everything clearly explained.",
          icon: ShieldCheck,
        },
        {
          title: "Experienced Guides",
          description: "Skilled and trained professionals.",
          icon: BadgeCheck,
        },
        {
          title: "Responsible Tourism",
          description: "Respecting Nepal's environment.",
          icon: Leaf,
        },
        {
          title: "24/7 Traveler Support",
          description: "Support throughout your journey.",
          icon: Headphones,
        },
      ],
    },

    {
      image: "/images/Expert2.jpg",
      name: "Suman Gurung",
      role: "SENIOR TREKKING GUIDE, HIMALAYAN ADVENTURES",
      description:
        "Travel Nepal with a guide who understands the trails, local communities, and mountain conditions from years of experience.",
      experience: "12+ years",
      benefits: [
        {
          title: "No Hidden Charges",
          description: "Clear and transparent pricing.",
          icon: ShieldCheck,
        },
        {
          title: "Experienced Guides",
          description: "Professional local trekking guides.",
          icon: BadgeCheck,
        },
        {
          title: "Responsible Tourism",
          description: "Supporting local communities.",
          icon: Leaf,
        },
        {
          title: "24/7 Traveler Support",
          description: "Help whenever you need it.",
          icon: Headphones,
        },
      ],
    },

    {
      image: "/images/Expert3.jpg",
      name: "Anita Thapa",
      role: "TRAVEL EXPERT, NEPAL CULTURAL TOURS",
      description:
        "Discover Nepal beyond the mountains through authentic cultural experiences, family adventures, and carefully planned journeys.",
      experience: "10+ years",
      benefits: [
        {
          title: "No Hidden Charges",
          description: "Simple and honest pricing.",
          icon: ShieldCheck,
        },
        {
          title: "Experienced Guides",
          description: "Knowledgeable local professionals.",
          icon: BadgeCheck,
        },
        {
          title: "Responsible Tourism",
          description: "Travel that benefits local people.",
          icon: Leaf,
        },
        {
          title: "24/7 Traveler Support",
          description: "Always available to assist.",
          icon: Headphones,
        },
      ],
    },

    {
      image: "/images/Expert4.jpg",
      name: "Bikash Tamang",
      role: "ADVENTURE GUIDE, NEPAL HIGHLANDS",
      description:
        "From challenging mountain trails to exciting outdoor adventures, our team helps you choose experiences that match your goals.",
      experience: "9+ years",
      benefits: [
        {
          title: "No Hidden Charges",
          description: "Everything clearly explained.",
          icon: ShieldCheck,
        },
        {
          title: "Experienced Guides",
          description: "Skilled and trained professionals.",
          icon: BadgeCheck,
        },
        {
          title: "Responsible Tourism",
          description: "Respecting Nepal's environment.",
          icon: Leaf,
        },
        {
          title: "24/7 Traveler Support",
          description: "Support throughout your journey.",
          icon: Headphones,
        },
      ],
    },

    {
      image: "/images/Expert5.jpg",
      name: "Prakash Rai",
      role: "DESTINATION EXPERT, NEPAL TRAVEL",
      description:
        "Explore Nepal comfortably with personalized travel experiences designed around your interests, schedule, and expectations.",
      experience: "8+ years",
      benefits: [
        {
          title: "No Hidden Charges",
          description: "Honest and transparent costs.",
          icon: ShieldCheck,
        },
        {
          title: "Experienced Guides",
          description: "Friendly local travel experts.",
          icon: BadgeCheck,
        },
        {
          title: "Responsible Tourism",
          description: "Supporting sustainable travel.",
          icon: Leaf,
        },
        {
          title: "24/7 Traveler Support",
          description: "We're here whenever you need us.",
          icon: Headphones,
        },
      ],
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % experts.length);
  };

  const previousImage = () => {
    setCurrent((prev) =>
      prev === 0 ? experts.length - 1 : prev - 1
    );
  };

  const expert = experts[current];

  return (
    <section className="bg-gray-100 px-4 py-5 sm:px-6 lg:px-8">

      {/* ========================================= */}
      {/* TOP SECTION - EXPERT INFORMATION + IMAGE SLIDER */}
      {/* ========================================= */}

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 lg:flex-row lg:gap-8">

        {/* ================================= */}
        {/* LEFT SIDE - EXPERT INFORMATION */}
        {/* ================================= */}

        <div className="order-2 w-full lg:order-1 lg:w-1/2">

          {/* Small Heading */}
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#4f8f3a] sm:text-sm">
            Why Travel With Us
          </p>

          {/* Main Heading */}
          <h1 className="mb-3 max-w-xl text-2xl font-bold leading-tight text-[#0b2418] sm:text-3xl lg:text-4xl">
            Adventure with People who know Nepal
          </h1>

          {/* Description */}
          <p className="mb-4 max-w-xl text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
            {expert.description}
          </p>

          {/* Expert Name + Role */}
          <div className="mb-4">

            <h3 className="mb-1 text-xl font-bold text-[#0b2418] sm:text-2xl">
              {expert.name}
            </h3>

            <p className="text-xs font-semibold uppercase tracking-wide text-[#4f8f3a] sm:text-sm">
              {expert.role}
            </p>

          </div>

          {/* Experience */}
          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eaf6df] text-[#4f8f3a]">
              <BadgeCheck size={22} />
            </div>

            <div>

              <p className="text-2xl font-bold text-[#0b2418]">
                {expert.experience}
              </p>

              <p className="text-sm text-gray-500">
                Local Himalayan expert
              </p>

            </div>

          </div>

        </div>


        {/* ================================= */}
        {/* RIGHT SIDE - IMAGE SLIDER (HORIZONTAL) */}
        {/* ================================= */}

        <div className="order-1 flex w-full justify-center lg:order-2 lg:w-1/2">

          <div className="w-full max-w-[420px]">

            {/* Outer wrapper — NOT clipped, so the name card can overlap the image edge */}
            <div className="relative">

              {/* Slider viewport (clipped) */}
              <div className="relative h-[240px] w-full overflow-hidden rounded-[28px] bg-gradient-to-b from-[#eaf6df] to-[#d9ecc9] shadow-[0_20px_45px_-15px_rgba(11,36,24,0.35)] sm:h-[280px] lg:h-[300px]">

                {experts.map((item, index) => {
                  let distance = index - current;

                  // Circular positioning
                  if (distance > experts.length / 2) {
                    distance -= experts.length;
                  }

                  if (distance < -experts.length / 2) {
                    distance += experts.length;
                  }

                  return (
                    <img
                      key={item.image}
                      src={item.image}
                      alt={item.name}
                      className="
                        absolute
                        left-1/2
                        top-1/2
                        h-[200px]
                        w-[290px]
                        rounded-2xl
                        object-cover
                        shadow-xl
                        ring-1
                        ring-white/60
                        transition-all
                        duration-500
                        ease-out
                        sm:h-[235px]
                        sm:w-[345px]
                        lg:h-[250px]
                        lg:w-[365px]
                      "
                      style={{
                        transform: `
                          translate(-50%, -50%)
                          translateX(${distance * 90}px)
                          scale(${distance === 0 ? 1 : 0.8})
                        `,

                        opacity:
                          Math.abs(distance) > 1
                            ? 0
                            : distance === 0
                            ? 1
                            : 0.4,

                        zIndex: 10 - Math.abs(distance),

                        pointerEvents:
                          distance === 0 ? "auto" : "none",
                      }}
                    />
                  );
                })}

              </div>

              {/* ================================= */}
              {/* ARROWS — sides of the frame, vertically centered */}
              {/* ================================= */}

              <button
                onClick={previousImage}
                aria-label="Previous expert"
                className="
                  absolute
                  left-3
                  top-1/2
                  z-30
                  flex
                  h-10
                  w-10
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-white/90
                  text-[#0b2418]
                  shadow-lg
                  backdrop-blur
                  transition
                  duration-200
                  hover:scale-110
                  hover:bg-white
                "
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={nextImage}
                aria-label="Next expert"
                className="
                  absolute
                  right-3
                  top-1/2
                  z-30
                  flex
                  h-10
                  w-10
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-white/90
                  text-[#0b2418]
                  shadow-lg
                  backdrop-blur
                  transition
                  duration-200
                  hover:scale-110
                  hover:bg-white
                "
              >
                <ChevronRight size={20} />
              </button>

              {/* ================================= */}
              {/* NAME CARD — straddles the image's bottom edge */}
              {/* half sits on the image, half on the page below */}
              {/* ================================= */}

              <div
                className="
                  relative
                  z-20
                  mx-8
                  -mt-9
                  rounded-2xl
                  border
                  border-white/70
                  bg-white/95
                  px-5
                  py-4
                  text-center
                  shadow-[0_12px_30px_-10px_rgba(11,36,24,0.3)]
                  backdrop-blur
                  sm:mx-10
                  sm:-mt-10
                "
              >
                <p className="text-base font-bold text-[#0b2418] sm:text-lg">
                  {expert.name}
                </p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-[#4f8f3a] sm:text-sm">
                  {expert.role}
                </p>
              </div>

            </div>

            {/* Dot indicators */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {experts.map((item, index) => (
                <button
                  key={item.image}
                  onClick={() => setCurrent(index)}
                  aria-label={`Show ${item.name}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === current
                      ? "w-6 bg-[#4f8f3a]"
                      : "w-1.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

          </div>

        </div>

      </div>


      {/* ========================================= */}
      {/* BENEFITS - BELOW WHOLE CONTAINER */}
      {/* ========================================= */}

      <div className="mx-auto mt-5 w-full max-w-6xl border-t border-gray-200 pt-5">

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {expert.benefits.map((benefit, index) => {

            const Icon = benefit.icon;

            return (
              <div
                key={index}
                className="
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  p-4
                  shadow-sm
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >

                {/* Icon */}
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#eaf6df] text-[#4f8f3a]">
                  <Icon size={21} />
                </div>

                {/* Title */}
                <h3 className="mb-1 text-base font-bold text-[#0b2418]">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-5 text-gray-500">
                  {benefit.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default GuideExpert;