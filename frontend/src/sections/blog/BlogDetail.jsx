import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogTOC from "./BlogTOC";

const API_URL = "/api/v1/blogs";

const BlogDetail = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        const list =
          data.Blog ||
          data.blogs ||
          data.blog ||
          data.data;

        if (!Array.isArray(list)) {
          throw new Error("Blogs response is not an array");
        }

        // Find the specific blog using the ID from the URL
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

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">
          Loading blog...
        </p>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-red-500">
          {error}
        </p>
      </div>
    );
  }

  // =====================================================
  // BLOG DETAIL
  // =====================================================

  return (
    <div className="min-h-[60vh] bg-[#F4F0E7] px-6 py-16 md:px-10 lg:px-16">

      {/* BLOG TITLE */}
      <h1 className="mb-8 font-serif text-4xl font-bold text-[#171310] sm:text-5xl">
        {blog.title}
      </h1>

      {/* BLOG TOC */}
      <BlogTOC blog={blog}/>

    </div>
  );
};

export default BlogDetail;