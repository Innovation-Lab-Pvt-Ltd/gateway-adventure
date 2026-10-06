import { useEffect, useRef, useState } from "react";

/**
 * Fades + slides its children in once, when they scroll into view.
 *
 * <Reveal as="section" id="tours" delay={100}>...</Reveal>
 *
 * - Runs once per element (no re-animating when scrolling back up).
 * - Skipped entirely if the visitor prefers reduced motion.
 * - After the animation ends, all transform classes are removed so
 *   nothing inside is affected (sticky / fixed children keep working).
 */
const Reveal = ({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
  ...rest
}) => {
  const ref = useRef(null);
  const [state, setState] = useState("hidden"); // hidden -> shown -> done

  useEffect(() => {
    const el = ref.current;
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!el || reduceMotion || !("IntersectionObserver" in window)) {
      setState("done");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const motion =
    state === "hidden"
      ? "opacity-0 translate-y-10"
      : state === "shown"
      ? "opacity-100 translate-y-0"
      : "";

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: state === "shown" ? `${delay}ms` : "0ms" }}
      onTransitionEnd={(e) => {
        if (
          e.target === e.currentTarget &&
          e.propertyName === "opacity" &&
          state === "shown"
        ) {
          setState("done");
        }
      }}
      className={`${
        state !== "done"
          ? "transition duration-700 ease-out will-change-transform"
          : ""
      } ${motion} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;