import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
export default function GlobalBackground() {
  
const {
    theme
  } = useTheme();
  return <div className="fixed inset-0 overflow-hidden pointer-events-none z-[20]" style={{
    mixBlendMode: theme === 'dark' ? 'screen' : 'multiply'
  }}>
      {/* Animated Glowing Orbs */}
      <motion.div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen" animate={{
      x: [0, 100, 0],
      y: [0, -50, 0],
      scale: [1, 1.1, 1]
    }} transition={{
      duration: 20,
      repeat: Infinity,
      ease: "easeInOut"
    }} style={{
      background: theme === 'dark' ? "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 60%)" : "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 60%)",
      filter: "blur(50px)"
    }} />
      <motion.div className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen" animate={{
      x: [0, -120, 0],
      y: [0, 80, 0],
      scale: [1, 1.15, 1]
    }} transition={{
      duration: 25,
      repeat: Infinity,
      ease: "easeInOut"
    }} style={{
      background: theme === 'dark' ? "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 65%)" : "radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 65%)",
      filter: "blur(60px)"
    }} />
      <motion.div className="absolute -bottom-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full mix-blend-screen" animate={{
      x: [0, 80, 0],
      y: [0, -100, 0],
      scale: [1, 1.2, 1]
    }} transition={{
      duration: 18,
      repeat: Infinity,
      ease: "easeInOut"
    }} style={{
      background: theme === 'dark' ? "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)" : "radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)",
      filter: "blur(40px)"
    }} />

      {/* Center Sneaker Watermark */}
      <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{
      opacity: theme === 'dark' ? 0.12 : 0.05,
      filter: theme === 'dark' ? 'drop-shadow(0 0 40px rgba(124,58,237,0.4))' : 'drop-shadow(0 0 40px rgba(0,0,0,0.15))'
    }} animate={{
      y: [-15, 15, -15],
      rotateZ: [-2, 2, -2]
    }} transition={{
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut"
    }}>
        <img src={`${import.meta.env.BASE_URL}sneaker.png`} alt="Sneaker Waterma" className="w-[85vw] max-w-[900px] object-contain" />
      </motion.div>

      {/* Abstract 3D Geometric Elements */}
      {Array.from({
      length: 12
    }).map((_, i) => {
      const isCircle = i % 2 === 0;
      const size = 6 + i * 1.5 % 15; // Distribute sizes between 6vw and 21vw
      const colors = ["rgba(124,58,237,",
      // Purple
      "rgba(236,72,153,",
      // Pink
      "rgba(59,130,246,",
      // Blue
      "rgba(16,185,129," // Emerald
      ];
      const color = colors[i % colors.length];
      const duration = 15 + i % 5 * 5; // Varying speeds
      const top = i * 27 % 90; // Spread vertically
      const left = i * 33 % 90; // Spread horizontally

      // Make borders more subtle since it overlays the whole app
      return <motion.div key={i} className={`absolute ${isCircle ? 'rounded-full' : 'rounded-[2rem]'} border`} style={{
        top: `${top}%`,
        left: `${left}%`,
        width: `${size}vw`,
        height: `${size}vw`,
        minWidth: size * 6,
        minHeight: size * 6,
        borderColor: theme === 'dark' ? `${color}0.3)` : `${color}0.2)`,
        background: theme === 'dark' ? `linear-gradient(135deg, ${color}0.08), transparent)` : `linear-gradient(135deg, ${color}0.04), transparent)`,
        boxShadow: theme === 'dark' ? `inset 0 0 30px ${color}0.1), 0 0 15px ${color}0.05)` : 'none'
      }} animate={{
        rotateX: [0, 360],
        rotateY: [0, 360],
        rotateZ: [0, 360],
        y: [0, i % 2 === 0 ? -60 : 60, 0]
      }} transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
        delay: -(i * 2)
      }} />;
    })}
    </div>;
}