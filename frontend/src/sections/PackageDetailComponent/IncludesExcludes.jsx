import React from "react";
import { Check, X } from "lucide-react";

const IncludesExcludes = ({ costIncludes, costExcludes }) => {
  const parseListItems = (html) => {
    if (!html) return [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    return Array.from(doc.querySelectorAll("li")).map((li) => ({
      html: li.innerHTML,
    }));
  };

  const includes = parseListItems(costIncludes);
  const excludes = parseListItems(costExcludes);

  return (
    <section className="py-10">
      {/* ================= COST INCLUDES ================= */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Cost Includes
        </h1>

        <div className="bg-gray-50 rounded-xl p-6">
          <ul className="space-y-4">
            {includes.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-gray-700 leading-7"
              >
                <Check className="w-5 h-5 text-green-600 mt-1 shrink-0" />

                <span
                  dangerouslySetInnerHTML={{
                    __html: item.html,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ================= COST EXCLUDES ================= */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Cost Excludes
        </h1>

        <div className="bg-gray-50 rounded-xl p-6">
          <ul className="space-y-4">
            {excludes.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-gray-700 leading-7"
              >
                <X className="w-5 h-5 text-red-500 mt-1 shrink-0" />

                <span
                  dangerouslySetInnerHTML={{
                    __html: item.html,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default IncludesExcludes;