import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Mountain,
  Star,
  Users,
  Clock,
  Sun,
  Car,
  Check,
  FileText,
  ShieldCheck,
  CreditCard,
  Phone,
  MapPin,
} from "lucide-react";

import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

const API_URL = "/gateway-api/v1/popular-packages";

const IMAGE_BASE_URL =
  "https://gatewaytreks.com/public/uploads/frontend/full/";

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // =====================================================
  // SCROLL TO TOP
  // =====================================================

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [id]);

  // =====================================================
  // PACKAGE STATE
  // =====================================================

  // If PopularPackages passes the package through state,
  // we can display it immediately.
  const [trip, setTrip] = useState(
    location.state?.trip || null
  );

  const [loading, setLoading] = useState(
    !location.state?.trip
  );

  const [error, setError] = useState(null);

  // =====================================================
  // GET PACKAGE
  // =====================================================

  useEffect(() => {
    // -----------------------------------------------------
    // CASE 1:
    // Package was passed from PopularPackages
    // -----------------------------------------------------

    if (location.state?.trip) {
      console.log(
        "Package received from PopularPackages:",
        location.state.trip
      );

      setTrip(location.state.trip);
      setLoading(false);
      return;
    }

    // -----------------------------------------------------
    // CASE 2:
    // User refreshed the page or directly opened URL
    // -----------------------------------------------------

    const fetchPackage = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log(
          "Fetching package because state is unavailable. ID:",
          id
        );

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch packages: ${response.status}`
          );
        }

        const data = await response.json();

        console.log(
          "POPULAR PACKAGES RESPONSE:",
          data
        );

        // API structure:
        //
        // {
        //   popular_packages: [...]
        // }

        const packages = Array.isArray(
          data.popular_packages
        )
          ? data.popular_packages
          : [];

        // Find the package whose ID matches URL ID
        const foundPackage = packages.find(
          (pkg) =>
            String(pkg.id) === String(id)
        );

        console.log(
          "FOUND PACKAGE:",
          foundPackage
        );

        if (!foundPackage) {
          throw new Error(
            "Package not found."
          );
        }

        setTrip(foundPackage);

      } catch (err) {
        console.error(
          "PACKAGE DETAIL ERROR:",
          err
        );

        setError(err.message);

      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPackage();
    }

  }, [id, location.state]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">

        <div className="h-[420px] animate-pulse bg-gray-200 md:h-[520px]" />

        <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">

          <div className="h-12 w-3/4 animate-pulse rounded bg-gray-200" />

          <div className="mt-6 h-6 w-1/3 animate-pulse rounded bg-gray-200" />

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">

            <div className="lg:col-span-2">

              <div className="h-40 animate-pulse rounded-2xl bg-gray-200" />

              <div className="mt-8 h-60 animate-pulse rounded-2xl bg-gray-200" />

            </div>

            <div className="h-80 animate-pulse rounded-2xl bg-gray-200" />

          </div>

        </div>

      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">

        <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-lg">

          <h2 className="mb-3 text-2xl font-bold text-red-500">
            Unable to load package
          </h2>

          <p className="mb-6 text-gray-500">
            {error}
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0b2418] px-6 py-3 font-semibold text-white transition hover:bg-[#4f8f3a]"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

        </div>

      </div>
    );
  }

  // =====================================================
  // PACKAGE NOT FOUND
  // =====================================================

  if (!trip) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">

        <div className="text-center">

          <h2 className="mb-3 text-2xl font-bold text-[#0b2418]">
            Package not found
          </h2>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-xl bg-[#0b2418] px-6 py-3 font-semibold text-white"
          >
            Go Back
          </button>

        </div>

      </div>
    );
  }

  // =====================================================
  // API VALUES
  // =====================================================

  const title =
    trip.title ||
    trip.name ||
    "Untitled Package";

  const duration =
    trip.duration ?? "N/A";

  const rating =
    trip.rating ?? "N/A";

  const reviews =
    trip.review_count ??
    trip.reviews ??
    null;

  const price =
    trip.price ?? null;

  const groupSize =
    trip.group_size ??
    "N/A";

  const altitude =
    trip.max_altitude ??
    "N/A";

  const walkHours =
    trip.walk_in_hours ??
    "N/A";

  const season =
    trip.best_season ||
    "Spring & Autumn";

  const transportation =
    trip.transportation ||
    "Private transportation";

  const region =
    trip.destslug ||
    trip.destination ||
    "Nepal";

  // =====================================================
  // DIFFICULTY
  // =====================================================

  const difficulty =
    Number(trip.grade_id) === 1
      ? "Easy"
      : Number(trip.grade_id) === 2
      ? "Moderate"
      : Number(trip.grade_id) === 3
      ? "Challenging"
      : "Moderate";

  // =====================================================
  // IMAGE
  // =====================================================

  const image = trip.image
    ? `${IMAGE_BASE_URL}${trip.image}`
    : "/images/MOUNT.jpg";

  console.log("PACKAGE IMAGE:", image);

  // =====================================================
  // WHY THIS TREK
  // =====================================================

  const highlights = [
    "Experience spectacular Himalayan mountain views",
    "Explore traditional mountain villages and local culture",
    "Walk through beautiful forests and alpine landscapes",
    "Discover dramatic valleys, rivers and mountain trails",
    "Visit iconic viewpoints and Himalayan landmarks",
    "Experience an unforgettable adventure in Nepal",
  ];

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-50">

      {/* =================================================
          HERO IMAGE
      ================================================= */}

      <section className="relative">

        <div className="h-[420px] w-full overflow-hidden md:h-[520px]">

          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
            onError={(e) => {
              console.error(
                "IMAGE FAILED:",
                image
              );

              e.currentTarget.src =
                "/images/MOUNT.jpg";
            }}
          />

        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2.5 text-sm font-semibold text-[#0b2418] shadow-lg backdrop-blur transition hover:bg-white md:left-10"
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </section>

      {/* =================================================
          PACKAGE TITLE
      ================================================= */}

      <section className="border-b border-gray-100 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">

          <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#4f8f3a]">

            <MapPin size={16} />

            {region}

          </div>

          <h1 className="max-w-5xl text-3xl font-bold leading-tight tracking-tight text-[#0b2418] md:text-5xl">
            {title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">

            <div className="flex items-center gap-2">

              <Star
                size={18}
                fill="currentColor"
                className="text-[#f5b942]"
              />

              <span className="font-bold text-[#0b2418]">
                {rating}
              </span>

              {reviews !== null && (
                <span className="text-sm text-gray-400">
                  ({reviews} reviews)
                </span>
              )}

            </div>

            <span className="hidden text-gray-300 sm:block">
              |
            </span>

            <span className="text-sm font-medium text-gray-500">
              Recommended Himalayan Adventure
            </span>

          </div>

        </div>

      </section>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">

          {/* LEFT */}

          <div className="lg:col-span-2">

            {/* TRIP FACTS */}

            <div className="mb-12">

              <h2 className="mb-6 text-2xl font-bold text-[#0b2418]">
                Trip Facts
              </h2>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

                <TripFact
                  icon={<CalendarDays size={22} />}
                  label="Duration"
                  value={`${duration} days`}
                />

                <TripFact
                  icon={<Mountain size={22} />}
                  label="Difficulty"
                  value={difficulty}
                />

                <TripFact
                  icon={<Mountain size={22} />}
                  label="Max Altitude"
                  value={altitude}
                />

                <TripFact
                  icon={<Users size={22} />}
                  label="Group Size"
                  value={groupSize}
                />

                <TripFact
                  icon={<Clock size={22} />}
                  label="Walk / Day"
                  value={
                    walkHours !== "N/A"
                      ? `${walkHours} hrs`
                      : "N/A"
                  }
                />

                <TripFact
                  icon={<Sun size={22} />}
                  label="Best Season"
                  value={season}
                />

                <TripFact
                  icon={<Car size={22} />}
                  label="Transportation"
                  value={transportation}
                />

                <TripFact
                  icon={
                    <Star
                      size={22}
                      fill="currentColor"
                    />
                  }
                  label="Rating"
                  value={
                    rating !== "N/A"
                      ? `${rating} / 5`
                      : "N/A"
                  }
                  star
                />

              </div>

            </div>

            {/* WHY THIS TREK */}

            <section className="mb-12">

              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#4f8f3a]">
                Why this trek
              </p>

              <h2 className="mb-7 font-serif text-3xl font-semibold italic tracking-tight text-[#0b2418] md:text-4xl">
                {title}
              </h2>

              <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">

                <div className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">

                  {highlights.map(
                    (highlight, index) => (

                      <div
                        key={index}
                        className="flex items-start gap-3"
                      >

                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eaf6df]">

                          <Check
                            size={15}
                            strokeWidth={3}
                            className="text-[#4f8f3a]"
                          />

                        </div>

                        <p className="text-[15px] leading-7 text-gray-600">
                          {highlight}
                        </p>

                      </div>

                    )
                  )}

                </div>

              </div>

            </section>

            {/* OVERVIEW */}

            <section className="rounded-2xl bg-white p-6 shadow-sm md:p-8">

              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#4f8f3a]">
                Overview
              </p>

              <h2 className="mb-7 text-3xl font-bold tracking-tight text-[#0b2418]">
                About the {title}
              </h2>

              <div className="space-y-6 text-[16px] leading-8 text-gray-600">

                <div className="border-l-4 border-[#9be564] pl-5">

                  <p className="font-serif text-lg italic leading-8 text-[#0b2418]">
                    "Can I actually do this?"
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-500">
                    A question many trekkers ask before
                    beginning their Himalayan journey.
                  </p>

                </div>

                <p>
                  The {title} is designed for travelers
                  who want to experience the spectacular
                  landscapes, mountain culture and natural
                  beauty of Nepal.
                </p>

                <p>
                  You will travel through changing
                  landscapes, from green valleys and
                  forests to rugged mountain terrain.
                </p>

                <p>
                  The trek is not only about reaching a
                  destination. The journey itself is an
                  important part of the experience.
                </p>

                <p>
                  Altitude is an important part of any
                  Himalayan trek. Our itinerary allows
                  trekkers to gradually gain elevation while
                  maintaining appropriate rest and
                  acclimatization periods.
                </p>

                <p>
                  Weather and trail conditions can change
                  quickly in the mountains, so flexibility
                  is essential.
                </p>

                <p>
                  Whether you are an experienced trekker or
                  preparing for your first major Himalayan
                  adventure, the {title} offers an opportunity
                  to explore Nepal's mountains.
                </p>

              </div>

            </section>

          </div>

          {/* RIGHT BOOKING CARD */}

          <div className="lg:sticky lg:top-24 lg:self-start">

            <div className="overflow-hidden rounded-2xl bg-white shadow-xl">

              <div className="bg-[#0b2418] px-5 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white">
                Featured Trip
              </div>

              <div className="p-4">

                <p className="text-xs text-gray-500">
                  Price per person
                </p>

                <div className="mt-0.5">

                  {price !== null ? (
                    <span className="text-3xl font-bold text-[#0b2418]">
                      ${price}
                    </span>
                  ) : (
                    <span className="text-xl font-bold text-[#0b2418]">
                      Contact us
                    </span>
                  )}

                </div>

                <p className="mt-1 text-xs text-gray-500">
                  {duration} days · all-inclusive
                </p>

                <div className="mt-3 rounded-lg bg-[#eaf6df] p-3">

                  <p className="text-sm font-semibold text-[#0b2418]">
                    Group discounts
                  </p>

                  <p className="mt-0.5 text-[11px] text-gray-500">
                    Contact us for group pricing.
                  </p>

                </div>

                <button
                  type="button"
                  className="mt-3 w-full rounded-lg bg-[#4f8f3a] py-2.5 text-sm font-semibold text-white transition hover:bg-[#3d762e]"
                >
                  Check Availability
                </button>

                <button
                  type="button"
                  className="mt-2 w-full rounded-lg border-2 border-[#0b2418] py-2.5 text-sm font-semibold text-[#0b2418] transition hover:bg-[#0b2418] hover:text-white"
                >
                  Make an Inquiry
                </button>

                <div className="mt-4 space-y-2.5 border-t border-gray-100 pt-4">

                  <TrustItem
                    icon={<ShieldCheck size={17} />}
                    text="Instant booking confirmed"
                  />

                  <TrustItem
                    icon={<CreditCard size={17} />}
                    text="Secure payments"
                  />

                  <TrustItem
                    icon={<Check size={17} />}
                    text="No hidden costs"
                  />

                </div>

                <div className="mt-4 border-t border-gray-100 pt-3">

                  <div className="flex items-center gap-2">

                    <Star
                      size={16}
                      fill="currentColor"
                      className="text-[#f5b942]"
                    />

                    <span className="text-sm font-bold text-[#0b2418]">
                      {rating}
                    </span>

                    {reviews !== null && (
                      <span className="text-xs text-gray-400">
                        · {reviews} reviews
                      </span>
                    )}

                  </div>

                  <button
                    type="button"
                    className="mt-1 text-xs font-semibold text-[#4f8f3a] hover:underline"
                  >
                    Read reviews
                  </button>

                </div>

                <button
                  type="button"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2 text-xs font-semibold text-[#0b2418] transition hover:border-[#4f8f3a] hover:text-[#4f8f3a]"
                >
                  <FileText size={16} />
                  Download PDF
                </button>

                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">

                  <Phone size={14} />

                  Need help? Contact us

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

// =====================================================
// TRIP FACT
// =====================================================

const TripFact = ({
  icon,
  label,
  value,
  star = false,
}) => {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      <div
        className={`mb-3 ${
          star
            ? "text-[#f5b942]"
            : "text-[#4f8f3a]"
        }`}
      >
        {icon}
      </div>

      <p className="text-xs uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 font-bold text-[#0b2418]">
        {value}
      </p>

    </div>
  );
};

// =====================================================
// TRUST ITEM
// =====================================================

const TrustItem = ({
  icon,
  text,
}) => {
  return (
    <div className="flex items-center gap-2.5">

      <div className="text-[#4f8f3a]">
        {icon}
      </div>

      <span className="text-xs text-gray-600">
        {text}
      </span>

    </div>
  );
};

export default PackageDetail;