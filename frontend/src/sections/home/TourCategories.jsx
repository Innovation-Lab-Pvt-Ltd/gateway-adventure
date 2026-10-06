import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const TourCategories = () => {
  const [allPackages, setAllPackages] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("all");

  const sectionRef = useRef(null);
  const API_URL = `${import.meta.env.VITE_BASE_API_URL}allpackages`;
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

  // =====================================================
  // FETCH ALL PACKAGES
  // =====================================================

  useEffect(() => {
    const fetchAllPackages = async () => {
      try {
        setLoading(true);

        let collectedPackages = [];
        let page = 1;
        let lastPage = 1;
        let fetchedActivities = [];

        do {
          const response = await fetch(
            `${API_URL}?page=${page}&sort=price-lowest`,
            {
              headers: {
                Accept: "application/json",
              },
            },
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch packages: ${response.status}`);
          }

          const data = await response.json();

          console.log("ALL PACKAGES RESPONSE:", data);

          // =================================================
          // PACKAGES
          // =================================================

          const packageData = data?.packages;

          const pagePackages = packageData?.data || [];

          collectedPackages = [...collectedPackages, ...pagePackages];

          lastPage = packageData?.last_page || 1;

          // =================================================
          // ACTIVITIES
          // =================================================

          if (page === 1 && Array.isArray(data?.activities)) {
            fetchedActivities = data.activities;
          }

          page++;
        } while (page <= lastPage);

        console.log("ALL COLLECTED PACKAGES:", collectedPackages);

        setAllPackages(collectedPackages);
        setActivities(fetchedActivities);
      } catch (error) {
        console.error("ERROR FETCHING PACKAGES:", error);

        setAllPackages([]);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPackages();
  }, []);

  // =====================================================
  // CATEGORY OPTIONS
  // =====================================================

  const categoryOptions = [
    {
      key: "all",
      label: "All Trips",
    },

    ...activities.map((activity) => ({
      key: String(activity.id),
      label: activity.name,
    })),
  ];

  // =====================================================
  // FILTER PACKAGES
  // =====================================================

  const filteredPackages =
    category === "all"
      ? allPackages
      : allPackages.filter(
          (pkg) => String(pkg.activity_id) === String(category),
        );

  // =====================================================
  // CATEGORY CHANGE
  // =====================================================

  const handleCategoryChange = (categoryId) => {
    setCategory(String(categoryId));

    setTimeout(() => {
      if (!sectionRef.current) return;

      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  // =====================================================
  // IMAGE
  // =====================================================

  const getImage = (pkg) => {
    if (pkg.image) {
      return `${IMAGE_BASE_URL}${pkg.image}`;
    }

    if (pkg.social_image) {
      return `${IMAGE_BASE_URL}${pkg.social_image}`;
    }

    return "/images/MOUNT.jpg";
  };

  // =====================================================
  // DESTINATION
  // =====================================================

  const getDestination = (pkg) => {
    return (
      pkg.destination ||
      pkg.destname ||
      pkg.region_name ||
      pkg.region?.name ||
      "Nepal"
    );
  };

  // =====================================================
  // DESCRIPTION
  // =====================================================

  const getDescription = (pkg) => {
    return (
      pkg.description ||
      pkg.short_description ||
      `
        <p>
          Experience an unforgettable journey through
          Nepal with remarkable landscapes, culture,
          and adventure.
        </p>
      `
    );
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section
      ref={sectionRef}
      className="
        min-h-[90vh]
        w-full
        overflow-hidden
        bg-gradient-to-r
        from-[#f7f1e8]
        via-[#efd5d5]
        to-[#c98291]
      "
    >
      {/* =====================================================
          TOP CATEGORY NAVIGATION
      ===================================================== */}

      <div className="px-5 pt-10 sm:px-6 lg:px-12">
        <div
          className="
            flex
            gap-2
            overflow-x-auto
            pb-3
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {categoryOptions.map((item) => {
            const isActive = String(category) === String(item.key);

            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleCategoryChange(item.key)}
                className={`
                  shrink-0
                  border
                  px-4
                  py-2
                  font-montserrat
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.12em]
                  transition-all
                  duration-300

                  ${
                    isActive
                      ? "border-[#351b24] bg-[#351b24] text-white"
                      : "border-[#351b24]/30 bg-white/20 text-[#351b24] hover:bg-[#351b24] hover:text-white"
                  }
                `}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================
          MAIN HORIZONTAL TRIPS
      ===================================================== */}

      <div
        className="
          flex
          min-h-[90vh]
          w-full
          items-center
          gap-5
          overflow-x-auto
          overflow-y-hidden
          px-5
          py-8
          sm:gap-6
          sm:px-6
          lg:gap-8
          lg:px-12
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {/* =====================================================
            INTRO
        ===================================================== */}

        <div
          className="
            flex
            h-[460px]
            w-[260px]
            shrink-0
            flex-col
            justify-center

            sm:h-[500px]
            sm:w-[280px]

            md:h-[520px]
            md:w-[300px]

            lg:h-[550px]
            lg:w-[340px]
          "
        >
          <h1
            className="
              font-greatvibes
              text-4xl
              font-normal
              leading-tight
              text-[#351b24]

              sm:text-[42px]
              lg:text-[46px]
            "
          >
            Explore our trips
          </h1>

          <p
            className="
              mt-3
              max-w-[270px]
              font-montserrat
              text-xs
              leading-relaxed
              text-[#351b24]/75

              sm:mt-4
              sm:text-sm

              lg:max-w-[300px]
              lg:text-base
            "
          >
            Remarkable experiences to inspire the mind
          </p>

          {/* CURRENT CATEGORY */}

          {category !== "all" && (
            <div
              className="
                mt-6
                font-montserrat
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.15em]
                text-[#351b24]/60
              "
            >
              {
                activities.find(
                  (activity) => String(activity.id) === String(category),
                )?.name
              }
            </div>
          )}
        </div>

        {/* =====================================================
            LOADING
        ===================================================== */}

        {loading && (
          <div
            className="
              flex
              h-[460px]
              w-[260px]
              shrink-0
              items-center
              justify-center

              sm:h-[500px]
              sm:w-[280px]

              md:h-[520px]
              md:w-[300px]

              lg:h-[550px]
              lg:w-[310px]
            "
          >
            <p
              className="
                font-montserrat
                text-sm
                text-[#351b24]
              "
            >
              Loading trips...
            </p>
          </div>
        )}

        {/* =====================================================
            EMPTY
        ===================================================== */}

        {!loading && filteredPackages.length === 0 && (
          <div
            className="
                flex
                h-[460px]
                w-[260px]
                shrink-0
                items-center
                justify-center
                text-center

                sm:h-[500px]
                sm:w-[280px]

                md:h-[520px]
                md:w-[300px]

                lg:h-[550px]
                lg:w-[310px]
              "
          >
            <p
              className="
                  max-w-[220px]
                  font-montserrat
                  text-sm
                  leading-relaxed
                  text-[#351b24]/70
                "
            >
              No trips are available in this category.
            </p>
          </div>
        )}

        {/* =====================================================
            TRIP CARDS
        ===================================================== */}

        {!loading &&
          filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="
                group
                relative
                h-[460px]
                w-[260px]
                shrink-0
                overflow-hidden
                bg-gray-200

                sm:h-[500px]
                sm:w-[280px]

                md:h-[520px]
                md:w-[300px]

                lg:h-[550px]
                lg:w-[310px]
              "
            >
              {/* =================================================
                  IMAGE
              ================================================= */}

              <img
                src={getImage(pkg)}
                alt={pkg.title || pkg.name || "Nepal trip"}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-[1200ms]
                  ease-in-out
                  group-hover:scale-105
                "
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/MOUNT.jpg";
                }}
              />

              {/* =================================================
                  DARK OVERLAY
              ================================================= */}

              <div
                className="
                  absolute
                  inset-0
                  bg-black/5
                  transition-all
                  duration-[1200ms]
                  ease-in-out
                  group-hover:bg-black/35
                "
              />

              {/* =================================================
                  BOTTOM GRADIENT
              ================================================= */}

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  h-2/3
                  bg-gradient-to-t
                  from-black/75
                  via-black/20
                  to-transparent
                "
              />

              {/* =================================================
                  CARD CONTENT
              ================================================= */}

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  z-10
                  p-5

                  sm:p-6
                "
              >
                {/* =================================================
                    DESTINATION
                ================================================= */}

                <p
                  className="
                    font-montserrat
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.2em]
                    text-white/85

                    sm:text-xs
                  "
                >
                  {getDestination(pkg)}
                </p>

                {/* =================================================
                    TITLE
                ================================================= */}

                <h2
                  className="
                    mt-2
                    font-playfair
                    text-xl
                    font-medium
                    leading-tight
                    text-white

                    sm:text-2xl
                  "
                >
                  {pkg.title || pkg.name || "Untitled Trip"}
                </h2>

                {/* =================================================
                    EXTRA INFORMATION
                ================================================= */}

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    gap-3
                    font-montserrat
                    text-[10px]
                    text-white/75
                    sm:text-xs
                  "
                >
                  {pkg.duration && <span>{pkg.duration} Days</span>}

                  {pkg.price !== null &&
                    pkg.price !== undefined &&
                    pkg.price !== "" && <span>${pkg.price}</span>}

                  {pkg.rating && <span>★ {pkg.rating}</span>}
                </div>

                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <div
                  className="
                    mt-3
                    max-h-0
                    overflow-hidden
                    font-montserrat
                    text-xs
                    leading-relaxed
                    text-white/90
                    opacity-0
                    transition-all
                    duration-700
                    ease-in-out

                    group-hover:max-h-[120px]
                    group-hover:opacity-100

                    sm:text-sm
                  "
                  dangerouslySetInnerHTML={{
                    __html: getDescription(pkg),
                  }}
                />

                {/* =================================================
                    EXPLORE BUTTON
                ================================================= */}

                <Link
                  to={`/package/${pkg.slug}`}
                  className="
                    mt-4
                    inline-flex
                    items-center
                    justify-center
                    border
                    border-white
                    bg-transparent
                    px-4
                    py-2.5
                    font-montserrat
                    text-[10px]
                    font-medium
                    tracking-[0.15em]
                    text-white
                    transition-all
                    duration-500
                    ease-in-out

                    sm:mt-5
                    sm:px-5
                    sm:py-3
                    sm:text-xs

                    hover:bg-black/30
                    hover:border-white/90
                    hover:text-white
                  "
                >
                  EXPLORE TRIP
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default TourCategories;
