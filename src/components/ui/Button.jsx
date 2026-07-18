import { useRef } from "react";

const variants = {
  primary: "btn-primary",
  outline: "btn-secondary",
  light:   "btn-light",
};

/**
 * Premium Button with physics-based ripple effect
 *
 * Props:
 *   variant   – "primary" | "outline" | "light"
 *   icon      – any react-icon component (renders before label)
 *   iconRight – any react-icon component (renders after label)
 *   type      – html button type
 */
export default function Button({
  children,
  variant   = "primary",
  onClick,
  className = "",
  type      = "button",
  icon:      Icon,
  iconRight: IconRight,
  disabled,
  ...rest
}) {
  const btnRef   = useRef(null);
  const rippleRef = useRef(null);

  const handleClick = (e) => {
    if (disabled) return;

    /* Ripple */
    const btn  = btnRef.current;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2.2;
    const x    = e.clientX - rect.left - size / 2;
    const y    = e.clientY - rect.top  - size / 2;

    const el   = document.createElement("span");
    el.style.cssText = `
      position: absolute;
      border-radius: 50%;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255,255,255,0.28);
      pointer-events: none;
      transform: scale(0);
      animation: rippleOut 580ms cubic-bezier(0.22,1,0.36,1) forwards;
    `;
    btn.appendChild(el);
    setTimeout(() => el.remove(), 620);

    onClick?.(e);
  };

  return (
    <>
      <style>{`
        @keyframes rippleOut {
          to { transform: scale(1); opacity: 0; }
        }
      `}</style>
      <button
        ref={btnRef}
        type={type}
        onClick={handleClick}
        disabled={disabled}
        aria-disabled={disabled}
        className={`${variants[variant] ?? ""} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        {...rest}
      >
        {Icon      && <Icon      size={14} aria-hidden="true" style={{ flexShrink: 0 }} />}
        <span className="relative z-10">{children}</span>
        {IconRight && <IconRight size={14} aria-hidden="true" style={{ flexShrink: 0 }} />}
      </button>
    </>
  );
}
