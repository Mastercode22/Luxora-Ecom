import { useState } from "react";

/**
 * Cloudinary-ready responsive image.
 * If `src` points at a Cloudinary delivery URL (res.cloudinary.com), this
 * component injects f_auto,q_auto (automatic format + quality) transforms.
 * For any other host it passes the URL through untouched, so the same
 * component works with the demo imagery used in this build.
 */
function withCloudinaryTransform(src, width) {
  if (!src) return src;
  if (src.includes("res.cloudinary.com") && src.includes("/upload/")) {
    const transform = `f_auto,q_auto,c_fill,w_${width}`;
    return src.replace("/upload/", `/upload/${transform}/`);
  }
  return src;
}

// Soft brand-toned SVG placeholder — shown only if the real photo 404s or
// times out, so a single dead hotlink never leaves a stuck gray/blank card.
const FALLBACK_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23FCE4EC'/%3E%3Cstop offset='100%25' stop-color='%23FFD1E6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='500' fill='url(%23g)'/%3E%3Cg transform='translate(200,250)' fill='none' stroke='%23E91E63' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round' opacity='0.55'%3E%3Crect x='-38' y='-14' width='76' height='58' rx='6'/%3E%3Cpath d='M-38 4 H38'/%3E%3Cpath d='M-8 -14 V44 M8 -14 V44'/%3E%3Cpath d='M-8 -14 C-8 -30 8 -30 8 -14'/%3E%3C/g%3E%3C/svg%3E";

export default function CloudinaryImage({
  src,
  alt,
  className = "",
  width = 900,
  aspect = "aspect-[4/5]",
  priority = false,
  objectFit = "object-cover",
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const finalSrc = errored ? FALLBACK_SRC : withCloudinaryTransform(src, width);

  return (
    <div className={`relative overflow-hidden ${aspect} ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 skeleton-shimmer animate-shimmer" aria-hidden="true" />
      )}
      <img
        src={finalSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!errored) {
            setErrored(true);
          }
          setLoaded(true);
        }}
        className={`h-full w-full ${objectFit} transition-all duration-700 ease-out ${
          loaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-md"
        }`}
      />
    </div>
  );
}
