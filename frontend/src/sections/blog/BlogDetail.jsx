import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Link as LinkIcon,
  Share2,
  User,
} from "lucide-react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import BlogTOC from "./BlogTOC";

const API_URL = "/api/v1/blogs";

const IMAGE_BASE_URL =
  "https://gatewaytreks.com/public/uploads/frontend/full/";

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

  const words = text
    .split(" ")
    .filter(Boolean).length;

  const minutes = Math.max(
    1,
    Math.ceil(words / 200)
  );

  return `${minutes} min read`;
};

// =====================================================
// GET CATEGORY
// =====================================================

const normalizeText = (value) => {
  if (!value) return "";

  return String(value)
    .toLowerCase()
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const getCategory = (blog) => {
  if (!blog) return "Stories & People";

  const title = normalizeText(blog.title);

  const tags = Array.isArray(blog.tags)
    ? blog.tags
        .map((tag) => normalizeText(tag))
        .join(" ")
    : normalizeText(blog.tags);

  // ===================================================
  // TRAVEL NEWS
  // ===================================================

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
    "official announcement",
    "announcement",
    "announced",
    "immigration update",
    "border update",
    "tourism board",
  ];

  if (
    newsKeywords.some((keyword) =>
      title.includes(keyword)
    )
  ) {
    return "Travel News";
  }

  if (
    newsKeywords.some((keyword) =>
      tags.includes(keyword)
    )
  ) {
    return "Travel News";
  }

  // ===================================================
  // TREKKING GUIDES
  // ===================================================

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

  if (
    trekkingKeywords.some((keyword) =>
      title.includes(keyword)
    )
  ) {
    return "Trekking Guides";
  }

  if (
    trekkingKeywords.some((keyword) =>
      tags.includes(keyword)
    )
  ) {
    return "Trekking Guides";
  }

  // ===================================================
  // PERMITS & PLANNING
  // ===================================================

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

  if (
    planningKeywords.some((keyword) =>
      title.includes(keyword)
    )
  ) {
    return "Permits & Planning";
  }

  if (
    planningKeywords.some((keyword) =>
      tags.includes(keyword)
    )
  ) {
    return "Permits & Planning";
  }

  // ===================================================
  // CULTURE
  // ===================================================

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

  // ===================================================
  // NATURE
  // ===================================================

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

  // ===================================================
  // ADVENTURE
  // ===================================================

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

  // ===================================================
  // STORIES
  // ===================================================

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
          throw new Error(
            `API request failed with status ${response.status}`
          );
        }

        const data = await response.json();

        console.log(
          "Gateway Treks Blog Detail:",
          data
        );

        const list =
          data.Blog ||
          data.blogs ||
          data.blog ||
          data.data;

        if (!Array.isArray(list)) {
          throw new Error(
            "Blogs response is not an array"
          );
        }

        const selectedBlog = list.find(
          (item) =>
            String(item.id) === String(id)
        );

        if (!selectedBlog) {
          throw new Error("Blog not found");
        }

        setBlog(selectedBlog);
      } catch (err) {
        console.error(
          "BLOG DETAIL ERROR:",
          err
        );

        setError(
          "Unable to load this blog."
        );
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
      await navigator.clipboard.writeText(
        window.location.href
      );

      alert("Article link copied!");
    } catch (err) {
      console.error(
        "Unable to copy link:",
        err
      );
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
        console.log(
          "Share cancelled."
        );
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

        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">

          <div className="h-5 w-24 animate-pulse rounded bg-gray-300" />

          <div className="mt-8 h-14 max-w-4xl animate-pulse rounded bg-gray-300" />

          <div className="mt-4 h-6 max-w-2xl animate-pulse rounded bg-gray-200" />

          <div className="mt-8 h-[400px] animate-pulse rounded-3xl bg-gray-300" />

        </div>

      </main>
    );
  }

  // ===================================================
  // ERROR
  // ===================================================

  if (error || !blog) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F4F0E7] px-6">

        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

          <h1 className="mb-3 text-2xl font-bold text-[#0b2418]">
            Blog Not Found
          </h1>

          <p className="mb-6 text-gray-500">
            {error ||
              "The blog you are looking for could not be found."}
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

  const readingTime = getReadingTime(
    blog.description
  );

  const imageUrl = blog.image
    ? `${IMAGE_BASE_URL}${blog.image}`
    : "/images/MOUNT.jpg";

  // ===================================================
  // MAIN UI
  // ===================================================

  return (
    <main className="min-h-screen bg-[#F4F0E7]">

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="px-6 pb-10 pt-8 md:px-10 lg:px-16 lg:pb-14">

        <div className="mx-auto max-w-7xl">

          {/* BACK */}

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 text-sm font-semibold text-[#0b2418] transition hover:text-[#2F6B4F]"
          >
            <ArrowLeft size={18} />

            Back to Blogs
          </button>

          {/* CATEGORY */}

          <div className="mb-5">

            <span className="inline-flex rounded-full bg-[#2F6B4F] px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white">
              {category}
            </span>

          </div>

          {/* TITLE */}

          <h1 className="max-w-5xl font-serif text-4xl font-bold leading-tight text-[#171310] sm:text-5xl lg:text-6xl">
            {blog.title}
          </h1>

          {/* SHORT DESCRIPTION */}

          {blog.short_description && (
            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
              {blog.short_description}
            </p>
          )}

          {/* AUTHOR / DATE / READING TIME */}

          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">

            {/* AUTHOR */}

            {blog.author && (
              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0b2418] text-white">
                  <User size={17} />
                </div>

                <div>

                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                    Written by
                  </p>

                  <p className="font-semibold text-[#0b2418]">
                    {blog.author}
                  </p>

                </div>

              </div>
            )}

            {/* DATE */}

            {blog.published_at && (
              <div className="flex items-center gap-2 text-sm text-gray-500">

                <CalendarDays
                  size={17}
                  className="text-[#2F6B4F]"
                />

                <span>
                  {formatDate(
                    blog.published_at
                  )}
                </span>

              </div>
            )}

            {/* READING TIME */}

            <div className="flex items-center gap-2 text-sm text-gray-500">

              <Clock
                size={17}
                className="text-[#2F6B4F]"
              />

              <span>
                {readingTime}
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          FEATURE IMAGE
      ================================================= */}

      <section className="px-6 md:px-10 lg:px-16">

        <div className="mx-auto max-w-7xl">

          <div className="h-[280px] overflow-hidden rounded-2xl bg-gray-200 sm:h-[400px] lg:h-[540px]">

            <img
              src={imageUrl}
              alt={
                blog.caption ||
                blog.title ||
                "Gateway Treks blog"
              }
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "/images/MOUNT.jpg";
              }}
            />

          </div>

          {/* CAPTION */}

          {blog.caption && (
            <p className="mt-3 text-center text-xs italic text-gray-400">
              {blog.caption}
            </p>
          )}

        </div>

      </section>

      {/* =================================================
          CONTENT + TOC
      ================================================= */}

      <section className="px-6 py-12 md:px-10 lg:px-16 lg:py-16">

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">

          {/* =================================================
              ARTICLE
          ================================================= */}

          <article className="min-w-0 rounded-2xl bg-white p-6 shadow-sm sm:p-8 lg:p-12">

            {/* INTRODUCTION */}

            {blog.short_description && (
              <p className="mb-8 border-l-4 border-[#2F6B4F] pl-5 text-lg font-medium leading-8 text-gray-600">
                {blog.short_description}
              </p>
            )}

            {/* BLOG CONTENT */}

            <div
              className="
                blog-content
                prose
                prose-lg
                max-w-none

                prose-headings:font-serif
                prose-headings:font-bold
                prose-headings:text-[#0b2418]

                prose-h2:mb-5
                prose-h2:mt-10
                prose-h2:text-2xl
                prose-h2:leading-tight

                prose-h3:mb-4
                prose-h3:mt-8
                prose-h3:text-xl

                prose-p:mb-6
                prose-p:leading-8
                prose-p:text-gray-600

                prose-a:font-semibold
                prose-a:text-[#2F6B4F]

                prose-strong:text-[#171310]

                prose-li:leading-7
                prose-li:text-gray-600

                prose-img:my-8
                prose-img:w-full
                prose-img:rounded-2xl

                prose-figure:my-8

                prose-figcaption:text-center
                prose-figcaption:text-sm
                prose-figcaption:italic
                prose-figcaption:text-gray-400

                prose-blockquote:border-[#2F6B4F]
              "
              dangerouslySetInnerHTML={{
                __html:
                  blog.description ||
                  "<p>No content available.</p>",
              }}
            />

          </article>

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="lg:sticky lg:top-24 lg:h-fit">

            <div className="rounded-2xl bg-white p-6 shadow-sm">

              {/* =================================================
                  TABLE OF CONTENT
              ================================================= */}

              <BlogTOC blog={blog} />

              {/* =================================================
                  SHARE
              ================================================= */}

              <div className="mt-8 border-t border-gray-100 pt-6">

                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#2F6B4F]">
                  Share Article
                </p>

                <button
                  type="button"
                  onClick={handleShare}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0b2418] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#2F6B4F]"
                >
                  <Share2 size={17} />

                  Share Article
                </button>

              </div>

              {/* =================================================
                  ARTICLE INFO
              ================================================= */}

              <div className="mt-6 border-t border-gray-100 pt-6">

                <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[#2F6B4F]">
                  Article Information
                </p>

                {/* AUTHOR */}

                {blog.author && (
                  <div className="mb-5 flex gap-3">

                    <User
                      size={18}
                      className="mt-0.5 text-[#2F6B4F]"
                    />

                    <div>

                      <p className="text-xs text-gray-400">
                        Author
                      </p>

                      <p className="font-semibold text-[#0b2418]">
                        {blog.author}
                      </p>

                    </div>

                  </div>
                )}

                {/* DATE */}

                {blog.published_at && (
                  <div className="mb-5 flex gap-3">

                    <CalendarDays
                      size={18}
                      className="mt-0.5 text-[#2F6B4F]"
                    />

                    <div>

                      <p className="text-xs text-gray-400">
                        Published
                      </p>

                      <p className="font-semibold text-[#0b2418]">
                        {formatDate(
                          blog.published_at
                        )}
                      </p>

                    </div>

                  </div>
                )}

                {/* READING TIME */}

                <div className="flex gap-3">

                  <Clock
                    size={18}
                    className="mt-0.5 text-[#2F6B4F]"
                  />

                  <div>

                    <p className="text-xs text-gray-400">
                      Reading Time
                    </p>

                    <p className="font-semibold text-[#0b2418]">
                      {readingTime}
                    </p>

                  </div>

                </div>

              </div>

              {/* =================================================
                  CATEGORY
              ================================================= */}

              <div className="mt-6 border-t border-gray-100 pt-6">

                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#2F6B4F]">
                  Category
                </p>

                <span className="inline-flex rounded-full bg-[#e8f0eb] px-3 py-2 text-xs font-semibold text-[#2F6B4F]">
                  {category}
                </span>

              </div>

              {/* =================================================
                  COPY LINK
              ================================================= */}

              <button
                type="button"
                onClick={handleCopyLink}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-[#0b2418] transition hover:border-[#2F6B4F] hover:bg-[#e8f0eb]"
              >
                <LinkIcon size={16} />

                Copy Article Link
              </button>

            </div>

          </aside>

        </div>

      </section>

      {/* =================================================
          BACK TO BLOGS
      ================================================= */}

      <section className="px-6 pb-16 md:px-10 lg:px-16">

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