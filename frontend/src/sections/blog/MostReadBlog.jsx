import React, { useEffect, useState } from "react";
import { getCategory } from "./BlogList";
import { useNavigate } from "react-router-dom";

// Gateway Treks API
const API_URL = "/api/v1/blogs";

const MostReadBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [viewCounts, setViewCounts] = useState({});

  const navigate = useNavigate();

  // =====================================================
  // GET VIEW COUNTS
  // =====================================================

  const loadViewCounts = () => {
    const storedViews =
      JSON.parse(localStorage.getItem("blogViews")) || {};

    setViewCounts(storedViews);
  };

  // =====================================================
  // FETCH BLOGS
  // =====================================================

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            `API request failed with status ${response.status}`
          );
        }

        const data = await response.json();

        const list =
          data.Blog ||
          data.blogs ||
          data.blog ||
          data.data;

        if (Array.isArray(list)) {
          setBlogs(list);
        }
      } catch (error) {
        console.error(
          "MOST READ BLOGS ERROR:",
          error
        );
      }
    };

    fetchBlogs();

    // Load saved clicks
    loadViewCounts();

    // Update when BlogList records a click
    const handleViewUpdate = () => {
      loadViewCounts();
    };

    window.addEventListener(
      "blogViewUpdated",
      handleViewUpdate
    );

    return () => {
      window.removeEventListener(
        "blogViewUpdated",
        handleViewUpdate
      );
    };
  }, []);

  // =====================================================
  // FIND TOP 2 MOST READ BLOGS
  // =====================================================

  const mostReadBlogs = [...blogs]
    .sort((a, b) => {
      const viewsA = viewCounts[a.id] || 0;
      const viewsB = viewCounts[b.id] || 0;

      return viewsB - viewsA;
    })
    .slice(0, 2);

  // =====================================================
  // HANDLE BLOG CLICK
  // =====================================================

  const handleBlogClick = (blog) => {
    if (!blog || !blog.id) {
      return;
    }

    // Increase view count
    const currentViews =
      viewCounts[blog.id] || 0;

    const updatedViews = {
      ...viewCounts,
      [blog.id]: currentViews + 1,
    };

    localStorage.setItem(
      "blogViews",
      JSON.stringify(updatedViews)
    );

    // Update view count in other components
    window.dispatchEvent(
      new CustomEvent("blogViewUpdated")
    );

    // Navigate to BlogDetail
    navigate(`/blogs/${blog.id}`, {
      state: {
        blog,
      },
    });
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <section className="bg-[#F4F0E7] px-6 py-12 md:px-10 lg:px-16">

      {/* HEADING */}

      <div className="mb-6">
        <div className="mb-3 flex items-center gap-3">

          <span className="h-[2px] w-8 bg-[#2F6B4F]" />

          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#2F6B4F]">
            Popular Stories
          </span>

        </div>

        <h2 className="font-serif text-3xl font-bold text-[#171310] sm:text-4xl">
          MOST READ
        </h2>
      </div>

      {/* BLOGS */}

      {mostReadBlogs.length === 0 ? (

        <p className="text-gray-500">
          No most-read blogs available.
        </p>

      ) : (

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {mostReadBlogs.map((blog) => (

            <div
              key={blog.id}

              onClick={() =>
                handleBlogClick(blog)
              }

              className="group flex cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >

              {/* IMAGE */}

              <div className="h-32 w-36 shrink-0 overflow-hidden sm:h-36 sm:w-44">

                <img
                  src={`https://gatewaytreks.com/public/uploads/frontend/full/${blog.image}`}
                  alt={blog.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "/images/MOUNT.jpg";
                  }}
                />

              </div>

              {/* CONTENT */}

              <div className="flex flex-1 flex-col justify-center p-4">

                {/* CATEGORY */}

                <span className="mb-2 self-start rounded-full bg-[#e8f0eb] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#2F6B4F]">
                  {getCategory(blog)}
                </span>

                {/* TITLE */}

                <h3 className="line-clamp-2 text-base font-bold leading-5 text-[#0b2418] sm:text-lg">
                  {blog.title}
                </h3>

                {/* VIEWS */}

                <p className="mt-2 text-xs text-gray-400">
                  {viewCounts[blog.id] || 0} views
                </p>

              </div>

            </div>

          ))}

        </div>
      )}

    </section>
  );
};

export default MostReadBlog;