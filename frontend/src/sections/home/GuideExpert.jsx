import React, { useEffect, useRef, useState } from "react";
import { Mail, Phone, ArrowUpRight } from "lucide-react";

const API_URL = "/api/v1/teams";

const IMAGE_BASE_URL =
  "https://gatewaytreks.com/public/uploads/frontend/full/";

const GuideExpert = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollRef = useRef(null);

  /* =========================================================
     FETCH TEAM DATA
  ========================================================= */

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch team: ${response.status}`
          );
        }

        const data = await response.json();

        const employees = Array.isArray(data?.employees)
          ? data.employees
          : [];

        const activeEmployees = employees
          .filter(
            (employee) =>
              employee.is_active === 1 ||
              employee.is_active === true ||
              employee.is_active === undefined
          )
          .sort(
            (a, b) =>
              Number(a.display_order || 0) -
              Number(b.display_order || 0)
          );

        setExperts(activeEmployees);
      } catch (err) {
        console.error("TEAM API ERROR:", err);

        setError(err.message);
        setExperts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  /* =========================================================
     IMAGE URL
  ========================================================= */

  const getImageUrl = (imageName) => {
    if (!imageName) {
      return "/images/MOUNT.jpg";
    }

    if (
      typeof imageName === "string" &&
      imageName.startsWith("http")
    ) {
      return imageName;
    }

    return `${IMAGE_BASE_URL}${imageName}`;
  };

  /* =========================================================
     HORIZONTAL SCROLL
  ========================================================= */

  const scrollExperts = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -330 : 330,
      behavior: "smooth",
    });
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <section className="bg-white px-5 py-12 sm:px-8">
        <div className="mx-auto flex min-h-[220px] max-w-7xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-black" />

            <p className="font-montserrat text-[10px] uppercase tracking-[0.2em] text-gray-500">
              Loading our team...
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {
    return (
      <section className="bg-white px-5 py-12 sm:px-8">
        <div className="mx-auto flex min-h-[180px] max-w-7xl items-center justify-center">
          <p className="font-montserrat text-sm text-red-500">
            Unable to load team members.
          </p>
        </div>
      </section>
    );
  }

  /* =========================================================
     EMPTY
  ========================================================= */

  if (!experts.length) {
    return (
      <section className="bg-white px-5 py-12 sm:px-8">
        <div className="mx-auto flex min-h-[180px] max-w-7xl items-center justify-center">
          <p className="font-montserrat text-sm text-gray-500">
            No team members available.
          </p>
        </div>
      </section>
    );
  }

  /* =========================================================
     MAIN UI
  ========================================================= */

  return (
    <section className="relative overflow-hidden bg-white px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">

      {/* =====================================================
          SUBTLE BLACK & WHITE BACKGROUND
      ===================================================== */}

      <div className="absolute inset-0 opacity-[0.035]">
        <div className="black-pattern absolute inset-0" />
      </div>

      {/* Small decorative circle */}

      <div
        className="
          absolute
          -right-20
          top-10
          h-48
          w-48
          rounded-full
          border
          border-black/5
        "
      />

      <div
        className="
          absolute
          -left-20
          bottom-0
          h-40
          w-40
          rounded-full
          border
          border-black/5
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>

            <div className="mb-2 flex items-center gap-2">

              <span className="h-[1px] w-7 bg-black" />

              <p
                className="
                  font-montserrat
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-black
                "
              >
                Our Team
              </p>

            </div>

            <h2
              className="
                font-playfair
                text-3xl
                font-medium
                leading-tight
                text-black
                sm:text-4xl
                lg:text-5xl
              "
            >
              Meet Our{" "}
              <span className="italic">
                Travel Experts
              </span>
            </h2>

            <p
              className="
                mt-2
                max-w-xl
                font-montserrat
                text-xs
                leading-5
                text-gray-500
                sm:text-sm
              "
            >
              Meet the people who turn Himalayan journeys
              into unforgettable experiences.
            </p>

          </div>

          {/* Decorative text */}

          <p
            className="
              hidden
              font-greatvibes
              text-2xl
              text-[#b83b6b]
              sm:block
            "
          >
            Your journey begins here.
          </p>

        </div>

        {/* ===================================================
            SCROLL HEADER
        =================================================== */}

        <div className="mb-4 flex items-center justify-between">

          <p
            className="
              font-montserrat
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-gray-400
            "
          >
            Our People
          </p>

          {/* Scroll buttons */}

          <div className="flex gap-1.5">

            <button
              type="button"
              onClick={() => scrollExperts("left")}
              aria-label="Scroll team left"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                border
                border-black/20
                bg-white
                text-black
                transition-all
                duration-300
                hover:bg-black
                hover:text-white
              "
            >
              ←
            </button>

            <button
              type="button"
              onClick={() => scrollExperts("right")}
              aria-label="Scroll team right"
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                border
                border-black/20
                bg-white
                text-black
                transition-all
                duration-300
                hover:bg-black
                hover:text-white
              "
            >
              →
            </button>

          </div>

        </div>

        {/* ===================================================
            HORIZONTAL CARDS
        =================================================== */}

        <div
          ref={scrollRef}
          className="
            team-scroll
            flex
            snap-x
            snap-mandatory
            gap-4
            overflow-x-auto
            pb-5
          "
        >

          {experts.map((expert, index) => (
            <article
              key={
                expert.id ||
                expert.image ||
                index
              }
              className="
                group
                min-w-[240px]
                max-w-[240px]
                snap-start
                sm:min-w-[260px]
                sm:max-w-[260px]
                lg:min-w-[280px]
                lg:max-w-[280px]
              "
            >

              {/* =============================================
                  IMAGE
              ============================================== */}

              <div className="relative overflow-hidden bg-gray-100">

                <div className="aspect-[4/4.2] overflow-hidden">

                  <img
                    src={getImageUrl(expert.image)}
                    alt={
                      expert.name ||
                      "Team member"
                    }
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-105
                    "
                    onError={(e) => {
                      e.currentTarget.src =
                        "/images/MOUNT.jpg";
                    }}
                  />

                </div>

                {/* Number */}

                <div
                  className="
                    absolute
                    left-3
                    top-3
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    bg-black/70
                  "
                >
                  <span className="font-playfair text-[10px] text-white">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>
                </div>

                {/* Hover arrow */}

                <div
                  className="
                    absolute
                    bottom-3
                    right-3
                    flex
                    h-8
                    w-8
                    translate-y-2
                    items-center
                    justify-center
                    bg-white
                    text-black
                    opacity-0
                    transition-all
                    duration-300
                    group-hover:translate-y-0
                    group-hover:opacity-100
                  "
                >
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.5}
                  />
                </div>

              </div>

              {/* =============================================
                  CONTENT
              ============================================== */}

              <div
                className="
                  border
                  border-t-0
                  border-gray-200
                  bg-white
                  p-4
                  transition-all
                  duration-300
                  group-hover:border-black/30
                "
              >

                {/* Position */}

                {expert.position && (
                  <p
                    className="
                      mb-1.5
                      font-montserrat
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-[#b83b6b]
                    "
                  >
                    {expert.position}
                  </p>
                )}

                {/* Name */}

                {expert.name && (
                  <h3
                    className="
                      font-playfair
                      text-xl
                      font-medium
                      leading-tight
                      text-black
                    "
                  >
                    {expert.name}
                  </h3>
                )}

                {/* Description */}

                {expert.short_description && (
                  <p
                    className="
                      mt-2
                      line-clamp-2
                      font-montserrat
                      text-[10px]
                      leading-5
                      text-gray-500
                    "
                  >
                    {expert.short_description}
                  </p>
                )}

                {/* Divider */}

                <div className="my-3 h-[1px] bg-gray-100" />

                {/* Contact */}

                <div className="space-y-1.5">

                  {expert.email && (
                    <div className="flex items-center gap-2">

                      <Mail
                        size={11}
                        strokeWidth={1.5}
                        className="shrink-0 text-black"
                      />

                      <span
                        className="
                          truncate
                          font-montserrat
                          text-[9px]
                          text-gray-500
                        "
                      >
                        {expert.email}
                      </span>

                    </div>
                  )}

                  {expert.phone && (
                    <div className="flex items-center gap-2">

                      <Phone
                        size={11}
                        strokeWidth={1.5}
                        className="shrink-0 text-black"
                      />

                      <span
                        className="
                          font-montserrat
                          text-[9px]
                          text-gray-500
                        "
                      >
                        {expert.phone}
                      </span>

                    </div>
                  )}

                </div>

              </div>

            </article>
          ))}

        </div>

        {/* ===================================================
            BOTTOM
        =================================================== */}

        <div className="mt-3 flex items-center justify-center gap-3">

          <span className="h-[1px] w-8 bg-gray-200" />

          <p
            className="
              font-montserrat
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.25em]
              text-gray-400
            "
          >
            Scroll to explore
          </p>

          <span className="h-[1px] w-8 bg-gray-200" />

        </div>

      </div>

      {/* =====================================================
          PATTERN
      ===================================================== */}

      <style>{`

        .black-pattern {
          width: 100%;
          height: 100%;

          background:
            repeating-conic-gradient(
              from 30deg,
              #0000 0 120deg,
              #000 0 180deg
            )
            calc(0.5 * 120px)
            calc(0.5 * 120px * 0.577),

            repeating-conic-gradient(
              from 30deg,
              #000 0 45deg,
              #222 0 90deg,
              #444 0 135deg,
              #000 0 180deg,
              #222 0 225deg,
              #555 0 270deg,
              #111 0 315deg,
              #333 0 360deg,
              #000 0 405deg
            );

          background-size:
            120px
            calc(120px * 0.577);
        }

        .team-scroll {
          scrollbar-width: thin;
          scrollbar-color: #111 transparent;
        }

        .team-scroll::-webkit-scrollbar {
          height: 3px;
        }

        .team-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .team-scroll::-webkit-scrollbar-thumb {
          background: #111;
        }

        .team-scroll::-webkit-scrollbar-thumb:hover {
          background: #b83b6b;
        }

      `}</style>

    </section>
  );
};

export default GuideExpert;