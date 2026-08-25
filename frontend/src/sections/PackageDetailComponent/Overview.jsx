import React from "react";
import DOMPurify from "dompurify";

const Overview = ({ description }) => {
  if (!description) {
    return (
      <p className="text-gray-500">
        No description available.
      </p>
    );
  }

  const bestTimeMarker =
    /<h3[^>]*>\s*Best Time to Trek Everest 3 High Passes\s*<\/h3>/i;

  const match = description.search(bestTimeMarker);

  const overviewHtml =
    match !== -1
      ? description.substring(0, match)
      : description;

  const cleanHtml = DOMPurify.sanitize(overviewHtml);

  return (
    <section className="mb-12 rounded-2xl bg-white p-6 shadow-sm md:p-8">

      {/* TITLE */}
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#4f8f3a]">
        Overview
      </p>

      <h2 className="mb-8 text-3xl font-bold tracking-tight text-[#0b2418]">
        About This Trek
      </h2>

      {/* DESCRIPTION */}
      <div
        className="
          prose
          prose-lg
          max-w-none

          prose-p:mb-5
          prose-p:leading-8
          prose-p:text-gray-600

          prose-strong:font-bold
          prose-strong:text-[#0b2418]

          prose-b:font-bold
          prose-b:text-[#0b2418]

          prose-headings:font-bold
          prose-headings:text-[#0b2418]

          prose-h2:mb-4
          prose-h3:mb-3

          prose-li:text-gray-600
          prose-li:leading-7

          prose-a:text-[#4f8f3a]
        "
        dangerouslySetInnerHTML={{
          __html: cleanHtml,
        }}
      />

    </section>
  );
};

export default Overview;