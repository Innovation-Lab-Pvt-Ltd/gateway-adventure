import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, X, ArrowUpRight, Compass } from "lucide-react";
import PopularPackages from "./PopularPackages"; // <- adjust to your real path

const API_URL = `${import.meta.env.VITE_BASE_API_URL}allpackages`;

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

// Put these two files in your /public folder
const BG_TOP = "/temple_bw_pink.jpg";
const BG_BOTTOM = "/hiker_bw_pink.jpg";

const ACCENT = "#F4B6CB"; // soft pink taken from the photo tint
const BASE = "#1E181B"; // deep plum-black the images fade into

const DURATIONS = {
  "1-7": (d) => d >= 1 && d <= 7,
  "8-14": (d) => d >= 8 && d <= 14,
  "15-21": (d) => d >= 15 && d <= 21,
  "22+": (d) => d >= 22,
};

const getImage = (pkg) =>
  pkg.image
    ? `${IMAGE_BASE_URL}${pkg.image}`
    : pkg.social_image
    ? `${IMAGE_BASE_URL}${pkg.social_image}`
    : "/images/MOUNT.jpg";

const fade = (dir) => {
  const g = `linear-gradient(${dir}, #000 30%, transparent 100%)`;
  return { maskImage: g, WebkitMaskImage: g };
};

/* ---------- Result row (trail style, dark glass) ---------- */
const PackageResult = ({ pkg, isLast, onClick }) => (
  <button
    type="button"
    onClick={() => onClick(pkg)}
    className="group relative flex w-full items-center gap-4 py-3 pl-8 pr-2 text-left"
  >
    {!isLast && (
      <span className="pointer-events-none absolute left-2 top-0 h-full w-px bg-white/15" />
    )}
    <span
      className="absolute left-[5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 transition group-hover:bg-[#F4B6CB]"
      style={{ borderColor: ACCENT }}
    />

    <div className="h-16 w-24 shrink-0 overflow-hidden rounded-md">
      <img
        src={getImage(pkg)}
        alt={pkg.name || pkg.title}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
    </div>

    <div className="min-w-0 flex-1 border-b border-white/10 pb-3 group-last:border-none">
      <h3 className="truncate font-montserrat text-sm font-bold text-white sm:text-base">
        {pkg.name || pkg.title}
      </h3>
      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 font-montserrat text-xs text-white/50">
        {pkg.duration && <span>{pkg.duration} Days</span>}
        {pkg.destname && <span>{pkg.destname}</span>}
        {pkg.gradename && <span>{pkg.gradename}</span>}
      </div>
    </div>

    <ArrowUpRight
      size={17}
      className="shrink-0 self-start pt-1 text-white/30 transition group-hover:text-white"
    />
  </button>
);

/* ---------- Filter dropdown ---------- */
const FilterSelect = ({ label, value, onChange, options, className }) => (
  <div className={`flex-1 py-4 ${className}`}>
    <label className="mb-1 block font-montserrat text-[11px] font-medium text-white/50">
      {label}
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-transparent py-1 pr-6 font-montserrat text-sm font-semibold text-white outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="text-[#1E181B]">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={15}
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-white/50"
      />
    </div>
  </div>
);

const DESTINATION_OPTIONS = [
  { value: "", label: "Anywhere" },
  { value: "1", label: "Nepal" },
  { value: "2", label: "Tibet" },
];
const DURATION_OPTIONS = [
  { value: "", label: "Any length" },
  { value: "1-7", label: "1 – 7 days" },
  { value: "8-14", label: "8 – 14 days" },
  { value: "15-21", label: "15 – 21 days" },
  { value: "22+", label: "22+ days" },
];
const GRADE_OPTIONS = [
  { value: "", label: "Any grade" },
  { value: "1", label: "Easy" },
  { value: "2", label: "Moderate" },
  { value: "3", label: "Strenuous" },
  { value: "4", label: "Very strenuous" },
];

const TrekExplorer = () => {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [grade, setGrade] = useState("");
  const [filterResults, setFilterResults] = useState([]);
  const [showFilterResults, setShowFilterResults] = useState(false);

  // Fetch all packages (all pages)
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        let all = [];
        let page = 1;
        let lastPage = 1;

        do {
          const res = await fetch(`${API_URL}?page=${page}`);
          if (!res.ok) throw new Error("Failed to fetch packages");
          const data = await res.json();
          all = [...all, ...(data?.packages?.data || [])];
          lastPage = data?.packages?.last_page || 1;
          page++;
        } while (page <= lastPage);

        setPackages(all);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // Search by name
  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }
    const text = search.toLowerCase();
    setSearchResults(
      packages.filter((pkg) =>
        (pkg.name || pkg.title || "").toLowerCase().includes(text)
      )
    );
  }, [search, packages]);

  // Filters
  const handleFindYourTrek = () => {
    let results = [...packages];

    if (destination)
      results = results.filter(
        (p) => String(p.destination_id) === String(destination)
      );
    if (duration)
      results = results.filter((p) => DURATIONS[duration]?.(Number(p.duration)) ?? true);
    if (grade)
      results = results.filter((p) => String(p.grade_id) === String(grade));

    setFilterResults(results);
    setShowFilterResults(true);
  };

  const handlePackageClick = (pkg) => {
    if (!pkg?.slug) {
      console.error("Package slug is missing:", pkg);
      return;
    }
    navigate(`/package/${pkg.slug}`);
  };

  const glass =
    "border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]";

  return (
    <section
      className="relative isolate overflow-hidden"
      style={{ backgroundColor: BASE }}
    >
      {/* ================= BACKGROUND =================
          Temple photo at the top fades out; hiker photo
          fades in from the bottom. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={BG_TOP}
          alt=""
          className="absolute inset-x-0 top-0 h-[70%] w-full object-cover object-top"
          style={fade("to bottom")}
        />
        <img
          src={BG_BOTTOM}
          alt=""
          className="absolute inset-x-0 bottom-0 h-[55%] w-full object-cover object-[50%_60%]"
          style={fade("to top")}
        />
        {/* keeps text readable over the light parts of the photos */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E181B]/60 via-[#1E181B]/25 to-[#1E181B]/40" />
      </div>

      {/* ================= SEARCH ================= */}
      <div id="trek-search" className="mx-auto w-full max-w-5xl px-4 pt-20 sm:pt-28">
        <div className="mb-8 flex items-center gap-3">
          <Compass size={22} strokeWidth={1.5} style={{ color: ACCENT }} />
          <h2 className="font-playfair text-3xl font-medium text-white sm:text-4xl">
            Find your trek
          </h2>
        </div>

        <div className={`rounded-2xl px-5 pb-2 pt-5 sm:px-8 sm:pt-6 ${glass}`}>
          {/* Name search */}
          <div className="flex items-center border-b border-white/15 pb-4 focus-within:border-[#F4B6CB]">
            <Search size={19} className="shrink-0 text-white/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search a trek by name — Everest Base Camp, Annapurna…"
              className="w-full bg-transparent px-3 py-1 font-montserrat text-sm text-white placeholder-white/40 outline-none sm:text-base"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Name search results */}
          {search.trim() && (
            <div className="my-4 max-h-72 overflow-y-auto rounded-xl bg-black/35 px-2 py-2">
              {loading ? (
                <p className="px-4 py-4 text-center font-montserrat text-sm text-white/60">
                  Loading treks…
                </p>
              ) : searchResults.length === 0 ? (
                <p className="px-4 py-4 text-center font-montserrat text-sm text-white/60">
                  No trek matches “{search}”.
                </p>
              ) : (
                searchResults.map((pkg, i) => (
                  <PackageResult
                    key={pkg.id}
                    pkg={pkg}
                    isLast={i === searchResults.length - 1}
                    onClick={handlePackageClick}
                  />
                ))
              )}
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-col divide-y divide-white/10 sm:flex-row sm:items-stretch sm:divide-x sm:divide-y-0">
            <FilterSelect
              label="Destination"
              value={destination}
              onChange={setDestination}
              options={DESTINATION_OPTIONS}
              className="sm:pr-5"
            />
            <FilterSelect
              label="Duration"
              value={duration}
              onChange={setDuration}
              options={DURATION_OPTIONS}
              className="sm:px-5"
            />
            <FilterSelect
              label="Grade"
              value={grade}
              onChange={setGrade}
              options={GRADE_OPTIONS}
              className="sm:px-5"
            />

            <div className="flex items-center py-4 sm:pl-5">
              <button
                type="button"
                onClick={handleFindYourTrek}
                className="flex w-full shrink-0 items-center justify-center gap-2 rounded-full px-6 py-2.5 font-montserrat text-sm font-semibold text-[#1E181B] transition hover:bg-white sm:w-auto"
                style={{ backgroundColor: ACCENT }}
              >
                <Search size={16} strokeWidth={2.5} />
                Find your trek
              </button>
            </div>
          </div>
        </div>

        {/* Filter results */}
        {showFilterResults && (
          <div className={`mt-6 max-h-96 overflow-y-auto rounded-2xl px-4 py-2 ${glass}`}>
            {filterResults.length === 0 ? (
              <p className="px-4 py-6 text-center font-montserrat text-sm text-white/60">
                No treks match those filters — try widening your search.
              </p>
            ) : (
              filterResults.map((pkg, i) => (
                <PackageResult
                  key={pkg.id}
                  pkg={pkg}
                  isLast={i === filterResults.length - 1}
                  onClick={handlePackageClick}
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* ================= PACKAGES =================
          Transparent, so the background photos show through.
          Extra bottom padding lets the hiker photo show below it. */}
      <div id="trekking" className="mx-auto mt-16 w-full max-w-7xl scroll-mt-20 px-4 pb-44 sm:pb-72">
        <div className="bg-transparent">
          <PopularPackages />
        </div>
      </div>
    </section>
  );
};

export default TrekExplorer;