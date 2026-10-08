import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Link as LinkIcon,
  Share2,
  User,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import BlogTOC from "./BlogTOC";

const API_URL = `${import.meta.env.VITE_BASE_API_URL}blogs`;

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

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
    month: "long",
    year: "numeric",
  });
};

// =====================================================
// GET READING TIME
// =====================================================

const getReadingTime = (html) => {
  if (!html) return "1 min read";

  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = text.split(" ").filter(Boolean).length;

  const minutes = Math.max(1, Math.ceil(words / 200));

  return `${minutes} min read`;
};

// =====================================================
// GET CATEGORY
// Same keywords and same priority order as before.
// A category matches if any keyword is found in the
// title or in the tags.
// =====================================================

const normalizeText = (value) => {
  if (!value) return "";

  return String(value)
    .toLowerCase()
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const CATEGORY_RULES = [
  {
    name: "Travel News",
    keywords: [
      "travel news", "latest news", "breaking news", "news update",
      "travel update", "government announcement", "government update",
      "new rule", "new rules", "new regulation", "new regulations",
      "official announcement", "announcement", "announced",
      "immigration update", "border update", "tourism board",
    ],
  },
  {
    name: "Trekking Guides",
    keywords: [
      "everest base camp trek", "everest base camp", "ebc trek", "ebc",
      "everest trek", "annapurna circuit", "annapurna base camp",
      "annapurna trek", "manaslu circuit", "manaslu trek", "langtang trek",
      "mardi himal trek", "ghorepani poon hill", "poon hill trek",
      "upper mustang trek", "upper mustang", "nar phu trek", "nar phu",
      "dolpo trek", "kanchenjunga trek", "makalu trek", "trekking", "trek",
      "trekker", "trekkers", "hiking", "hike", "mountaineering",
      "expedition", "base camp", "circuit trek", "high pass trek",
      "high passes", "pass trek",
    ],
  },
  {
    name: "Permits & Planning",
    keywords: [
      "permit", "permits", "tims", "visa", "visa guide", "visa requirement",
      "visa requirements", "immigration", "cost", "price", "fee", "fees",
      "budget", "packing list", "packing", "what to pack",
      "best time to visit", "best time to travel", "best time",
      "when to trek", "weather", "difficulty", "difficulty guide",
      "travel tips", "trekking tips", "planning", "travel planning",
      "itinerary", "regulation", "regulations", "drone", "travel insurance",
      "insurance", "acclimatization", "altitude sickness", "accommodation",
      "transportation", "how to get", "things to know",
    ],
  },
  {
    name: "Culture & Heritage",
    keywords: [
      "culture", "cultural", "heritage", "durbar", "durbar square", "kumari",
      "thangka", "newari", "newar", "festival", "festivals", "temple",
      "temples", "monastery", "monasteries", "museum", "museums",
      "heritage site", "heritage sites", "sherpa culture", "tradition",
      "traditions", "religion", "krishna mandir", "basantapur",
      "architecture", "historical", "history",
    ],
  },
  {
    name: "Nature & Wildlife",
    keywords: [
      "wildlife", "birdwatching", "bird watching", "birds", "snow leopard",
      "leopard", "biodiversity", "nature", "flora", "fauna", "forest",
      "forests", "national park", "national parks", "conservation",
      "animals", "wild animals", "rhino", "tiger", "elephant", "red panda",
      "ecosystem", "wetland",
    ],
  },
  {
    name: "Adventure & Activities",
    keywords: [
      "rafting", "raft", "paragliding", "paraglide", "jungle safari",
      "safari", "bungee", "zipline", "canyoning", "mountain biking",
      "cycling", "kayaking", "climbing", "rock climbing", "adventure",
      "adventures", "caving", "canoeing",
    ],
  },
];

const getCategory = (blog) => {
  if (!blog) return "Stories & People";

  const title = normalizeText(blog.title);

  const tags = Array.isArray(blog.tags)
    ? blog.tags.map((tag) => normalizeText(tag)).join(" ")
    : normalizeText(blog.tags);

  for (const rule of CATEGORY_RULES) {
    const matched = rule.keywords.some(
      (keyword) => title.includes(keyword) || tags.includes(keyword)
    );

    if (matched) {
      return rule.name;
    }
  }

  // "Stories & People" is also the default
  return "Stories & People";
};

// =====================================================
// BLOG DETAIL
// =====================================================

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ===================================================
  // FETCH BLOG
  // ===================================================

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        console.log("Gateway Treks Blog Detail:", data);

        const list = data.Blog || data.blogs || data.blog || data.data;

        if (!Array.isArray(list)) {
          throw new Error("Blogs response is not an array");
        }

        const selectedBlog = list.find(
          (item) => String(item.id) === String(id)
        );

        if (!selectedBlog) {
          throw new Error("Blog not found");
        }

        setBlog(selectedBlog);
      } catch (err) {
        console.error("BLOG DETAIL ERROR:", err);

        setError("Unable to load this blog.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // ===================================================
  // COPY LINK
  // ===================================================

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);

      alert("Article link copied!");
    } catch (err) {
      console.error("Unable to copy link:", err);
    }
  };

  // ===================================================
  // SHARE
  // ===================================================

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.short_description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled.");
      }
    } else {
      handleCopyLink();
    }
  };

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F4F0E7]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:px-10 lg:px-16 lg:py-16">
          <div className="h-5 w-24 animate-pulse rounded bg-gray-300" />

          <div className="mt-6 h-10 animate-pulse rounded bg-gray-300 sm:h-14 sm:max-w-4xl" />

          <div className="mt-4 h-5 animate-pulse rounded bg-gray-200 sm:h-6 sm:max-w-2xl" />

          <div className="mt-6 h-[220px] animate-pulse rounded-xl bg-gray-300 sm:mt-8 sm:h-[400px] sm:rounded-3xl" />
        </div>
      </main>
    );
  }

  // ===================================================
  // ERROR
  // ===================================================

  if (error || !blog) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F4F0E7] px-4 sm:px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-7 text-center shadow-sm sm:p-10">
          <h1 className="mb-3 text-2xl font-bold text-[#0b2418]">
            Blog Not Found
          </h1>

          <p className="mb-6 text-gray-500">
            {error || "The blog you are looking for could not be found."}
          </p>

          <button
            type="button"
            onClick={() => navigate("/blogs")}
            className="rounded-full bg-[#0b2418] px-6 py-3 font-semibold text-white transition hover:bg-[#2F6B4F]"
          >
            Back to Blogs
          </button>
        </div>
      </main>
    );
  }

  // ===================================================
  // BLOG DATA
  // ===================================================

  const category = getCategory(blog);

  const readingTime = getReadingTime(blog.description);

  const imageUrl = blog.image
    ? `${IMAGE_BASE_URL}${blog.image}`
    : "/images/MOUNT.jpg";

  // ===================================================
  // MAIN UI
  // ===================================================

  return (
    <main className="min-h-screen overflow-x-clip bg-[#F4F0E7] pt-2 sm:pt-6">
      {/* =================================================
          HEADER
      ================================================= */}

      <section className="px-4 pb-6 pt-5 sm:px-6 sm:pb-10 sm:pt-8 md:px-10 lg:px-16 lg:pb-14">
        <div className="mx-auto max-w-7xl">
          {/* BACK */}

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-5 flex items-center gap-2 py-1 text-sm font-semibold text-[#0b2418] transition hover:text-[#2F6B4F] sm:mb-8"
          >
            <ArrowLeft size={18} />

            Back to Blogs
          </button>

          {/* CATEGORY */}

          <div className="mb-4 sm:mb-5">
            <span className="inline-flex rounded-full bg-[#2F6B4F] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white sm:px-4 sm:py-2 sm:text-xs">
              {category}
            </span>
          </div>

          {/* TITLE */}

          <h1 className="max-w-5xl break-words font-serif text-[1.75rem] font-bold leading-[1.2] text-[#171310] sm:text-5xl sm:leading-tight lg:text-6xl">
            {blog.title}
          </h1>

          {/* SHORT DESCRIPTION */}

          {blog.short_description && (
            <p className="mt-4 max-w-3xl text-[15px] leading-7 text-gray-600 sm:mt-5 sm:text-lg sm:leading-8">
              {blog.short_description}
            </p>
          )}

          {/* AUTHOR / DATE / READING TIME */}

          <div className="mt-5 flex flex-col gap-4 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7">
            {/* AUTHOR */}

            {blog.author && (
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0b2418] text-white sm:h-10 sm:w-10">
                  <User size={16} />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                    Written by
                  </p>

                  <p className="truncate text-sm font-semibold text-[#0b2418] sm:text-base">
                    {blog.author}
                  </p>
                </div>
              </div>
            )}

            {/* DATE + READING TIME (same row on mobile) */}

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-gray-500 sm:text-sm">
              {blog.published_at && (
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-[#2F6B4F]" />

                  <span>{formatDate(blog.published_at)}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#2F6B4F]" />

                <span>{readingTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          FEATURE IMAGE
          Mobile: edge to edge. Desktop: rounded inside
          the page width.
      ================================================= */}

      <section className="px-0 sm:px-6 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="h-[220px] overflow-hidden bg-gray-200 sm:h-[400px] sm:rounded-2xl lg:h-[540px]">
            <img
              src={imageUrl}
              alt={blog.caption || blog.title || "Gateway Treks blog"}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/images/MOUNT.jpg";
              }}
            />
          </div>

          {/* CAPTION */}

          {blog.caption && (
            <p className="mt-3 px-4 text-center text-xs italic text-gray-400 sm:px-0">
              {blog.caption}
            </p>
          )}
        </div>
      </section>

      {/* =================================================
          CONTENT + TOC
      ================================================= */}

      <section className="px-4 py-8 sm:px-6 sm:py-12 md:px-10 lg:px-16 lg:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* =================================================
              ARTICLE
          ================================================= */}

          <article className="min-w-0 rounded-xl bg-white p-5 shadow-sm sm:rounded-2xl sm:p-8 lg:p-12">
            {/* INTRODUCTION (hidden on mobile, it already shows in the header) */}

            {blog.short_description && (
              <p className="mb-8 hidden border-l-4 border-[#2F6B4F] pl-5 text-lg font-medium leading-8 text-gray-600 sm:block">
                {blog.short_description}
              </p>
            )}

            {/* BLOG CONTENT */}

            <div
              className="
                blog-content
                prose
                prose-base
                max-w-none
                break-words
                sm:prose-lg

                prose-headings:font-serif
                prose-headings:font-bold
                prose-headings:text-[#0b2418]
                prose-headings:scroll-mt-24

                prose-h2:mb-4
                prose-h2:mt-8
                prose-h2:text-xl
                prose-h2:leading-snug
                sm:prose-h2:mb-5
                sm:prose-h2:mt-10
                sm:prose-h2:text-2xl

                prose-h3:mb-3
                prose-h3:mt-6
                prose-h3:text-lg
                sm:prose-h3:mb-4
                sm:prose-h3:mt-8
                sm:prose-h3:text-xl

                prose-p:mb-5
                prose-p:text-[15px]
                prose-p:leading-7
                prose-p:text-gray-600
                sm:prose-p:mb-6
                sm:prose-p:text-base
                sm:prose-p:leading-8

                prose-a:font-semibold
                prose-a:text-[#2F6B4F]

                prose-strong:text-[#171310]

                prose-ul:pl-5
                prose-ol:pl-5
                prose-li:text-[15px]
                prose-li:leading-7
                prose-li:text-gray-600
                sm:prose-li:text-base

                prose-img:my-6
                prose-img:h-auto
                prose-img:w-full
                prose-img:rounded-xl
                sm:prose-img:my-8
                sm:prose-img:rounded-2xl

                prose-figure:my-6
                sm:prose-figure:my-8

                prose-figcaption:text-center
                prose-figcaption:text-xs
                prose-figcaption:italic
                prose-figcaption:text-gray-400
                sm:prose-figcaption:text-sm

                prose-blockquote:border-[#2F6B4F]
                prose-blockquote:pl-4

                [&_iframe]:aspect-video
                [&_iframe]:h-auto
                [&_iframe]:w-full
                [&_pre]:overflow-x-auto
                [&_table]:block
                [&_table]:max-w-full
                [&_table]:overflow-x-auto
              "
              dangerouslySetInnerHTML={{
                __html: blog.description || "<p>No content available.</p>",
              }}
            />
          </article>

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="min-w-0 lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-xl bg-white p-5 shadow-sm sm:rounded-2xl sm:p-6">
              {/* =================================================
                  TABLE OF CONTENT
              ================================================= */}

              <BlogTOC blog={blog} />

              {/* =================================================
                  SHARE + COPY LINK
                  Mobile: side by side. Desktop: stacked.
              ================================================= */}

              <div className="mt-6 border-t border-gray-100 pt-5 sm:mt-8 sm:pt-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#2F6B4F]">
                  Share Article
                </p>

                <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#0b2418] px-3 py-3 text-sm font-semibold text-white transition hover:bg-[#2F6B4F] active:scale-[0.98]"
                  >
                    <Share2 size={16} />

                    Share
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-3 text-sm font-semibold text-[#0b2418] transition hover:border-[#2F6B4F] hover:bg-[#e8f0eb] active:scale-[0.98]"
                  >
                    <LinkIcon size={16} />

                    Copy Link
                  </button>
                </div>
              </div>

              {/* =================================================
                  ARTICLE INFO
                  Mobile: compact wrapped row. Desktop: stacked.
              ================================================= */}

              <div className="mt-6 border-t border-gray-100 pt-5 sm:pt-6">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#2F6B4F]">
                  Article Information
                </p>

                <div className="grid grid-cols-2 gap-x-4 gap-y-5 lg:grid-cols-1">
                  {/* AUTHOR */}

                  {blog.author && (
                    <div className="flex min-w-0 gap-3">
                      <User
                        size={18}
                        className="mt-0.5 shrink-0 text-[#2F6B4F]"
                      />

                      <div className="min-w-0">
                        <p className="text-xs text-gray-400">Author</p>

                        <p className="break-words text-sm font-semibold text-[#0b2418]">
                          {blog.author}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* DATE */}

                  {blog.published_at && (
                    <div className="flex min-w-0 gap-3">
                      <CalendarDays
                        size={18}
                        className="mt-0.5 shrink-0 text-[#2F6B4F]"
                      />

                      <div className="min-w-0">
                        <p className="text-xs text-gray-400">Published</p>

                        <p className="text-sm font-semibold text-[#0b2418]">
                          {formatDate(blog.published_at)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* READING TIME */}

                  <div className="flex min-w-0 gap-3">
                    <Clock
                      size={18}
                      className="mt-0.5 shrink-0 text-[#2F6B4F]"
                    />

                    <div className="min-w-0">
                      <p className="text-xs text-gray-400">Reading Time</p>

                      <p className="text-sm font-semibold text-[#0b2418]">
                        {readingTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  CATEGORY
              ================================================= */}

              <div className="mt-6 border-t border-gray-100 pt-5 sm:pt-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#2F6B4F]">
                  Category
                </p>

                <span className="inline-flex rounded-full bg-[#e8f0eb] px-3 py-2 text-xs font-semibold text-[#2F6B4F]">
                  {category}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* =================================================
          BACK TO BLOGS
      ================================================= */}

      <section className="px-4 pb-12 sm:px-6 sm:pb-16 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <button
            type="button"
            onClick={() => navigate("/blogs")}
            className="group flex items-center gap-3 font-semibold text-[#0b2418] transition hover:text-[#2F6B4F]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 transition group-hover:border-[#2F6B4F] group-hover:bg-[#2F6B4F] group-hover:text-white">
              <ArrowLeft size={17} />
            </span>

            Back to all blogs
          </button>
        </div>
      </section>
    </main>
  );
};

export default BlogDetail;