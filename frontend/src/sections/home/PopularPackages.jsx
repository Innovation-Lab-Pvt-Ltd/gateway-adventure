import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

const PopularPackages = () => {
  const [packages, setPackages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const [wishlist, setWishlist] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
  const API_URL = `${import.meta.env.VITE_BASE_API_URL}popular-packages`;

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
    if (isAnimating || currentIndex + 3 >= packages.length) {
      return;
    }

    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 3);
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
      setCurrentIndex((prev) => Math.max(0, prev - 3));
      setIsAnimating(false);
    }, 650);
  };

  // =====================================================
  // VISIBLE PACKAGES
  // =====================================================

  const visiblePackages = packages.slice(currentIndex, currentIndex + 3);

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

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-[600px] animate-pulse bg-gray-200" />
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
          <div
            className="
              fixed
              right-6
              top-24
              z-[100]
              flex
              items-center
              gap-2
              bg-[#0b2418]
              px-5
              py-3
              font-montserrat
              text-sm
              font-medium
              text-white
              shadow-xl
            "
          >
            <Heart size={17} fill="currentColor" />
            Added to wishlist
          </div>
        )}

        {/* =====================================================
            MAIN HEADING
        ====================================================== */}

        <div className="mb-14 text-center">
          <h2
            className="
              font-playfair
              text-4xl
              font-semibold
              leading-tight
              text-[#0b2418]
              md:text-5xl
            "
          >
            Start Your Journey
          </h2>

          <p
            className="
              mt-4
              font-montserrat
              text-sm
              tracking-wide
              text-gray-500
              md:text-base
            "
          >
            Discover unforgettable adventures across Nepal
          </p>
        </div>

        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <div className="mb-8 flex items-center justify-between">
          <h3
            className="
              font-montserrat
              text-2xl
              font-semibold
              text-[#0b2418]
            "
          >
            Most Popular
          </h3>

          {/* ARROWS */}

          <div className="flex items-center gap-5">
            {/* PREVIOUS */}

            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentIndex === 0 || isAnimating}
              className="
                text-[#0b2418]
                transition-colors
                duration-300
                hover:text-pink-500
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
            >
              <ChevronLeft size={30} strokeWidth={1.5} />
            </button>

            {/* NEXT */}

            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex + 3 >= packages.length || isAnimating}
              className="
                text-[#0b2418]
                transition-colors
                duration-300
                hover:text-pink-500
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
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
            <p
              className="
                font-montserrat
                text-sm
                tracking-wide
                text-gray-500
              "
            >
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
                gap-6
                md:grid-cols-2
                lg:grid-cols-3
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
                    block
                    h-[600px]
                    overflow-hidden
                    bg-gray-200
                  "
                >
                  {/* =================================================
                      IMAGE
                  ================================================== */}

                  <img
                    src={`${IMAGE_BASE_URL}${pkg.image}`}
                    alt={pkg.title || pkg.name || "Nepal adventure"}
                    className="
                      absolute
                      inset-0
                      h-full
                      w-full
                      object-cover
                    "
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/MOUNT.jpg";
                    }}
                  />

                  {/* =================================================
                      HOVER OVERLAY
                  ================================================== */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-black/0
                      transition-colors
                      duration-500
                      group-hover:bg-black/20
                    "
                  />

                  {/* =================================================
                      BOTTOM GRADIENT
                  ================================================== */}

                  <div
                    className="
                      absolute
                      inset-x-0
                      bottom-0
                      h-1/2
                      bg-gradient-to-t
                      from-black/85
                      via-black/30
                      to-transparent
                    "
                  />

                  {/* =================================================
                      WISHLIST
                  ================================================== */}

                  <button
                    type="button"
                    onClick={() => handleWishlist(pkg.id)}
                    className={`
                      absolute
                      right-5
                      top-5
                      z-20
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-white/90
                      shadow-md
                      transition
                      duration-300
                      hover:scale-110 ${wishlist.includes(pkg.id) ? "text-red-500" : "text-gray-700"}`}
                  >
                    <Heart
                      size={19}
                      fill={wishlist.includes(pkg.id) ? "currentColor" : "none"}
                    />
                  </button>

                  {/* =================================================
                      ACTIVITY
                  ================================================== */}

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="
                        font-montserrat
                        text-sm
                        font-medium
                        uppercase
                        tracking-[0.2em]
                        text-white
                      "
                    >
                      {pkg.actname || "Adventure"}
                    </span>
                  </div>

                  {/* =================================================
                      PACKAGE INFORMATION
                  ================================================== */}

                  <div
                    className="
                      absolute
                      bottom-0
                      left-0
                      right-0
                      p-7
                    "
                  >
                    {/* TITLE */}

                    <h4
                      className="
                        font-playfair
                        text-2xl
                        font-semibold
                        leading-tight
                        text-white
                      "
                    >
                      {pkg.title || pkg.name}
                    </h4>

                    {/* DETAILS */}

                    <div
                      className="
                        mt-4
                        flex
                        items-center
                        justify-between
                      "
                    >
                      {/* DURATION */}

                      {pkg.duration && (
                        <span
                          className="
                            font-montserrat
                            text-xs
                            tracking-wide
                            text-white/80
                          "
                        >
                          {pkg.duration} days
                        </span>
                      )}

                      {/* PRICE */}

                      {pkg.price && (
                        <span
                          className="
                            font-montserrat
                            text-sm
                            font-semibold
                            text-white
                          "
                        >
                          ${pkg.price}
                        </span>
                      )}
                    </div>

                    {/* VIEW TRIP */}

                    <Link
                      to={`/package/${pkg.slug}`}
                      className="
                        mt-5
                        inline-block
                        border-b
                        border-white/70
                        pb-1
                        font-montserrat
                        text-xs
                        font-medium
                        uppercase
                        tracking-[0.15em]
                        text-white
                        opacity-0
                        transition-all
                        duration-300
                        group-hover:opacity-100
                      "
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
            className="
              bg-pink-500
              px-6
              py-3
              font-montserrat
              text-sm
              font-semibold
              text-white
              transition
              duration-300
              hover:bg-white
              hover:text-pink-500
            "
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularPackages;
