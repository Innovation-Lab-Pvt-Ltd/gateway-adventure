import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ChevronDown,
  X,
  ArrowUpRight,
  Compass,
} from "lucide-react";

const API_URL = "/api/v1/allpackages";

const IMAGE_BASE_URL =
  "https://gatewaytreks.com/public/uploads/frontend/full/";

const TrekSearch = () => {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);

  // =====================================================
  // PACKAGE NAME SEARCH
  // =====================================================

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // =====================================================
  // FILTER SEARCH
  // =====================================================

  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [grade, setGrade] = useState("");

  const [filterResults, setFilterResults] = useState([]);
  const [showFilterResults, setShowFilterResults] =
    useState(false);

  const [loading, setLoading] = useState(true);

  // =====================================================
  // FETCH ALL PACKAGES
  // =====================================================

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);

        let allPackages = [];
        let page = 1;
        let lastPage = 1;

        do {
          const response = await fetch(
            `${API_URL}?page=${page}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch packages");
          }

          const data = await response.json();

          const currentPackages =
            data?.packages?.data || [];

          allPackages = [
            ...allPackages,
            ...currentPackages,
          ];

          lastPage =
            data?.packages?.last_page || 1;

          page++;
        } while (page <= lastPage);

        setPackages(allPackages);
      } catch (error) {
        console.error(
          "Error fetching packages:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // =====================================================
  // SEARCH PACKAGE BY NAME
  // =====================================================

  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }

    const searchText = search.toLowerCase();

    const results = packages.filter((pkg) => {
      const packageName =
        pkg.name ||
        pkg.title ||
        "";

      return packageName
        .toLowerCase()
        .includes(searchText);
    });

    setSearchResults(results);
  }, [search, packages]);

  // =====================================================
  // FILTER PACKAGES
  // =====================================================

  const handleFindYourTrek = () => {
    let results = [...packages];

    // ===================================================
    // DESTINATION
    // ===================================================

    if (destination) {
      results = results.filter(
        (pkg) =>
          String(pkg.destination_id) ===
          String(destination)
      );
    }

    // ===================================================
    // DURATION
    // ===================================================

    if (duration) {
      results = results.filter((pkg) => {
        const days = Number(pkg.duration);

        if (duration === "1-7") {
          return days >= 1 && days <= 7;
        }

        if (duration === "8-14") {
          return days >= 8 && days <= 14;
        }

        if (duration === "15-21") {
          return days >= 15 && days <= 21;
        }

        if (duration === "22+") {
          return days >= 22;
        }

        return true;
      });
    }

    // ===================================================
    // GRADE
    // ===================================================

    if (grade) {
      results = results.filter(
        (pkg) =>
          String(pkg.grade_id) ===
          String(grade)
      );
    }

    setFilterResults(results);
    setShowFilterResults(true);
  };

  // =====================================================
  // CLEAR NAME SEARCH
  // =====================================================

  const clearSearch = () => {
    setSearch("");
    setSearchResults([]);
  };

  // =====================================================
  // PACKAGE CLICK
  // =====================================================

  const handlePackageClick = (pkg) => {
    if (!pkg?.slug) {
      console.error(
        "Package slug is missing:",
        pkg
      );
      return;
    }

    navigate(`/package/${pkg.slug}`);
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
  // WAYPOINT RESULT ROW
  // A trail-style row: a small route line + marker on the
  // left connects each result, standing in for the generic
  // floating white card.
  // =====================================================

  const PackageResult = ({ pkg, isLast }) => {
    return (
      <button
        type="button"
        onClick={() => handlePackageClick(pkg)}
        className="
          group
          relative
          flex
          w-full
          items-center
          gap-4
          py-3
          pl-8
          pr-2
          text-left
          transition
          duration-200
        "
      >
        {/* ROUTE LINE + MARKER */}

        <span
          className="
            pointer-events-none
            absolute
            left-2
            top-0
            h-full
            w-px
            bg-[#D3CBB4]
          "
          style={{ display: isLast ? "none" : "block" }}
        />

        <span
          className="
            absolute
            left-[5px]
            top-1/2
            h-2.5
            w-2.5
            -translate-y-1/2
            rounded-full
            border-2
            border-[#9BE564]
            bg-[#F4F0E7]
            transition
            group-hover:bg-[#9BE564]
          "
        />

        {/* IMAGE */}

        <div className="h-16 w-24 shrink-0 overflow-hidden rounded-md">
          <img
            src={getImage(pkg)}
            alt={pkg.name || pkg.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        {/* CONTENT */}

        <div className="min-w-0 flex-1 border-b border-[#E4DCC8] pb-3 group-last:border-none">

          <h3 className="truncate font-montserrat text-sm font-bold text-[#0b2418] sm:text-base">
            {pkg.name || pkg.title}
          </h3>

          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 font-montserrat text-xs text-[#6B7568]">

            {pkg.duration && (
              <span>{pkg.duration} Days</span>
            )}

            {pkg.destname && (
              <span>{pkg.destname}</span>
            )}

            {pkg.gradename && (
              <span>{pkg.gradename}</span>
            )}

          </div>
        </div>

        {/* ARROW */}

        <ArrowUpRight
          size={17}
          className="shrink-0 self-start pt-1 text-[#B9B198] transition group-hover:text-[#0b2418]"
        />
      </button>
    );
  };

  return (
    <section
      className="relative overflow-hidden bg-[#F4F0E7] py-16 sm:py-20"
      style={{
        backgroundImage:
          "repeating-radial-gradient(circle at 88% 8%, rgba(11,36,24,0.05) 0px, rgba(11,36,24,0.05) 1px, transparent 1px, transparent 34px)",
      }}
    >
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4">

        {/* =================================================
            HEADING
            ================================================= */}

        <div className="mb-8 flex items-center gap-3">

          <Compass
            size={22}
            strokeWidth={1.5}
            className="text-[#9BE564]"
          />

          <h2 className="font-playfair text-3xl font-medium text-[#0b2418] sm:text-4xl">
            Find your trek
          </h2>

        </div>

        {/* =================================================
            THE TRAIL PANEL
            One bold, dark, confident element — search input
            on top, filters + CTA below, divided by hairlines
            instead of separate boxed cards.
            ================================================= */}

        <div className="relative rounded-lg bg-[#0b2418] px-5 pt-5 pb-2 shadow-[0_20px_50px_-20px_rgba(11,36,24,0.5)] sm:px-8 sm:pt-6">

          {/* NAME SEARCH */}

          <div className="relative flex items-center border-b border-white/15 pb-4 focus-within:border-[#9BE564]">

            <Search
              size={19}
              className="shrink-0 text-white/40"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search a trek by name — Everest Base Camp, Annapurna…"
              className="
                w-full
                bg-transparent
                px-3
                py-1
                font-montserrat
                text-sm
                text-white
                placeholder-white/40
                outline-none
                sm:text-base
              "
            />

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-white/50
                  transition
                  hover:bg-white/10
                  hover:text-white
                "
              >
                <X size={16} />
              </button>
            )}

          </div>

          {/* NAME SEARCH RESULTS */}

          {search.trim() && (
            <div className="max-h-72 overflow-y-auto rounded-md bg-[#F4F0E7] px-2 py-2 my-4">

              {loading ? (
                <div className="px-4 py-4 text-center font-montserrat text-sm text-[#6B7568]">
                  Loading treks…
                </div>
              ) : searchResults.length === 0 ? (
                <div className="px-4 py-4 text-center font-montserrat text-sm text-[#6B7568]">
                  No trek matches “{search}”.
                </div>
              ) : (
                searchResults.map((pkg, i) => (
                  <PackageResult
                    key={pkg.id}
                    pkg={pkg}
                    isLast={i === searchResults.length - 1}
                  />
                ))
              )}

            </div>
          )}

          {/* FILTERS ROW */}

          <div className="flex flex-col divide-y divide-white/10 sm:flex-row sm:items-stretch sm:divide-x sm:divide-y-0">

            {/* DESTINATION */}

            <div className="flex-1 py-4 sm:pr-5">

              <label className="mb-1 block font-montserrat text-[11px] font-medium text-white/40">
                Destination
              </label>

              <div className="relative">
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="
                    w-full
                    appearance-none
                    bg-transparent
                    py-1
                    pr-6
                    font-montserrat
                    text-sm
                    font-semibold
                    text-white
                    outline-none
                  "
                >
                  <option className="text-[#0b2418]" value="">
                    Anywhere
                  </option>
                  <option className="text-[#0b2418]" value="1">
                    Nepal
                  </option>
                  <option className="text-[#0b2418]" value="2">
                    Tibet
                  </option>
                </select>

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-white/40"
                />
              </div>
            </div>

            {/* DURATION */}

            <div className="flex-1 py-4 sm:px-5">

              <label className="mb-1 block font-montserrat text-[11px] font-medium text-white/40">
                Duration
              </label>

              <div className="relative">
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="
                    w-full
                    appearance-none
                    bg-transparent
                    py-1
                    pr-6
                    font-montserrat
                    text-sm
                    font-semibold
                    text-white
                    outline-none
                  "
                >
                  <option className="text-[#0b2418]" value="">
                    Any length
                  </option>
                  <option className="text-[#0b2418]" value="1-7">
                    1 – 7 days
                  </option>
                  <option className="text-[#0b2418]" value="8-14">
                    8 – 14 days
                  </option>
                  <option className="text-[#0b2418]" value="15-21">
                    15 – 21 days
                  </option>
                  <option className="text-[#0b2418]" value="22+">
                    22+ days
                  </option>
                </select>

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-white/40"
                />
              </div>
            </div>

            {/* GRADE */}

            <div className="flex-1 py-4 sm:px-5">

              <label className="mb-1 block font-montserrat text-[11px] font-medium text-white/40">
                Grade
              </label>

              <div className="relative">
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="
                    w-full
                    appearance-none
                    bg-transparent
                    py-1
                    pr-6
                    font-montserrat
                    text-sm
                    font-semibold
                    text-white
                    outline-none
                  "
                >
                  <option className="text-[#0b2418]" value="">
                    Any grade
                  </option>
                  <option className="text-[#0b2418]" value="1">
                    Easy
                  </option>
                  <option className="text-[#0b2418]" value="2">
                    Moderate
                  </option>
                  <option className="text-[#0b2418]" value="3">
                    Strenuous
                  </option>
                  <option className="text-[#0b2418]" value="4">
                    Very strenuous
                  </option>
                </select>

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-white/40"
                />
              </div>
            </div>

            {/* CTA */}

            <div className="flex items-center py-4 sm:pl-5">
              <button
                type="button"
                onClick={handleFindYourTrek}
                className="
                  flex
                  w-full
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-md
                  bg-[#9BE564]
                  px-6
                  py-2.5
                  font-montserrat
                  text-sm
                  font-semibold
                  text-[#0b2418]
                  transition
                  hover:bg-white
                  sm:w-auto
                "
              >
                <Search size={16} strokeWidth={2.5} />
                Find your trek
              </button>
            </div>

          </div>
        </div>

        {/* =================================================
            FILTER RESULTS
            ================================================= */}

        {showFilterResults && (
          <div className="mt-6 max-h-96 overflow-y-auto rounded-lg border border-[#E4DCC8] bg-white/60 px-4 py-2">

            {filterResults.length === 0 ? (
              <div className="px-4 py-6 text-center font-montserrat text-sm text-[#6B7568]">
                No treks match those filters — try widening your search.
              </div>
            ) : (
              filterResults.map((pkg, i) => (
                <PackageResult
                  key={pkg.id}
                  pkg={pkg}
                  isLast={i === filterResults.length - 1}
                />
              ))
            )}

          </div>
        )}

      </div>
    </section>
  );
};

export default TrekSearch;