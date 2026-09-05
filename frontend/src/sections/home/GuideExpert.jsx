import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react";

const API_URL = "/api/v1/teams";

const IMAGE_BASE_URL =
  "https://gatewaytreks.com/public/uploads/frontend/full/";

const GuideExpert = () => {
  const [experts, setExperts] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            `Failed to fetch team: ${response.status}`,
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
              employee.is_active === undefined,
          )
          .sort(
            (a, b) =>
              Number(a.display_order || 0) -
              Number(b.display_order || 0),
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
     SLIDER
  ========================================================= */

  const nextImage = () => {
    if (!experts.length) return;

    setCurrent((prev) => (prev + 1) % experts.length);
  };

  const previousImage = () => {
    if (!experts.length) return;

    setCurrent((prev) =>
      prev === 0 ? experts.length - 1 : prev - 1,
    );
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <section className="bg-gray-100 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[400px] max-w-6xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#4f8f3a]" />

            <p className="text-sm text-gray-500">
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
      <section className="bg-gray-100 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[300px] max-w-6xl items-center justify-center">
          <p className="text-sm text-red-500">
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
      <section className="bg-gray-100 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[300px] max-w-6xl items-center justify-center">
          <p className="text-sm text-gray-500">
            No team members available.
          </p>
        </div>
      </section>
    );
  }

  const expert = experts[current];

  /* =========================================================
     MAIN UI
  ========================================================= */

  return (
    <section className="bg-gray-100 px-4 py-5 sm:px-6 lg:px-8">

      {/* ========================================= */}
      {/* EXPERT INFORMATION + IMAGE */}
      {/* ========================================= */}

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 lg:flex-row lg:gap-8">

        {/* ================================= */}
        {/* LEFT SIDE */}
        {/* ================================= */}

        <div className="order-2 w-full lg:order-1 lg:w-1/2">

          {/* Section Heading */}

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#4f8f3a] sm:text-sm">
            Our Team
          </p>

          <h1 className="mb-3 max-w-xl text-2xl font-bold leading-tight text-[#0b2418] sm:text-3xl lg:text-4xl">
            Meet Our Travel Experts
          </h1>

          {/* Short Description */}

          {expert.short_description && (
            <p className="mb-4 max-w-xl text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
              {expert.short_description}
            </p>
          )}

          {/* Name */}

          {expert.name && (
            <h3 className="mb-1 text-xl font-bold text-[#0b2418] sm:text-2xl">
              {expert.name}
            </h3>
          )}

          {/* Position */}

          {expert.position && (
            <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-[#4f8f3a] sm:text-sm">
              {expert.position}
            </p>
          )}

          {/* Description */}

          {expert.description && (
            <div
              className="mb-5 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7"
              dangerouslySetInnerHTML={{
                __html: expert.description,
              }}
            />
          )}

          {/* Contact Information */}

          {(expert.email || expert.phone) && (
            <div className="space-y-2">

              {expert.email && (
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf6df] text-[#4f8f3a]">
                    <Mail size={17} />
                  </div>

                  <span>{expert.email}</span>
                </div>
              )}

              {expert.phone && (
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf6df] text-[#4f8f3a]">
                    <Phone size={17} />
                  </div>

                  <span>{expert.phone}</span>
                </div>
              )}

            </div>
          )}

        </div>

        {/* ================================= */}
        {/* RIGHT SIDE - IMAGE SLIDER */}
        {/* ================================= */}

        <div className="order-1 flex w-full justify-center lg:order-2 lg:w-1/2">

          <div className="w-full max-w-[420px]">

            <div className="relative">

              {/* Image viewport */}

              <div className="relative h-[240px] w-full overflow-hidden rounded-[28px] bg-gradient-to-b from-[#eaf6df] to-[#d9ecc9] shadow-[0_20px_45px_-15px_rgba(11,36,24,0.35)] sm:h-[280px] lg:h-[300px]">

                {experts.map((item, index) => {
                  let distance = index - current;

                  if (distance > experts.length / 2) {
                    distance -= experts.length;
                  }

                  if (distance < -experts.length / 2) {
                    distance += experts.length;
                  }

                  return (
                    <img
                      key={item.id || item.image || index}
                      src={getImageUrl(item.image)}
                      alt={item.name || "Team member"}
                      className="
                        absolute
                        left-1/2
                        top-1/2
                        h-[200px]
                        w-[290px]
                        rounded-2xl
                        object-cover
                        shadow-xl
                        ring-1
                        ring-white/60
                        transition-all
                        duration-500
                        ease-out
                        sm:h-[235px]
                        sm:w-[345px]
                        lg:h-[250px]
                        lg:w-[365px]
                      "
                      style={{
                        transform: `
                          translate(-50%, -50%)
                          translateX(${distance * 90}px)
                          scale(${distance === 0 ? 1 : 0.8})
                        `,

                        opacity:
                          Math.abs(distance) > 1
                            ? 0
                            : distance === 0
                              ? 1
                              : 0.4,

                        zIndex: 10 - Math.abs(distance),

                        pointerEvents:
                          distance === 0 ? "auto" : "none",
                      }}
                      onError={(e) => {
                        e.currentTarget.src = "/images/MOUNT.jpg";
                      }}
                    />
                  );
                })}

              </div>

              {/* Previous */}

              {experts.length > 1 && (
                <button
                  type="button"
                  onClick={previousImage}
                  aria-label="Previous team member"
                  className="
                    absolute
                    left-3
                    top-1/2
                    z-30
                    flex
                    h-10
                    w-10
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    bg-white/90
                    text-[#0b2418]
                    shadow-lg
                    backdrop-blur
                    transition
                    duration-200
                    hover:scale-110
                    hover:bg-white
                  "
                >
                  <ChevronLeft size={20} />
                </button>
              )}

              {/* Next */}

              {experts.length > 1 && (
                <button
                  type="button"
                  onClick={nextImage}
                  aria-label="Next team member"
                  className="
                    absolute
                    right-3
                    top-1/2
                    z-30
                    flex
                    h-10
                    w-10
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    bg-white/90
                    text-[#0b2418]
                    shadow-lg
                    backdrop-blur
                    transition
                    duration-200
                    hover:scale-110
                    hover:bg-white
                  "
                >
                  <ChevronRight size={20} />
                </button>
              )}

              {/* Name Card */}

              <div
                className="
                  relative
                  z-20
                  mx-8
                  -mt-9
                  rounded-2xl
                  border
                  border-white/70
                  bg-white/95
                  px-5
                  py-4
                  text-center
                  shadow-[0_12px_30px_-10px_rgba(11,36,24,0.3)]
                  backdrop-blur
                  sm:mx-10
                  sm:-mt-10
                "
              >

                {expert.name && (
                  <p className="text-base font-bold text-[#0b2418] sm:text-lg">
                    {expert.name}
                  </p>
                )}

                {expert.position && (
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-[#4f8f3a] sm:text-sm">
                    {expert.position}
                  </p>
                )}

              </div>

            </div>

            {/* Dots */}

            {experts.length > 1 && (
              <div className="mt-4 flex items-center justify-center gap-2">
                {experts.map((item, index) => (
                  <button
                    key={item.id || item.image || index}
                    type="button"
                    onClick={() => setCurrent(index)}
                    aria-label={`Show ${item.name}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === current
                        ? "w-6 bg-[#4f8f3a]"
                        : "w-1.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  );
};

export default GuideExpert;