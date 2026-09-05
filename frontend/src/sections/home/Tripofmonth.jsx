import React, { useState, useEffect } from "react";
import {
  CalendarDays,
  Clock3,
  Gauge,
  Mountain,
  Star,
  Check,
} from "lucide-react";

const API_URL = "/api/v1/allpackages";

// Package images are referenced by filename only in the API (e.g. "1758340471_pisang-peak-climbing.webp").
// Based on image paths seen elsewhere on the site, they live under this uploads folder.
const IMAGE_BASE = "https://gatewaytreks.com/public/uploads/frontend/full/";

// grade_id -> human-readable difficulty, matching the "grades" list the API
// returns alongside the packages (Easy / Moderate / Strenuous / Very Strenuous).
const GRADE_LABELS = {
  1: "Easy",
  2: "Moderate",
  3: "Strenuous",
  4: "Very Strenuous",
};

const stripHtml = (html) => {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&rsquo;/g, "’")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
};

// Builds the "X% OFF" / "$X OFF" label shown on the badge. Falls back to
// "0%" when the package has no discount, so the field always exists just
// like it did in the original hardcoded trips object.
const getDiscountLabel = (pkg) => {
  if (!pkg.has_discount) return "0%";
  if (pkg.discount_msg) return pkg.discount_msg;
  if (!pkg.discount_amt) return "0%";
  return pkg.discount_type === 1 ? `${pkg.discount_amt}%` : `$${pkg.discount_amt}`;
};

// Converts one raw API package into the exact same shape the component used
// to hardcode per trip: title, image, discount, price, details, description, why.
const toTripEntry = (pkg) => ({
  title: pkg.title || pkg.name || "Untitled Trip",
  image: pkg.image ? `${IMAGE_BASE}${pkg.image}` : "/images/placeholder.jpg",
  discount: getDiscountLabel(pkg),
  price: pkg.price != null ? `$${pkg.price}` : "N/A",

  details: [
    { icon: Clock3, text: pkg.duration ? `${pkg.duration} Days` : "N/A" },
    { icon: Gauge, text: GRADE_LABELS[pkg.grade_id] || "N/A" },
    { icon: Mountain, text: pkg.max_altitude || "N/A" },
    { icon: Star, text: pkg.rating ? `Rating ${pkg.rating}` : "Rating N/A" },
  ],

  description:
    stripHtml(pkg.short_description) || stripHtml(pkg.description).slice(0, 220),

  why: pkg.best_season
    ? `Best season to go: ${pkg.best_season}.`
    : "A great time to book this trip.",
});

const Tripofmonth = () => {
  const [trips, setTrips] = useState({});
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchPackages = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

        const data = await res.json();

        // Real shape: { packages: { data: [ ...package objects... ], total, per_page, ... } }
        const rawList = data?.packages?.data ?? [];

        // Only packages with is_dest_featured = 1 are shown. If none match,
        // trips stays empty and the component renders nothing.
        const featuredEntries = rawList
          .filter((pkg) => Number(pkg.is_dest_featured) === 0)
          .reduce((acc, pkg) => {
            const key = pkg.slug || String(pkg.id);
            acc[key] = toTripEntry(pkg);
            return acc;
          }, {});

        if (!cancelled) {
          setTrips(featuredEntries);
          const firstKey = Object.keys(featuredEntries)[0] || null;
          setSelectedTrip(firstKey);
        }
      } catch (err) {
        if (!cancelled) {
          setTrips({});
          setSelectedTrip(null);
        }
      }
    };

    fetchPackages();

    return () => {
      cancelled = true;
    };
  }, []);

  const tripKeys = Object.keys(trips);
  const trip = selectedTrip ? trips[selectedTrip] : null;

  // Nothing featured (or nothing loaded yet) -> render nothing.
  if (!trip) {
    return null;
  }

  return (
    <div className="relative grid grid-cols-1 gap-10 bg-[#141714] p-6 text-white sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-16">
      {/* =====================================================
          LEFT COLUMN
      ====================================================== */}
      <div className="flex flex-col justify-center">
        {/* Heading */}
        <h6 className="mb-6 text-sm font-semibold tracking-[0.25em] text-green-300">
          - TRIP OF THE MONTH
        </h6>

        {/* Trip Selector */}
        {tripKeys.length > 1 && (
          <div className="mb-8 flex w-fit flex-wrap gap-2 rounded-xl border border-white/10 bg-white/5 p-1">
            {tripKeys.map((key) => (
              <button
                key={key}
                onClick={() => setSelectedTrip(key)}
                className={`rounded-lg px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 ${
                  selectedTrip === key
                    ? "bg-green-500 text-green-950 shadow-lg"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {trips[key].title.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="mb-5 text-3xl font-bold sm:text-4xl lg:text-5xl">
          {trip.title}
        </h1>

        {/* Details */}
        <div className="mb-7 flex flex-wrap gap-3">
          {trip.details.map((detail, index) => {
            const Icon = detail.icon;

            return (
              <div
                key={index}
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm backdrop-blur-sm transition hover:border-green-300/50 hover:bg-green-300/10"
              >
                <Icon size={17} strokeWidth={1.8} className="text-green-300" />

                <span className="text-white/90">{detail.text}</span>
              </div>
            );
          })}
        </div>

        {/* Description */}
        <p className="mb-8 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
          {trip.description}
        </p>

        {/* Why This Month */}
        <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-md transition hover:border-green-300/30 sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-300/10">
              <CalendarDays
                size={22}
                strokeWidth={1.8}
                className="text-green-300"
              />
            </div>

            <h2 className="text-xl font-semibold text-green-300">
              Why this month?
            </h2>
          </div>

          <p className="text-sm leading-7 text-white/75 sm:text-base">
            {trip.why}
          </p>
        </div>

        {/* Explore Button */}
        <button className="mt-8 w-fit rounded-full bg-white px-6 py-3 font-bold text-green-950 transition-all duration-300 hover:bg-green-500 hover:shadow-lg hover:shadow-green-300/20">
          Explore This Trek →
        </button>
      </div>

      {/* =====================================================
          RIGHT COLUMN
      ====================================================== */}
      <div className="relative flex flex-col items-center">
        {/* =================================================
            IMAGE
        ================================================== */}
        <div className="relative h-[300px] w-full sm:h-[400px] lg:h-[500px]">
          {/* Image */}
          <div className="h-full w-full overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={trip.image}
              alt={trip.title}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* =================================================
              LARGE ROTATING DISCOUNT CIRCLE
          ================================================== */}
          <div
            className="
              absolute
              -right-8
              -top-8
              z-30
              flex
              h-36
              w-36
              items-center
              justify-center
              rounded-full
              bg-white
              shadow-2xl
              sm:-right-10
              sm:-top-10
              sm:h-44
              sm:w-44
              lg:-right-12
              lg:-top-12
              lg:h-48
              lg:w-48
            "
          >
            {/* Rotating Text */}
            <div className="absolute inset-0 animate-[spin_12s_linear_infinite]">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <defs>
                  <path
                    id="discountCircle"
                    d="
                      M 50,50
                      m -37,0
                      a 37,37 0 1,1 74,0
                      a 37,37 0 1,1 -74,0
                    "
                  />
                </defs>

                <text
                  className="
                    fill-gray-800
                    text-[7px]
                    font-black
                    uppercase
                    tracking-[1.5px]
                  "
                >
                  <textPath href="#discountCircle" startOffset="0%">
                    {trip.discount} OFF • {trip.discount} OFF • {trip.discount}{" "}
                    OFF •
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Center Discount */}
            <div className="relative z-10 flex flex-col items-center">
              <span
                className="
                  font-serif
                  text-3xl
                  font-black
                  italic
                  tracking-tight
                  text-gray-900
                  sm:text-4xl
                  lg:text-4xl
                "
              >
                {trip.discount}
              </span>

              <span
                className="
                  mt-1
                  text-sm
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  text-gray-800
                "
              >
                OFF
              </span>

              <div className="mt-2 h-1 w-8 rounded-full bg-green-400" />
            </div>
          </div>

          {/* =================================================
              PRICE CARD
              90% WIDTH OF IMAGE
          ================================================== */}
          <div
            className="
              absolute
              -bottom-12
              left-1/2
              z-20
              w-[90%]
              -translate-x-1/2
              rounded-2xl
              bg-white
              px-5
              py-5
              shadow-2xl
              sm:-bottom-14
              sm:px-7
              sm:py-6
              lg:-bottom-16
              lg:px-9
              lg:py-7
            "
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* ================= PRICE ================= */}

              <span className="text-sm font-medium text-gray-500 sm:text-base">
                From{" "}
                <span
                  className="
                      text-2xl
                      font-bold
                      
                      text-gray-900
                      sm:text-4xl
                    "
                >
                  {trip.price}
                </span>
                per person
              </span>

              

              {/* ================= DIVIDER ================= */}
              <div className="hidden h-12 w-px bg-gray-200 sm:block" />

              {/* ================= ALL INCLUDED ================= */}
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-green-600">
                  <Check size={15} strokeWidth={3} className="text-green-600" />
                </div>

                <span
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-green-700
                    sm:text-sm
                  "
                >
                  All included
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Space reserved for overlapping price card */}
        <div className="h-12 sm:h-14 lg:h-16" />
      </div>
    </div>
  );
};

export default Tripofmonth;