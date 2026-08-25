import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = "/api/v1/blogs";

const IMAGE_BASE_URL =
  "https://gatewaytreks.com/public/uploads/frontend/full/";

const FALLBACK_IMAGE = "/images/MOUNT.jpg";

const BlogList = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ================= FETCH BLOGS =================

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();

        setBlogs(data.data || []);
      } catch (error) {
        console.error("BLOG ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // ================= IMAGE =================

  const getImage = (image) => {
    if (!image) return FALLBACK_IMAGE;

    if (image.startsWith("http")) {
      return image;
    }

    return `${IMAGE_BASE_URL}${image}`;
  };

  // ================= DESCRIPTION =================

  const getShortDescription = (description) => {
    if (!description) {
      return "Discover amazing travel stories, adventures and destinations across Nepal.";
    }

    // Remove HTML tags
    const text = description.replace(/<[^>]*>/g, "");

    // Limit description
    if (text.length > 120) {
      return text.substring(0, 120) + "...";
    }

    return text;
  };

  // ================= SEARCH =================

  const filteredBlogs = blogs.filter((blog) =>
    blog.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  // ================= OPEN BLOG =================

  const openBlog = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <section className="w-full bg-[#FBF9F4]">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative min-h-[640px] overflow-visible">

        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/CLIMBER.jpg')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 flex min-h-[500px] items-center px-6 pt-24">

          <div className="w-full text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              - Stories & Guides
            </p>

            <h1 className="mx-auto mt-3 max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">

              Explore the awesome

              <span className="block text-[#9BE564]">
                stories and journeys.
              </span>

            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
              Discover inspiring adventures, trekking guides,
              travel stories, mountain expeditions and destinations
              across Nepal.
            </p>

          </div>

        </div>

        {/* =================================================
            SEARCH
        ================================================= */}

        <div className="absolute bottom-10 left-0 right-0 z-20 px-6">

          <div className="relative mx-auto max-w-2xl">

            <div className="flex h-16 items-center rounded-full bg-white p-2 shadow-2xl">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eaf6df] text-[#4f8f3a]">
                <Search size={20} />
              </div>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search blogs by title..."
                className="min-w-0 flex-1 bg-transparent px-4 text-sm text-gray-800 outline-none sm:text-base"
              />

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          BLOG CONTENT
      ================================================= */}

      <section className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-12">

        {/* Heading */}

        <div className="mb-8">

          <p className="mb-2 text-xs font-bold uppercase tracking-[3px] text-[#4f8f3a]">
            Our Stories
          </p>

          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Latest Blogs
          </h2>

        </div>

        {/* Count */}

        <p className="mb-7 text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {filteredBlogs.length}
          </span>{" "}
          blogs
        </p>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (

          <div className="py-20 text-center text-gray-500">
            Loading blogs...
          </div>

        ) : filteredBlogs.length > 0 ? (

          /* =================================================
             BLOG GRID
          ================================================= */

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">

            {filteredBlogs.map((blog) => (

              <article
                key={blog.id}
                onClick={() => openBlog(blog.id)}
                className="
                  group
                  cursor-pointer
                  overflow-hidden
                  rounded-3xl
                  border
                  border-black/5
                  bg-white
                  shadow-lg
                  transition
                  duration-300
                  hover:-translate-y-1.5
                  hover:shadow-xl
                "
              >

                {/* ================= IMAGE ================= */}

                <div className="h-52 overflow-hidden">

                  <img
                    src={getImage(blog.image)}
                    alt={blog.title}
                    className="
                      h-full
                      w-full
                      object-cover
                      transition
                      duration-500
                      group-hover:scale-105
                    "
                    onError={(e) => {
                      e.currentTarget.src =
                        FALLBACK_IMAGE;
                    }}
                  />

                </div>

                {/* ================= CONTENT ================= */}

                <div className="p-5">

                  {/* Blog Name / Title */}

                  <h2
                    className="
                      line-clamp-2
                      text-lg
                      font-bold
                      leading-6
                      text-gray-900
                      transition
                      group-hover:text-[#4f8f3a]
                    "
                  >
                    {blog.title}
                  </h2>

                  {/* Short Description */}

                  <p
                    className="
                      mt-3
                      line-clamp-3
                      text-sm
                      leading-6
                      text-gray-500
                    "
                  >
                    {getShortDescription(
                      blog.description ||
                      blog.content ||
                      blog.short_description
                    )}
                  </p>

                </div>

              </article>

            ))}

          </div>

        ) : (

          /* =================================================
             NO BLOGS
          ================================================= */

          <div className="rounded-2xl bg-white py-16 text-center">

            <Search
              size={35}
              className="mx-auto mb-3 text-gray-300"
            />

            <h3 className="text-lg font-semibold text-gray-800">
              No blogs found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Try another search term.
            </p>

          </div>

        )}

      </section>

    </section>
  );
};

export default BlogList;