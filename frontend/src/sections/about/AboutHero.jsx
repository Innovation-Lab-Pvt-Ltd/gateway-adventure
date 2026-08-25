
import React from "react";
import HomepageSlider from "../home/HomepageSlider";
import { ShieldCheck } from "lucide-react";

const AboutHero = ({ data }) => {
  // Temporary values until API data is available
  const experience = data?.experience ?? 15;
  const trekkers = data?.trekkers ?? 5000;
  const guides = data?.guides ?? 90;
  const ratings = data?.ratings ?? 4.9;

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
        <div className="absolute inset-0 z-10 bg-black/40"></div>

        {/* Hero Content */}
        <div className="relative z-20 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <div className="max-w-3xl text-white">

              <h4 className="mb-4 text-lg font-semibold tracking-wide">
                - About Us
              </h4>

              <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Gateway Treks Adventure And Expedition
              </h1>

            </div>
          </div>
        </div>

      </section>


      {/* =====================================================
          ABOUT SECTION
      ===================================================== */}
      <section className="bg-white px-6 py-20 lg:px-10">

        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-start">

          {/* ================= LEFT CONTENT ================= */}
          <div>

            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-green-700">
              - About Us
            </h4>

            <h2 className="mb-6 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
              Your Trusted Partner For Himalayan Adventures Since 2011
            </h2>

            <p className="text-base leading-8 text-gray-600">
              Gateway Treks Adventure and Expedition is a locally owned and
              operated trekking company based in the heart of Thamel,
              Kathmandu. For over 15 years, we've been crafting authentic,
              safe, and memorable Himalayan journeys for travelers from around
              the world. Our team consists of experienced local guides who were
              born and raised in the Himalayas. We know these mountains like
              the back of our hands — every trail, every teahouse, every hidden
              viewpoint. But more importantly, we know how to share this
              knowledge in a way that makes your trek not just successful, but
              truly transformative. We believe in responsible tourism that
              benefits local communities while preserving the pristine beauty
              of Nepal's landscapes. When you trek with us, you're not just a
              customer — you become part of our extended family.
            </p>


            {/* ================= STATISTICS ================= */}
            <div className="mt-10 grid grid-cols-2 gap-5">

              {/* Years Experience */}
              <div className="rounded-xl bg-gray-50 px-8 py-7 shadow-sm">
                <div className="text-3xl font-extrabold text-green-800">
                  {experience}+
                </div>

                <div className="mt-2 text-sm font-bold uppercase tracking-wide text-gray-600">
                  Years Experience
                </div>
              </div>


              {/* Happy Trekkers */}
              <div className="rounded-xl bg-gray-50 px-8 py-7 shadow-sm">
                <div className="text-3xl font-extrabold text-green-800">
                  {trekkers}+
                </div>

                <div className="mt-2 text-sm font-bold uppercase tracking-wide text-gray-600">
                  Happy Trekkers
                </div>
              </div>


              {/* Local Guides */}
              <div className="rounded-xl bg-gray-50 px-8 py-7 shadow-sm">
                <div className="text-3xl font-extrabold text-green-800">
                  {guides}%
                </div>

                <div className="mt-2 text-sm font-bold uppercase tracking-wide text-gray-600">
                  Local Guides
                </div>
              </div>


              {/* Traveler Rating */}
              <div className="rounded-xl bg-gray-50 px-8 py-7 shadow-sm">
                <div className="text-3xl font-extrabold text-green-800">
                  {ratings}/5
                </div>

                <div className="mt-2 text-sm font-bold uppercase tracking-wide text-gray-600">
                  Traveler Rating
                </div>
              </div>

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
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <ShieldCheck className="h-7 w-7 text-green-800" />
                </div>


                {/* Security Text */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Licensed & Insured
                  </h3>

                  <p className="mt-1 text-sm text-gray-600">
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

