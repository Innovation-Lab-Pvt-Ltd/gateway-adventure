import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const rowText = "font-montserrat text-[15px] text-[#0b2418]";

// Chevron that rotates when open
const Chevron = ({ open }) => (
  <svg
    viewBox="0 0 20 20"
    className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
      open ? "rotate-180" : ""
    }`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* One expandable section: Activity / Destinations
   header -> item names -> packages */
const Section = ({
  label,
  items,
  packagesByItem,
  itemRoute,
  packageRoute,
  status,
  onNavigate,
}) => {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="border-b border-gray-100">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`flex w-full items-center justify-between py-4 font-medium ${rowText}`}
      >
        {label}
        <Chevron open={open} />
      </button>

      {open && (
        <div className="pb-3 pl-3">
          {status === "loading" && (
            <p className="py-2 font-montserrat text-sm text-gray-400">Loading…</p>
          )}
          {status === "error" && (
            <p className="py-2 font-montserrat text-sm text-gray-500">
              Couldn&apos;t load {label.toLowerCase()}. Refresh to try again.
            </p>
          )}

          {status === "ready" &&
            items.map((item) => {
              const expanded = activeId === item.id;
              const packages = packagesByItem.get(item.id) || [];

              return (
                <div key={item.id}>
                  <div className="flex items-center justify-between">
                    <Link
                      to={`${itemRoute}/${item.slug}`}
                      onClick={onNavigate}
                      className={`flex-1 py-2.5 text-sm ${rowText} hover:text-pink-500`}
                    >
                      {item.name}
                    </Link>

                    {/* separate tap target so the name stays a link */}
                    <button
                      type="button"
                      onClick={() => setActiveId(expanded ? null : item.id)}
                      aria-expanded={expanded}
                      aria-label={`Show ${item.name} packages`}
                      className="flex h-10 w-10 items-center justify-center text-gray-500"
                    >
                      <Chevron open={expanded} />
                    </button>
                  </div>

                  {expanded && (
                    <div className="mb-2 ml-3 border-l-2 border-pink-200 pl-3">
                      {packages.map((pkg) => (
                        <Link
                          key={pkg.id}
                          to={`${packageRoute}/${pkg.slug}`}
                          onClick={onNavigate}
                          className="block py-2 font-montserrat text-[13px] text-[#0b2418] hover:text-pink-500"
                        >
                          {pkg.name}
                          {pkg.duration > 1 && (
                            <span className="ml-2 text-xs text-gray-400">
                              {pkg.duration} Days
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

const MobileMenu = ({
  open,
  onClose,
  menuData,
  activityRoute,
  destinationRoute,
  packageRoute,
}) => {
  // Lock page scroll behind the menu while it is open
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  const simpleLink = `block border-b border-gray-100 py-4 font-medium ${rowText} hover:text-pink-500`;

  return (
    <div className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-white px-6 pb-10 md:hidden">
      <Link to="/" onClick={onClose} className={simpleLink}>
        Home
      </Link>

      <Section
        label="Activity"
        items={menuData.activities}
        packagesByItem={menuData.byActivity}
        itemRoute={activityRoute}
        packageRoute={packageRoute}
        status={menuData.status}
        onNavigate={onClose}
      />

      <Section
        label="Destinations"
        items={menuData.destinations}
        packagesByItem={menuData.byDestination}
        itemRoute={destinationRoute}
        packageRoute={packageRoute}
        status={menuData.status}
        onNavigate={onClose}
      />

      <Link to="/AboutUs" onClick={onClose} className={simpleLink}>
        About Us
      </Link>

      <Link to="/Blogs" onClick={onClose} className={simpleLink}>
        Blogs
      </Link>

      <Link
        to="/ContactUs"
        onClick={onClose}
        className="mt-6 block bg-pink-500 py-3 text-center font-montserrat text-sm font-semibold text-white transition hover:bg-[#0b2418]"
      >
        Enquire Now
      </Link>
    </div>
  );
};

export default MobileMenu;