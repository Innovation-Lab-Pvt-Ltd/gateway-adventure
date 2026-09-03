import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";

const API_BASE_URL = "/api/v1/pagedetail";

const PageDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Reset scroll position immediately on navigation, before the fetch
    // even resolves — otherwise the page can appear to "load from the
    // bottom" because it inherits whatever scroll position the previous
    // route was at.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [slug]);

  useEffect(() => {
    if (!slug) return;

    const controller = new AbortController();

    const fetchPage = async () => {
      try {
        setLoading(true);
        setError("");
        setPage(null); // clear stale content so a new slug never flashes the old page

        const response = await fetch(`${API_BASE_URL}/${slug}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Depending on the API response shape, the page may be
        // returned directly or nested under `page` / `data`.
        const pageData = data.page || data.data || data;

        setPage(pageData);
      } catch (err) {
        if (err.name === "AbortError") return; // request was cancelled, ignore
        console.error("PAGE DETAIL ERROR:", err);
        setError("Unable to load this page.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchPage();

    return () => controller.abort();
  }, [slug]);

  useEffect(() => {
    if (page?.title || page?.name) {
      document.title = `${page.title || page.name} — Gateway Adventure Treks`;
    }
  }, [page]);

  const BackLink = () => (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="mt-2 group inline-flex items-center gap-2 text-sm font-medium text-[#6B6A5F] transition hover:text-[#2F4732]"
    >
      <ArrowLeft
        size={16}
        className="transition group-hover:-translate-x-0.5"
      />
      Back
    </button>
  );

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-busy="true"
        className="min-h-screen bg-[#F4F0E7] px-6 py-16 sm:px-10 lg:px-16"
      >
        <span className="sr-only">Loading page…</span>
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="mb-8 h-4 w-16 rounded bg-[#DAD4C4]" />

          <div className="mb-12 flex flex-col items-center">
            <div className="mb-3 h-3 w-40 rounded bg-[#DAD4C4]" />
            <div className="h-9 w-1/2 rounded bg-[#DAD4C4]" />
          </div>

          <div className="space-y-4 rounded-xl border border-[#DAD4C4] bg-white p-8 sm:p-10 lg:p-14">
            <div className="h-4 w-full rounded bg-[#E3EBDD]" />
            <div className="h-4 w-full rounded bg-[#E3EBDD]" />
            <div className="h-4 w-5/6 rounded bg-[#E3EBDD]" />
            <div className="h-4 w-4/5 rounded bg-[#E3EBDD]" />
            <div className="h-4 w-full rounded bg-[#E3EBDD]" />
            <div className="h-4 w-2/3 rounded bg-[#E3EBDD]" />
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
      <div className="flex min-h-screen items-center justify-center bg-[#F4F0E7] px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#E3EBDD]">
            <Compass size={24} className="text-[#2F4732]" />
          </div>

          <h1
            className="mb-3 text-3xl font-semibold text-[#2A2A24]"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            Page not found
          </h1>

          <p className="mb-8 leading-7 text-[#6B6A5F]">
            {error ||
              "We couldn't find the page you're looking for. It may have moved or no longer exists."}
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-lg bg-[#2F4732] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#223626]"
          >
            <ArrowLeft size={17} />
            Go back
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  const content = page.description || page.content || page.body || "";

  return (
    <main className="min-h-screen bg-[#F4F0E7] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        {/* BACK NAVIGATION */}
        <div className="mb-8">
          <BackLink />
        </div>

        {/* PAGE TITLE */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#6E7F5E]">
            Gateway Adventure Treks
          </p>

          <h1
            className="text-4xl font-semibold text-[#2A2A24] sm:text-5xl"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            {page.title || page.name || "Page"}
          </h1>
        </div>

        {/* PAGE CONTENT */}
        <article className="rounded-xl border border-[#DAD4C4] bg-white p-7 shadow-sm sm:p-10 lg:p-14">
          {content ? (
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
              // NOTE: this content comes from the CMS/API. If it can ever include
              // user-submitted or third-party text, sanitize it before rendering
              // (e.g. with DOMPurify.sanitize(content)) to avoid XSS.
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <p className="text-center text-[#6B6A5F]">
              This page doesn't have any content yet.
            </p>
          )}
        </article>
      </div>
    </main>
  );
};

export default PageDetail;