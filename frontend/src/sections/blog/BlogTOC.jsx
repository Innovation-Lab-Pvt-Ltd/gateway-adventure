import React from "react";

const BlogTOC = ({ blog }) => {
  if (!blog) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-md">
        <h2 className="text-xl font-bold text-[#0b2418]">
          Select a blog to view its Table of Contents
        </h2>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-[#0b2418]">
        Table of Contents
      </h2>

      <h3 className="mb-4 text-lg font-semibold text-[#0b2418]">
        {blog.title}
      </h3>

      <p className="text-gray-500">
        Blog ID: {blog.id}
      </p>
    </div>
  );
};

export default BlogTOC;