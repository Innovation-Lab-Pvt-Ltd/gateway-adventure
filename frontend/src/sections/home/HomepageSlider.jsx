import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDE_INTERVAL = 5000; // ms between slides
const TRANSITION_MS = 2500; // fade + zoom duration

const HomepageSlider = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const API_URL = `${import.meta.env.VITE_BASE_API_URL}homepage-sliders`;
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

  // =====================================================
  // FETCH SLIDES
  // =====================================================

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch slider");
        }

        const data = await response.json();

        const activeSlides = (data.slider || [])
          .filter((slide) => Number(slide.is_active) === 1)
          .sort((a, b) => Number(a.display_order) - Number(b.display_order));

        setSlides(activeSlides);
      } catch (error) {
        console.error("Slider error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, [API_URL]);

  // =====================================================
  // AUTO CHANGE SLIDE EVERY 4 SECONDS
  // Restarts whenever the slide changes (including manual
  // clicks), so the timer never fires right after a click.
  // =====================================================

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setTimeout(() => {
      setCurrentSlide((current) =>
        current === slides.length - 1 ? 0 : current + 1,
      );
    }, SLIDE_INTERVAL);

    return () => clearTimeout(timer);
  }, [currentSlide, slides.length]);

  // =====================================================
  // PREVIOUS / NEXT
  // =====================================================

  const previousSlide = () => {
    setCurrentSlide((current) =>
      current === 0 ? slides.length - 1 : current - 1,
    );
  };

  const nextSlide = () => {
    setCurrentSlide((current) =>
      current === slides.length - 1 ? 0 : current + 1,
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#2F6B4F]" />
      </div>
    );
  }

  // =====================================================
  // NO SLIDES
  // =====================================================

  if (slides.length === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">No slider data found.</p>
      </div>
    );
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Keyframes for the progress bar */}
      <style>{`
        @keyframes sliderProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>

      {/* =================================================
          SLIDER IMAGES (fade + gentle zoom-out)
      ================================================= */}

      {slides.map((slide, index) => (
        <img
          key={slide.id}
          src={`${IMAGE_BASE_URL}${slide.image}`}
          alt="Nepal"
          style={{ transitionDuration: `${TRANSITION_MS}ms` }}
          className={`
            absolute inset-0 h-full w-full object-cover
            transition-all ease-out
            ${
              index === currentSlide
                ? "z-10 scale-100 opacity-100"
                : "z-0 scale-110 opacity-0"
            }
          `}
        />
      ))}

      {/* =================================================
          PREVIOUS BUTTON
      ================================================= */}

      {slides.length > 1 && (
        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous slide"
          className="absolute left-5 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition hover:bg-black/50"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {/* =================================================
          NEXT BUTTON
      ================================================= */}

      {slides.length > 1 && (
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-5 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition hover:bg-black/50"
        >
          <ChevronRight size={28} />
        </button>
      )}

      {/* =================================================
          DOTS
      ================================================= */}

      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-white" : "w-2.5 bg-white/60"
              }`}
            />
          ))}
        </div>
      )}

      {/* =================================================
          PROGRESS BAR (restarts on every slide change)
      ================================================= */}

      {slides.length > 1 && (
        <div className="absolute bottom-0 left-0 z-30 h-1 w-full bg-white/20">
          <div
            key={currentSlide}
            className="h-full bg-white"
            style={{
              animation: `sliderProgress ${SLIDE_INTERVAL}ms linear forwards`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default HomepageSlider;
