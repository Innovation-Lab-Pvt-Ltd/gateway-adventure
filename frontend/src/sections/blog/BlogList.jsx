import React, { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// =====================================================
// GATEWAY TREKS API
// =====================================================

const API_URL = "/api/v1/blogs";

// Compact mode shows only 4 blogs
const VISIBLE_COUNT = 4;

// Large mode shows 8 blogs per page
const CARDS_PER_PAGE = 8;

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
// GET CATEGORY FROM BLOG CONTENT
// =====================================================

export const getCategory = (blog) => {
  if (!blog) return "Stories & People";

  const title = blog.title || "";
  const shortDescription = blog.short_description || "";
  const description = blog.description || "";
  const content = blog.content || "";

  const tags = Array.isArray(blog.tags)
    ? blog.tags.join(" ")
    : blog.tags || "";

  const text = `
    ${title}
    ${shortDescription}
    ${description}
    ${content}
    ${tags}
  `.toLowerCase();

  // ---------------------------------------------------
  // 1. PERMITS & PLANNING
  // ---------------------------------------------------

  const planningKeywords = [
    "permit",
    "permits",
    "tims",
    "visa",
    "cost",
    "price",
    "fee",
    "fees",
    "packing list",
    "packing",
    "best time",
    "when to trek",
    "weather",
    "difficulty",
    "difficulty guide",
    "travel tips",
    "trekking tips",
    "planning",
    "regulation",
    "regulations",
    "drone",
  ];

  if (planningKeywords.some((keyword) => text.includes(keyword))) {
    return "Permits & Planning";
  }

  // ---------------------------------------------------
  // 2. CULTURE & HERITAGE
  // ---------------------------------------------------

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
  ];

  if (cultureKeywords.some((keyword) => text.includes(keyword))) {
    return "Culture & Heritage";
  }

  // ---------------------------------------------------
  // 3. NATURE & WILDLIFE
  // ---------------------------------------------------

  const natureKeywords = [
    "wildlife",
    "birdwatching",
    "bird watching",
    "bird",
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
  ];

  if (natureKeywords.some((keyword) => text.includes(keyword))) {
    return "Nature & Wildlife";
  }

  // ---------------------------------------------------
  // 4. ADVENTURE & ACTIVITIES
  // ---------------------------------------------------

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
    "adventure",
    "adventures",
  ];

  if (adventureKeywords.some((keyword) => text.includes(keyword))) {
    return "Adventure & Activities";
  }

  // ---------------------------------------------------
  // 5. TRAVEL NEWS
  // ---------------------------------------------------

  const newsKeywords = [
    "news",
    "update",
    "updates",
    "latest",
    "announcement",
    "announcements",
    "regulation",
    "regulations",
    "mountaineering season",
    "season update",
    "government",
    "new rule",
    "new rules",
  ];

  if (newsKeywords.some((keyword) => text.includes(keyword))) {
    return "Travel News";
  }

  // ---------------------------------------------------
  // 6. TREKKING GUIDES
  // ---------------------------------------------------

  const trekkingKeywords = [
    "trek",
    "trekking",
    "trekker",
    "trekkers",
    "everest base camp",
    "ebc",
    "everest",
    "manaslu",
    "annapurna",
    "annapurna circuit",
    "annapurna base camp",
    "dolpo",
    "nar phu",
    "kanchenjunga",
    "makalu",
    "langtang",
    "mardi himal",
    "ghorepani",
    "poon hill",
    "poon hill trek",
    "upper mustang",
    "mustang",
    "high pass",
    "high passes",
    "pass trek",
    "base camp",
    "circuit",
    "hiking",
    "hike",
    "mountaineering",
    "expedition",
  ];

  if (trekkingKeywords.some((keyword) => text.includes(keyword))) {
    return "Trekking Guides";
  }

  // ---------------------------------------------------
  // 7. STORIES & PEOPLE
  // ---------------------------------------------------

  const storiesKeywords = [
    "story",
    "stories",
    "people",
    "profile",
    "journey",
    "travel story",
    "personal",
    "experience",
    "kami rita",
    "sherpa",
    "guide",
    "guides",
    "traveler",
    "traveller",
  ];

  if (storiesKeywords.some((keyword) => text.includes(keyword))) {
    return "Stories & People";
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

  // Current slider page
  const [currentPage, setCurrentPage] = useState(0);

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

        console.log("Gateway Treks Blogs API Response:", data);

        const list =
          data.Blog ||
          data.blogs ||
          data.blog ||
          data.data;

        if (Array.isArray(list)) {
          setBlogs(list);
        } else {
          throw new Error("Blogs response is not an array");
        }
      } catch (err) {
        console.error("GATEWAY TREKS BLOGS ERROR:", err);

        setError("Unable to load blog posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // =====================================================
  // RESET SLIDER WHEN CATEGORY CHANGES
  // =====================================================

  useEffect(() => {
    setCurrentPage(0);
  }, [activeCategory]);

  // =====================================================
  // HANDLE BLOG CLICK
  // =====================================================

  const handleBlogClick = (blog) => {
    if (!blog || !blog.id) {
      console.error("Invalid blog:", blog);
      return;
    }

    const blogId = blog.id;

    // Get existing view counts from localStorage
    const storedViews =
      JSON.parse(localStorage.getItem("blogViews")) || {};

    // Increase selected blog's view count
    const newCount = (storedViews[blogId] || 0) + 1;

    // Create updated object
    const updatedViews = {
      ...storedViews,
      [blogId]: newCount,
    };

    // Save updated views
    localStorage.setItem(
      "blogViews",
      JSON.stringify(updatedViews)
    );

    // Notify other components about updated views
    window.dispatchEvent(
      new CustomEvent("blogViewUpdated")
    );

    // Navigate to BlogDetail
    // The COMPLETE selected blog object is passed through state.
    navigate(`/blogs/${blogId}`, {
      state: {
        blog,
      },
    });
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
            <span className="italic">&amp;</span>{" "}
            Inspiration
          </h1>

          <p className="text-base leading-7 text-gray-500">
            Stories, guides and inspiration for your next
            adventure.
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
  // FILTER BLOGS BY CATEGORY
  // =====================================================

  const filteredBlogs =
    activeCategory === "All"
      ? blogs
      : blogs.filter(
          (blog) =>
            getCategory(blog) === activeCategory
        );

  // =====================================================
  // LARGE MODE PAGINATION
  // =====================================================

  const totalPages = Math.ceil(
    filteredBlogs.length / CARDS_PER_PAGE
  );

  // =====================================================
  // DETERMINE WHICH BLOGS TO DISPLAY
  // =====================================================

  const visibleBlogs =
    variant === "compact"
      ? filteredBlogs.slice(0, VISIBLE_COUNT)
      : filteredBlogs.slice(
          currentPage * CARDS_PER_PAGE,
          currentPage * CARDS_PER_PAGE + CARDS_PER_PAGE
        );

  // =====================================================
  // SLIDER CONTROLS
  // =====================================================

  const goToPreviousPage = () => {
    setCurrentPage((prev) =>
      Math.max(prev - 1, 0)
    );
  };

  const goToNextPage = () => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, totalPages - 1)
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
          <span className="italic">&amp;</span>{" "}
          Inspiration
        </h1>

        <p className="text-base leading-7 text-gray-500">
          Stories, guides and inspiration for your next
          adventure.
        </p>
      </div>

      {/* =================================================
          CATEGORY FILTERS
          ONLY LARGE VERSION
      ================================================= */}

      {variant === "large" && (
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                activeCategory === category
                  ? "border-[#2F6B4F] bg-[#2F6B4F] text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-[#2F6B4F]/40 hover:text-[#0b2418]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* =================================================
          SLIDER BUTTONS
          ONLY LARGE VERSION
      ================================================= */}

      {variant === "large" && totalPages > 1 && (
        <div className="mb-6 flex justify-end gap-2">

          {/* PREVIOUS */}
          <button
            type="button"
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white transition hover:bg-[#2F6B4F] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft size={18} />
          </button>

          {/* NEXT */}
          <button
            type="button"
            onClick={goToNextPage}
            disabled={
              currentPage === totalPages - 1
            }
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white transition hover:bg-[#2F6B4F] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowRight size={18} />
          </button>

        </div>
      )}

      {/* =================================================
          EMPTY
      ================================================= */}

      {visibleBlogs.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-gray-500">
            No blog posts found in this category.
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
                  alt={blog.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    console.error(
                      "Gateway Treks blog image failed:",
                      blog.image
                    );

                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "/images/MOUNT.jpg";
                  }}
                />
              </div>

              {/* =================================================
                  CONTENT
              ================================================= */}

              <div className="flex flex-1 flex-col p-4">

                {/* CATEGORY + DATE */}

                <div className="mb-2 flex items-center justify-between gap-2">

                  <span className="rounded-full bg-[#e8f0eb] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#2F6B4F]">
                    {getCategory(blog)}
                  </span>

                  <span className="text-xs font-medium text-gray-400">
                    {formatDate(blog.published_at)}
                  </span>

                </div>

                {/* TITLE */}

                <h3
                  className={
                    variant === "large"
                      ? "mb-2 line-clamp-2 text-lg font-bold leading-6 text-[#0b2418]"
                      : "mb-2 line-clamp-2 text-base font-bold leading-5 text-[#0b2418]"
                  }
                >
                  {blog.title}
                </h3>

                {/* SHORT DESCRIPTION */}

                <p
                  className={
                    variant === "large"
                      ? "mb-4 line-clamp-3 flex-1 text-sm leading-6 text-gray-500"
                      : "mb-4 line-clamp-2 flex-1 text-xs leading-5 text-gray-500"
                  }
                >
                  {blog.short_description}
                </p>

                {/* READ MORE */}

                <button
                  type="button"
                  onClick={() => handleBlogClick(blog)}
                  className="flex items-center gap-1 self-start text-sm font-semibold text-[#0b2418] transition hover:text-[#2F6B4F]"
                >
                  Read More
                  <ArrowRight size={16} />
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

      {variant === "large" && totalPages > 1 && (
        <div className="mt-6 text-center text-sm text-gray-500">
          Page {currentPage + 1} of {totalPages}
        </div>
      )}

    </section>
  );
};

export default BlogList;