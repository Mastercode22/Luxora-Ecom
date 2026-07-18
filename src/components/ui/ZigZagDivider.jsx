import { useEffect, useRef, useState, useId } from "react";

/**
 * WaveDivider
 *
 * Renders a shallow, ultra-sleek layout divider with an elegant, centered U-shaped dip.
 * Features a precise gradient border glow that melts beautifully into the
 * lower section's background across both Light and Dark modes.
 *
 * Props:
 *  upperColor – CSS value for the section ABOVE (e.g. "var(--color-surface)")
 *  lowerColor – CSS value for the section BELOW (e.g. "var(--color-section)")
 */
export default function WaveDivider({
  upperColor = "var(--color-surface)",
  lowerColor = "var(--color-section)",
}) {
  const wrapperRef = useRef(null);
  const uniqueId = useId();

  const [upper, setUpper] = useState(upperColor);
  const [lower, setLower] = useState(lowerColor);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    function resolve() {
      if (!wrapperRef.current) return;
      const style = getComputedStyle(wrapperRef.current);
      const dark = document.documentElement.classList.contains("dark");

      const resolveVar = (val) => {
        const m = val && val.match(/^var\((--[^)]+)\)$/);
        if (m) return style.getPropertyValue(m[1]).trim() || val;
        return val;
      };

      setUpper(resolveVar(upperColor));
      setLower(resolveVar(lowerColor));
      setIsDark(dark);
    }

    resolve();

    const observer = new MutationObserver(resolve);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [upperColor, lowerColor]);

  // ── SVG Center-Dip Geometry (Optimized for shallow depth) ─────────────────
  const W = 1440;
  const H = 40; // Reduced canvas height for a cleaner profile
  const midX = W / 2;
  const dipWidth = 240; // Balanced width matching the shallower slope
  const sx = midX - dipWidth / 2;
  const ex = midX + dipWidth / 2;
  const dipDepth = H * 0.85; // Proportional depth calculation for a perfect curve

  // The main path boundary for the lower block section
  const d = [
    `M0,0`,
    `L${sx},0`,
    `C${sx + dipWidth * 0.35},0 ${sx + dipWidth * 0.25},${dipDepth} ${midX},${dipDepth}`,
    `C${ex - dipWidth * 0.25},${dipDepth} ${ex - dipWidth * 0.35},0 ${ex},0`,
    `L${W},0`,
    `L${W},${H}`,
    `L0,${H}`,
    `Z`,
  ].join(" ");

  // ── Color Theme Tokens ────────────────────────────────────────────────────
  const goldLight = "#0a0a0a"; 
  const goldDark = "#ffffff"; 
  const gold = isDark ? goldDark : goldLight;

  const gradId = `wave-gradient-${uniqueId}`;
  const filterId = `wave-glow-${uniqueId}`;

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      style={{
        display: "block",
        lineHeight: 0,
        fontSize: 0,
        overflow: "visible",
        position: "relative",
        zIndex: 10,
        background: upper, // Seamless blending with the preceding section
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: "block",
          width: "100%",
          height: "clamp(20px, 3.5vw, 44px)", 
          overflow: "visible",
        }}
      >
        <defs>
          {}
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={gold}
              stopOpacity={isDark ? "1" : "0.85"}
            />
            <stop
              offset="25%"
              stopColor={gold}
              stopOpacity={isDark ? "1.35" : "0.15"}
            />
            <stop offset="65%" stopColor={lower} stopOpacity="1" />
          </linearGradient>

          {/* Precision Shadow & Glow Engine */}
          <filter id={filterId} x="-10%" y="-50%" width="120%" height="200%">
            <feDropShadow
              dx="0"
              dy={isDark ? "-3" : "-1.5"}
              stdDeviation={isDark ? "6" : "3"}
              floodColor={gold}
              floodOpacity={isDark ? "0.4" : "0.12"}
            />
          </filter>
        </defs>

        {/* Dynamic lower block shape with embedded border glow */}
        <path d={d} fill={`url(#${gradId})`} filter={`url(#${filterId})`} />
      </svg>
    </div>
  );
}
