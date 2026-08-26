import React from "react";
import { Mail } from "lucide-react";

const team = [
  {
    name: "Pasang Sherpa",
    role: "FOUNDER & LEAD GUIDE",
    desc: "Summited Everest six times and has led treks across the Himalayas for over 15 years.",
    image: "/images/Expert1.jpg",
    email: "pasang@gatewaytreks.com",
  },
  {
    name: "Nima Dorjee",
    role: "SENIOR TREKKING GUIDE",
    desc: "Born and raised in the Khumbu region, Nima brings deep local knowledge to every route.",
    image: "/images/nima-dorjee.jpg",
    email: "nima@gatewaytreks.com",
  },
  {
    name: "Lhakpa Tenzing",
    role: "HIGH-ALTITUDE SPECIALIST",
    desc: "Certified in wilderness first response, Lhakpa keeps every group safe above 5,000m.",
    image: "/images/lhakpa-tenzing.jpg",
    email: "lhakpa@gatewaytreks.com",
  },
  {
    name: "Maya Gurung",
    role: "OPERATIONS MANAGER",
    desc: "Coordinates logistics, permits, and porters so every trek runs without a hitch.",
    image: "/images/maya-gurung.jpg",
    email: "maya@gatewaytreks.com",
  },
  {
    name: "Tashi Lama",
    role: "CULTURAL GUIDE",
    desc: "Shares the history, monasteries, and traditions of the Himalayas along every route.",
    image: "/images/tashi-lama.jpg",
    email: "tashi@gatewaytreks.com",
  },
  {
    name: "Dawa Sherpa",
    role: "GUEST RELATIONS LEAD",
    desc: "Your first point of contact, making sure every trip is planned around your needs.",
    image: "/images/dawa-sherpa.jpg",
    email: "dawa@gatewaytreks.com",
  },
];

const OurPeople = () => {
  return (
    <div
      className="px-6 py-20 sm:px-10 lg:px-16"
      
    >
      <div className="mx-auto max-w-6xl">
        {/* ================= HEADER ================= */}
        <div className="mb-14 text-center">
          <h4 className="mb-3 text-xs font-semibold tracking-[0.25em] text-[#6E7F5E]">
            — OUR PEOPLE
          </h4>

          <h1
            className="mb-5 text-3xl font-semibold text-[#2A2A24] sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            Meet The Gateway Family
          </h1>

          <p className="mx-auto max-w-xl text-base leading-relaxed text-[#6B6A5F]">
            The experienced professionals who will guide you through the
            Himalayas
          </p>
        </div>

        {/* ================= TEAM CARDS ================= */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map(({ name, role, desc, image, email }, i) => (
            <div
              key={i}
              className="group relative flex min-h-[470px] flex-col overflow-hidden rounded-xl border border-[#DAD4C4] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#2F4732] hover:shadow-lg"
            >
              {/* ================= IMAGE ================= */}
              <div className="relative h-60 w-full shrink-0 overflow-hidden bg-[#DAD4C4]">
                <img
                  src={image}
                  alt={name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/25" />

                {/* ================= MAIL ICON ================= */}
                <a
                  href={`mailto:${email}`}
                  aria-label={`Email ${name}`}
                  className="absolute bottom-5 left-1/2 flex h-11 w-11 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-[#E3EBDD] text-[#2F4732] opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-1/2 group-hover:opacity-100 hover:bg-[#2F4732] hover:text-white"
                >
                  <Mail size={18} strokeWidth={1.75} />
                </a>
              </div>

              {/* ================= CONTENT ================= */}
              <div className="flex flex-1 flex-col p-7">
                <h2 className="mb-2 text-lg font-semibold leading-snug text-[#2A2A24]">
                  {name}
                </h2>

                <div className="mb-4 text-xs font-semibold tracking-[0.15em] text-[#6E7F5E]">
                  {role}
                </div>

                {/* Animated line */}
                <span className="mb-4 block h-[2px] w-0 bg-[#2F4732] transition-all duration-300 group-hover:w-10" />

                <p className="text-sm leading-7 text-[#6B6A5F]">{desc}</p>

                {/* ================= LEARN MORE ================= */}
                <div className="mt-auto flex justify-center pt-7">
                  <button className="rounded-lg bg-[#E3EBDD] px-6 py-2.5 text-sm font-semibold text-[#2F4732] transition-all duration-300 hover:bg-[#2F4732] hover:text-white">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurPeople;
