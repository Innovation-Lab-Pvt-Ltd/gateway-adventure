import React, { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";

const API_URL = "/api/v1/teams";

const IMAGE_BASE_URL =
  "https://gatewaytreks.com/public/uploads/frontend/full/";

const OurPeople = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // =====================================================
  // FETCH TEAM MEMBERS
  // =====================================================

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            `API request failed with status ${response.status}`
          );
        }

        const data = await response.json();

        console.log("Team API Response:", data);

        if (Array.isArray(data.employees)) {
          setTeam(data.employees);
        } else {
          throw new Error("employees is not an array");
        }
      } catch (err) {
        console.error("TEAM API ERROR:", err);
        setError("Unable to load our team.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <h4 className="mb-3 text-xs font-semibold tracking-[0.25em] text-[#6E7F5E]">
              — OUR PEOPLE
            </h4>

            <h1
              className="text-3xl font-semibold text-[#2A2A24] sm:text-4xl lg:text-5xl"
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
              }}
            >
              Meet The Gateway Family
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-xl border border-[#DAD4C4] bg-white"
              >
                <div className="h-60 bg-[#DAD4C4]" />

                <div className="space-y-4 p-7">
                  <div className="h-5 w-1/2 rounded bg-[#DAD4C4]" />
                  <div className="h-3 w-1/3 rounded bg-[#E3EBDD]" />
                  <div className="h-3 w-3/4 rounded bg-[#E3EBDD]" />
                  <div className="h-3 w-2/3 rounded bg-[#E3EBDD]" />
                </div>
              </div>
            ))}
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
      <div className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-xl bg-red-50 p-6 text-center">
            <p className="font-medium text-red-500">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">

        {/* ================= HEADER ================= */}

        <div className="mb-14 text-center">
          <h4 className="mb-3 text-xs font-semibold tracking-[0.25em] text-[#6E7F5E]">
            — OUR PEOPLE
          </h4>

          <h1
            className="mb-5 text-3xl font-semibold text-[#2A2A24] sm:text-4xl lg:text-5xl"
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
            }}
          >
            Meet The Gateway Family
          </h1>

          <p className="mx-auto max-w-xl text-base leading-relaxed text-[#6B6A5F]">
            Meet the experienced professionals behind Gateway Treks.
          </p>
        </div>

        {/* ================= TEAM ================= */}

        {team.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-gray-500">
              No team members found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => {
              const imageUrl = member.image
                ? `${IMAGE_BASE_URL}${member.image}`
                : "/images/MOUNT.jpg";

              return (
                <div
                  key={member.id}
                  className="group overflow-hidden rounded-xl border border-[#DAD4C4] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#2F4732] hover:shadow-lg"
                >

                  {/* ================= IMAGE ================= */}

                  <div className="relative h-64 w-full overflow-hidden bg-[#DAD4C4]">
                    <img
                      src={imageUrl}
                      alt={member.name || "Team member"}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/images/MOUNT.jpg";
                      }}
                    />

                    <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/20" />
                  </div>

                  {/* ================= CONTENT ================= */}

                  <div className="p-7">

                    {/* NAME */}

                    <h2 className="mb-2 text-xl font-semibold text-[#2A2A24]">
                      {member.name || "Unnamed"}
                    </h2>

                    {/* POSITION */}

                    <div className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-[#6E7F5E]">
                      {member.position || "Team Member"}
                    </div>

                    {/* LINE */}

                    <span className="mb-5 block h-[2px] w-10 bg-[#2F4732]" />

                    {/* EMAIL */}

                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="mb-3 flex items-center gap-3 text-sm text-[#6B6A5F] transition-colors hover:text-[#2F4732]"
                      >
                        <Mail
                          size={17}
                          className="shrink-0 text-[#2F4732]"
                        />

                        <span className="truncate">
                          {member.email}
                        </span>
                      </a>
                    )}

                    {/* PHONE */}

                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="flex items-center gap-3 text-sm text-[#6B6A5F] transition-colors hover:text-[#2F4732]"
                      >
                        <Phone
                          size={17}
                          className="shrink-0 text-[#2F4732]"
                        />

                        <span>
                          {member.phone}
                        </span>
                      </a>
                    )}

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OurPeople;

