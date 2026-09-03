import React, { useEffect, useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";

const API_URL = "/api/v1/faqs";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH FAQS
  // =====================================================

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch FAQs");
        }

        const data = await response.json();

        console.log("FAQ API Response:", data);

        // API response structure:
        // {
        //   FAQ: [...]
        // }

        setFaqs(data?.FAQ || []);
      } catch (err) {
        console.error("FAQ ERROR:", err);
        setError("Unable to load FAQs.");
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  // =====================================================
  // TOGGLE FAQ
  // =====================================================

  const toggleFAQ = (index) => {
    setOpenIndex(
      openIndex === index ? null : index
    );
  };

  return (
    <section className="w-full bg-white py-16">

      <div className="mx-auto max-w-4xl px-4">

        {/* =================================================
            HEADER
            ================================================= */}

        <div className="mb-10 text-center">

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#2F6B4F]">
            FAQ
          </p>

          <h2 className="text-3xl font-bold text-[#0b2418] sm:text-4xl">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Find answers to the most common questions
            about our trekking and adventure experiences.
          </p>

        </div>

        {/* =================================================
            LOADING
            ================================================= */}

        {loading && (
          <div className="flex items-center justify-center py-10">

            <Loader2
              size={28}
              className="animate-spin text-[#2F6B4F]"
            />

          </div>
        )}

        {/* =================================================
            ERROR
            ================================================= */}

        {!loading && error && (
          <div className="rounded-2xl bg-red-50 p-5 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        {/* =================================================
            NO FAQ
            ================================================= */}

        {!loading &&
          !error &&
          faqs.length === 0 && (
            <div className="rounded-2xl bg-gray-50 p-5 text-center text-sm text-gray-500">
              No FAQs available.
            </div>
          )}

        {/* =================================================
            FAQ LIST
            ================================================= */}

        {!loading &&
          !error &&
          faqs.length > 0 && (
            <div className="space-y-3">

              {faqs.map((faq, index) => {

                const isOpen = openIndex === index;

                return (
                  <div
                    key={faq.id || index}
                    className={`
                      overflow-hidden
                      rounded-2xl
                      border
                      transition-all
                      duration-300
                      ${
                        isOpen
                          ? "border-[#2F6B4F]/30 shadow-md"
                          : "border-gray-200"
                      }
                    `}
                  >

                    {/* =================================================
                        QUESTION
                        ================================================= */}

                    <button
                      type="button"
                      onClick={() =>
                        toggleFAQ(index)
                      }
                      className="
                        flex
                        w-full
                        items-center
                        justify-between
                        gap-4
                        px-5
                        py-5
                        text-left
                        transition
                        hover:bg-gray-50
                      "
                    >

                      <span
                        className={`
                          text-sm
                          font-semibold
                          leading-6
                          sm:text-base
                          ${
                            isOpen
                              ? "text-[#2F6B4F]"
                              : "text-[#0b2418]"
                          }
                        `}
                      >
                        {faq.question}
                      </span>

                      <ChevronDown
                        size={20}
                        className={`
                          shrink-0
                          transition-transform
                          duration-300
                          ${
                            isOpen
                              ? "rotate-180 text-[#2F6B4F]"
                              : "text-gray-400"
                          }
                        `}
                      />

                    </button>

                    {/* =================================================
                        ANSWER
                        ================================================= */}

                    {isOpen && (
                      <div className="border-t border-gray-100 px-5 pb-5 pt-4">

                        <div
                          className="
                            text-sm
                            leading-7
                            text-gray-600
                            [&_a]:font-medium
                            [&_a]:text-[#2F6B4F]
                            [&_a]:underline
                            [&_b]:font-semibold
                            [&_strong]:font-semibold
                            [&_ul]:ml-5
                            [&_ul]:list-disc
                            [&_ol]:ml-5
                            [&_ol]:list-decimal
                          "
                          dangerouslySetInnerHTML={{
                            __html: faq.answer,
                          }}
                        />

                      </div>
                    )}

                  </div>
                );
              })}

            </div>
          )}

      </div>

    </section>
  );
};

export default FAQ;