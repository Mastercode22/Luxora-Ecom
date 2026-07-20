import {
  FiInstagram, FiFacebook, FiTwitter, FiYoutube, FiMapPin, FiPhone, FiMail, FiArrowRight,
} from "react-icons/fi";
import Container from "../ui/Container";

const LINKS = [
  {
    title: "Shop",
    links: ["Electronics", "Fashion", "Beauty", "Home & Living", "Sports", "Accessories", "New Arrivals", "Deals"],
  },
  {
    title: "Customer Service",
    links: ["Contact Us", "Shipping & Delivery", "Returns & Refunds", "Order Tracking", "FAQs"],
  },
  {
    title: "Company",
    links: ["About Luxora", "Careers", "Privacy Policy", "Terms of Service", "Press"],
  },
];

const SOCIAL = [
  { Icon: FiInstagram, label: "Instagram" },
  { Icon: FiFacebook,  label: "Facebook"  },
  { Icon: FiTwitter,   label: "X / Twitter" },
  { Icon: FiYoutube,   label: "YouTube" },
];

const PAYMENTS = ["💳 Visa", "💳 Mastercard", "🅿️ PayPal", "🍎 Apple Pay", "🤖 Google Pay"];

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-bg)", color: "var(--color-text-primary)", paddingTop: "clamp(60px, 8vw, 112px)", paddingBottom: 48 }}>
      <Container>
        {/* ── Top grid ── */}
        <div
          className="grid grid-cols-3 lg:grid-cols-[1.7fr_1fr_1fr_1fr_1.3fr] pb-14 border-b"
          style={{ gap: "clamp(36px, 4vw, 56px)", borderColor: "var(--color-border)" }}
        >
          {/* Brand column */}
          <div className="flex flex-col col-span-3 lg:col-span-1" style={{ gap: 20 }}>
            {/* Logotype */}
            <div className="flex items-end gap-2">
              <span className="font-serif italic text-ink" style={{ fontSize: 26, lineHeight: 1, letterSpacing: "-0.01em" }}>
                Luxora
              </span>
              <span style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-primary)", marginBottom: 2 }}>
                Market
              </span>
            </div>

            <p style={{ fontSize: 13, color: "var(--color-text-secondary)", fontWeight: 300, lineHeight: 1.82, maxWidth: 240 }}>
              Premium products. Exceptional quality. Seamless shopping. Your one-stop destination for the world's best brands.
            </p>

            {/* Contact */}
            <div className="flex flex-col" style={{ gap: 10 }}>
              {[
                { Icon: FiPhone,  text: "+233 50-655-23"        },
                { Icon: FiMail,   text: "support@luxoramarket.com"  },
              ].map(({ Icon, text }) => (
                <span key={text} className="flex items-center gap-2.5" style={{ fontSize: 12.5, color: "var(--color-text-muted)", fontWeight: 300 }}>
                  <Icon size={12} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
                  {text}
                </span>
              ))}
            </div>

            {/* Social */}
            <div className="flex items-center" style={{ gap: 8, marginTop: 4 }}>
              {SOCIAL.map(({ Icon, label }) => (
                <a key={label} href="/#" aria-label={label}
                  className="flex items-center justify-center transition-all duration-350 hover:-translate-y-1"
                  style={{
                    width: 38, height: 38, borderRadius: "50%",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-secondary)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-primary)"; e.currentTarget.style.border = "1px solid var(--color-primary)"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = ""; e.currentTarget.style.border = "1px solid var(--color-border)"; e.currentTarget.style.color = "var(--color-text-secondary)"; }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {LINKS.map((col) => (
            <div key={col.title} className="flex flex-col" style={{ gap: 14 }}>
              <p style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
                {col.title}
              </p>
              <div className="flex flex-col" style={{ gap: 9 }}>
                {col.links.map((l) => (
                  <a key={l} href="/#"
                    style={{ fontSize: 12.5, color: "var(--color-text-secondary)", fontWeight: 300, textDecoration: "none", display: "inline-block", transition: "color 240ms ease, transform 240ms ease" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-text-primary)"; e.currentTarget.style.transform = "translateX(3px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-text-secondary)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                    {l}
                  </a>
                ))}
              </div>
            </div>
          ))}

          {/* Email signup */}
          <div className="flex flex-col col-span-3 lg:col-span-1" style={{ gap: 16 }}>
            <p style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
              Stay Updated
            </p>
            <p style={{ fontSize: 12.5, color: "var(--color-text-secondary)", fontWeight: 300, lineHeight: 1.72 }}>
              Get updates about new products and exclusive offers from top brands.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col" style={{ gap: 8 }}>
              <div className="flex items-center gap-2.5"
                style={{ borderRadius: 14, background: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "12px 16px",
                  transition: "border-color 250ms ease" }}
                onFocusCapture={(e) => { e.currentTarget.style.borderColor = "var(--color-primary)"; }}
                onBlurCapture={(e)  => { e.currentTarget.style.borderColor = "var(--color-border)"; }}
              >
                <FiMail size={13} style={{ color: "var(--color-text-muted)", flexShrink: 0 }} />
                <input type="email" required placeholder="Email address" aria-label="Email address"
                  className="flex-1 min-w-0 bg-transparent focus:outline-none"
                  style={{ fontSize: 12.5, color: "var(--color-text-primary)" }} />
              </div>
              <button type="submit"
                className="flex items-center justify-center gap-2 transition-all duration-350 hover:-translate-y-0.5"
                style={{ borderRadius: 14, background: "var(--color-primary)", color: "#fff", border: "none", cursor: "pointer",
                  padding: "12px 0", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                  boxShadow: "0 8px 24px -8px rgba(124,58,237,0.40)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-primary-dark)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--color-primary)"; }}
              >
                Subscribe <FiArrowRight size={12} />
              </button>
            </form>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8" style={{ gap: 16 }}>
          <p style={{ fontSize: 11.5, color: "var(--color-text-muted)", fontWeight: 300 }}>
            © {new Date().getFullYear()} Luxora Market. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center" style={{ gap: 8 }}>
            {PAYMENTS.map((m) => (
              <span key={m} style={{
                fontSize: 10.5, color: "var(--color-text-muted)", fontWeight: 500,
                padding: "5px 10px", borderRadius: 8, border: "1px solid var(--color-border)",
              }}>
                {m}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
