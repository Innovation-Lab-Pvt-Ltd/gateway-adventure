import React, { useEffect, useRef, useState } from "react";
import {
  Mountain,
  Compass,
  LayoutGrid,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = "/api/v1/allpackages";

const IMAGE_BASE_URL =
  "https://gatewaytreks.com/public/uploads/frontend/full/";

const PACKAGES_PER_PAGE = 15;

const TourCategories = () => {
  const navigate = useNavigate();

  const [allPackages, setAllPackages] = useState([]);
  const [activities, setActivities] = useState([]);
  const [regions, setRegions] = useState([]);

  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef(null);

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
        let fetchedRegions = [];

        do {
          const response = await fetch(
            `${API_URL}?page=${page}&sort=price-lowest`,
            {
              headers: {
                Accept: "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error(
              `Failed to fetch packages: ${response.status}`
            );
          }

          const data = await response.json();

          console.log("ALL PACKAGES RESPONSE:", data);

          // =================================================
          // PACKAGES
          // =================================================

          const packageData = data?.packages;

          const pagePackages = packageData?.data || [];

          collectedPackages = [
            ...collectedPackages,
            ...pagePackages,
          ];

          lastPage = packageData?.last_page || 1;

          // =================================================
          // ACTIVITIES
          // =================================================

          if (
            page === 1 &&
            Array.isArray(data?.activities)
          ) {
            fetchedActivities = data.activities;
          }

          // =================================================
          // REGIONS
          // =================================================

          if (
            page === 1 &&
            Array.isArray(data?.regions)
          ) {
            fetchedRegions = data.regions;
          }

          page++;
        } while (page <= lastPage);

        console.log(
          "ALL COLLECTED PACKAGES:",
          collectedPackages
        );

        // Check the slug of every package
        collectedPackages.forEach((pkg) => {
          console.log(
            "PACKAGE:",
            pkg.title || pkg.name,
            "| SLUG:",
            pkg.slug
          );
        });

        setAllPackages(collectedPackages);
        setActivities(fetchedActivities);
        setRegions(fetchedRegions);
      } catch (error) {
        console.error(
          "ERROR FETCHING PACKAGES:",
          error
        );

        setAllPackages([]);
        setActivities([]);
        setRegions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPackages();
  }, []);

  // =====================================================
  // ACTIVITY ICON
  // =====================================================

  const getActivityIcon = (activityName = "") => {
    const name = activityName.toLowerCase();

    if (
      name.includes("trek") ||
      name.includes("hiking") ||
      name.includes("climbing")
    ) {
      return Mountain;
    }

    if (
      name.includes("bike") ||
      name.includes("biking") ||
      name.includes("tour")
    ) {
      return Compass;
    }

    return LayoutGrid;
  };

  // =====================================================
  // CATEGORY OPTIONS
  // =====================================================

  const categoryOptions = [
    {
      key: "all",
      label: "All",
      icon: LayoutGrid,
    },

    ...activities.map((activity) => ({
      key: String(activity.id),
      label: activity.name,
      icon: getActivityIcon(activity.name),
    })),
  ];

  // =====================================================
  // FILTER PACKAGES
  // =====================================================

  const filteredPackages =
    category === "all"
      ? allPackages
      : allPackages.filter(
          (pkg) =>
            String(pkg.activity_id) ===
            String(category)
        );

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPackages = filteredPackages.length;

  const lastPage = Math.max(
    1,
    Math.ceil(
      totalPackages / PACKAGES_PER_PAGE
    )
  );

  const startIndex =
    (currentPage - 1) *
    PACKAGES_PER_PAGE;

  const currentPackages =
    filteredPackages.slice(
      startIndex,
      startIndex + PACKAGES_PER_PAGE
    );

  // =====================================================
  // RESET PAGE
  // =====================================================

  useEffect(() => {
    if (currentPage > lastPage) {
      setCurrentPage(lastPage);
    }
  }, [currentPage, lastPage]);

  // =====================================================
  // SCROLL TO SECTION
  // =====================================================

  const scrollToSection = () => {
    if (!sectionRef.current) return;

    const sectionTop =
      sectionRef.current.getBoundingClientRect()
        .top + window.pageYOffset;

    window.scrollTo({
      top: sectionTop - 100,
      behavior: "smooth",
    });
  };

  // =====================================================
  // CATEGORY CHANGE
  // =====================================================

  const handleCategoryChange = (categoryId) => {
    setCategory(String(categoryId));
    setCurrentPage(1);

    setTimeout(() => {
      scrollToSection();
    }, 50);
  };

  // =====================================================
  // NEXT PAGE
  // =====================================================

  const handleNextPage = () => {
    if (currentPage < lastPage) {
      setCurrentPage((prev) => prev + 1);

      setTimeout(() => {
        scrollToSection();
      }, 50);
    }
  };

  // =====================================================
  // PREVIOUS PAGE
  // =====================================================

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);

      setTimeout(() => {
        scrollToSection();
      }, 50);
    }
  };

  // =====================================================
  // PACKAGE IMAGE
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
  // CARD SIZE
  // =====================================================

  const getCardSize = (index) => {
    if (index % 7 === 0) {
      return "large";
    }

    if (index % 5 === 0) {
      return "medium";
    }

    return "small";
  };

  // =====================================================
  // GET ACTIVITY NAME
  // =====================================================

  const getPackageActivityName = (pkg) => {
    const activity = activities.find(
      (activity) =>
        String(activity.id) ===
        String(pkg.activity_id)
    );

    return activity?.name || "";
  };

  // =====================================================
  // GET REGION NAME
  // =====================================================

  const getPackageRegionName = (pkg) => {
    // region_id of 0 (or missing) means no region was assigned
    if (
      !pkg.region_id ||
      Number(pkg.region_id) === 0
    ) {
      return "";
    }

    const region = regions.find(
      (region) =>
        String(region.id) ===
        String(pkg.region_id)
    );

    return region?.name || "";
  };

  // =====================================================
  // OPEN TRIP DETAIL
  // =====================================================

  const handlePackageClick = (pkg) => {
    console.log("================================");
    console.log("CLICKED PACKAGE:", pkg);
    console.log("PACKAGE TITLE:", pkg.title || pkg.name);
    console.log("PACKAGE SLUG:", pkg.slug);
    console.log("================================");

    // ---------------------------------------------
    // Slug is required because Trip Detail API uses:
    //
    // /tripdetail/<slug>
    // ---------------------------------------------

    if (!pkg.slug) {
      console.error(
        "SLUG IS MISSING FROM THIS PACKAGE:",
        pkg
      );

      return;
    }

    const slug = String(pkg.slug).trim();

    console.log(
      "NAVIGATING TO:",
      `/package/${slug}`
    );

    navigate(`/package/${slug}`);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <section
      ref={sectionRef}
      className="bg-[#FBF9F4] px-6 py-16 md:px-10 lg:px-16"
    >
      {/* =================================================
          HEADING
      ================================================= */}

      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h3 className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#4f8f3a]">
          <span className="h-px w-6 bg-[#4f8f3a]" />

          Tours &amp; Travel Categories

          <span className="h-px w-6 bg-[#4f8f3a]" />
        </h3>

        <h1 className="mb-4 text-3xl font-bold text-[#0b2418] sm:text-4xl lg:text-5xl">
          Choose Your Activity
        </h1>

        <p className="mx-auto max-w-2xl text-base leading-7 text-gray-500">
          Discover breathtaking treks, cultural experiences,
          adventure tours, and unforgettable journeys across
          Nepal.
        </p>
      </div>

      {/* =================================================
          ACTIVITY BUTTONS
      ================================================= */}

      <div className="mb-12 flex justify-center">
        <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-full border border-[#0b2418]/10 bg-white p-1.5 shadow-sm">
          {categoryOptions.map(
            ({ key, label, icon: Icon }) => {
              const isActive =
                String(category) === String(key);

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() =>
                    handleCategoryChange(key)
                  }
                  className={`
                    flex
                    items-center
                    gap-2
                    rounded-full
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    transition
                    duration-300

                    ${
                      isActive
                        ? "bg-[#0b2418] text-white shadow-md"
                        : "text-[#0b2418]/70 hover:bg-[#0b2418]/5 hover:text-[#0b2418]"
                    }
                  `}
                >
                  <Icon
                    size={16}
                    strokeWidth={2.25}
                  />

                  {label}
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* =================================================
          PAGE INFORMATION
      ================================================= */}

      {!loading &&
        currentPackages.length > 0 && (
          <div className="mx-auto mb-5 flex max-w-6xl items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing page{" "}
              <span className="font-semibold text-[#0b2418]">
                {currentPage}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-[#0b2418]">
                {lastPage}
              </span>
            </p>

            <p className="text-sm font-medium text-[#0b2418]">
              {category === "all"
                ? "All packages"
                : activities.find(
                    (activity) =>
                      String(activity.id) ===
                      String(category)
                  )?.name || "Packages"}
            </p>
          </div>
        )}

      {/* =================================================
          LOADING
      ================================================= */}

      {loading && (
        <div className="py-20 text-center text-gray-500">
          Loading packages...
        </div>
      )}

      {/* =================================================
          PACKAGE GRID
      ================================================= */}

      {!loading &&
        currentPackages.length > 0 && (
          <div
            className="
              mx-auto
              grid
              max-w-6xl
              auto-rows-[150px]
              grid-cols-2
              gap-4
              [grid-auto-flow:dense]
              sm:auto-rows-[160px]
              md:grid-cols-4
            "
          >
            {currentPackages.map(
              (pkg, index) => {
                const size =
                  getCardSize(index);

                return (
                  <div
                    key={pkg.id}
                    onClick={() =>
                      handlePackageClick(pkg)
                    }
                    className={`
                      group
                      relative
                      cursor-pointer
                      overflow-hidden
                      rounded-2xl
                      bg-gray-200
                      shadow-md
                      ring-1
                      ring-black/5
                      transition
                      duration-300
                      hover:shadow-xl

                      ${
                        size === "large"
                          ? "col-span-2 row-span-2"
                          : size === "medium"
                          ? "col-span-2 row-span-1"
                          : "col-span-1 row-span-1"
                      }
                    `}
                  >
                    {/* IMAGE */}

                    <img
                      src={getImage(pkg)}
                      alt={
                        pkg.title ||
                        pkg.name ||
                        "Package"
                      }
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-110
                      "
                      onError={(e) => {
                        e.currentTarget.src =
                          "/images/MOUNT.jpg";
                      }}
                    />

                    {/* OVERLAY */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/80
                        via-black/10
                        to-transparent
                        transition
                        duration-300
                        group-hover:from-black/85
                      "
                    />

                    {/* ARROW */}

                    <div
                      className="
                        absolute
                        right-4
                        top-4
                        flex
                        h-9
                        w-9
                        translate-y-1
                        items-center
                        justify-center
                        rounded-full
                        bg-white/90
                        text-[#0b2418]
                        opacity-0
                        shadow-md
                        backdrop-blur
                        transition-all
                        duration-300
                        group-hover:translate-y-0
                        group-hover:opacity-100
                      "
                    >
                      <ArrowUpRight
                        size={18}
                        strokeWidth={2.5}
                      />
                    </div>

                    {/* CONTENT */}

                    <div className="absolute bottom-0 left-0 right-0 p-5">

                      {/* ACTIVITY & REGION */}

                      {(getPackageActivityName(pkg) ||
                        getPackageRegionName(pkg)) && (
                        <div className="mb-2 flex flex-wrap items-center gap-1.5">
                          {getPackageActivityName(
                            pkg
                          ) && (
                            <span className="inline-block rounded-full bg-[#9be564] px-3 py-1 text-xs font-semibold text-[#0b2418]">
                              {getPackageActivityName(
                                pkg
                              )}
                            </span>
                          )}

                          {getPackageRegionName(
                            pkg
                          ) && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                              <MapPin size={12} />
                              {getPackageRegionName(
                                pkg
                              )}
                            </span>
                          )}
                        </div>
                      )}

                      {/* TITLE */}

                      <h3 className="text-xl font-bold leading-snug text-white drop-shadow-sm">
                        {pkg.title ||
                          pkg.name ||
                          "Untitled Package"}
                      </h3>

                      {/* INFO */}

                      <div className="mt-2 flex items-center gap-3 text-xs font-medium text-white/80">
                        {pkg.duration && (
                          <span>
                            {pkg.duration} Days
                          </span>
                        )}

                        {pkg.price !== null &&
                          pkg.price !== undefined &&
                          pkg.price !== "" && (
                            <span>
                              ${pkg.price}
                            </span>
                          )}

                        {pkg.rating && (
                          <span>
                            ★ {pkg.rating}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}

      {/* =================================================
          EMPTY STATE
      ================================================= */}

      {!loading &&
        currentPackages.length === 0 && (
          <div className="py-20 text-center text-gray-500">
            No packages found.
          </div>
        )}

      {/* =================================================
          PAGINATION
      ================================================= */}

      {!loading && lastPage > 1 && (
        <div className="mx-auto mt-10 flex max-w-6xl items-center justify-center gap-4">

          <button
            type="button"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-[#0b2418]/10
              bg-white
              px-5
              py-2.5
              text-sm
              font-semibold
              text-[#0b2418]
              shadow-sm
              transition
              hover:bg-[#0b2418]
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <ChevronLeft size={17} />

            Previous
          </button>

          <div
            className="
              flex
              h-10
              min-w-10
              items-center
              justify-center
              rounded-xl
              bg-[#0b2418]
              px-3
              text-sm
              font-bold
              text-white
            "
          >
            {currentPage}
          </div>

          <button
            type="button"
            onClick={handleNextPage}
            disabled={
              currentPage === lastPage
            }
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-[#0b2418]/10
              bg-white
              px-5
              py-2.5
              text-sm
              font-semibold
              text-[#0b2418]
              shadow-sm
              transition
              hover:bg-[#0b2418]
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            Next

            <ChevronRight size={17} />
          </button>
        </div>
      )}

      {/* =================================================
          TOTAL COUNT
      ================================================= */}

      {!loading && totalPackages > 0 && (
        <p className="mt-4 text-center text-xs text-gray-400">
          {totalPackages} packages available
        </p>
      )}
    </section>
  );
};

export default TourCategories;