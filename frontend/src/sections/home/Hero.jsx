import NepalMap from "./NepalMap";
import PopularPackages from "./PopularPackages";
import Tripofmonth from "./Tripofmonth";
import GuideExpert from "./GuideExpert";
import TourCategories from "./TourCategories";
import HomepageSlider from "./HomepageSlider";
import TrekSearch from "./TrekSearch";
import BlogList from "../blog/BlogList";

import {
  Mountain,
  Star,
  ShieldCheck,
  BadgeDollarSign,
  Search,
} from "lucide-react";

const Hero = () => {
  return (
    <div className="bg-[#F4F0E7] overflow-x-hidden">
      {/* ================= HERO ================= */}
      <section id="home" className="relative min-h-[750px] overflow-hidden">
        {/* Homepage Slider */}
        <HomepageSlider />

        {/* Overlay — guarantees text stays legible no matter how bright
            the current slide is. Stronger at the bottom where the search
            bar and feature icons sit, lighter at the top. */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

        {/* Hero Content */}
        <div className="relative z-20 flex min-h-[750px] items-center justify-center px-6 pt-24">
          <div className="w-full max-w-5xl text-white">
            {/* ================= LEFT CONTENT ================= */}
            <div className="text-left">
              {/* Welcome */}
              <div className="mb-5 flex items-center gap-3">
                <span className="h-[2px] w-8 bg-[#9BE564]" />

                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9BE564]">
                  Welcome to Nepal
                </span>
              </div>

              {/* Heading */}
              <h2 className="font-serif text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
                Explore
                <span className="block font-serif italic text-[#9BE564]">
                  Nepal
                </span>
              </h2>

              {/* Description */}
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
                Discover breathtaking mountains, ancient cultures, unforgettable
                adventures and the natural beauty of Nepal.
              </p>
            </div>

            {/* ================= SEARCH ================= */}
            <TrekSearch />

            {/* ================= FEATURES ================= */}
            <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
              {/* Top Rated */}
              <div className="text-center">
                <div className="mb-2 flex justify-center text-[#9BE564]">
                  <Star size={28} strokeWidth={1.5} />
                </div>

                <h3 className="font-semibold">Top Rated</h3>

                <p className="mt-1 text-xs text-white/70">Loved by travelers</p>
              </div>

              {/* Secure Booking */}
              <div className="text-center">
                <div className="mb-2 flex justify-center text-[#9BE564]">
                  <ShieldCheck size={28} strokeWidth={1.5} />
                </div>

                <h3 className="font-semibold">Secure Booking</h3>

                <p className="mt-1 text-xs text-white/70">Safe & reliable</p>
              </div>

              {/* Private Treks */}
              <div className="text-center">
                <div className="mb-2 flex justify-center text-[#9BE564]">
                  <Mountain size={28} strokeWidth={1.5} />
                </div>

                <h3 className="font-semibold">Private Treks</h3>

                <p className="mt-1 text-xs text-white/70">Made for you</p>
              </div>

              {/* Best Price */}
              <div className="text-center">
                <div className="mb-2 flex justify-center text-[#9BE564]">
                  <BadgeDollarSign size={28} strokeWidth={1.5} />
                </div>

                <h3 className="font-semibold">Best Price</h3>

                <p className="mt-1 text-xs text-white/70">Price guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PACKAGES ================= */}
      <section id="trekking" className="bg-[#F4F0E7]">
        <PopularPackages />
      </section>

      {/* ================= TOURS ================= */}
      <section id="tours">
        <Tripofmonth />
      </section>

      <section id="Blog">
        <BlogList variant="compact"/>
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