import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

// Cards per page: 3 on mobile, 4 from the md breakpoint (768px) and up
const getPerPage = () =>
  typeof window !== "undefined" && window.innerWidth >= 768 ? 4 : 3;

const PopularPackages = () => {
  const [packages, setPackages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [perPage, setPerPage] = useState(getPerPage);

  const [wishlist, setWishlist] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
  const API_URL = `${import.meta.env.VITE_BASE_API_URL}popular-packages`;

  // =====================================================
  // RESPONSIVE PAGE SIZE
  // =====================================================

  useEffect(() => {
    const updatePerPage = () => {
      const next = getPerPage();
      setPerPage((prev) => {
        if (prev !== next) {
          setCurrentIndex(0);
        }
        return next;
      });
    };

    window.addEventListener("resize", updatePerPage);
    return () => window.removeEventListener("resize", updatePerPage);
  }, []);

  // =====================================================
  // FETCH POPULAR PACKAGES
  // =====================================================

  useEffect(() => {
    const fetchPopularPackages = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        console.log("Gateway Treks Popular Packages:", data);

        if (Array.isArray(data.popular_packages)) {
          setPackages(data.popular_packages);
        } else {
          setPackages([]);
        }
      } catch (err) {
        console.error("POPULAR PACKAGES ERROR:", err);
        setError("Unable to load popular packages.");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularPackages();
  }, []);

  // =====================================================
  // WISHLIST
  // =====================================================

  const handleWishlist = (id) => {
    if (!wishlist.includes(id)) {
      setWishlist((prev) => [...prev, id]);

      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } else {
      setWishlist((prev) => prev.filter((item) => item !== id));
    }
  };

  // =====================================================
  // NEXT
  // =====================================================

  const handleNext = () => {
    if (isAnimating || currentIndex + perPage >= packages.length) {
      return;
    }

    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex((prev) => prev + perPage);
      setIsAnimating(false);
    }, 650);
  };

  // =====================================================
  // PREVIOUS
  // =====================================================

  const handlePrevious = () => {
    if (isAnimating || currentIndex === 0) {
      return;
    }

    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex((prev) => Math.max(0, prev - perPage));
      setIsAnimating(false);
    }, 650);
  };

  // =====================================================
  // VISIBLE PACKAGES
  // =====================================================

  const visiblePackages = packages.slice(currentIndex, currentIndex + perPage);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="font-playfair text-4xl font-semibold leading-tight text-[#0b2418] md:text-5xl">
              Start Your Journey
            </h2>

            <p className="mt-4 font-montserrat text-sm tracking-wide text-gray-500 md:text-base">
              Discover unforgettable adventures across Nepal
            </p>
          </div>

          <div className="mb-8 flex items-center justify-between">
            <h3 className="font-montserrat text-2xl font-semibold text-[#0b2418]">
              Most Popular
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className={`h-[200px] animate-pulse bg-gray-200 md:h-[450px] ${
                  item === 4 ? "hidden md:block" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <h2 className="font-playfair text-4xl font-semibold text-[#0b2418] md:text-5xl">
              Start Your Journey
            </h2>

            <p className="mt-4 font-montserrat text-sm text-gray-500">
              Discover unforgettable adventures across Nepal
            </p>
          </div>

          <div className="py-10 text-center">
            <p className="font-montserrat text-gray-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-transparent px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* =====================================================
            WISHLIST POPUP
        ====================================================== */}

        {showPopup && (
          <div className="fixed right-6 top-24 z-[100] flex items-center gap-2 bg-[#0b2418] px-5 py-3 font-montserrat text-sm font-medium text-white shadow-xl">
            <Heart size={17} fill="currentColor" />
            Added to wishlist
          </div>
        )}

        {/* =====================================================
            MAIN HEADING
        ====================================================== */}

        <div className="mb-14 text-center">
          <h2 className="font-playfair text-4xl font-semibold leading-tight text-[#0b2418] md:text-5xl">
            Start Your Journey
          </h2>

          <p className="mt-4 font-montserrat text-sm tracking-wide text-gray-500 md:text-base">
            Discover unforgettable adventures across Nepal
          </p>
        </div>

        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <div className="mb-8 flex items-center justify-between">
          <h3 className="font-montserrat text-2xl font-semibold text-[#0b2418]">
            Most Popular
          </h3>

          {/* ARROWS */}

          <div className="flex items-center gap-5">
            {/* PREVIOUS */}

            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentIndex === 0 || isAnimating}
              className="text-[#0b2418] transition-colors duration-300 hover:text-pink-500 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={30} strokeWidth={1.5} />
            </button>

            {/* NEXT */}

            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex + perPage >= packages.length || isAnimating}
              className="text-[#0b2418] transition-colors duration-300 hover:text-pink-500 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight size={30} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* =====================================================
            EMPTY STATE
        ====================================================== */}

        {packages.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-montserrat text-sm tracking-wide text-gray-500">
              No popular packages found.
            </p>
          </div>
        ) : (
          /* =====================================================
             PACKAGE CARDS
          ====================================================== */

          <div className="overflow-hidden">
            <div
              className={`
                grid
                grid-cols-1
                gap-4
                md:grid-cols-2
                md:gap-6
                lg:grid-cols-4
                transition-transform
                duration-[650ms]
                ease-[cubic-bezier(0.65,0,0.35,1)]
                ${isAnimating ? "translate-x-[-100%]" : "translate-x-0"}
              `}
            >
              {visiblePackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="
                    group
                    relative
                    flex
                    overflow-hidden
                    border
                    border-gray-200
                    bg-white
                    shadow-sm
                    md:block
                    md:h-[450px]
                    md:border-0
                    md:bg-gray-200
                    md:shadow-none
                  "
                >
                  {/* =================================================
                      IMAGE WRAPPER
                      Mobile: 200x200 on the left
                      Desktop: fills the whole card
                  ================================================== */}

                  <div className="relative h-[200px] w-[200px] shrink-0 overflow-hidden md:absolute md:inset-0 md:h-full md:w-full">
                    <img
                      src={`${IMAGE_BASE_URL}${pkg.image}`}
                      alt={pkg.title || pkg.name || "Nepal adventure"}
                      className="absolute inset-0 h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/images/MOUNT.jpg";
                      }}
                    />

                    {/* HOVER OVERLAY (desktop only) */}

                    <div className="absolute inset-0 hidden bg-black/0 transition-colors duration-500 group-hover:bg-black/20 md:block" />

                    {/* BOTTOM GRADIENT (desktop only) */}

                    <div className="absolute inset-x-0 bottom-0 hidden h-1/2 bg-gradient-to-t from-black/85 via-black/30 to-transparent md:block" />

                    {/* WISHLIST */}

                    <button
                      type="button"
                      onClick={() => handleWishlist(pkg.id)}
                      className={`
                        absolute
                        right-2
                        top-2
                        z-20
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        bg-white/90
                        shadow-md
                        transition
                        duration-300
                        hover:scale-110
                        md:right-4
                        md:top-4
                        md:h-10
                        md:w-10
                        ${wishlist.includes(pkg.id) ? "text-red-500" : "text-gray-700"}`}
                    >
                      <Heart
                        size={17}
                        fill={
                          wishlist.includes(pkg.id) ? "currentColor" : "none"
                        }
                      />
                    </button>

                    {/* ACTIVITY (centered, desktop only) */}

                    <div className="absolute inset-0 hidden items-center justify-center md:flex">
                      <span className="font-montserrat text-sm font-medium uppercase tracking-[0.2em] text-white">
                        {pkg.actname || "Adventure"}
                      </span>
                    </div>
                  </div>

                  {/* =================================================
                      PACKAGE INFORMATION
                      Mobile: right side of the image
                      Desktop: bottom overlay
                  ================================================== */}

                  <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-between p-4 md:absolute md:inset-x-0 md:bottom-0 md:block md:p-5">
                    <div>
                      {/* ACTIVITY (mobile only) */}

                      <span className="font-montserrat text-[10px] font-medium uppercase tracking-[0.15em] text-pink-500 md:hidden">
                        {pkg.actname || "Adventure"}
                      </span>

                      {/* TITLE */}

                      <h4 className="mt-1 line-clamp-3 font-playfair text-lg font-semibold leading-tight text-[#0b2418] md:mt-0 md:line-clamp-none md:text-xl md:text-white">
                        {pkg.title || pkg.name}
                      </h4>

                      {/* DETAILS */}

                      <div className="mt-2 flex flex-col gap-1 md:mt-4 md:flex-row md:items-center md:justify-between">
                        {/* DURATION */}

                        {pkg.duration && (
                          <span className="font-montserrat text-xs tracking-wide text-gray-500 md:text-white/80">
                            {pkg.duration} days
                          </span>
                        )}

                        {/* PRICE */}

                        {pkg.price && (
                          <span className="font-montserrat text-sm font-semibold text-[#0b2418] md:text-white">
                            ${pkg.price}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* VIEW TRIP
                        Mobile: always visible
                        Desktop: appears on hover */}

                    <Link
                      to={`/package/${pkg.slug}`}
                      className="mt-3 inline-block self-start border-b border-[#0b2418]/70 pb-1 font-montserrat text-xs font-medium uppercase tracking-[0.15em] text-[#0b2418] opacity-100 transition-all duration-300 md:mt-5 md:border-white/70 md:text-white md:opacity-0 md:group-hover:opacity-100"
                    >
                      View Trip
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =====================================================
            VIEW MORE
        ====================================================== */}

        <div className="mt-12 flex justify-center">
          <Link
            to="/trekking-tours"
            className="bg-pink-500 px-6 py-3 font-montserrat text-sm font-semibold text-white transition duration-300 hover:bg-white hover:text-pink-500"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularPackages;