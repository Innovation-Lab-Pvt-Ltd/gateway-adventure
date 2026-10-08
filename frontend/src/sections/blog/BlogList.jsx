import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = `${import.meta.env.VITE_BASE_API_URL}blogs`;

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

const FALLBACK_IMAGE = "/images/MOUNT.jpg";

/* =========================================================
   NORMALIZE TEXT
========================================================= */

const normalizeText = (value) => {
  if (!value) return "";

  return String(value)
    .toLowerCase()
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

/* =========================================================
   CATEGORY DETECTION
   Exported so MostReadBlog.jsx can import it.
========================================================= */

export const getCategory = (blog) => {
  const title = normalizeText(blog?.title);
  const tags = normalizeText(blog?.tags);

  const text = `${title} ${tags}`;

  // Travel News
  if (
    text.includes("news") ||
    text.includes("flood") ||
    text.includes("earthquake") ||
    text.includes("weather") ||
    text.includes("rescue") ||
    text.includes("accident") ||
    text.includes("government") ||
    text.includes("announcement") ||
    text.includes("update")
  ) {
    return "Travel News";
  }

  // Trekking Guides
  if (
    text.includes("trek") ||
    text.includes("trekking") ||
    text.includes("itinerary") ||
    text.includes("route") ||
    text.includes("trail") ||
    text.includes("guide") ||
    text.includes("camp") ||
    text.includes("base camp") ||
    text.includes("everest") ||
    text.includes("annapurna") ||
    text.includes("manaslu") ||
    text.includes("langtang")
  ) {
    return "Trekking Guides";
  }

  // Permits & Planning
  if (
    text.includes("permit") ||
    text.includes("visa") ||
    text.includes("planning") ||
    text.includes("budget") ||
    text.includes("cost") ||
    text.includes("insurance") ||
    text.includes("packing") ||
    text.includes("gear") ||
    text.includes("equipment")
  ) {
    return "Permits & Planning";
  }

  // Culture & Heritage
  if (
    text.includes("culture") ||
    text.includes("heritage") ||
    text.includes("festival") ||
    text.includes("temple") ||
    text.includes("monastery") ||
    text.includes("tradition") ||
    text.includes("religion") ||
    text.includes("community") ||
    text.includes("history")
  ) {
    return "Culture & Heritage";
  }

  // Nature & Wildlife
  if (
    text.includes("wildlife") ||
    text.includes("nature") ||
    text.includes("bird") ||
    text.includes("animal") ||
    text.includes("forest") ||
    text.includes("national park") ||
    text.includes("conservation") ||
    text.includes("mountain")
  ) {
    return "Nature & Wildlife";
  }

  // Adventure & Activities
  if (
    text.includes("adventure") ||
    text.includes("motorbike") ||
    text.includes("motorbiking") ||
    text.includes("rafting") ||
    text.includes("climbing") ||
    text.includes("paragliding") ||
    text.includes("bungee") ||
    text.includes("cycling") ||
    text.includes("activities")
  ) {
    return "Adventure & Activities";
  }

  return "Stories & People";
};

const BlogList = ({ variant = "compact" }) => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Large version states
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    "All",
    "Trekking Guides",
    "Permits & Planning",
    "Culture & Heritage",
    "Nature & Wildlife",
    "Adventure & Activities",
    "Travel News",
    "Stories & People",
  ];

  /* =========================================================
     DATE FORMAT
  ========================================================= */

  const formatDate = (dateValue) => {
    if (!dateValue) return "";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  /* =========================================================
     FETCH BLOGS
  ========================================================= */

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();

        const blogArray = Array.isArray(data?.Blog)
          ? data.Blog
          : Array.isArray(data?.blogs)
          ? data.blogs
          : [];

        setBlogs(blogArray);
      } catch (error) {
        console.error("Blog fetch error:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  /* =========================================================
     IMAGE URL
  ========================================================= */

  const getImageUrl = (blog) => {
    if (!blog?.image) {
      return FALLBACK_IMAGE;
    }

    if (
      blog.image.startsWith("http://") ||
      blog.image.startsWith("https://")
    ) {
      return blog.image;
    }

    return `${IMAGE_BASE_URL}${blog.image}`;
  };

  /* =========================================================
     BLOG CLICK
  ========================================================= */

  const handleBlogClick = (blog) => {
    if (!blog?.id) return;

    try {
      const storedViews = JSON.parse(localStorage.getItem("blogViews") || "{}");

      storedViews[blog.id] = (storedViews[blog.id] || 0) + 1;

      localStorage.setItem("blogViews", JSON.stringify(storedViews));

      localStorage.setItem("blogViewUpdated", Date.now().toString());

      window.dispatchEvent(new Event("blogViewUpdated"));
    } catch (error) {
      console.error("Blog view error:", error);
    }

    navigate(`/blogs/${blog.id}`, {
      state: {
        blog,
      },
    });
  };

  /* =========================================================
     COMPACT BLOGS (all shown together, no slider)
  ========================================================= */

  const compactBlogs = useMemo(() => {
    if (!blogs.length) return [];

    return blogs.slice(0, 3);
  }, [blogs]);

  /* =========================================================
     LARGE VERSION FILTERING
  ========================================================= */

  const filteredBlogs = useMemo(() => {
    let result = [...blogs];

    if (selectedCategory !== "All") {
      result = result.filter((blog) => getCategory(blog) === selectedCategory);
    }

    if (searchTerm.trim()) {
      const search = normalizeText(searchTerm);

      result = result.filter((blog) =>
        normalizeText(blog?.title).includes(search)
      );

      result = result.slice(0, 8);
    }

    return result;
  }, [blogs, selectedCategory, searchTerm]);

  /* =========================================================
     LARGE PAGINATION
  ========================================================= */

  const CARDS_PER_PAGE = 8;

  const totalPages = Math.ceil(filteredBlogs.length / CARDS_PER_PAGE);

  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#b83b6b] border-t-transparent" />

              <p className="font-montserrat text-sm text-gray-500">
                Loading stories...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* =========================================================
     COMPACT VERSION
     Mobile : stacked cards, 90% width, background image,
              about 100px tall
     Tablet+: all cards side by side in a grid
  ========================================================= */

  if (variant === "compact") {
    if (!compactBlogs.length) {
      return (
        <section className="bg-white px-6 py-20">
          <div className="mx-auto max-w-7xl text-center">
            <p className="font-montserrat text-sm text-gray-500">
              No stories published yet.
            </p>
          </div>
        </section>
      );
    }

    return (
      <section className="relative overflow-hidden bg-white px-0 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          {/* HEADER */}
          <div className="mb-8 px-5 text-center sm:mb-12 sm:px-0">
            <p className="mb-3 font-montserrat text-[10px] font-semibold uppercase tracking-[0.35em] text-[#b83b6b]">
              From the Himalayas
            </p>

            <h2 className="font-playfair text-3xl font-medium leading-tight text-[#171310] sm:text-5xl">
              Stories, Guides{" "}
              <span className="font-greatvibes text-[#b83b6b]">
                & Inspiration
              </span>
            </h2>

            <div className="mx-auto mt-4 h-[1px] w-16 bg-[#b83b6b]" />
          </div>

          {/* ALL BLOGS TOGETHER */}
          <div className="mx-auto flex w-[90%] flex-col gap-3 md:w-full md:grid md:grid-cols-3 md:gap-6">
            {compactBlogs.map((blog) => (
              <article
                key={blog.id}
                className="group relative flex min-h-[100px] items-end overflow-hidden bg-cover bg-center md:min-h-[360px]"
                style={{ backgroundImage: `url(${getImageUrl(blog)})` }}
              >
                {/* Dark overlay so the text stays readable */}
                <div className="absolute inset-0 bg-black/25 transition-colors duration-500 md:bg-gradient-to-t md:from-black/85 md:via-black/35 md:to-black/10 md:group-hover:from-black/90" />

                {/* CONTENT */}
                <div className="relative z-10 flex w-full flex-col gap-2 p-3 md:gap-3 md:p-6">
                  {/* Category (tablet and desktop only) */}
                  <span className="hidden font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80 md:block">
                    {getCategory(blog)}
                  </span>

                  {/* Title */}
                  <h3 className="line-clamp-2 font-playfair text-sm font-medium leading-snug text-white md:text-2xl md:leading-tight">
                    {blog?.title}
                  </h3>

                  {/* Description (tablet and desktop only) */}
                  <p className="hidden line-clamp-2 font-montserrat text-xs leading-5 text-white/70 md:block">
                    {blog?.short_description
                      ? normalizeText(blog.short_description)
                      : "Discover stories, travel guides and inspiration from the Himalayas."}
                  </p>

                  {/* Date + button */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 text-white/75">
                      <CalendarDays size={12} strokeWidth={1.5} />

                      <span className="font-montserrat text-[10px] uppercase tracking-[0.1em]">
                        {formatDate(blog?.published_at)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleBlogClick(blog)}
                      className="group/btn inline-flex shrink-0 items-center gap-1.5 border border-white/70 bg-white/10 px-3 py-1.5 font-montserrat text-[9px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#171310] md:px-4 md:py-2 md:text-[10px]"
                    >
                      Read More
                      <ArrowRight
                        size={12}
                        strokeWidth={1.5}
                        className="transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* BOTTOM DECORATIVE TEXT */}
          <div className="mt-10 flex items-center justify-center gap-4 sm:mt-12">
            <span className="h-[1px] w-10 bg-[#d8d1ca]" />

            <p className="font-greatvibes text-2xl text-[#b83b6b]">
              Travel. Discover. Remember.
            </p>

            <span className="h-[1px] w-10 bg-[#d8d1ca]" />
          </div>
        </div>
      </section>
    );
  }

  /* =========================================================
     LARGE VERSION
  ========================================================= */

  return (
    <section className="bg-white px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-12">
          <p className="mb-3 font-montserrat text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b83b6b]">
            From the Himalayas
          </p>

          <h2 className="font-playfair text-4xl text-[#171310] sm:text-5xl">
            Stories, Guides{" "}
            <span className="font-greatvibes text-[#b83b6b]">
              & Inspiration
            </span>
          </h2>
        </div>

        {/* SEARCH */}
        <div className="mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search stories..."
            className="w-full border border-[#ddd7d0] bg-[#FBF9F4] px-5 py-3 font-montserrat text-sm text-[#171310] outline-none transition focus:border-[#b83b6b]"
          />
        </div>

        {/* CATEGORIES */}
        <div className="mb-12 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`
                border
                px-4
                py-2
                font-montserrat
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.08em]
                transition-all
                duration-300
                ${
                  selectedCategory === category
                    ? "border-[#171310] bg-[#171310] text-white"
                    : "border-[#ddd7d0] bg-white text-[#555] hover:border-[#171310] hover:bg-[#171310] hover:text-white"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* BLOG GRID */}
        {paginatedBlogs.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-montserrat text-sm text-gray-500">
              No stories found.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {paginatedBlogs.map((blog) => (
              <article
                key={blog.id}
                className="overflow-hidden border border-[#e7e2dc] bg-[#FBF9F4] transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={getImageUrl(blog)}
                    alt={blog?.title || "Blog"}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                <div className="p-7">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.15em] text-[#b83b6b]">
                      {getCategory(blog)}
                    </span>

                    <span className="font-montserrat text-[10px] text-gray-500">
                      {formatDate(blog?.published_at)}
                    </span>
                  </div>

                  <h3 className="font-playfair text-2xl leading-tight text-[#171310]">
                    {blog?.title}
                  </h3>

                  <p className="mt-4 line-clamp-3 font-montserrat text-sm leading-6 text-[#666]">
                    {blog?.short_description
                      ? normalizeText(blog.short_description)
                      : "Discover stories, travel guides and inspiration from Nepal."}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleBlogClick(blog)}
                    className="group mt-6 inline-flex items-center gap-2 border border-[#171310] bg-[#171310] px-4 py-2.5 font-montserrat text-[10px] font-semibold uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-white hover:text-[#171310]"
                  >
                    Read More

                    <ArrowRight
                      size={13}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              className="flex h-10 w-10 items-center justify-center border border-[#ddd7d0] bg-white text-[#171310] transition-all duration-300 hover:bg-[#171310] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowLeft size={15} />
            </button>

            <span className="px-4 font-montserrat text-xs text-gray-500">
              {currentPage} / {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              className="flex h-10 w-10 items-center justify-center border border-[#ddd7d0] bg-white text-[#171310] transition-all duration-300 hover:bg-[#171310] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogList;