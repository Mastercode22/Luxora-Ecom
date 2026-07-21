import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiCheck, FiArrowRight } from "react-icons/fi";
import Container from "../ui/Container";
import Button from "../ui/Button";
const ease = [0.22, 1, 0.36, 1];
const PERKS = ["Early access to new product drops", "Exclusive member-only deals & discounts", "Weekly curated picks from top brands"];
export default function Newsletter() {
  
const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  return <section className="bg-surface" style={{
    paddingBottom: "clamp(64px, 8vw, 120px)"
  }}>
      <Container>
        <motion.div initial={{
        opacity: 0,
        y: 28
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true,
        margin: "-56px"
      }} transition={{
        duration: 0.72,
        ease
      }} className="relative overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_420px] items-center" style={{
        borderRadius: 36,
        padding: "clamp(40px, 5.5vw, 72px) clamp(28px, 5vw, 64px)",
        background: "linear-gradient(135deg, var(--color-surface) 0%, rgba(124,58,237,0.06) 60%, rgba(201,164,74,0.05) 100%)",
        gap: "clamp(32px, 5vw, 72px)"
      }}>
          {/* Decorative blobs */}
          <div className="absolute pointer-events-none" style={{
          right: -60,
          top: -60,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 65%)"
        }} />
          <div className="absolute pointer-events-none" style={{
          left: -40,
          bottom: -60,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,164,74,0.08) 0%, transparent 65%)"
        }} />

          {/* Shopping bag emoji — decorative */}
          <div className="absolute pointer-events-none select-none" style={{
          right: 36,
          bottom: 24,
          fontSize: 56,
          opacity: 0.10
        }}>{"auto__384"}</div>

          {/* ── Left: copy ── */}
          <div className="relative flex flex-col" style={{
          gap: 20
        }}>
            <span className="eyebrow">Join The List</span>
            <h2 className="font-sans font-bold text-ink" style={{
            fontSize: "clamp(24px, 3.4vw, 40px)",
            lineHeight: 1.1,
            letterSpacing: "-0.022em"
          }}>Stay Ahead Of T</h2>
            <p className="text-muted font-light" style={{
            fontSize: "clamp(13px, 1.5vw, 15px)",
            lineHeight: 1.84
          }}>Get Updates Abo</p>
            <ul className="flex flex-col" style={{
            gap: 10,
            marginTop: 4
          }}>
              {PERKS.map(p => <li key={p} className="flex items-center" style={{
              gap: 10,
              fontSize: 13,
              color: "rgba(26,26,26,0.68)"
            }}>
                  <span style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                flexShrink: 0,
                background: "rgba(124,58,237,0.10)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                    <FiCheck size={10} style={{
                  color: "var(--color-primary)"
                }} />
                  </span>
                  {p}
                </li>)}
            </ul>
          </div>

          {/* ── Right: form / success ── */}
          <div className="relative">
            {submitted ? <motion.div initial={{
            opacity: 0,
            scale: 0.92,
            y: 10
          }} animate={{
            opacity: 1,
            scale: 1,
            y: 0
          }} transition={{
            duration: 0.48,
            ease
          }} className="flex flex-col items-center text-center bg-surface" style={{
            borderRadius: 28,
            padding: "36px 28px",
            gap: 14,
            boxShadow: "0 12px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)"
          }}>
                <div style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "rgba(0,200,83,0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
                  <FiCheck size={24} style={{
                color: "#00C853"
              }} />
                </div>
                <p style={{
              fontWeight: 700,
              fontSize: 16,
              color: "var(--color-text-primary)"
            }}>Youre On The L</p>
                <p style={{
              fontSize: 13,
              color: "var(--color-text-muted)",
              lineHeight: 1.6
            }}>Welcome To Luxo</p>
              </motion.div> : <form onSubmit={e => {
            e.preventDefault();
            if (email) setSubmitted(true);
          }} className="flex flex-col" style={{
            gap: 10
          }}>
                <div className="flex items-center gap-3 bg-surface border border-white/70" style={{
              borderRadius: 16,
              padding: "14px 18px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)"
            }}>
                  <FiMail size={15} style={{
                color: "var(--color-text-muted)",
                flexShrink: 0
              }} />
                  <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
                  <input id="newsletter-email" type="email" required placeholder="Enter Your Emai" value={email} onChange={e => setEmail(e.target.value)} className="flex-1 bg-transparent focus:outline-none" style={{
                fontSize: 13.5,
                color: "var(--color-text-primary)"
              }} />
                </div>
                <Button variant="primary" type="submit" iconRight={FiArrowRight}>Subscribe Now</Button>
                <p className="text-center" style={{
              fontSize: 11,
              color: "rgba(26,26,26,0.42)",
              letterSpacing: "0.02em"
            }}>No Spam Unsubs</p>
              </form>}
          </div>
        </motion.div>
      </Container>
    </section>;
}