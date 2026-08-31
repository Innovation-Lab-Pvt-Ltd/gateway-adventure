
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ChevronDown,
  X,
  ArrowUpRight,
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
    navigate(`/packages/${pkg.id}`, {
      state: {
        trip: pkg,
      },
    });
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
  // PACKAGE RESULT CARD
  // =====================================================

  const PackageResult = ({ pkg }) => {
    return (
      <button
        type="button"
        onClick={() => handlePackageClick(pkg)}
        className="
          flex
          w-full
          items-center
          gap-4
          rounded-2xl
          bg-white
          p-3
          text-left
          shadow-lg
          transition
          duration-300
          hover:-translate-y-0.5
          hover:shadow-xl
        "
      >
        {/* IMAGE */}

        <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl">
          <img
            src={getImage(pkg)}
            alt={pkg.name || pkg.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* CONTENT */}

        <div className="min-w-0 flex-1">

          <h3 className="truncate text-sm font-bold text-[#0b2418] sm:text-base">
            {pkg.name || pkg.title}
          </h3>

          <div className="mt-1 flex flex-wrap gap-3 text-xs text-gray-500">

            {pkg.duration && (
              <span>
                {pkg.duration} Days
              </span>
            )}

            {pkg.destname && (
              <span>
                {pkg.destname}
              </span>
            )}

            {pkg.gradename && (
              <span>
                {pkg.gradename}
              </span>
            )}

          </div>
        </div>

        {/* ARROW */}

        <ArrowUpRight
          size={18}
          className="mr-2 shrink-0 text-gray-400"
        />
      </button>
    );
  };

  return (
    <div className="relative z-20 mx-auto w-full max-w-5xl px-4">

      {/* =================================================
          SEARCH BY PACKAGE NAME
          ================================================= */}

      <div className="relative">

        <div
          className="
            flex
            w-full
            items-center
            rounded-3xl
            bg-white
            p-3
            shadow-2xl
          "
        >

          {/* SEARCH ICON */}

          <Search
            size={21}
            className="ml-3 shrink-0 text-gray-400"
          />

          {/* INPUT */}

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search package by name..."
            className="
              w-full
              bg-transparent
              px-3
              py-2
              text-sm
              text-gray-800
              outline-none
              sm:text-base
            "
          />

          {/* CLEAR */}

          {search && (
            <button
              type="button"
              onClick={clearSearch}
              className="
                mr-2
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-full
                text-gray-400
                transition
                hover:bg-gray-100
                hover:text-gray-600
              "
            >
              <X size={17} />
            </button>
          )}

        </div>

        {/* =================================================
            NAME SEARCH RESULTS
            ================================================= */}

        {search.trim() && (
          <div
            className="
              absolute
              left-0
              right-0
              top-full
              z-50
              mt-2
              max-h-80
              space-y-2
              overflow-y-auto
            "
          >

            {loading ? (

              <div className="rounded-2xl bg-white p-5 text-center text-sm text-gray-500 shadow-xl">
                Loading packages...
              </div>

            ) : searchResults.length === 0 ? (

              <div className="rounded-2xl bg-white p-5 text-center text-sm text-gray-500 shadow-xl">
                No package found.
              </div>

            ) : (

              searchResults.map((pkg) => (
                <PackageResult
                  key={pkg.id}
                  pkg={pkg}
                />
              ))

            )}

          </div>
        )}

      </div>

      {/* =================================================
          FILTER SEARCH
          ================================================= */}

      <div
        className="
          mt-3
          flex
          w-full
          flex-col
          gap-3
          rounded-3xl
          bg-white
          p-4
          shadow-xl
          md:flex-row
          md:items-end
        "
      >

        {/* =================================================
            DESTINATION
            ================================================= */}

        <div className="flex-1">

          <label
            className="
              mb-1
              block
              text-[10px]
              font-bold
              uppercase
              tracking-widest
              text-gray-400
            "
          >
            Destination
          </label>

          <div className="relative">

            <select
              value={destination}
              onChange={(e) =>
                setDestination(e.target.value)
              }
              className="
                w-full
                appearance-none
                rounded-xl
                border
                border-gray-200
                bg-white
                px-3
                py-2.5
                pr-9
                text-sm
                font-medium
                text-[#0b2418]
                outline-none
                focus:border-[#2F6B4F]
              "
            >

              <option value="">
                Any destination
              </option>

              {/* destination_id 1 = Nepal */}

              <option value="1">
                Nepal
              </option>

              {/* destination_id 2 = Tibet */}

              <option value="2">
                Tibet
              </option>

            </select>

            <ChevronDown
              size={16}
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

          </div>
        </div>

        {/* =================================================
            DURATION
            ================================================= */}

        <div className="flex-1">

          <label
            className="
              mb-1
              block
              text-[10px]
              font-bold
              uppercase
              tracking-widest
              text-gray-400
            "
          >
            Duration
          </label>

          <div className="relative">

            <select
              value={duration}
              onChange={(e) =>
                setDuration(e.target.value)
              }
              className="
                w-full
                appearance-none
                rounded-xl
                border
                border-gray-200
                bg-white
                px-3
                py-2.5
                pr-9
                text-sm
                font-medium
                text-[#0b2418]
                outline-none
                focus:border-[#2F6B4F]
              "
            >

              <option value="">
                Any duration
              </option>

              <option value="1-7">
                1 - 7 Days
              </option>

              <option value="8-14">
                8 - 14 Days
              </option>

              <option value="15-21">
                15 - 21 Days
              </option>

              <option value="22+">
                22+ Days
              </option>

            </select>

            <ChevronDown
              size={16}
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

          </div>
        </div>

        {/* =================================================
            GRADE
            ================================================= */}

        <div className="flex-1">

          <label
            className="
              mb-1
              block
              text-[10px]
              font-bold
              uppercase
              tracking-widest
              text-gray-400
            "
          >
            Grade
          </label>

          <div className="relative">

            <select
              value={grade}
              onChange={(e) =>
                setGrade(e.target.value)
              }
              className="
                w-full
                appearance-none
                rounded-xl
                border
                border-gray-200
                bg-white
                px-3
                py-2.5
                pr-9
                text-sm
                font-medium
                text-[#0b2418]
                outline-none
                focus:border-[#2F6B4F]
              "
            >

              <option value="">
                Any grade
              </option>

              {/* grade_id 1 = Easy */}

              <option value="1">
                Easy
              </option>

              {/* grade_id 2 = Moderate */}

              <option value="2">
                Moderate
              </option>

              {/* grade_id 3 = Strenuous */}

              <option value="3">
                Strenuous
              </option>

              {/* grade_id 4 = Hard */}

              <option value="4">
                Hard
              </option>

            </select>

            <ChevronDown
              size={16}
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

          </div>
        </div>

        {/* =================================================
            FIND YOUR TREK
            ================================================= */}

        <button
          type="button"
          onClick={handleFindYourTrek}
          className="
            flex
            shrink-0
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#0b2418]
            px-6
            py-2.5
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-black
          "
        >

          <Search size={16} />

          Find Your Trek

        </button>

      </div>

      {/* =================================================
          FILTER RESULTS
          ================================================= */}

      {showFilterResults && (
        <div className="mt-3 max-h-96 space-y-2 overflow-y-auto">

          {filterResults.length === 0 ? (

            <div className="rounded-2xl bg-white p-5 text-center text-sm text-gray-500 shadow-xl">
              No packages match your selected filters.
            </div>

          ) : (

            filterResults.map((pkg) => (
              <PackageResult
                key={pkg.id}
                pkg={pkg}
              />
            ))

          )}

        </div>
      )}

    </div>
  );
};

export default TrekSearch;

