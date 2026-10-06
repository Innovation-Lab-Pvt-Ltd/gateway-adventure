import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Route that renders TripDetail.jsx, must match your router
const PACKAGE_ROUTE = "/package";

const ActivitiesDetail = () => {
  const { slug } = useParams();

  const [activity, setActivity] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_URL = `${import.meta.env.VITE_BASE_API_URL}allpackages`;
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

  useEffect(() => {
    const fetchActivityPackages = async () => {
      try {
        setLoading(true);
        setError("");

        // --------------------------------------------------
        // 1. Get first page
        // --------------------------------------------------
        const firstResponse = await fetch(API_URL);

        if (!firstResponse.ok) {
          throw new Error("Failed to fetch packages");
        }

        const firstData = await firstResponse.json();

        // --------------------------------------------------
        // 2. Get all remaining pages
        // --------------------------------------------------
        const lastPage = firstData.packages?.last_page || 1;

        const remainingRequests = [];

        for (let page = 2; page <= lastPage; page++) {
          remainingRequests.push(
            fetch(`/api/v1/allpackages?page=${page}`).then((res) => {
              if (!res.ok) {
                throw new Error(`Failed to fetch page ${page}`);
              }

              return res.json();
            })
          );
        }

        const remainingData = await Promise.all(remainingRequests);

        // --------------------------------------------------
        // 3. Combine all package data
        // --------------------------------------------------
        const allData = [firstData, ...remainingData];

        const allPackages = allData.flatMap(
          (data) => data.packages?.data || []
        );

        // --------------------------------------------------
        // 4. Find the selected activity
        // --------------------------------------------------
        const activities = firstData.activities || [];

        const selectedActivity = activities.find(
          (item) =>
            item.slug === slug ||
            String(item.id) === String(slug) ||
            item.name?.toLowerCase().replace(/\s+/g, "-") ===
              slug?.toLowerCase()
        );

        if (!selectedActivity) {
          setError("Activity not found.");
          setLoading(false);
          return;
        }

        setActivity(selectedActivity);

        // --------------------------------------------------
        // 5. Find packages belonging to this activity
        // --------------------------------------------------
        const activityPackages = allPackages.filter(
          (pkg) =>
            Number(pkg.activity_id) === Number(selectedActivity.id) &&
            pkg.is_active === 1 &&
            pkg.slug
        );

        setPackages(activityPackages);
      } catch (err) {
        console.error("Activity detail error:", err);
        setError("Unable to load activity packages.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivityPackages();
  }, [slug]);

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------
  if (loading) {
    return (
      <section className="min-h-screen bg-white px-6 py-32">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-pink-500 border-t-transparent" />

          <p className="mt-5 font-montserrat text-sm text-gray-500">
            Loading activity...
          </p>
        </div>
      </section>
    );
  }

  // --------------------------------------------------
  // Error
  // --------------------------------------------------
  if (error) {
    return (
      <section className="min-h-screen bg-white px-6 py-32">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="font-playfair text-3xl text-[#0b2418]">
            {error}
          </h2>
        </div>
      </section>
    );
  }

  // --------------------------------------------------
  // Image helper
  // --------------------------------------------------
  const getImage = (pkg) => {
    const image =
      pkg.image ||
      pkg.social_image ||
      pkg.banner_image ||
      pkg.thumbnail;

    if (!image) {
      return "/images/MOUNT.jpg";
    }

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    return `${IMAGE_BASE_URL}${image}`;
  };

  return (
    <section className="min-h-screen bg-[#FBF9F4] px-5 py-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* =========================================
            ACTIVITY HEADER
        ========================================== */}

        <div className="mb-12 text-center">
          <p className="mb-3 font-montserrat text-[10px] font-semibold uppercase tracking-[0.3em] text-pink-500">
            Explore Nepal
          </p>

          <h1 className="font-playfair text-4xl font-medium text-[#0b2418] sm:text-5xl lg:text-6xl">
            {activity?.name}
          </h1>

          <div className="mx-auto mt-5 h-[1px] w-16 bg-pink-500" />
        </div>

        {/* =========================================
            NO PACKAGES
        ========================================== */}

        {packages.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="font-playfair text-2xl text-[#0b2418]">
              No packages available
            </h2>

            <p className="mt-3 font-montserrat text-sm text-gray-500">
              There are currently no packages available for this activity.
            </p>
          </div>
        ) : (
          <>
            {/* =========================================
                PACKAGE COUNT
            ========================================== */}

            <div className="mb-8">
              <p className="font-montserrat text-sm text-gray-500">
                {packages.length}{" "}
                {packages.length === 1 ? "package" : "packages"} available
              </p>
            </div>

            {/* =========================================
                PACKAGE GRID
                Each card links to TripDetail
            ========================================== */}

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg) => (
                <Link
                  key={pkg.id}
                  to={`${PACKAGE_ROUTE}/${pkg.slug}`}
                  className="
                    group
                    block
                    overflow-hidden
                    bg-white
                    shadow-sm
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:shadow-2xl
                  "
                >
                  {/* IMAGE */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={getImage(pkg)}
                      alt={pkg.name || "Package"}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-105
                      "
                    />

                    {/* Image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>

                  {/* CONTENT */}
                  <div className="p-6">
                    <h2 className="font-playfair text-2xl font-medium leading-tight text-[#0b2418] transition-colors duration-300 group-hover:text-pink-500">
                      {pkg.name}
                    </h2>

                    {pkg.duration && (
                      <p className="mt-3 font-montserrat text-xs uppercase tracking-[0.12em] text-gray-500">
                        {pkg.duration}{" "}
                        {Number(pkg.duration) === 1 ? "Day" : "Days"}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ActivitiesDetail;