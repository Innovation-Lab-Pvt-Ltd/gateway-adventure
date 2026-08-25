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
    <div className="w-full overflow-x-hidden bg-white">
      {/* ================= HERO ================= */}
      <section
        id="home"
        className="relative w-full min-h-[620px] overflow-hidden sm:min-h-[680px] md:min-h-[720px] lg:min-h-[750px] ">
        {/* Homepage Slider */}
        <div className="absolute inset-0 h-full w-full">
          <HomepageSlider />
        </div>

        {/* Hero Content */}
        <div
          className="
            relative
            z-20
            flex
            min-h-[620px]
            items-center
            justify-center
            px-4
            pt-20
            pb-10
            sm:min-h-[680px]
            sm:px-6
            sm:pt-24
            md:min-h-[720px]
            lg:min-h-[750px]
          "
        >
          <div className="w-full max-w-5xl text-white">
            {/* ================= LEFT CONTENT ================= */}
            <div className="text-left">
              {/* Welcome */}
              <div className="mb-4 flex items-center gap-2 sm:mb-5">
                <span className="h-2 w-2 rounded-full bg-[#9BE564]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white sm:text-xs sm:tracking-[0.2em]">
                  Welcome to Nepal
                </span>
              </div>

              {/* Heading */}
              <h2
                className="
                  text-4xl
                  font-bold
                  leading-[1.05]
                  sm:text-5xl
                  md:text-6xl
                  lg:text-7xl
                "
              >
                Explore
                <span className="block text-[#9BE564]">Nepal</span>
              </h2>

              {/* Description */}
              <p
                className="
                  mt-4
                  max-w-xl
                  text-sm
                  leading-6
                  text-white/90
                  sm:mt-5
                  sm:text-base
                  sm:leading-7
                  md:text-lg
                "
              >
                Discover breathtaking mountains, ancient cultures, unforgettable
                adventures and the natural beauty of Nepal.
              </p>
            </div>

            {/* ================= SEARCH ================= */}
            <div
              className="
                mx-auto
                mt-7
                flex
                w-full
                max-w-2xl
                items-center
                rounded-full
                bg-white
                p-1.5
                shadow-2xl
                sm:mt-9
                sm:p-2
              "
            >
              {/* Search Icon */}
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#e8f0eb]
                  text-[#2F6B4F]
                  sm:h-12
                  sm:w-12
                "
              >
                <Search
                  size={20}
                  strokeWidth={1.8}
                  className="sm:h-[22px] sm:w-[22px]"
                />
              </div>

              {/* Input */}
              <input
                type="text"
                placeholder="Search destinations, treks or tours..."
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  px-3
                  text-xs
                  text-gray-800
                  outline-none
                  sm:px-4
                  sm:text-sm
                  md:text-base
                "
              />

              {/* Search Button */}
              <button
                className="
                  rounded-full
                  bg-[#2F6B4F]
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#285b43]
                  sm:px-6
                  sm:py-3
                  sm:text-sm
                "
              >
                Search
              </button>
            </div>

            {/* ================= FEATURES ================= */}
            <div
              className="
                mx-auto
                mt-9
                grid
                max-w-4xl
                grid-cols-2
                gap-x-4
                gap-y-7
                sm:mt-12
                sm:gap-8
                md:grid-cols-4
                lg:mt-14
              "
            >
              {/* Top Rated */}
              <div className="text-center">
                <div className="mb-2 flex justify-center text-[#9BE564]">
                  <Star size={24} strokeWidth={1.5} className="sm:h-7 sm:w-7" />
                </div>

                <h3 className="text-sm font-semibold sm:text-base">
                  Top Rated
                </h3>

                <p className="mt-1 text-[10px] text-white/70 sm:text-xs">
                  Loved by travelers
                </p>
              </div>

              {/* Secure Booking */}
              <div className="text-center">
                <div className="mb-2 flex justify-center text-[#9BE564]">
                  <ShieldCheck
                    size={24}
                    strokeWidth={1.5}
                    className="sm:h-7 sm:w-7"
                  />
                </div>

                <h3 className="text-sm font-semibold sm:text-base">
                  Secure Booking
                </h3>

                <p className="mt-1 text-[10px] text-white/70 sm:text-xs">
                  Safe & reliable
                </p>
              </div>

              {/* Private Treks */}
              <div className="text-center">
                <div className="mb-2 flex justify-center text-[#9BE564]">
                  <Mountain
                    size={24}
                    strokeWidth={1.5}
                    className="sm:h-7 sm:w-7"
                  />
                </div>

                <h3 className="text-sm font-semibold sm:text-base">
                  Private Treks
                </h3>

                <p className="mt-1 text-[10px] text-white/70 sm:text-xs">
                  Made for you
                </p>
              </div>

              {/* Best Price */}
              <div className="text-center">
                <div className="mb-2 flex justify-center text-[#9BE564]">
                  <BadgeDollarSign
                    size={24}
                    strokeWidth={1.5}
                    className="sm:h-7 sm:w-7"
                  />
                </div>

                <h3 className="text-sm font-semibold sm:text-base">
                  Best Price
                </h3>

                <p className="mt-1 text-[10px] text-white/70 sm:text-xs">
                  Price guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PACKAGES ================= */}
      <section id="trekking" className="bg-white">
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
