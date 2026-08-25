import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Mountain,
  Star,
  Heart,
  MapPin,
  Gauge,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import PopularPackage from "./PopularPackage";

// Gateway Treks API
const API_URL = "/api/v1/popular-packages";

const PopularPackages = () => {
  const [packages, setPackages] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
          throw new Error(
            `API request failed with status ${response.status}`
          );
        }

        const data = await response.json();

        console.log("Gateway Treks API Response:", data);

        if (Array.isArray(data.popular_packages)) {
          setPackages(data.popular_packages);
        } else {
          throw new Error("popular_packages is not an array");
        }
      } catch (err) {
        console.error(
          "GATEWAY TREKS POPULAR PACKAGES ERROR:",
          err
        );

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
      setWishlist((prev) =>
        prev.filter((item) => item !== id)
      );
    }
  };

  // =====================================================
  // VIEW FULL TRIP
  // =====================================================

  const handleViewTrip = (pkg) => {
    if (!pkg?.id) {
      console.error("Package ID is missing:", pkg);
      return;
    }

    navigate(`/packages/${pkg.id}`, {
      state: {
        trip: pkg,
      },
    });
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <section className="px-6 py-16 md:px-10 lg:px-16">
        <div className="mb-10 max-w-2xl">
          <h5 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#4f8f3a]">
            - Popular trekking packages
          </h5>

          <h1 className="mb-4 text-3xl font-bold text-[#0b2418] sm:text-4xl lg:text-5xl">
            Find Your Next Adventure
          </h1>

          <p className="text-base leading-7 text-gray-500">
            Handpick journeys through Nepal's most
            spectacular landscapes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-[430px] animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      </section>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <section className="px-6 py-16 md:px-10 lg:px-16">
        <div className="rounded-xl bg-red-50 p-6 text-center">
          <p className="font-medium text-red-500">
            {error}
          </p>
        </div>
      </section>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <section className="px-6 py-16 md:px-10 lg:px-16">

      {/* =================================================
          WISHLIST POPUP
      ================================================= */}

      {showPopup && (
        <div className="fixed right-6 top-24 z-[100] flex items-center gap-2 rounded-xl bg-[#0b2418] px-5 py-3 text-sm font-medium text-white shadow-xl">
          <Heart
            size={17}
            fill="currentColor"
          />

          Added to wishlist
        </div>
      )}

      {/* =================================================
          HEADING
      ================================================= */}

      <div className="mb-10 max-w-2xl">
        <h5 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#4f8f3a]">
          - Popular trekking packages
        </h5>

        <h1 className="mb-4 text-3xl font-bold text-[#0b2418] sm:text-4xl lg:text-5xl">
          Find Your Next Adventure
        </h1>

        <p className="text-base leading-7 text-gray-500">
          Handpick journeys through Nepal's most
          spectacular landscapes.
        </p>
      </div>

      {/* =================================================
          EMPTY
      ================================================= */}

      {packages.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-gray-500">
            No popular packages found.
          </p>
        </div>
      ) : (

        /* =================================================
           PACKAGE GRID
        ================================================= */

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {packages.map((pkg) => {

            // =================================================
            // DATA FROM GATEWAY API
            // =================================================

            const id = pkg.id;

            const title =
              pkg.title ||
              pkg.name ||
              "Untitled Package";

            const region =
              pkg.destslug ||
              "Nepal";

            // =================================================
            // DIFFICULTY
            // =================================================

            const difficulty =
              Number(pkg.grade_id) === 1
                ? "Easy"
                : Number(pkg.grade_id) === 2
                ? "Moderate"
                : Number(pkg.grade_id) === 3
                ? "Challenging"
                : "Moderate";

            // =================================================
            // DURATION
            // =================================================

            const days = pkg.duration
              ? `${pkg.duration} days`
              : "N/A";

            // =================================================
            // ALTITUDE
            // =================================================

            const height =
              pkg.max_altitude || "N/A";

            // =================================================
            // RATING
            // =================================================

            const rating =
              pkg.rating ?? "N/A";

            // =================================================
            // PRICE
            // =================================================

            const price =
              pkg.price ?? null;

            // =================================================
            // DISCOUNT
            // =================================================

            const hasDiscount =
              pkg.has_discount === 1 ||
              pkg.has_discount === true;

            const discountText =
              pkg.discount_msg ||
              (
                hasDiscount &&
                pkg.discount_amt
                  ? `Save ${pkg.discount_amt}`
                  : ""
              );

            // =================================================
            // IMAGE
            // =================================================

            const image = pkg.image;

            // =================================================
            // CARD
            // =================================================

            return (
              <div
                key={id}
                className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* =================================================
                    IMAGE
                ================================================= */}

                <div className="group relative h-60 overflow-hidden">

                  <img
                    src={`https://gatewaytreks.com/public/uploads/frontend/full/${pkg.image}`}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      console.error(
                        "Gateway Treks image failed:",
                        image
                      );

                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "/images/MOUNT.jpg";
                    }}
                  />

                  {/* DARK OVERLAY */}

                  <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/30" />

                  {/* =================================================
                      VIEW DETAIL BUTTON
                  ================================================= */}

                  <div className="absolute bottom-4 left-0 right-0 flex justify-center translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedPackage(pkg)
                      }
                      className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0b2418] shadow-lg transition duration-300 hover:scale-105 hover:bg-[#9be564]"
                    >
                      View Detail
                    </button>

                  </div>

                  {/* =================================================
                      DISCOUNT
                  ================================================= */}

                  {discountText && (
                    <div className="absolute left-4 top-4 rounded-full bg-[#9be564] px-3 py-1.5 text-xs font-bold text-[#0b2418] shadow-md">
                      {discountText}
                    </div>
                  )}

                  {/* =================================================
                      WISHLIST
                  ================================================= */}

                  <button
                    type="button"
                    onClick={() =>
                      handleWishlist(id)
                    }
                    className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition duration-300 hover:scale-110 ${
                      wishlist.includes(id)
                        ? "text-red-500"
                        : "text-gray-700"
                    }`}
                  >
                    <Heart
                      size={20}
                      fill={
                        wishlist.includes(id)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>

                </div>

                {/* =================================================
                    INFORMATION
                ================================================= */}

                <div className="p-4">

                  {/* REGION + DIFFICULTY */}

                  <div className="mb-2 flex items-center justify-between gap-2">

                    <div className="flex min-w-0 items-center gap-1.5">

                      <MapPin
                        size={14}
                        className="shrink-0 text-[#4f8f3a]"
                      />

                      <span className="truncate text-xs font-semibold uppercase tracking-wide text-[#4f8f3a]">
                        {region}
                      </span>

                    </div>

                    <div className="flex shrink-0 items-center gap-1 rounded-full border border-[#4f8f3a]/30 bg-[#eaf6df] px-2 py-1 text-[10px] font-medium text-[#4f8f3a]">

                      <Gauge size={11} />

                      {difficulty}

                    </div>

                  </div>

                  {/* TITLE */}

                  <h3 className="mb-3 line-clamp-2 text-lg font-bold leading-6 text-[#0b2418]">
                    {title}
                  </h3>

                  {/* DAYS + ALTITUDE */}

                  <div className="mb-3 flex items-center gap-4 text-sm text-gray-500">

                    <div className="flex items-center gap-1.5">

                      <CalendarDays
                        size={15}
                        className="text-[#4f8f3a]"
                      />

                      <span>
                        {days}
                      </span>

                    </div>

                    <div className="flex min-w-0 items-center gap-1.5">

                      <Mountain
                        size={16}
                        className="shrink-0 text-[#4f8f3a]"
                      />

                      <span className="truncate">
                        {height}
                      </span>

                    </div>

                  </div>

                  {/* RATING */}

                  <div className="mb-3 flex items-center gap-2 text-sm">

                    <Star
                      size={15}
                      className="text-[#f5b942]"
                      fill="currentColor"
                    />

                    <span className="font-semibold text-[#0b2418]">
                      {rating}
                    </span>

                  </div>

                  {/* =================================================
                      PRICE + VIEW TRIP
                  ================================================= */}

                  <div className="flex items-end justify-between border-t border-gray-100 pt-3">

                    <div className="text-lg font-bold text-[#0b2418]">

                      {price !== null
                        ? `$${price}`
                        : "Contact us"}

                      {price !== null && (
                        <span className="ml-1 text-xs font-normal text-gray-400">
                          /person
                        </span>
                      )}

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleViewTrip(pkg)
                      }
                      className="flex items-center gap-1 text-sm font-semibold text-[#0b2418] transition hover:text-[#4f8f3a]"
                    >
                      View trip

                      <ArrowRight size={16} />
                    </button>

                  </div>

                </div>

              </div>
            );
          })}

        </div>
      )}

      {/* =================================================
          POPULAR PACKAGE MODAL
      ================================================= */}

      {selectedPackage && (
        <PopularPackage
          packageData={selectedPackage}
          onClose={() => setSelectedPackage(null)}
        />
      )}

    </section>
  );
};

export default PopularPackages;