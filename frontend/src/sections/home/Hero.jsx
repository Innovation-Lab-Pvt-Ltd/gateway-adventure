import NepalMap from "./NepalMap";
import PopularPackages from "./PopularPackages";
import Tripofmonth from "./Tripofmonth";
import GuideExpert from "./GuideExpert";
import TourCategories from "./TourCategories";
import HomepageSlider from "./HomepageSlider";

import {
  Mountain,
  Star,
  ShieldCheck,
  BadgeDollarSign,
  Search,
} from "lucide-react";

const Hero = () => {
  return (
    <div className="bg-white">

      {/* ================= HERO ================= */}
      <section
        id="home"
        className="relative min-h-[750px] overflow-hidden"
      >

        {/* Homepage Slider */}
        <HomepageSlider />

        {/* Hero Content */}
        <div className="relative z-20 flex min-h-[750px] items-center justify-center px-6 pt-24">
          <div className="w-full max-w-5xl text-white">

            {/* ================= LEFT CONTENT ================= */}
            <div className="text-left">

              {/* Welcome */}
              <div className="mb-5 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#9BE564]" />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  Welcome to Nepal
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
                Explore
                <span className="block text-[#9BE564]">
                  Nepal
                </span>
              </h2>

              {/* Description */}
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
                Discover breathtaking mountains, ancient cultures,
                unforgettable adventures and the natural beauty of Nepal.
              </p>

            </div>

            {/* ================= SEARCH ================= */}
            <div className="mx-auto mt-9 flex w-full max-w-2xl items-center rounded-full bg-white p-2 shadow-2xl">

              {/* Search Icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e8f0eb] text-[#2F6B4F]">
                <Search
                  size={22}
                  strokeWidth={1.8}
                />
              </div>

              {/* Input */}
              <input
                type="text"
                placeholder="Search destinations, treks or tours..."
                className="min-w-0 flex-1 bg-transparent px-4 text-sm text-gray-800 outline-none sm:text-base"
              />

              {/* Search Button */}
              <button className="rounded-full bg-[#2F6B4F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#285b43]">
                Search
              </button>
            </div>

            {/* ================= FEATURES ================= */}
            <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">

              {/* Top Rated */}
              <div className="text-center">
                <div className="mb-2 flex justify-center text-[#9BE564]">
                  <Star
                    size={28}
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="font-semibold">
                  Top Rated
                </h3>

                <p className="mt-1 text-xs text-white/70">
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

                <h3 className="font-semibold">
                  Secure Booking
                </h3>

                <p className="mt-1 text-xs text-white/70">
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

                <h3 className="font-semibold">
                  Private Treks
                </h3>

                <p className="mt-1 text-xs text-white/70">
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

                <h3 className="font-semibold">
                  Best Price
                </h3>

                <p className="mt-1 text-xs text-white/70">
                  Price guarantee
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= PACKAGES ================= */}
      <section
        id="trekking"
        className="bg-white"
      >
        <PopularPackages />
      </section>

      {/* ================= TOURS ================= */}
      <section id="tours">
        <Tripofmonth />
      </section>

      {/* ================= DESTINATIONS ================= */}
      <section id="destinations">
        <NepalMap />
      </section>

      {/* ================= GUIDE ================= */}
      <section id="GuideExpert">
        <GuideExpert />
      </section>

      {/* ================= CATEGORIES ================= */}
      <section id="Categories">
        <TourCategories />
      </section>

    </div>
  );
};

export default Hero;