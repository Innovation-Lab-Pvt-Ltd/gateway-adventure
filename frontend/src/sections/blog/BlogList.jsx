import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowLeft, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

// =====================================================
// GATEWAY TREKS API
// =====================================================

const API_URL = "/api/v1/blogs";

// Compact mode shows only 4 blogs
const VISIBLE_COUNT = 4;

// Large mode shows 8 blogs per page
const CARDS_PER_PAGE = 8;

// How many matches to show in the search dropdown before
// the list becomes scrollable instead of endless.
const MAX_SEARCH_RESULTS = 8;

// =====================================================
// BLOG CATEGORIES
// =====================================================

const CATEGORIES = [
  "All",
  "Trekking Guides",
  "Permits & Planning",
  "Culture & Heritage",
  "Nature & Wildlife",
  "Adventure & Activities",
  "Travel News",
  "Stories & People",
];

// =====================================================
// HELPER
// =====================================================

const normalizeText = (value) => {
  if (!value) return "";

  return String(value)
    .toLowerCase()
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

// =====================================================
// GET CATEGORY FROM BLOG
// =====================================================
//
// Priority:
// 1. Title
// 2. Tags
// 3. Short description
// 4. Description/content
//
// This prevents words such as "cost", "weather", etc.
// inside a trekking article from incorrectly changing
// its category.
//

export const getCategory = (blog) => {
  if (!blog) return "Stories & People";

  const title = normalizeText(blog.title);

  const shortDescription = normalizeText(
    blog.short_description
  );

  const description = normalizeText(
    blog.description
  );

  const content = normalizeText(
    blog.content
  );

  const tags = Array.isArray(blog.tags)
    ? blog.tags.map((tag) => normalizeText(tag)).join(" ")
    : normalizeText(blog.tags);

  // =====================================================
  // 1. TRAVEL NEWS
  // =====================================================

  const newsKeywords = [
    "travel news",
    "latest news",
    "breaking news",
    "news update",
    "travel update",
    "government announcement",
    "government update",
    "new rule",
    "new rules",
    "new regulation",
    "new regulations",
    "regulation update",
    "official announcement",
    "announcement",
    "announced",
    "immigration update",
    "border update",
    "tourism board",
  ];

  // Strong match in title
  if (
    newsKeywords.some((keyword) =>
      title.includes(keyword)
    )
  ) {
    return "Travel News";
  }

  // Strong match in tags
  if (
    newsKeywords.some((keyword) =>
      tags.includes(keyword)
    )
  ) {
    return "Travel News";
  }

  // =====================================================
  // 2. TREKKING GUIDES
  // =====================================================
  //
  // Check title/tags BEFORE planning keywords.
  //
  // Example:
  // "Everest Base Camp Trek Cost"
  //
  // should be:
  // Trekking Guides
  //
  // and NOT:
  // Permits & Planning
  //

  const trekkingKeywords = [
    "everest base camp trek",
    "everest base camp",
    "ebc trek",
    "ebc",
    "everest trek",
    "annapurna circuit",
    "annapurna base camp",
    "annapurna trek",
    "manaslu circuit",
    "manaslu trek",
    "langtang trek",
    "mardi himal trek",
    "ghorepani poon hill",
    "poon hill trek",
    "upper mustang trek",
    "upper mustang",
    "nar phu trek",
    "nar phu",
    "dolpo trek",
    "kanchenjunga trek",
    "makalu trek",
    "trekking",
    "trek",
    "trekker",
    "trekkers",
    "hiking",
    "hike",
    "mountaineering",
    "expedition",
    "base camp",
    "circuit trek",
    "high pass trek",
    "high passes",
    "pass trek",
  ];

  // Strong match in title
  if (
    trekkingKeywords.some((keyword) =>
      title.includes(keyword)
    )
  ) {
    return "Trekking Guides";
  }

  // Strong match in tags
  if (
    trekkingKeywords.some((keyword) =>
      tags.includes(keyword)
    )
  ) {
    return "Trekking Guides";
  }

  // =====================================================
  // 3. PERMITS & PLANNING
  // =====================================================

  const planningKeywords = [
    "permit",
    "permits",
    "tims",
    "visa",
    "visa guide",
    "visa requirement",
    "visa requirements",
    "immigration",
    "cost",
    "price",
    "fee",
    "fees",
    "budget",
    "packing list",
    "packing",
    "what to pack",
    "best time to visit",
    "best time to travel",
    "best time",
    "when to trek",
    "weather",
    "difficulty",
    "difficulty guide",
    "travel tips",
    "trekking tips",
    "planning",
    "travel planning",
    "itinerary",
    "regulation",
    "regulations",
    "drone",
    "travel insurance",
    "insurance",
    "acclimatization",
    "altitude sickness",
    "accommodation",
    "transportation",
    "how to get",
    "things to know",
  ];

  // Strong match in title
  if (
    planningKeywords.some((keyword) =>
      title.includes(keyword)
    )
  ) {
    return "Permits & Planning";
  }

  // Strong match in tags
  if (
    planningKeywords.some((keyword) =>
      tags.includes(keyword)
    )
  ) {
    return "Permits & Planning";
  }

  // =====================================================
  // 4. CULTURE & HERITAGE
  // =====================================================

  const cultureKeywords = [
    "culture",
    "cultural",
    "heritage",
    "durbar",
    "durbar square",
    "kumari",
    "thangka",
    "newari",
    "newar",
    "festival",
    "festivals",
    "temple",
    "temples",
    "monastery",
    "monasteries",
    "museum",
    "museums",
    "heritage site",
    "heritage sites",
    "sherpa culture",
    "tradition",
    "traditions",
    "religion",
    "krishna mandir",
    "basantapur",
    "architecture",
    "historical",
    "history",
  ];

  if (
    cultureKeywords.some((keyword) =>
      title.includes(keyword)
    )
  ) {
    return "Culture & Heritage";
  }

  if (
    cultureKeywords.some((keyword) =>
      tags.includes(keyword)
    )
  ) {
    return "Culture & Heritage";
  }

  // =====================================================
  // 5. NATURE & WILDLIFE
  // =====================================================

  const natureKeywords = [
    "wildlife",
    "birdwatching",
    "bird watching",
    "birds",
    "snow leopard",
    "leopard",
    "biodiversity",
    "nature",
    "flora",
    "fauna",
    "forest",
    "forests",
    "national park",
    "national parks",
    "conservation",
    "animals",
    "wild animals",
    "rhino",
    "tiger",
    "elephant",
    "red panda",
    "ecosystem",
    "wetland",
  ];

  if (
    natureKeywords.some((keyword) =>
      title.includes(keyword)
    )
  ) {
    return "Nature & Wildlife";
  }

  if (
    natureKeywords.some((keyword) =>
      tags.includes(keyword)
    )
  ) {
    return "Nature & Wildlife";
  }

  // =====================================================
  // 6. ADVENTURE & ACTIVITIES
  // =====================================================

  const adventureKeywords = [
    "rafting",
    "raft",
    "paragliding",
    "paraglide",
    "jungle safari",
    "safari",
    "bungee",
    "zipline",
    "canyoning",
    "mountain biking",
    "cycling",
    "kayaking",
    "climbing",
    "rock climbing",
    "adventure",
    "adventures",
    "caving",
    "canoeing",
  ];

  if (
    adventureKeywords.some((keyword) =>
      title.includes(keyword)
    )
  ) {
    return "Adventure & Activities";
  }

  if (
    adventureKeywords.some((keyword) =>
      tags.includes(keyword)
    )
  ) {
    return "Adventure & Activities";
  }

  // =====================================================
  // 7. STORIES & PEOPLE
  // =====================================================

  const storiesKeywords = [
    "story",
    "stories",
    "people",
    "profile",
    "journey",
    "travel story",
    "personal experience",
    "experience",
    "kami rita",
    "sherpa",
    "guide",
    "guides",
    "traveler",
    "traveller",
    "local guide",
    "porter",
    "mountaineer",
    "climber",
  ];

  if (
    storiesKeywords.some((keyword) =>
      title.includes(keyword)
    )
  ) {
    return "Stories & People";
  }

  if (
    storiesKeywords.some((keyword) =>
      tags.includes(keyword)
    )
  ) {
    return "Stories & People";
  }

  // =====================================================
  // 8. FALLBACK
  // =====================================================
  //
  // Only use short description/content if the title
  // and tags did not give us a strong category.
  //

  const secondaryText = `
    ${shortDescription}
    ${description}
    ${content}
  `;

  // News
  if (
    newsKeywords.some((keyword) =>
      secondaryText.includes(keyword)
    )
  ) {
    return "Travel News";
  }

  // Culture
  if (
    cultureKeywords.some((keyword) =>
      secondaryText.includes(keyword)
    )
  ) {
    return "Culture & Heritage";
  }

  // Nature
  if (
    natureKeywords.some((keyword) =>
      secondaryText.includes(keyword)
    )
  ) {
    return "Nature & Wildlife";
  }

  // Adventure
  if (
    adventureKeywords.some((keyword) =>
      secondaryText.includes(keyword)
    )
  ) {
    return "Adventure & Activities";
  }

  // Trekking
  if (
    trekkingKeywords.some((keyword) =>
      secondaryText.includes(keyword)
    )
  ) {
    return "Trekking Guides";
  }

  // Planning
  if (
    planningKeywords.some((keyword) =>
      secondaryText.includes(keyword)
    )
  ) {
    return "Permits & Planning";
  }

  return "Stories & People";
};

// =====================================================
// FORMAT DATE
// =====================================================

const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// =====================================================
// BLOG LIST
// =====================================================

const BlogList = ({ variant = "compact" }) => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeCategory, setActiveCategory] = useState("All");

  // Current page
  const [currentPage, setCurrentPage] = useState(0);

  // =====================================================
  // SEARCH (searches blog.title only)
  // =====================================================

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef(null);

  // =====================================================
  // FETCH BLOGS
  // =====================================================

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            `API request failed with status ${response.status}`
          );
        }

        const data = await response.json();

        console.log(
          "Gateway Treks Blogs API Response:",
          data
        );

        const list =
          data.Blog ||
          data.blogs ||
          data.blog ||
          data.data;

        if (Array.isArray(list)) {
          setBlogs(list);
        } else {
          throw new Error(
            "Blogs response is not an array"
          );
        }
      } catch (err) {
        console.error(
          "GATEWAY TREKS BLOGS ERROR:",
          err
        );

        setError("Unable to load blog posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // =====================================================
  // RESET PAGE WHEN CATEGORY CHANGES
  // =====================================================

  useEffect(() => {
    setCurrentPage(0);
  }, [activeCategory]);

  // =====================================================
  // CLOSE SEARCH DROPDOWN ON OUTSIDE CLICK / ESC
  // =====================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // =====================================================
  // HANDLE BLOG CLICK
  // =====================================================

  const handleBlogClick = (blog) => {
    if (!blog || !blog.id) {
      console.error("Invalid blog:", blog);
      return;
    }

    const blogId = blog.id;

    // ---------------------------------------------------
    // GET EXISTING VIEW COUNTS
    // ---------------------------------------------------

    let storedViews = {};

    try {
      storedViews =
        JSON.parse(
          localStorage.getItem("blogViews")
        ) || {};
    } catch (error) {
      console.error(
        "Unable to read blog views:",
        error
      );
    }

    // ---------------------------------------------------
    // INCREASE VIEW COUNT
    // ---------------------------------------------------

    const newCount =
      (storedViews[blogId] || 0) + 1;

    const updatedViews = {
      ...storedViews,
      [blogId]: newCount,
    };

    // ---------------------------------------------------
    // SAVE
    // ---------------------------------------------------

    localStorage.setItem(
      "blogViews",
      JSON.stringify(updatedViews)
    );

    // ---------------------------------------------------
    // NOTIFY OTHER COMPONENTS
    // ---------------------------------------------------

    window.dispatchEvent(
      new CustomEvent("blogViewUpdated")
    );

    // ---------------------------------------------------
    // NAVIGATE
    // ---------------------------------------------------

    navigate(`/blogs/${blogId}`, {
      state: {
        blog,
      },
    });
  };

  // =====================================================
  // HANDLE SEARCH RESULT CLICK
  // Same navigation as a normal card, then reset the search
  // so the dropdown doesn't stay open on the next page.
  // =====================================================

  const handleSearchResultClick = (blog) => {
    handleBlogClick(blog);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <section className="bg-[#F4F0E7] px-6 py-16 md:px-10 lg:px-16">

        <div className="mb-8 max-w-2xl">

          <div className="mb-4 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#2F6B4F]" />

            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#2F6B4F]">
              From the Himalayas
            </span>
          </div>

          <h1 className="mb-4 font-serif text-4xl font-bold leading-tight text-[#171310] sm:text-5xl lg:text-6xl">
            Stories, Guides{" "}
            <span className="italic">
              &amp;
            </span>{" "}
            Inspiration
          </h1>

          <p className="text-base leading-7 text-gray-500">
            Stories, guides and inspiration for
            your next adventure.
          </p>

        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-[360px] animate-pulse rounded-2xl bg-gray-200/60"
            />
          ))}

        </div>

      </section>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <section className="bg-[#F4F0E7] px-6 py-16 md:px-10 lg:px-16">

        <div className="rounded-xl bg-red-50 p-6 text-center">

          <p className="font-medium text-red-500">
            {error}
          </p>

        </div>

      </section>
    );
  }

  // =====================================================
  // SEARCH RESULTS (by blog.title only)
  // =====================================================

  const normalizedQuery = normalizeText(searchQuery);

  const searchResults = normalizedQuery
    ? blogs
        .filter((blog) =>
          normalizeText(blog.title).includes(normalizedQuery)
        )
        .slice(0, MAX_SEARCH_RESULTS)
    : [];

  // =====================================================
  // FILTER BLOGS
  // =====================================================

  const filteredBlogs =
    activeCategory === "All"
      ? blogs
      : blogs.filter(
          (blog) =>
            getCategory(blog) ===
            activeCategory
        );

  // =====================================================
  // TOTAL PAGES
  // =====================================================

  const totalPages =
    Math.ceil(
      filteredBlogs.length /
        CARDS_PER_PAGE
    );

  // =====================================================
  // VISIBLE BLOGS
  // =====================================================

  const visibleBlogs =
    variant === "compact"
      ? filteredBlogs.slice(
          0,
          VISIBLE_COUNT
        )
      : filteredBlogs.slice(
          currentPage *
            CARDS_PER_PAGE,
          currentPage *
              CARDS_PER_PAGE +
            CARDS_PER_PAGE
        );

  // =====================================================
  // PREVIOUS PAGE
  // =====================================================

  const goToPreviousPage = () => {
    setCurrentPage((prev) =>
      Math.max(prev - 1, 0)
    );
  };

  // =====================================================
  // NEXT PAGE
  // =====================================================

  const goToNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(
        prev + 1,
        Math.max(totalPages - 1, 0)
      )
    );
  };

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <section className="bg-[#F4F0E7] px-6 py-16 md:px-10 lg:px-16">

      {/* =================================================
          HEADING
      ================================================= */}

      <div className="mb-8 max-w-2xl">

        <div className="mb-4 flex items-center gap-3">

          <span className="h-[2px] w-8 bg-[#2F6B4F]" />

          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#2F6B4F]">
            From the Himalayas
          </span>

        </div>

        <h1 className="mb-4 font-serif text-4xl font-bold leading-tight text-[#171310] sm:text-5xl lg:text-6xl">
          Stories, Guides{" "}
          <span className="italic">
            &amp;
          </span>{" "}
          Inspiration
        </h1>

        <p className="text-base leading-7 text-gray-500">
          Stories, guides and inspiration for
          your next adventure.
        </p>

      </div>

      {/* =================================================
          SEARCH BAR
          Searches blog.title only. Results appear in a
          scrollable dropdown right below the input, and
          clicking a result navigates to /blogs/:id, same
          as clicking a card.
      ================================================= */}

      <div
        ref={searchContainerRef}
        className="relative mb-8 max-w-xl"
      >
        <div className="relative">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => {
              if (searchQuery) setIsSearchOpen(true);
            }}
            placeholder="Search blog posts by title..."
            className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-10 text-sm text-[#171310] shadow-sm outline-none transition focus:border-[#2F6B4F] focus:ring-2 focus:ring-[#2F6B4F]/20"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-[#171310]"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* DROPDOWN */}
        {isSearchOpen && normalizedQuery && (
          <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-96 overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-xl">
            {searchResults.length > 0 ? (
              searchResults.map((blog) => (
                <button
                  key={blog.id}
                  type="button"
                  onClick={() => handleSearchResultClick(blog)}
                  className="flex w-full items-center gap-3 border-b border-gray-50 p-3 text-left transition last:border-b-0 hover:bg-[#F4F0E7]/60"
                >
                  <img
                    src={`https://gatewaytreks.com/public/uploads/frontend/full/${blog.image}`}
                    alt={blog.title || "Gateway Treks blog"}
                    className="h-12 w-14 shrink-0 rounded-lg object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/MOUNT.jpg";
                    }}
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[#0b2418]">
                      {blog.title}
                    </p>

                    <p className="mt-0.5 text-xs text-gray-400">
                      {getCategory(blog)}
                      {blog.published_at
                        ? ` · ${formatDate(blog.published_at)}`
                        : ""}
                    </p>
                  </div>

                  <ArrowRight
                    size={15}
                    className="shrink-0 text-gray-300"
                  />
                </button>
              ))
            ) : (
              <p className="p-4 text-center text-sm text-gray-500">
                No blog posts found for "{searchQuery}".
              </p>
            )}
          </div>
        )}
      </div>

      {/* =================================================
          CATEGORY FILTERS
          ONLY LARGE VERSION
      ================================================= */}

      {variant === "large" && (
        <div className="mb-8 flex flex-wrap gap-2">

          {CATEGORIES.map((category) => {

            const isActive =
              activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() =>
                  setActiveCategory(category)
                }
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "border-[#2F6B4F] bg-[#2F6B4F] text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-[#2F6B4F]/40 hover:text-[#0b2418]"
                }`}
              >
                {category}
              </button>
            );
          })}

        </div>
      )}

      {/* =================================================
          SLIDER BUTTONS
          ONLY LARGE VERSION
      ================================================= */}

      {variant === "large" &&
        totalPages > 1 && (
          <div className="mb-6 flex justify-end gap-2">

            {/* PREVIOUS */}

            <button
              type="button"
              onClick={goToPreviousPage}
              disabled={
                currentPage === 0
              }
              aria-label="Previous page"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white transition hover:bg-[#2F6B4F] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft size={18} />
            </button>

            {/* NEXT */}

            <button
              type="button"
              onClick={goToNextPage}
              disabled={
                currentPage ===
                totalPages - 1
              }
              aria-label="Next page"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white transition hover:bg-[#2F6B4F] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowRight size={18} />
            </button>

          </div>
        )}

      {/* =================================================
          EMPTY STATE
      ================================================= */}

      {visibleBlogs.length === 0 ? (

        <div className="py-10 text-center">

          <p className="text-gray-500">
            No blog posts found in this
            category.
          </p>

        </div>

      ) : (

        /* =================================================
           BLOG GRID
        ================================================= */

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {visibleBlogs.map((blog) => (

            <div
              key={blog.id}
              className={
                variant === "large"
                  ? "flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  : "flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              }
            >

              {/* =================================================
                  IMAGE
              ================================================= */}

              <div
                className={
                  variant === "large"
                    ? "h-48 w-full overflow-hidden"
                    : "h-40 w-full overflow-hidden"
                }
              >

                <img
                  src={`https://gatewaytreks.com/public/uploads/frontend/full/${blog.image}`}
                  alt={
                    blog.title ||
                    "Gateway Treks blog"
                  }
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {

                    console.error(
                      "Gateway Treks blog image failed:",
                      blog.image
                    );

                    e.currentTarget.onerror =
                      null;

                    e.currentTarget.src =
                      "/images/MOUNT.jpg";
                  }}
                />

              </div>

              {/* =================================================
                  CONTENT
              ================================================= */}

              <div className="flex flex-1 flex-col p-4">

                {/* =================================================
                    CATEGORY + DATE
                ================================================= */}

                <div className="mb-2 flex items-center justify-between gap-2">

                  <span className="rounded-full bg-[#e8f0eb] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#2F6B4F]">
                    {getCategory(blog)}
                  </span>

                  <span className="text-xs font-medium text-gray-400">
                    {formatDate(
                      blog.published_at
                    )}
                  </span>

                </div>

                {/* =================================================
                    TITLE
                ================================================= */}

                <h3
                  className={
                    variant === "large"
                      ? "mb-2 line-clamp-2 text-lg font-bold leading-6 text-[#0b2418]"
                      : "mb-2 line-clamp-2 text-base font-bold leading-5 text-[#0b2418]"
                  }
                >
                  {blog.title}
                </h3>

                {/* =================================================
                    SHORT DESCRIPTION
                ================================================= */}

                <p
                  className={
                    variant === "large"
                      ? "mb-4 line-clamp-3 flex-1 text-sm leading-6 text-gray-500"
                      : "mb-4 line-clamp-2 flex-1 text-xs leading-5 text-gray-500"
                  }
                >
                  {blog.short_description}
                </p>

                {/* =================================================
                    READ MORE
                ================================================= */}

                <button
                  type="button"
                  onClick={() =>
                    handleBlogClick(blog)
                  }
                  className="flex items-center gap-1 self-start text-sm font-semibold text-[#0b2418] transition hover:text-[#2F6B4F]"
                >
                  Read More

                  <ArrowRight
                    size={16}
                  />
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

      {/* =================================================
          PAGE INDICATOR
          ONLY LARGE VERSION
      ================================================= */}

      {variant === "large" &&
        totalPages > 1 && (

          <div className="mt-6 text-center text-sm text-gray-500">

            Page {currentPage + 1} of{" "}
            {totalPages}

          </div>

        )}

    </section>
  );
};

export default BlogList;