import React from "react";
import HomepageSlider from "../home/HomepageSlider";
import { ShieldCheck } from "lucide-react";

const FRAUNCES = { fontFamily: "'Fraunces', Georgia, serif" };

const AboutHero = ({ data }) => {
  // Temporary values until API data is available
  const experience = data?.experience ?? 15;
  const trekkers = data?.trekkers ?? 5000;
  const guides = data?.guides ?? 90;
  const ratings = data?.ratings ?? 4.9;

  const stats = [
    { value: `${experience}+`, label: "Years Experience" },
    { value: `${trekkers}+`, label: "Happy Trekkers" },
    { value: `${guides}%`, label: "Local Guides" },
    { value: `${ratings}/5`, label: "Traveler Rating" },
  ];

  return (
    <div className="w-full">
      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section className="relative h-[600px] overflow-hidden">
        {/* Background Slider */}
        <div className="absolute inset-0 z-0 h-full w-full">
          <HomepageSlider />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 z-10 bg-black/50" />

        {/* Hero Content */}
        <div className="relative z-20 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <div className="max-w-3xl text-white">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#9be564]">
                About Us
              </p>

              <h1
                className="text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl"
                style={FRAUNCES}
              >
                Gateway Treks Adventure And Expedition
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ABOUT SECTION
      ===================================================== */}
      <section className="bg-[#FBF9F4] px-6 py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-start">
          {/* ================= LEFT CONTENT ================= */}
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#4f8f3a]">
              About Us
            </p>

            <h2
              className="mb-6 text-3xl font-semibold leading-tight text-[#0b2418] md:text-4xl"
              style={FRAUNCES}
            >
              Your Trusted Partner For Himalayan Adventures Since 2011
            </h2>

            <p className="text-base leading-8 text-[#4b5563]">
              Gateway Treks Adventure and Expedition is a locally owned and
              operated trekking company based in the heart of Thamel,
              Kathmandu. For over 15 years, we've been crafting authentic,
              safe, and memorable Himalayan journeys for travelers from
              around the world. Our team consists of experienced local
              guides who were born and raised in the Himalayas. We know
              these mountains like the back of our hands — every trail,
              every teahouse, every hidden viewpoint. But more importantly,
              we know how to share this knowledge in a way that makes your
              trek not just successful, but truly transformative. We
              believe in responsible tourism that benefits local
              communities while preserving the pristine beauty of Nepal's
              landscapes. When you trek with us, you're not just a
              customer — you become part of our extended family.
            </p>

            {/* ================= STATISTICS ================= */}
            <div className="mt-10 grid grid-cols-2 gap-5">
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-xl bg-white px-8 py-7 shadow-sm ring-1 ring-black/5"
                >
                  <div
                    className="text-3xl font-bold text-[#0b2418]"
                    style={FRAUNCES}
                  >
                    {value}
                  </div>

                  <div className="mt-2 text-sm font-semibold uppercase tracking-wide text-[#4f8f3a]">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT IMAGE ================= */}
          <div className="relative">
            {/* Image */}
            <div className="overflow-hidden rounded-xl">
              <img
                src="/images/MOUNT.jpg"
                alt="Himalayan mountains"
                className="h-[450px] w-full object-cover shadow-lg"
              />
            </div>

            {/* ================= SECURITY CARD ================= */}
            <div className="relative z-20 mx-6 -mt-16">
              <div className="flex min-h-[130px] items-center gap-5 rounded-xl bg-white px-8 py-7 shadow-xl">
                {/* Security Icon */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#eaf6df]">
                  <ShieldCheck className="h-7 w-7 text-[#4f8f3a]" />
                </div>

                {/* Security Text */}
                <div>
                  <h3 className="text-lg font-semibold text-[#0b2418]">
                    Licensed & Insured
                  </h3>

                  <p className="mt-1 text-sm text-[#4b5563]">
                    Govt. Registered Company
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutHero;