import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HomepageSlider = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  const API_URL = "/api/v1/homepage-sliders";
  const IMAGE_BASE_URL =
    "https://gatewaytreks.com/public/uploads/frontend/full/";

  // Fetch slides
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
          .sort(
            (a, b) =>
              Number(a.display_order) - Number(b.display_order)
          );

        setSlides(activeSlides);
      } catch (error) {
        console.error("Slider error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  // Auto change every 1 hour
  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((current) =>
        current === slides.length - 1 ? 0 : current + 1
      );
    }, 60 * 60 * 1000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // Previous slide
  const previousSlide = () => {
    setCurrentSlide((current) =>
      current === 0 ? slides.length - 1 : current - 1
    );
  };

  // Next slide
  const nextSlide = () => {
    setCurrentSlide((current) =>
      current === slides.length - 1 ? 0 : current + 1
    );
  };

  // Loading
  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#2F6B4F]" />
      </div>
    );
  }

  // No slides
  if (slides.length === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">No slider data found.</p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Images */}
      {slides.map((slide, index) => (
        <img
          key={slide.id}
          src={`${IMAGE_BASE_URL}${slide.image}`}
          alt="Nepal"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            index === currentSlide
              ? "z-10 opacity-100"
              : "z-0 opacity-0"
          }`}
        />
      ))}

      {/* Previous button */}
      {slides.length > 1 && (
        <button
          type="button"
          onClick={previousSlide}
          className="absolute left-5 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition hover:bg-black/50"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {/* Next button */}
      {slides.length > 1 && (
        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-5 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition hover:bg-black/50"
        >
          <ChevronRight size={28} />
        </button>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomepageSlider;