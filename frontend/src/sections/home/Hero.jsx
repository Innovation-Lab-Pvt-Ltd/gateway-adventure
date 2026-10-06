import { useState } from "react";

import NepalMap from "./NepalMap";
import PopularPackages from "./PopularPackages";
import Tripofmonth from "./Tripofmonth";
import GuideExpert from "./GuideExpert";
import TourCategories from "./TourCategories";
import HomepageSlider from "./HomepageSlider";
import BlogList from "../blog/BlogList";
import TrekSearch from "./TrekSearch";
import Whatsapp from "./Whatsapp";
import Reveal from "./Reveal";
import {
  Mountain,
  Star,
  ShieldCheck,
  BadgeDollarSign,
} from "lucide-react";

// =====================================================
// WHATSAPP GLYPH
// lucide-react has no brand icon, so this is a small
// inline SVG standing in for it.
// =====================================================

const WhatsAppGlyph = ({ className }) => (
  <svg
    viewBox="0 0 32 32"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M16.02 3C9.4 3 4 8.36 4 14.98c0 2.2.6 4.26 1.63 6.04L4 29l8.2-1.58a12.9 12.9 0 0 0 3.82.58c6.62 0 12.02-5.36 12.02-11.98C28.04 8.36 22.65 3 16.02 3Zm0 21.9a9.8 9.8 0 0 1-5-1.37l-.36-.21-4.86.94.94-4.75-.24-.38a9.83 9.83 0 0 1-1.5-5.2c0-5.46 4.47-9.9 9.98-9.9 5.5 0 9.97 4.44 9.97 9.9 0 5.47-4.47 9.97-9.93 9.97Zm5.46-7.42c-.3-.15-1.76-.87-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.06 2.88 1.21 3.08c.15.2 2.08 3.18 5.05 4.46.7.3 1.25.48 1.68.62.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
  </svg>
);

const Hero = () => {
  const [showWhatsapp, setShowWhatsapp] = useState(false);

  return (
    <div className="overflow-x-hidden bg-[#F4F0E7]">

      {/* ================= HERO ================= */}
      <section
        id="home"
        className="relative min-h-[750px] overflow-hidden"
      >
        {/* Homepage Slider */}
        <HomepageSlider />

        {/* Light Overlay */}
        <div className="absolute inset-0 z-10 bg-black/10" />

        {/* ================= HERO CONTENT ================= */}
        <div className="relative z-20 flex min-h-[750px] items-center justify-center px-6">

          <div className="w-full max-w-5xl text-center text-white">

            {/* ================= WELCOME ================= */}
            <div className="mb-5 flex items-center justify-center gap-3">

              <span className="h-[2px] w-10 bg-[#9BE564]" />

              <span className="font-montserrat text-sm font-small uppercase tracking-[0.3em] text-[#9BE564] sm:text-base">
                Welcome to Nepal
              </span>

              <span className="h-[2px] w-10 bg-[#9BE564]" />

            </div>

            {/* ================= MAIN HEADING ================= */}
            {/* <h1 className="font-playfair text-5xl font-medium leading-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">

              Explore

              <span className="block text-[#9BE564]">
                Nepal
              </span>

            </h1> */}

            {/* ================= SCRIPT TEXT ================= */}
            <p className="mt-3 font-greatvibes text-4xl text-white sm:text-5xl md:text-6xl">
              Discover the Himalayas
            </p>

            {/* ================= DESCRIPTION ================= */}
            <p className="mx-auto mt-5 max-w-2xl font-montserrat text-sm leading-7 text-white/90 sm:text-base md:text-lg">
              Discover breathtaking mountains, ancient cultures,
              unforgettable adventures and the natural beauty of Nepal.
            </p>

            {/* ================= FEATURES ================= */}
            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">

              {/* Top Rated */}
              <div className="text-center">

                <div className="mb-2 flex justify-center text-[#9BE564]">
                  <Star
                    size={28}
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="font-montserrat text-sm font-semibold sm:text-base">
                  Top Rated
                </h3>

                <p className="mt-1 font-montserrat text-xs text-white/70">
                  Loved by travelers
                </p>

              </div>

              {/* Secure Booking */}
              <div className="text-center">

                <div className="mb-2 flex justify-center text-[#9BE564]">
                  <ShieldCheck
                    size={28}
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="font-montserrat text-sm font-semibold sm:text-base">
                  Secure Booking
                </h3>

                <p className="mt-1 font-montserrat text-xs text-white/70">
                  Safe & reliable
                </p>

              </div>

              {/* Private Treks */}
              <div className="text-center">

                <div className="mb-2 flex justify-center text-[#9BE564]">
                  <Mountain
                    size={28}
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="font-montserrat text-sm font-semibold sm:text-base">
                  Private Treks
                </h3>

                <p className="mt-1 font-montserrat text-xs text-white/70">
                  Made for you
                </p>

              </div>

              {/* Best Price */}
              <div className="text-center">

                <div className="mb-2 flex justify-center text-[#9BE564]">
                  <BadgeDollarSign
                    size={28}
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="font-montserrat text-sm font-semibold sm:text-base">
                  Best Price
                </h3>

                <p className="mt-1 font-montserrat text-xs text-white/70">
                  Price guarantee
                </p>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          Every section below fades + slides in once when it
          scrolls into view (see Reveal.jsx).
      ====================================================== */}

      {/* ================= TREK SEARCH ================= */}
      <Reveal as="section" id="trek-search">
        <TrekSearch />
      </Reveal>

      {/* ================= PACKAGES ================= */}
      <Reveal
        as="section"
        id="trekking"
        className="bg-[#F4F0E7]"
      >
        <PopularPackages />
      </Reveal>
       {/* <section id="trek-search">
        <TrekExplorer />
      </section> */}

      {/* ================= TOURS ================= */}
      <Reveal as="section" id="tours">
        <Tripofmonth />
      </Reveal>

      {/* ================= BLOG ================= */}
      <Reveal as="section" id="Blog">
        <BlogList variant="compact" />
      </Reveal>

      {/* ================= DESTINATIONS ================= */}
      <Reveal as="section" id="destinations">
        <NepalMap />
      </Reveal>

      {/* ================= GUIDE ================= */}
      <Reveal as="section" id="GuideExpert">
        <GuideExpert />
      </Reveal>

      {/* ================= CATEGORIES ================= */}
      <Reveal as="section" id="Categories">
        <TourCategories />
      </Reveal>

      {/* ================= WHATSAPP STICKY BUTTON ================= */}
      <button
        type="button"
        onClick={() => setShowWhatsapp(true)}
        aria-label="Chat with us on WhatsApp"
        className="
          fixed
          bottom-6
          right-6
          z-50
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-[#F4F0E7]
          text-[#25D366]
          shadow-[0_10px_30px_-8px_rgba(11,36,24,0.45)]
          ring-1
          ring-black/5
          transition
          duration-300
          hover:bg-[#0b2418]
          hover:text-[#9BE564]
          hover:scale-105
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#9BE564]
          focus-visible:ring-offset-2
        "
      >
        <WhatsAppGlyph className="h-7 w-7" />
      </button>

      {/* ================= WHATSAPP POPUP ================= */}
      {showWhatsapp && (
        <Whatsapp
          onClose={() => setShowWhatsapp(false)}
        />
      )}

    </div>
  );
};

export default Hero;