import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  Gauge,
  Mountain,
  Star,
  Check,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const API_URL = `${import.meta.env.VITE_BASE_API_URL}allpackages`;

const IMAGE_BASE = import.meta.env.VITE_IMAGE_BASE_URL;

const GRADE_LABELS = {
  1: "Easy",
  2: "Moderate",
  3: "Strenuous",
  4: "Very Strenuous",
};

/* =========================================================
   HTML CLEANER
========================================================= */

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

/* =========================================================
   DISCOUNT
========================================================= */

const getDiscountLabel = (pkg) => {
  if (!pkg.has_discount) return "0%";

  if (pkg.discount_msg) {
    return pkg.discount_msg;
  }

  if (!pkg.discount_amt) {
    return "0%";
  }

  return pkg.discount_type === 1
    ? `${pkg.discount_amt}%`
    : `$${pkg.discount_amt}`;
};

/* =========================================================
   API PACKAGE -> TRIP OBJECT
========================================================= */

const toTripEntry = (pkg) => ({
  title: pkg.title || pkg.name || "Untitled Trip",

  image: pkg.image ? `${IMAGE_BASE}${pkg.image}` : "/images/placeholder.jpg",

  discount: getDiscountLabel(pkg),

  price: pkg.price != null ? `$${pkg.price}` : "N/A",

  details: [
    {
      icon: Clock3,
      label: "Duration",
      text: pkg.duration ? `${pkg.duration} Days` : "N/A",
    },
    {
      icon: Gauge,
      label: "Difficulty",
      text: GRADE_LABELS[pkg.grade_id] || "N/A",
    },
    {
      icon: Mountain,
      label: "Altitude",
      text: pkg.max_altitude || "N/A",
    },
    {
      icon: Star,
      label: "Rating",
      text: pkg.rating || "N/A",
    },
  ],

  description:
    stripHtml(pkg.short_description) ||
    stripHtml(pkg.description).slice(0, 240),

  why: pkg.best_season
    ? `Best season to go: ${pkg.best_season}.`
    : "A beautiful Himalayan experience waiting to be explored.",

  /* Keep the slug for TripDetail navigation */
  slug: pkg.slug || pkg.id,
});

/* =========================================================
   VIEW TRIP BUTTON (new design)
   Pink pill with a white circular arrow on the right.
   On hover the pill turns dark green and the arrow rotates.
========================================================= */

const ViewTripButton = ({ onClick, className = "" }) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      group
      flex
      items-center
      justify-between
      gap-5
      rounded-full
      bg-[#b83b6b]
      py-1.5
      pl-7
      pr-1.5
      text-white
      shadow-[0_14px_30px_rgba(184,59,107,0.30)]
      transition-all
      duration-300
      hover:bg-[#172019]
      hover:shadow-[0_14px_30px_rgba(23,32,25,0.25)]
      active:scale-[0.98]
      ${className}
    `}
  >
    <span className="font-montserrat text-xs font-bold uppercase tracking-[0.16em]">
      View Trip
    </span>

    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#b83b6b] transition-all duration-300 group-hover:rotate-45 group-hover:text-[#172019]">
      <ArrowUpRight size={20} strokeWidth={2.2} />
    </span>
  </button>
);

/* =========================================================
   COMPONENT
========================================================= */

const Tripofmonth = () => {
  const navigate = useNavigate();

  const [trips, setTrips] = useState({});
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isChanging, setIsChanging] = useState(false);

  /* =======================================================
     FETCH DATA
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    const fetchPackages = async () => {
      try {
        const res = await fetch(API_URL);

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();

        const rawList = data?.packages?.data ?? [];

        const featuredEntries = rawList
          .filter((pkg) => Number(pkg.is_act_featured) === 1)
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
      } catch (error) {
        console.error("Trip of the month error:", error);

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

  /* =======================================================
     TRIP DATA
  ======================================================= */

  const tripKeys = Object.keys(trips);

  const trip = selectedTrip ? trips[selectedTrip] : null;

  /* =======================================================
     CHANGE TRIP
  ======================================================= */

  const changeTrip = (key) => {
    if (key === selectedTrip || isChanging) {
      return;
    }

    setIsChanging(true);

    setTimeout(() => {
      setSelectedTrip(key);

      setTimeout(() => {
        setIsChanging(false);
      }, 100);
    }, 300);
  };

  /* =======================================================
     NEXT / PREVIOUS
  ======================================================= */

  const currentIndex = tripKeys.indexOf(selectedTrip);

  const goNext = () => {
    if (tripKeys.length <= 1) return;

    const nextIndex = currentIndex === tripKeys.length - 1 ? 0 : currentIndex + 1;

    changeTrip(tripKeys[nextIndex]);
  };

  const goPrevious = () => {
    if (tripKeys.length <= 1) return;

    const previousIndex =
      currentIndex <= 0 ? tripKeys.length - 1 : currentIndex - 1;

    changeTrip(tripKeys[previousIndex]);
  };

  /* =======================================================
     EXPLORE TRIP
  ======================================================= */

  const exploreTrip = () => {
    if (!trip?.slug) {
      return;
    }

    navigate(`/package/${trip.slug}`);
  };

  /* =======================================================
     NO FEATURED TRIP
  ======================================================= */

  if (!trip) {
    return null;
  }

  /* =======================================================
     TRIP SELECTOR CHIPS
     Rendered twice: on top (mobile) and inside the left
     column (desktop). Only the wrapper classes differ.
  ======================================================= */

  const renderTripSelector = (wrapperClassName) => (
    <div className={wrapperClassName}>
      {tripKeys.map((key, index) => {
        const active = selectedTrip === key;

        return (
          <button
            key={key}
            onClick={() => changeTrip(key)}
            className={`
              flex
              shrink-0
              items-center
              gap-2
              rounded-full
              px-3.5
              py-2.5
              font-montserrat
              text-[11px]
              font-semibold
              tracking-wide
              transition-all
              duration-300
              sm:py-2
              sm:text-[10px]
              ${
                active
                  ? "bg-[#172019] text-white shadow-md"
                  : "border border-[#172019]/10 bg-white/60 text-[#172019]/60 hover:bg-white hover:text-[#172019]"
              }
            `}
          >
            <span
              className={`
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                text-[8px]
                ${active ? "bg-[#b83b6b] text-white" : "bg-[#172019]/5"}
              `}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="max-w-[130px] truncate sm:max-w-[110px]">
              {trips[key].title}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-[#f8f3ed] text-[#172019]">
      {/* ===================================================
          CHECKERBOARD BACKGROUND
      =================================================== */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage: `
            linear-gradient(
              45deg,
              #1b1618 25%,
              transparent 25%,
              transparent 75%,
              #1b1618 75%
            ),
            linear-gradient(
              135deg,
              #fff8e9 25%,
              #1b1618 25%,
              #1b1618 75%,
              #fff8e9 75%
            )
          `,
          backgroundSize: "90px 90px",
          backgroundPosition: "0 0, 135px 135px",
        }}
      />

      {/* ===================================================
          FADE
      =================================================== */}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.98),transparent_45%),linear-gradient(to_bottom,rgba(248,243,237,0.65),rgba(248,243,237,0.97))]" />

      {/* ===================================================
          GLOWS
      =================================================== */}

      <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-[#b83b6b]/10 blur-3xl" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[#4f8f3a]/10 blur-3xl" />

      {/* ===================================================
          MAIN
      =================================================== */}

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-6 flex items-end justify-between sm:mb-8">
          <div>
            <p className="mb-0 font-greatvibes text-2xl text-[#b83b6b] sm:text-3xl">
              Discover your next escape
            </p>

            <h2 className="font-playfair text-3xl font-semibold leading-tight text-[#172019] sm:text-4xl lg:text-5xl">
              Trip of the Month
            </h2>

            <div className="mt-3 h-[2px] w-16 bg-[#b83b6b]" />
          </div>

          {/* DESKTOP ARROWS */}

          {tripKeys.length > 1 && (
            <div className="hidden gap-2 sm:flex">
              <button
                onClick={goPrevious}
                aria-label="Previous trip"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#172019]/15 bg-white/70 text-[#172019] transition-all duration-300 hover:bg-[#172019] hover:text-white"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={goNext}
                aria-label="Next trip"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#172019] text-white transition-all duration-300 hover:bg-[#b83b6b]"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* =================================================
            TRIP SELECTOR — MOBILE (top, above the image)
            One swipeable row
        ================================================= */}

        {tripKeys.length > 1 &&
          renderTripSelector(
            "-mx-5 mb-6 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:px-8 lg:hidden"
          )}

        {/* =================================================
            CONTENT
        ================================================= */}

        <div
          className={`
            grid
            grid-cols-1
            items-center
            gap-8
            transition-all
            duration-500
            sm:gap-10
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-14
            ${isChanging ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"}
          `}
        >
          {/* =================================================
              LEFT
          ================================================= */}

          <div className="min-w-0">
            {/* Label */}

            <div className="mb-4 flex items-center gap-3 sm:mb-5">
              <span className="font-montserrat text-[10px] font-bold uppercase tracking-[0.28em] text-[#b83b6b]">
                Featured Himalayan Journey
              </span>

              <span className="h-px w-8 bg-[#b83b6b]/40" />
            </div>

            {/* TRIP SELECTOR — DESKTOP (inside left column) */}

            {tripKeys.length > 1 &&
              renderTripSelector("mb-6 hidden flex-wrap gap-2 lg:flex")}

            {/* TITLE */}

            <h1 className="max-w-2xl break-words font-playfair text-3xl font-semibold leading-[1.1] tracking-tight text-[#172019] sm:text-4xl lg:text-[3.5rem] lg:leading-[1.08]">
              {trip.title}
            </h1>

            {/* DETAILS */}

            <div className="mt-5 grid max-w-2xl grid-cols-2 gap-x-4 gap-y-5 sm:mt-6 sm:grid-cols-4 sm:gap-4">
              {trip.details.map((detail, index) => {
                const Icon = detail.icon;

                return (
                  <div
                    key={index}
                    className="min-w-0 border-l border-[#172019]/15 pl-3"
                  >
                    <div className="mb-1.5 flex items-center gap-1.5">
                      <Icon
                        size={14}
                        strokeWidth={1.8}
                        className="shrink-0 text-[#b83b6b]"
                      />

                      <span className="font-montserrat text-[9px] font-bold uppercase tracking-[0.12em] text-[#172019]/40">
                        {detail.label}
                      </span>
                    </div>

                    <p className="break-words font-montserrat text-[13px] font-semibold text-[#172019] sm:text-xs">
                      {detail.text}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* DESCRIPTION */}

            <p className="mt-5 max-w-xl font-montserrat text-[13px] leading-6 text-[#172019]/60 sm:mt-6 sm:text-sm">
              {trip.description}
            </p>

            {/* WHY THIS MONTH */}

            <div className="mt-5 max-w-xl rounded-xl border border-[#172019]/10 bg-white/65 p-4 shadow-[0_12px_35px_rgba(23,32,25,0.06)] backdrop-blur-sm sm:mt-6">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#b83b6b]/10">
                  <CalendarDays
                    size={18}
                    strokeWidth={1.7}
                    className="text-[#b83b6b]"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="font-playfair text-base font-semibold text-[#172019]">
                    Why this month?
                  </h3>

                  <p className="mt-1 font-montserrat text-xs leading-5 text-[#172019]/55 sm:text-[13px]">
                    {trip.why}
                  </p>
                </div>
              </div>
            </div>

            {/* VIEW TRIP BUTTON — DESKTOP (inside left column) */}

            <div className="mt-6 hidden lg:block">
              <ViewTripButton onClick={exploreTrip} className="w-auto" />
            </div>
          </div>

          {/* =================================================
              RIGHT IMAGE
              Mobile: shown FIRST (above the text)
          ================================================= */}

          <div className="relative order-first min-w-0 lg:order-none">
            <div className="relative mx-auto max-w-[620px] pr-2 pt-2 sm:pr-4 sm:pt-4">
              {/* Decorative frame */}

              <div className="absolute right-0 top-0 h-full w-full rounded-[1.25rem] border border-[#b83b6b]/25 sm:rounded-[1.5rem]" />

              {/* IMAGE */}

              <div className="relative z-10 h-[260px] overflow-hidden rounded-[1.25rem] bg-[#ddd7cd] shadow-[0_25px_60px_rgba(23,32,25,0.18)] sm:h-[380px] sm:rounded-[1.5rem] lg:h-[430px]">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                />

                {/* Fade */}

                <div className="absolute inset-0 bg-gradient-to-t from-[#172019]/60 via-transparent to-transparent" />

                {/* Image text
                    (raised so the price card doesn't cover it) */}

                <div className="absolute bottom-9 left-4 right-4 flex items-end justify-between sm:bottom-12 sm:left-5 sm:right-5">
                  <div>
                    <p className="font-montserrat text-[9px] font-bold uppercase tracking-[0.28em] text-white/70">
                      Gateway Adventure
                    </p>

                    <p className="mt-1 font-playfair text-xl font-medium text-white sm:text-2xl">
                      Nepal awaits.
                    </p>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>

              {/* =================================================
                  ROTATING DISCOUNT BADGE (smaller on mobile)
              ================================================= */}

              {trip.discount !== "0%" && (
                <div className="absolute -right-1 -top-4 z-30 flex h-24 w-24 items-center justify-center rounded-full border border-[#b83b6b]/20 bg-[#fffaf5] shadow-[0_18px_45px_rgba(23,32,25,0.20)] sm:-right-6 sm:-top-7 sm:h-36 sm:w-36">
                  {/* Rotating outer ring */}

                  <div className="absolute inset-1 animate-spin-slow">
                    <svg
                      viewBox="0 0 200 200"
                      className="h-full w-full overflow-visible"
                    >
                      <defs>
                        <path
                          id="discountPath"
                          d="
                            M 100,100
                            m -78,0
                            a 78,78 0 1,1 156,0
                            a 78,78 0 1,1 -156,0
                          "
                        />
                      </defs>

                      <circle
                        cx="100"
                        cy="100"
                        r="88"
                        fill="none"
                        stroke="#b83b6b"
                        strokeWidth="1"
                        strokeDasharray="3 7"
                        opacity="0.5"
                      />

                      <text
                        fill="#b83b6b"
                        fontSize="10"
                        fontWeight="700"
                        letterSpacing="3"
                        fontFamily="Montserrat, sans-serif"
                      >
                        <textPath href="#discountPath" startOffset="0%">
                          SPECIAL OFFER • SPECIAL OFFER • SPECIAL OFFER •
                        </textPath>
                      </text>
                    </svg>
                  </div>

                  {/* Second rotating ring */}

                  <div className="pointer-events-none absolute inset-3 animate-[spinSlow_12s_linear_infinite_reverse] rounded-full border border-dashed border-[#b83b6b]/25 sm:inset-4" />

                  {/* Center discount */}

                  <div className="relative z-10 flex max-w-[60%] flex-col items-center text-center">
                    <span className="font-playfair text-xl font-bold leading-none text-[#172019] sm:text-4xl">
                      {trip.discount}
                    </span>

                    <span className="mt-1 font-montserrat text-[7px] font-bold uppercase tracking-[0.3em] text-[#b83b6b] sm:text-[8px]">
                      OFF
                    </span>
                  </div>
                </div>
              )}

              {/* =================================================
                  PRICE CARD
                  Mobile: price left, "All Included" right
              ================================================= */}

              <div className="relative z-20 mx-auto -mt-7 w-[92%] rounded-xl border border-[#172019]/10 bg-[#fffdf9] px-4 py-4 shadow-[0_20px_45px_rgba(23,32,25,0.15)] sm:-mt-9 sm:w-[88%] sm:px-6 sm:py-5">
                <div className="flex items-center justify-between gap-3">
                  {/* PRICE */}

                  <div className="min-w-0">
                    <p className="font-montserrat text-[9px] font-bold uppercase tracking-[0.2em] text-[#172019]/40">
                      Starting from
                    </p>

                    <div className="mt-0.5 flex items-baseline gap-1.5 sm:gap-2">
                      <span className="font-playfair text-2xl font-bold text-[#172019] sm:text-3xl">
                        {trip.price}
                      </span>

                      <span className="font-montserrat text-[10px] text-[#172019]/40">
                        / person
                      </span>
                    </div>
                  </div>

                  {/* Divider */}

                  <div className="hidden h-10 w-px bg-[#172019]/10 sm:block" />

                  {/* INCLUDED */}

                  <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#b83b6b]/10">
                      <Check
                        size={15}
                        strokeWidth={2.5}
                        className="text-[#b83b6b]"
                      />
                    </div>

                    <div>
                      <p className="font-montserrat text-[8px] font-bold uppercase tracking-[0.2em] text-[#172019]/40">
                        Package
                      </p>

                      <p className="font-montserrat text-[11px] font-bold text-[#172019]">
                        All Included
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  VIEW TRIP BUTTON — MOBILE (below the image
                  and price card, full width)
              ================================================= */}

              <div className="mt-5 lg:hidden">
                <ViewTripButton onClick={exploreTrip} className="w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            NAVIGATION
            Mobile : arrows + dots in one row
            Desktop: dots only
        =================================================== */}

        {tripKeys.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-3 sm:mt-7">
            <button
              onClick={goPrevious}
              aria-label="Previous trip"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#172019]/15 bg-white text-[#172019] active:scale-95 sm:hidden"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center">
              {tripKeys.map((key, index) => (
                <button
                  key={key}
                  onClick={() => changeTrip(key)}
                  aria-label={`Show trip ${index + 1}`}
                  className="flex items-center px-1 py-3"
                >
                  <span
                    className={`
                      block
                      h-1
                      rounded-full
                      transition-all
                      duration-500
                      ${
                        selectedTrip === key
                          ? "w-8 bg-[#b83b6b]"
                          : "w-1.5 bg-[#172019]/20"
                      }
                    `}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={goNext}
              aria-label="Next trip"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#172019] text-white active:scale-95 sm:hidden"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Tripofmonth;