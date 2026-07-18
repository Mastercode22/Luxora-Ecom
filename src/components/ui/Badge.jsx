export default function Badge({ children, tone = "primary" }) {
  const tones = {
    primary: "bg-primary text-white",
    light: "bg-surface/95 text-primary border border-primary/20",
    dark: "bg-ink text-white",
    success: "bg-success text-white",
    accent: "bg-accent text-primary",
  };

  return (
    <span
      className={`inline-flex items-center rounded-pill px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${tones[tone]}`}
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.10)" }}
    >
      {children}
    </span>
  );
}
