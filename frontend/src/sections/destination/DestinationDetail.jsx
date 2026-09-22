import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight,
  Clock,
  TrendingUp,
  ArrowUpRight,
  Compass,
} from "lucide-react";

// =========================================================
// CONFIG
// =========================================================
const API_URL = "/api/v1/allpackages";

const IMAGE_BASE_URL =
  "https://gatewaytreks.com/public/uploads/frontend/full/";

const FALLBACK_IMAGE = "/images/MOUNT.jpg";

const fetchPage = async (page) => {
  const res = await fetch(page === 1 ? API_URL : `${API_URL}?page=${page}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
};

const resolveImage = (item) => {
  if (item?.image) return `${IMAGE_BASE_URL}${item.image}`;
  if (item?.social_image) return `${IMAGE_BASE_URL}${item.social_image}`;
  return FALLBACK_IMAGE;
};

const GRADE_LABELS = {
  1: "Easy",
  2: "Moderate",
  3: "Strenuous",
  4: "Very strenuous",
};

// =========================================================
// The description comes from the CMS as raw HTML (<p>,
// <strong>, <h3>, <ul><li>…). This wraps the "Label:" part
// of a plain fact-list item (e.g. "Population: 30.5 million")
// in its own span so it can be styled distinctly — anything
// without that shape is left untouched.
// =========================================================
const formatDescription = (html = "") =>
  html.replace(
    /<li>([^<:]+):\s*/g,
    (_match, label) => `<li><span class="fact-label">${label}:</span> `
  );

const DestinationDetail = () => {
  const { slug } = useParams();

  // "loading" | "ready" | "notfound" | "error"
  const [status, setStatus] = useState("loading");
  const [destination, setDestination] = useState(null);
  const [treks, setTreks] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setStatus("loading");

        const first = await fetchPage(1);

        const dest = (first.destinations || []).find(
          (d) => d.slug === slug
        );

        if (!dest) {
          if (!cancelled) setStatus("notfound");
          return;
        }

        const lastPage = first.packages?.last_page || 1;

        const otherPages = await Promise.all(
          Array.from({ length: lastPage - 1 }, (_, i) =>
            fetchPage(i + 2)
          )
        );

        const allPackages = [first, ...otherPages].flatMap(
          (json) => json.packages?.data || []
        );

        const matched = allPackages.filter(
          (pkg) =>
            pkg.is_active === 1 &&
            pkg.slug &&
            String(pkg.destination_id) === String(dest.id)
        );

        if (cancelled) return;

        setDestination(dest);
        setTreks(matched);
        setStatus("ready");
      } catch (err) {
        console.error("Error loading destination:", err);
        if (!cancelled) setStatus("error");
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  // =======================================================
  // NOT FOUND
  // =======================================================

  if (status === "notfound") {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#F4F0E7] px-6 pt-24 text-center">
        <Compass size={32} strokeWidth={1.5} className="mb-4 text-[#9BE564]" />
        <h1 className="font-playfair text-3xl text-[#0b2418]">
          We couldn&apos;t find that destination
        </h1>
        <p className="mt-2 max-w-sm font-montserrat text-sm text-[#6B7568]">
          It may have been renamed or removed. Have a look at everywhere
          else we trek.
        </p>
        <Link
          to="/destinations"
          className="mt-6 rounded-md bg-[#0b2418] px-6 py-2.5 font-montserrat text-sm font-semibold text-white transition hover:bg-black"
        >
          Browse destinations
        </Link>
      </div>
    );
  }

  // =======================================================
  // ERROR
  // =======================================================

  if (status === "error") {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#F4F0E7] px-6 pt-24 text-center">
        <h1 className="font-playfair text-3xl text-[#0b2418]">
          Something went wrong
        </h1>
        <p className="mt-2 max-w-sm font-montserrat text-sm text-[#6B7568]">
          We couldn&apos;t load this destination. Please refresh the page
          to try again.
        </p>
      </div>
    );
  }

  // =======================================================
  // LOADING
  // =======================================================

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#F4F0E7] pt-24">
        <div className="h-[360px] w-full animate-pulse bg-[#E4DCC8] sm:h-[420px]" />
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="h-4 w-40 animate-pulse rounded bg-[#E4DCC8]" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-64 animate-pulse rounded-lg bg-[#E4DCC8]"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =======================================================
  // READY
  // =======================================================

  return (
    <div className="min-h-screen bg-[#F4F0E7]">

      {/* =================================================
          HERO BAND
          ================================================= */}

      <section className="relative h-[360px] w-full overflow-hidden sm:h-[440px]">

        <img
          src={resolveImage(destination)}
          alt={destination.name}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0b2418] via-[#0b2418]/40 to-black/10" />

        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="mx-auto w-full max-w-6xl px-4 pb-10">

            {/* BREADCRUMB */}

            <div className="mb-4 flex flex-wrap items-center gap-1.5 font-montserrat text-xs text-white/70">
              <Link to="/" className="transition hover:text-white">
                Home
              </Link>
              <ChevronRight size={13} />
              <Link to="/destinations" className="transition hover:text-white">
                Destinations
              </Link>
              <ChevronRight size={13} />
              <span className="text-white">{destination.name}</span>
            </div>

            <h1 className="font-playfair text-4xl font-medium text-white sm:text-5xl md:text-6xl">
              {destination.name}
            </h1>

            <p className="mt-3 font-montserrat text-sm text-white/80 sm:text-base">
              {treks.length} {treks.length === 1 ? "trek" : "treks"} available
            </p>

          </div>
        </div>
      </section>

      {/* =================================================
          DESCRIPTION
          ================================================= */}

      {destination.description && (
        <section className="mx-auto max-w-6xl px-4 pt-10">

          {/* Scoped rich-text styling for the CMS description —
              plain descendant selectors, same trick already used
              in Navbar.jsx for the menu-fade-in keyframes. */}
          <style>{`
            .destination-copy p {
              margin-bottom: 1.1rem;
              line-height: 1.75;
            }
            .destination-copy p:last-of-type {
              margin-bottom: 0;
            }
            .destination-copy strong {
              color: #0b2418;
              font-weight: 700;
            }
            .destination-copy h3 {
              font-family: "Playfair Display", serif;
              font-weight: 500;
              font-size: 1.375rem;
              color: #0b2418;
              margin-top: 2.25rem;
              margin-bottom: 0.9rem;
            }
            .destination-copy h3 strong {
              font-weight: 500;
            }
            .destination-copy ul {
              list-style: none;
              margin: 0;
              padding: 0;
              display: grid;
              grid-template-columns: 1fr;
              gap: 0.6rem 2.5rem;
            }
            @media (min-width: 640px) {
              .destination-copy ul {
                grid-template-columns: 1fr 1fr;
              }
            }
            .destination-copy li {
              position: relative;
              padding-left: 1.15rem;
              font-size: 0.875rem;
              line-height: 1.5;
            }
            .destination-copy li::before {
              content: "";
              position: absolute;
              left: 0;
              top: 0.5em;
              width: 6px;
              height: 6px;
              border-radius: 9999px;
              background: #9BE564;
            }
            .destination-copy .fact-label {
              color: #0b2418;
              font-weight: 700;
            }
          `}</style>

          <div
            className="destination-copy max-w-3xl font-montserrat text-sm text-[#3A4038] sm:text-base"
            dangerouslySetInnerHTML={{
              __html: formatDescription(destination.description),
            }}
          />

        </section>
      )}

      {/* =================================================
          TREK LIST
          ================================================= */}

      <section className="mx-auto max-w-6xl px-4 py-10">

        <div className="mb-6 flex items-center gap-3">
          <Compass size={20} strokeWidth={1.5} className="text-[#9BE564]" />
          <h2 className="font-playfair text-2xl text-[#0b2418] sm:text-3xl">
            Treks in {destination.name}
          </h2>
        </div>

        {treks.length === 0 ? (
          <div className="rounded-lg border border-[#E4DCC8] bg-white/60 px-6 py-14 text-center">
            <p className="font-montserrat text-sm text-[#6B7568]">
              We don&apos;t have any treks listed here yet — check back
              soon, or explore another destination.
            </p>
            <Link
              to="/destinations"
              className="mt-4 inline-block font-montserrat text-sm font-semibold text-[#0b2418] underline decoration-[#9BE564] decoration-2 underline-offset-4"
            >
              Browse other destinations
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {treks.map((pkg) => (
              <Link
                key={pkg.id}
                to={`/package/${pkg.slug}`}
                className="group overflow-hidden rounded-lg bg-white shadow-[0_1px_2px_rgba(11,36,24,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(11,36,24,0.35)]"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={resolveImage(pkg)}
                    alt={pkg.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-montserrat text-base font-bold leading-snug text-[#0b2418]">
                    {pkg.name}
                  </h3>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-montserrat text-xs text-[#6B7568]">

                    {pkg.duration && (
                      <span className="flex items-center gap-1">
                        <Clock size={13} />
                        {pkg.duration} days
                      </span>
                    )}

                    {(pkg.gradename || GRADE_LABELS[pkg.grade_id]) && (
                      <span className="flex items-center gap-1">
                        <TrendingUp size={13} />
                        {pkg.gradename || GRADE_LABELS[pkg.grade_id]}
                      </span>
                    )}

                  </div>

                  <div className="mt-4 flex items-center gap-1 font-montserrat text-sm font-semibold text-[#0b2418]">
                    View trek
                    <ArrowUpRight
                      size={15}
                      className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </section>

    </div>
  );
};

export default DestinationDetail;