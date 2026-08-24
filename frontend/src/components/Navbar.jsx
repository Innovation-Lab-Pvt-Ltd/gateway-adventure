import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Check if we are on PackageDetail page
  const isPackageDetail = location.pathname.startsWith("/packages/");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Navbar should be solid on PackageDetail
  // OR when user has scrolled
  const navbarSolid = isPackageDetail || scrolled;

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        navbarSolid
          ? "bg-white shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold ${
              navbarSolid
                ? "bg-[#0b2418] text-[#9be564]"
                : "bg-[#9be564] text-[#0b2418]"
            }`}
          >
            G
          </div>

          <div>
            <h1
              className={`text-xl font-bold leading-none ${
                navbarSolid
                  ? "text-[#0b2418]"
                  : "text-white"
              }`}
            >
              GatewayAdventure
            </h1>

            <p
              className={`mt-1 text-[9px] uppercase tracking-[0.2em] ${
                navbarSolid
                  ? "text-[#4f8f3a]"
                  : "text-white/70"
              }`}
            >
              Explore Nepal
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div
          className={`hidden items-center gap-1 rounded-full px-2 py-2 md:flex ${
            navbarSolid
              ? "bg-gray-100"
              : "bg-black/10 backdrop-blur-sm"
          }`}
        >
          {/* Home */}
          <a
            href="/"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              navbarSolid
                ? "text-[#0b2418] hover:bg-white hover:text-[#4f8f3a]"
                : "text-white hover:bg-white/20"
            }`}
          >
            Home
          </a>

          {/* Trekking */}
          <a
            href="#trekking"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              navbarSolid
                ? "text-[#0b2418] hover:bg-white hover:text-[#4f8f3a]"
                : "text-white hover:bg-white/20"
            }`}
          >
            Trekking
          </a>

          {/* Tours */}
          <a
            href="#tours"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              navbarSolid
                ? "text-[#0b2418] hover:bg-white hover:text-[#4f8f3a]"
                : "text-white hover:bg-white/20"
            }`}
          >
            Tours
          </a>

          {/* Destinations */}
          <a
            href="#destinations"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              navbarSolid
                ? "text-[#0b2418] hover:bg-white hover:text-[#4f8f3a]"
                : "text-white hover:bg-white/20"
            }`}
          >
            Destinations
          </a>

          {/* About Us */}
          <a
            href="/Aboutus"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              navbarSolid
                ? "text-[#0b2418] hover:bg-white hover:text-[#4f8f3a]"
                : "text-white hover:bg-white/20"
            }`}
          >
            About Us
          </a>

          {/* Blogs */}
          <a
            href="/Blogs"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              navbarSolid
                ? "text-[#0b2418] hover:bg-white hover:text-[#4f8f3a]"
                : "text-white hover:bg-white/20"
            }`}
          >
            Blogs
          </a>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className={`hidden rounded-full px-5 py-2.5 text-sm font-semibold transition sm:block ${
              navbarSolid
                ? "bg-[#0b2418] text-[#9be564] hover:bg-[#4f8f3a] hover:text-white"
                : "bg-[#9be564] text-[#0b2418] hover:bg-[#b5f27d]"
            }`}
          >
            Contact Us
          </a>

          {/* Mobile Button */}
          <button
            className={`flex h-10 w-10 items-center justify-center rounded-full md:hidden ${
              navbarSolid
                ? "bg-gray-100 text-[#0b2418]"
                : "bg-black/20 text-white"
            }`}
          >
            ☰
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;