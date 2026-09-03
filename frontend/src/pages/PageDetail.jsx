import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "/api/v1/pagedetail";

const PageDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_BASE_URL}/${slug}`);

        if (!response.ok) {
          throw new Error(
            `API request failed with status ${response.status}`
          );
        }

        const data = await response.json();

        console.log("PAGE API RESPONSE:", data);

        /*
          Depending on your API response structure,
          page may be directly returned or inside data.
        */

        const pageData = data.page || data.data || data;

        setPage(pageData);
      } catch (err) {
        console.error("PAGE DETAIL ERROR:", err);
        setError("Unable to load this page.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPage();
    }
  }, [slug]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F0E7] px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="mx-auto mb-10 h-10 w-1/2 rounded bg-[#DAD4C4]" />

          <div className="space-y-4 rounded-xl bg-white p-8">
            <div className="h-5 w-full rounded bg-[#E3EBDD]" />
            <div className="h-5 w-full rounded bg-[#E3EBDD]" />
            <div className="h-5 w-5/6 rounded bg-[#E3EBDD]" />
            <div className="h-5 w-4/5 rounded bg-[#E3EBDD]" />
            <div className="h-5 w-full rounded bg-[#E3EBDD]" />
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error || !page) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#F4F0E7] px-6">
        <div className="text-center">
          <h1
            className="mb-4 text-3xl font-semibold text-[#2A2A24]"
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
            }}
          >
            Page Not Found
          </h1>

          <p className="mb-6 text-[#6B6A5F]">
            {error || "The requested page could not be found."}
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-lg bg-[#2F4732] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#223626]"
          >
            <ArrowLeft size={17} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <main className="min-h-screen bg-[#F4F0E7] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">

        {/* PAGE TITLE */}

        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#6E7F5E]">
            Gateway Adventure Treks
          </p>

          <h1
            className="text-4xl font-semibold text-[#2A2A24] sm:text-5xl"
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
            }}
          >
            {page.title || page.name || "Page"}
          </h1>
        </div>

        {/* PAGE CONTENT */}

        <article className="rounded-xl border border-[#DAD4C4] bg-white p-7 shadow-sm sm:p-10 lg:p-14">

          <div
            className="prose prose-lg max-w-none
              prose-headings:text-[#2A2A24]
              prose-p:text-[#6B6A5F]
              prose-p:leading-8
              prose-li:text-[#6B6A5F]
              prose-strong:text-[#2A2A24]
              prose-a:text-[#2F4732]
              prose-a:no-underline
              hover:prose-a:underline"
            dangerouslySetInnerHTML={{
              __html:
                page.description ||
                page.content ||
                page.body ||
                "",
            }}
          />

        </article>
      </div>
    </main>
  );
};

export default PageDetail;