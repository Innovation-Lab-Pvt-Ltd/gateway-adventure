import React, { useEffect, useState } from "react";
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

const API_URL = "/api/v1/allpackages";

const IMAGE_BASE = "https://gatewaytreks.com/public/uploads/frontend/full/";

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

  slug: pkg.slug || pkg.id,
});

/* =========================================================
   COMPONENT
========================================================= */

const Tripofmonth = () => {
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
     NEXT
  ======================================================= */

  const currentIndex = tripKeys.indexOf(selectedTrip);

  const goNext = () => {
    if (tripKeys.length <= 1) return;

    const nextIndex =
      currentIndex === tripKeys.length - 1 ? 0 : currentIndex + 1;

    changeTrip(tripKeys[nextIndex]);
  };

  /* =======================================================
     PREVIOUS
  ======================================================= */

  const goPrevious = () => {
    if (tripKeys.length <= 1) return;

    const previousIndex =
      currentIndex <= 0 ? tripKeys.length - 1 : currentIndex - 1;

    changeTrip(tripKeys[previousIndex]);
  };

  /* =======================================================
     NO FEATURED TRIP
  ======================================================= */

  if (!trip) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-[#f8f3ed] text-[#172019]">
      {/* ===================================================
          CHECKERBOARD BACKGROUND
      =================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.10]
        "
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

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.98),transparent_45%),linear-gradient(to_bottom,rgba(248,243,237,0.65),rgba(248,243,237,0.97))]
        "
      />

      {/* Pink glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          top-10
          h-80
          w-80
          rounded-full
          bg-[#b83b6b]/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          bottom-0
          h-80
          w-80
          rounded-full
          bg-[#4f8f3a]/10
          blur-3xl
        "
      />

      {/* ===================================================
          MAIN
      =================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1400px]
          px-5
          py-12
          sm:px-8
          sm:py-14
          lg:px-12
          lg:py-16
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            mb-8
            flex
            items-end
            justify-between
          "
        >
          <div>
            <p
              className="
                mb-0
                font-greatvibes
                text-2xl
                text-[#b83b6b]
                sm:text-3xl
              "
            >
              Discover your next escape
            </p>

            <h2
              className="
                font-playfair
                text-3xl
                font-semibold
                leading-tight
                text-[#172019]
                sm:text-4xl
                lg:text-5xl
              "
            >
              Trip of the Month
            </h2>

            <div
              className="
                mt-3
                h-[2px]
                w-16
                bg-[#b83b6b]
              "
            />
          </div>

          {/* Desktop arrows */}

          {tripKeys.length > 1 && (
            <div
              className="
                hidden
                gap-2
                sm:flex
              "
            >
              <button
                onClick={goPrevious}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#172019]/15
                  bg-white/70
                  text-[#172019]
                  transition-all
                  duration-300
                  hover:bg-[#172019]
                  hover:text-white
                "
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={goNext}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-[#172019]
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#b83b6b]
                "
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div
          className={`
            grid
            grid-cols-1
            items-center
            gap-10
            transition-all
            duration-500
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-14
            ${
              isChanging
                ? "translate-y-2 opacity-0"
                : "translate-y-0 opacity-100"
            }
          `}
        >
          {/* =================================================
              LEFT
          ================================================= */}

          <div>
            {/* Label */}

            <div
              className="
                mb-5
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  font-montserrat
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.28em]
                  text-[#b83b6b]
                "
              >
                Featured Himalayan Journey
              </span>

              <span
                className="
                  h-px
                  w-8
                  bg-[#b83b6b]/40
                "
              />
            </div>

            {/* =================================================
                TRIP SELECTOR
            ================================================= */}

            {tripKeys.length > 1 && (
              <div
                className="
                  mb-6
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {tripKeys.map((key, index) => {
                  const active = selectedTrip === key;

                  return (
                    <button
                      key={key}
                      onClick={() => changeTrip(key)}
                      className={`
                          flex
                          items-center
                          gap-2
                          rounded-full
                          px-3.5
                          py-2
                          font-montserrat
                          text-[10px]
                          font-semibold
                          tracking-wide
                          transition-all
                          duration-300
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
                            ${
                              active
                                ? "bg-[#b83b6b] text-white"
                                : "bg-[#172019]/5"
                            }
                          `}
                      >
                        0{index + 1}
                      </span>

                      <span className="max-w-[110px] truncate">
                        {trips[key].title}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* =================================================
                TITLE
            ================================================= */}

            <h1
              className="
                max-w-2xl
                font-playfair
                text-3xl
                font-semibold
                leading-[1.08]
                tracking-tight
                text-[#172019]
                sm:text-4xl
                lg:text-[3.5rem]
              "
            >
              {trip.title}
            </h1>

            {/* =================================================
                DETAILS
            ================================================= */}

            <div
              className="
                mt-6
                grid
                max-w-2xl
                grid-cols-2
                gap-4
                sm:grid-cols-4
              "
            >
              {trip.details.map((detail, index) => {
                const Icon = detail.icon;

                return (
                  <div
                    key={index}
                    className="
                        border-l
                        border-[#172019]/15
                        pl-3
                      "
                  >
                    <div
                      className="
                          mb-1.5
                          flex
                          items-center
                          gap-1.5
                        "
                    >
                      <Icon
                        size={14}
                        strokeWidth={1.8}
                        className="text-[#b83b6b]"
                      />

                      <span
                        className="
                            font-montserrat
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.12em]
                            text-[#172019]/40
                          "
                      >
                        {detail.label}
                      </span>
                    </div>

                    <p
                      className="
                          font-montserrat
                          text-xs
                          font-semibold
                          text-[#172019]
                        "
                    >
                      {detail.text}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p
              className="
                mt-6
                max-w-xl
                font-montserrat
                text-[13px]
                leading-6
                text-[#172019]/60
                sm:text-sm
              "
            >
              {trip.description}
            </p>

            {/* =================================================
                WHY THIS MONTH
            ================================================= */}

            <div
              className="
                mt-6
                max-w-xl
                rounded-xl
                border
                border-[#172019]/10
                bg-white/65
                p-4
                shadow-[0_12px_35px_rgba(23,32,25,0.06)]
                backdrop-blur-sm
              "
            >
              <div className="flex gap-3">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#b83b6b]/10
                  "
                >
                  <CalendarDays
                    size={18}
                    strokeWidth={1.7}
                    className="text-[#b83b6b]"
                  />
                </div>

                <div>
                  <h3
                    className="
                      font-playfair
                      text-base
                      font-semibold
                      text-[#172019]
                    "
                  >
                    Why this month?
                  </h3>

                  <p
                    className="
                      mt-1
                      font-montserrat
                      text-xs
                      leading-5
                      text-[#172019]/55
                      sm:text-[13px]
                    "
                  >
                    {trip.why}
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                EXPLORE BUTTON
            ================================================= */}

            <button className="explore-btn mt-6">
              <span>Explore This Trek</span>

              <ArrowUpRight size={17} strokeWidth={2} />
            </button>
          </div>

          {/* =================================================
              RIGHT IMAGE
          ================================================= */}

          <div className="relative">
            <div
              className="
                relative
                mx-auto
                max-w-[620px]
                pr-2
                pt-2
                sm:pr-4
                sm:pt-4
              "
            >
              {/* Decorative frame */}

              <div
                className="
                  absolute
                  right-0
                  top-0
                  h-full
                  w-full
                  rounded-[1.5rem]
                  border
                  border-[#b83b6b]/25
                "
              />

              {/* IMAGE */}

              <div
                className="
                  relative
                  z-10
                  h-[300px]
                  overflow-hidden
                  rounded-[1.5rem]
                  bg-[#ddd7cd]
                  shadow-[0_25px_60px_rgba(23,32,25,0.18)]
                  sm:h-[380px]
                  lg:h-[430px]
                "
              >
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    hover:scale-[1.04]
                  "
                />

                {/* Fade */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#172019]/60
                    via-transparent
                    to-transparent
                  "
                />

                {/* Image text */}

                <div
                  className="
                    absolute
                    bottom-5
                    left-5
                    right-5
                    flex
                    items-end
                    justify-between
                  "
                >
                  <div>
                    <p
                      className="
                        font-montserrat
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.28em]
                        text-white/70
                      "
                    >
                      Gateway Adventure
                    </p>

                    <p
                      className="
                        mt-1
                        font-playfair
                        text-xl
                        font-medium
                        text-white
                        sm:text-2xl
                      "
                    >
                      Nepal awaits.
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/30
                      bg-white/10
                      text-white
                      backdrop-blur-md
                    "
                  >
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>

              {/* =================================================
                  ROTATING DISCOUNT BADGE
              ================================================= */}

              {trip.discount !== "0%" && (
                <div
                  className="
                    absolute
                    -right-4
                    -top-6
                    z-30
                    flex
                    h-32
                    w-32
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#b83b6b]/20
                    bg-[#fffaf5]
                    shadow-[0_18px_45px_rgba(23,32,25,0.20)]
                    sm:-right-6
                    sm:-top-7
                    sm:h-36
                    sm:w-36
                  "
                >
                  {/* =================================================
                      ROTATING OUTER RING
                  ================================================= */}

                  <div
                    className="
                      absolute
                      inset-1
                      animate-spin-slow
                    "
                  >
                    <svg
                      viewBox="0 0 200 200"
                      className="
                        h-full
                        w-full
                        overflow-visible
                      "
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

                      {/* Outer circle */}

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

                      {/* Rotating text */}

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

                  {/* =================================================
                      SECOND ROTATING RING
                  ================================================= */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-4
                      rounded-full
                      border
                      border-dashed
                      border-[#b83b6b]/25
                      animate-[spinSlow_12s_linear_infinite_reverse]
                    "
                  />

                  {/* =================================================
                      CENTER DISCOUNT
                  ================================================= */}

                  <div
                    className="
                      relative
                      z-10
                      flex
                      flex-col
                      items-center
                    "
                  >
                    <span
                      className="
                        font-playfair
                        text-3xl
                        font-bold
                        leading-none
                        text-[#172019]
                        sm:text-4xl
                      "
                    >
                      {trip.discount}
                    </span>

                    <span
                      className="
                        mt-1
                        font-montserrat
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.3em]
                        text-[#b83b6b]
                      "
                    >
                      OFF
                    </span>
                  </div>
                </div>
              )}

              {/* =================================================
                  PRICE CARD
              ================================================= */}

              <div
                className="
                  relative
                  z-20
                  mx-auto
                  -mt-7
                  w-[88%]
                  rounded-xl
                  border
                  border-[#172019]/10
                  bg-[#fffdf9]
                  px-5
                  py-4
                  shadow-[0_20px_45px_rgba(23,32,25,0.15)]
                  sm:-mt-9
                  sm:px-6
                  sm:py-5
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  {/* PRICE */}

                  <div>
                    <p
                      className="
                        font-montserrat
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-[#172019]/40
                      "
                    >
                      Starting from
                    </p>

                    <div
                      className="
                        mt-0.5
                        flex
                        items-baseline
                        gap-2
                      "
                    >
                      <span
                        className="
                          font-playfair
                          text-2xl
                          font-bold
                          text-[#172019]
                          sm:text-3xl
                        "
                      >
                        {trip.price}
                      </span>

                      <span
                        className="
                          font-montserrat
                          text-[10px]
                          text-[#172019]/40
                        "
                      >
                        / person
                      </span>
                    </div>
                  </div>

                  {/* Divider */}

                  <div
                    className="
                      hidden
                      h-10
                      w-px
                      bg-[#172019]/10
                      sm:block
                    "
                  />

                  {/* INCLUDED */}

                  <div
                    className="
                      flex
                      items-center
                      gap-2.5
                    "
                  >
                    <div
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        bg-[#b83b6b]/10
                      "
                    >
                      <Check
                        size={15}
                        strokeWidth={2.5}
                        className="text-[#b83b6b]"
                      />
                    </div>

                    <div>
                      <p
                        className="
                          font-montserrat
                          text-[8px]
                          font-bold
                          uppercase
                          tracking-[0.2em]
                          text-[#172019]/40
                        "
                      >
                        Package
                      </p>

                      <p
                        className="
                          font-montserrat
                          text-[11px]
                          font-bold
                          text-[#172019]
                        "
                      >
                        All Included
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            MOBILE ARROWS
        =================================================== */}

        {tripKeys.length > 1 && (
          <div
            className="
              mt-7
              flex
              justify-center
              gap-2
              sm:hidden
            "
          >
            <button
              onClick={goPrevious}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-[#172019]/15
                bg-white
                text-[#172019]
              "
            >
              <ChevronLeft size={17} />
            </button>

            <button
              onClick={goNext}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-[#172019]
                text-white
              "
            >
              <ChevronRight size={17} />
            </button>
          </div>
        )}

        {/* ===================================================
            INDICATORS
        =================================================== */}

        {tripKeys.length > 1 && (
          <div
            className="
              mt-7
              flex
              justify-center
              gap-2
            "
          >
            {tripKeys.map((key) => (
              <button
                key={key}
                onClick={() => changeTrip(key)}
                className={`
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Tripofmonth;
