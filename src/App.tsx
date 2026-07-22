import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { FaDiscord, FaBook, FaCalendarAlt, FaBullhorn, FaShieldAlt } from "react-icons/fa";
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";
import type { Variants } from "framer-motion";

/* ---------------- ANIMATION VARIANTS ---------------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ---------------- SCROLL FOCUS CONTAINER ---------------- */

function ScrollFocusSection({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0.25, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-15% 0px -15% 0px", amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        transform: "translate3d(0,0,0)",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- FLOATING BOTANICAL LEAVES & SPORES ---------------- */

function BotanicalAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Drifting Leaves */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`leaf-${i}`}
          className="absolute text-[#2F4832]/25 text-xl"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
          }}
          animate={{
            y: [-30, 40, -30],
            x: [-20, 20, -20],
            rotate: [-15, 20, -15],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ❦
        </motion.div>
      ))}

      {/* Floating Soft Green Spores */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`spore-${i}`}
          className="absolute w-2 h-2 rounded-full bg-[#8FA885]/40 blur-[1px]"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
            opacity: 0.2,
          }}
          animate={{
            y: [-25, 25, -25],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ---------------- COOL MIST GLOW ---------------- */

function CoolGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate(${e.clientX - 120}px, ${e.clientY - 120}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 w-[280px] h-[280px] rounded-full bg-[#C2D6BC]/35 blur-3xl z-0 transition-transform duration-150 ease-out"
    />
  );
}

/* ---------------- NATURAL EXTRA-LONG INDEPENDENT DENSE VINES ---------------- */

function OrganicHangingVines() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Map scroll speed/direction to inertia rotation
  const rawScrollAngleLeft = useTransform(scrollVelocity, [-2000, 2000], [15, -15]);
  const rawScrollAngleRight = useTransform(scrollVelocity, [-2000, 2000], [-15, 15]);

  // Spring physics for natural weight, bounce, and gravity damping
  const springLeft = useSpring(rawScrollAngleLeft, { stiffness: 18, damping: 8, mass: 1.2 });
  const springRight = useSpring(rawScrollAngleRight, { stiffness: 18, damping: 8, mass: 1.2 });

  return (
    <div className="pointer-events-none absolute top-full inset-x-0 h-[750px] z-10 overflow-visible">
      
      {/* ================= BACKGROUND DENSE LAYER (SAGE GREEN) ================= */}

      {/* Far Left Background - Deep Anchor */}
      <motion.div
        style={{ rotate: springLeft, transformOrigin: "top left" }}
        animate={{ rotate: [0, 2, -1.5, 0], skewX: [0, 1, -1, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 -left-6 w-[280px] h-[550px] opacity-40"
      >
        <svg className="w-full h-full" viewBox="0 0 280 550" fill="none">
          <path d="M 0 0 C 40 120, -10 260, 50 420 C 70 480, 30 520, 45 545" stroke="#2F4832" strokeWidth="4" strokeLinecap="round" />
          <g fill="#2F4832">
            <path d="M 10 30 Q 30 15 20 40 Q 0 35 10 30 Z" />
            <path d="M 25 110 Q 50 95 35 125 Q 10 120 25 110 Z" />
            <path d="M 15 220 Q 45 205 30 235 Q 5 230 15 220 Z" />
            <path d="M 40 330 Q 65 315 50 345 Q 25 340 40 330 Z" />
            <path d="M 30 450 Q 55 435 40 465 Q 15 460 30 450 Z" />
          </g>
        </svg>
      </motion.div>

      {/* Mid-Left Background Canopy */}
      <motion.div
        style={{ rotate: springLeft, transformOrigin: "top center" }}
        animate={{ rotate: [0, -1.8, 2, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-0 left-[22%] w-[260px] h-[480px] opacity-35 hidden sm:block"
      >
        <svg className="w-full h-full" viewBox="0 0 260 480" fill="none">
          <path d="M 130 0 C 180 90, 100 210, 150 350 C 170 410, 130 450, 140 475" stroke="#2F4832" strokeWidth="3" strokeLinecap="round" />
          <g fill="#2F4832">
            <path d="M 140 60 Q 165 45 150 75 Q 125 70 140 60 Z" />
            <path d="M 120 180 Q 145 165 130 195 Q 105 190 120 180 Z" />
            <path d="M 145 300 Q 170 285 155 315 Q 130 310 145 300 Z" />
            <path d="M 135 410 Q 160 395 145 425 Q 120 420 135 410 Z" />
          </g>
        </svg>
      </motion.div>

      {/* Mid-Right Background Canopy */}
      <motion.div
        style={{ rotate: springRight, transformOrigin: "top center" }}
        animate={{ rotate: [0, 2.2, -1.5, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-0 right-[22%] w-[260px] h-[500px] opacity-35 hidden sm:block"
      >
        <svg className="w-full h-full" viewBox="0 0 260 500" fill="none">
          <path d="M 130 0 C 80 100, 160 220, 110 370 C 90 430, 120 470, 115 495" stroke="#2F4832" strokeWidth="3" strokeLinecap="round" />
          <g fill="#2F4832">
            <path d="M 115 70 Q 90 55 105 85 Q 130 80 115 70 Z" />
            <path d="M 135 190 Q 110 175 125 205 Q 150 200 135 190 Z" />
            <path d="M 110 310 Q 85 295 100 325 Q 125 320 110 310 Z" />
            <path d="M 120 420 Q 95 405 110 435 Q 135 430 120 420 Z" />
          </g>
        </svg>
      </motion.div>

      {/* Far Right Background Anchor */}
      <motion.div
        style={{ rotate: springRight, transformOrigin: "top right" }}
        animate={{ rotate: [0, -2, 1.8, 0], skewX: [0, -1, 1, 0] }}
        transition={{ duration: 10.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute top-0 -right-6 w-[280px] h-[580px] opacity-40"
      >
        <svg className="w-full h-full transform scale-x-[-1]" viewBox="0 0 280 580" fill="none">
          <path d="M 0 0 C 40 130, -10 280, 50 440 C 70 500, 30 540, 45 570" stroke="#2F4832" strokeWidth="4" strokeLinecap="round" />
          <g fill="#2F4832">
            <path d="M 10 30 Q 30 15 20 40 Q 0 35 10 30 Z" />
            <path d="M 25 120 Q 50 105 35 135 Q 10 130 25 120 Z" />
            <path d="M 15 240 Q 45 225 30 255 Q 5 250 15 240 Z" />
            <path d="M 40 360 Q 65 345 50 375 Q 25 370 40 360 Z" />
            <path d="M 30 480 Q 55 465 40 495 Q 15 490 30 480 Z" />
          </g>
        </svg>
      </motion.div>


      {/* ================= FOREGROUND DENSE LAYER (DARK EVERGREEN) ================= */}

      {/* 1. OUTER LEFT STRAND (EXTRA LONG HEAVY CORNER) */}
      <motion.div
        style={{ rotate: springLeft, transformOrigin: "30px 0px" }}
        animate={{ rotate: [0, 3, -2, 0], skewX: [0, 1.2, -1.2, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-[300px] h-[720px] opacity-95"
      >
        <svg className="w-full h-full" viewBox="0 0 300 720" fill="none">
          <path d="M 0 0 C 70 120, 10 260, 85 430 C 115 510, 65 620, 100 710" stroke="#1C2E20" strokeWidth="3" strokeLinecap="round" />
          <path d="M 0 0 C 30 150, 10 310, 40 480 C 55 560, 30 630, 45 700" stroke="#1C2E20" strokeWidth="1.8" strokeLinecap="round" />
          <g fill="#1C2E20">
            <path d="M 18 25 Q 42 15 28 42 Q 5 38 18 25 Z" />
            <path d="M 35 110 Q 65 100 48 130 Q 22 125 35 110 Z" />
            <path d="M 52 170 Q 82 165 65 195 Q 38 190 52 170 Z" />
            <path d="M 32 260 Q 60 250 45 280 Q 20 275 32 260 Z" />
            <path d="M 72 340 Q 100 330 82 362 Q 55 358 72 340 Z" />
            <path d="M 92 420 Q 120 410 102 442 Q 75 438 92 420 Z" />
            <path d="M 68 500 Q 95 490 78 522 Q 52 518 68 500 Z" />
            <path d="M 88 590 Q 112 580 98 610 Q 72 605 88 590 Z" />
            <path d="M 95 670 Q 115 665 105 688 Q 88 685 95 670 Z" />
          </g>
          {/* Blossoms */}
          <g transform="translate(85, 360)">
            <circle cx="0" cy="0" r="6" fill="#FBF0F2" />
            <circle cx="-4" cy="-3" r="4" fill="#F3D5DB" />
            <circle cx="4" cy="-3" r="4" fill="#F3D5DB" />
            <circle cx="-5" cy="2" r="4" fill="#F3D5DB" />
            <circle cx="5" cy="2" r="4" fill="#F3D5DB" />
            <circle cx="0" cy="0" r="2.5" fill="#D2A478" />
          </g>
          <g transform="translate(100, 530)">
            <circle cx="0" cy="0" r="6" fill="#FBF0F2" />
            <circle cx="-4" cy="-3" r="4" fill="#E8BCC6" />
            <circle cx="4" cy="-3" r="4" fill="#E8BCC6" />
            <circle cx="0" cy="0" r="2.5" fill="#D2A478" />
          </g>
        </svg>
      </motion.div>

      {/* 2. INNER LEFT STRAND (MID-LENGTH LEAFY) */}
      <motion.div
        style={{ rotate: springLeft, transformOrigin: "center top" }}
        animate={{ rotate: [0, -2.5, 3, 0], skewX: [0, -1, 1, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        className="absolute top-0 left-[12%] w-[220px] h-[520px] opacity-90 hidden sm:block"
      >
        <svg className="w-full h-full" viewBox="0 0 220 520" fill="none">
          <path d="M 110 0 C 160 80, 80 200, 130 360 C 150 430, 110 480, 125 510" stroke="#1C2E20" strokeWidth="2.4" strokeLinecap="round" />
          <g fill="#1C2E20">
            <path d="M 118 45 Q 142 35 128 62 Q 105 58 118 45 Z" />
            <path d="M 98 135 Q 122 125 108 152 Q 85 148 98 135 Z" />
            <path d="M 132 230 Q 158 220 142 250 Q 118 245 132 230 Z" />
            <path d="M 112 320 Q 138 310 122 340 Q 98 335 112 320 Z" />
            <path d="M 138 410 Q 160 400 148 428 Q 125 425 138 410 Z" />
            <path d="M 120 480 Q 138 472 128 495 Q 110 492 120 480 Z" />
          </g>
        </svg>
      </motion.div>

      {/* 3. CENTER-LEFT STRAND (DELICATE SHORT BLOOM) */}
      <motion.div
        style={{ rotate: springLeft, transformOrigin: "center top" }}
        animate={{ rotate: [0, 2, -2, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute top-0 left-[28%] w-[180px] h-[380px] opacity-85 hidden md:block"
      >
        <svg className="w-full h-full" viewBox="0 0 180 380" fill="none">
          <path d="M 90 0 C 120 70, 60 160, 100 270 C 115 320, 90 355, 98 375" stroke="#1C2E20" strokeWidth="2" strokeLinecap="round" />
          <g fill="#1C2E20">
            <path d="M 98 40 Q 120 30 108 55 Q 88 52 98 40 Z" />
            <path d="M 78 120 Q 100 110 88 135 Q 68 132 78 120 Z" />
            <path d="M 102 200 Q 125 190 112 218 Q 90 215 102 200 Z" />
            <path d="M 92 290 Q 112 282 102 305 Q 82 302 92 290 Z" />
          </g>
          <g transform="translate(100, 270)">
            <circle cx="0" cy="0" r="5" fill="#FBF0F2" />
            <circle cx="-3" cy="-3" r="3.5" fill="#F3D5DB" />
            <circle cx="3" cy="-3" r="3.5" fill="#F3D5DB" />
            <circle cx="0" cy="0" r="2" fill="#D2A478" />
          </g>
        </svg>
      </motion.div>

      {/* 4. CENTER-RIGHT STRAND (DELICATE SHORT BLOOM) */}
      <motion.div
        style={{ rotate: springRight, transformOrigin: "center top" }}
        animate={{ rotate: [0, -2, 2, 0] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        className="absolute top-0 right-[28%] w-[180px] h-[400px] opacity-85 hidden md:block"
      >
        <svg className="w-full h-full transform scale-x-[-1]" viewBox="0 0 180 400" fill="none">
          <path d="M 90 0 C 120 70, 60 170, 100 280 C 115 330, 90 370, 98 395" stroke="#1C2E20" strokeWidth="2" strokeLinecap="round" />
          <g fill="#1C2E20">
            <path d="M 98 40 Q 120 30 108 55 Q 88 52 98 40 Z" />
            <path d="M 78 130 Q 100 120 88 145 Q 68 142 78 130 Z" />
            <path d="M 102 210 Q 125 200 112 228 Q 90 225 102 210 Z" />
            <path d="M 92 300 Q 112 292 102 315 Q 82 312 92 300 Z" />
          </g>
          <g transform="translate(100, 280)">
            <circle cx="0" cy="0" r="5" fill="#FBF0F2" />
            <circle cx="-3" cy="-3" r="3.5" fill="#E8BCC6" />
            <circle cx="3" cy="-3" r="3.5" fill="#E8BCC6" />
            <circle cx="0" cy="0" r="2" fill="#D2A478" />
          </g>
        </svg>
      </motion.div>

      {/* 5. INNER RIGHT STRAND (MID-LENGTH LEAFY) */}
      <motion.div
        style={{ rotate: springRight, transformOrigin: "center top" }}
        animate={{ rotate: [0, 2.8, -2.5, 0], skewX: [0, 1, -1, 0] }}
        transition={{ duration: 8.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="absolute top-0 right-[12%] w-[220px] h-[540px] opacity-90 hidden sm:block"
      >
        <svg className="w-full h-full transform scale-x-[-1]" viewBox="0 0 220 540" fill="none">
          <path d="M 110 0 C 160 90, 80 210, 130 370 C 150 440, 110 500, 125 530" stroke="#1C2E20" strokeWidth="2.4" strokeLinecap="round" />
          <g fill="#1C2E20">
            <path d="M 118 50 Q 142 40 128 67 Q 105 63 118 50 Z" />
            <path d="M 98 145 Q 122 135 108 162 Q 85 158 98 145 Z" />
            <path d="M 132 245 Q 158 235 142 265 Q 118 260 132 245 Z" />
            <path d="M 112 335 Q 138 325 122 355 Q 98 350 112 335 Z" />
            <path d="M 138 425 Q 160 415 148 443 Q 125 440 138 425 Z" />
            <path d="M 120 500 Q 138 492 128 515 Q 110 512 120 500 Z" />
          </g>
        </svg>
      </motion.div>

      {/* 6. OUTER RIGHT STRAND (EXTRA LONG HEAVY CORNER) */}
      <motion.div
        style={{ rotate: springRight, transformOrigin: "270px 0px" }}
        animate={{ rotate: [0, -3, 2, 0], skewX: [0, -1.2, 1.2, 0] }}
        transition={{ duration: 8.7, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className="absolute top-0 right-0 w-[300px] h-[740px] opacity-95"
      >
        <svg className="w-full h-full transform scale-x-[-1]" viewBox="0 0 300 740" fill="none">
          <path d="M 0 0 C 70 130, 10 270, 85 440 C 115 520, 65 640, 100 730" stroke="#1C2E20" strokeWidth="3" strokeLinecap="round" />
          <path d="M 0 0 C 30 160, 10 320, 40 490 C 55 570, 30 650, 45 720" stroke="#1C2E20" strokeWidth="1.8" strokeLinecap="round" />
          <g fill="#1C2E20">
            <path d="M 18 28 Q 42 18 28 45 Q 5 41 18 28 Z" />
            <path d="M 35 115 Q 65 105 48 135 Q 22 130 35 115 Z" />
            <path d="M 52 175 Q 82 170 65 200 Q 38 195 52 175 Z" />
            <path d="M 32 270 Q 60 260 45 290 Q 20 285 32 270 Z" />
            <path d="M 72 350 Q 100 340 82 372 Q 55 368 72 350 Z" />
            <path d="M 92 430 Q 120 420 102 452 Q 75 448 92 430 Z" />
            <path d="M 68 515 Q 95 505 78 537 Q 52 533 68 515 Z" />
            <path d="M 88 605 Q 112 595 98 625 Q 72 620 88 605 Z" />
            <path d="M 95 685 Q 115 680 105 703 Q 88 700 95 685 Z" />
          </g>
          {/* Blossoms */}
          <g transform="translate(85, 370)">
            <circle cx="0" cy="0" r="6" fill="#FBF0F2" />
            <circle cx="-4" cy="-3" r="4" fill="#F3D5DB" />
            <circle cx="4" cy="-3" r="4" fill="#F3D5DB" />
            <circle cx="-5" cy="2" r="4" fill="#F3D5DB" />
            <circle cx="5" cy="2" r="4" fill="#F3D5DB" />
            <circle cx="0" cy="0" r="2.5" fill="#D2A478" />
          </g>
          <g transform="translate(100, 545)">
            <circle cx="0" cy="0" r="6" fill="#FBF0F2" />
            <circle cx="-4" cy="-3" r="4" fill="#E8BCC6" />
            <circle cx="4" cy="-3" r="4" fill="#E8BCC6" />
            <circle cx="0" cy="0" r="2.5" fill="#D2A478" />
          </g>
        </svg>
      </motion.div>

    </div>
  );
}

/* ---------------- MAIN APP ---------------- */

export default function App() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, -60]);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div className="relative bg-[#EFF4EC] text-[#273229] min-h-screen antialiased overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      <BotanicalAtmosphere />
      <CoolGlow />

      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(194,214,188,0.4),rgba(239,244,236,0.95))] z-0 pointer-events-none"
      />

      {/* STICKY TOP NAVBAR */}
      <Navbar />

      <ScrollFocusSection>
        <Hero />
      </ScrollFocusSection>

      <FloralDivider />

      {/* 1. ANNOUNCEMENTS / NEWS */}
      <ScrollFocusSection id="announcements">
        <Announcements />
      </ScrollFocusSection>

      <FloralDivider />

      {/* 2. GUIDELINES (ALL 9 OFFICIAL RULES) */}
      <ScrollFocusSection id="rules">
        <GuildRulesSection />
      </ScrollFocusSection>

      <FloralDivider />

      {/* 3. GATHERINGS / EVENTS */}
      <ScrollFocusSection id="events">
        <EventsCalendar />
      </ScrollFocusSection>

      <FloralDivider />

      {/* 4. FIELD GUIDES / WIKI */}
      <ScrollFocusSection id="wiki">
        <WikiSection />
      </ScrollFocusSection>

      <FloralDivider />

      {/* 5. GUARDIANS / ROSTER */}
      <ScrollFocusSection id="roster">
        <Roster />
      </ScrollFocusSection>

      <FloralDivider />

      {/* 6. JOIN */}
      <ScrollFocusSection id="join">
        <JoinSection />
      </ScrollFocusSection>

      <Footer />
    </div>
  );
}

/* ---------------- ELEGANT UNICODE DIVIDER ---------------- */

function FloralDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-16 opacity-70">
      <div className="h-px bg-gradient-to-r from-transparent via-[#1C2E20]/30 to-transparent w-28 md:w-48" />
      <span className="text-[#1C2E20] text-xs font-serif tracking-widest">✦ ❦ ✦</span>
      <div className="h-px bg-gradient-to-r from-transparent via-[#1C2E20]/30 to-transparent w-28 md:w-48" />
    </div>
  );
}

/* ---------------- STICKY NAVBAR WITH ANCHORED VINES ---------------- */

function Navbar() {
  return (
    <header className="sticky top-0 w-full z-50 bg-[#EFF4EC]/90 backdrop-blur-md border-b border-[#1C2E20]/15 transition-all">
      <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#DCE7D8] border border-[#A6C49F] flex items-center justify-center text-[#1C2E20] text-xs font-serif">
            ❦
          </div>
          <div>
            <span className="font-['Cinzel',serif] tracking-[0.2em] text-[#1C2E20] font-bold text-lg uppercase block leading-none">
              Eve
            </span>
            <span className="text-[9px] tracking-widest text-[#2F4832] uppercase font-bold">Est. 2026</span>
          </div>
        </div>

        <div className="hidden md:flex space-x-8 text-xs tracking-widest text-[#273229] font-bold uppercase">
          {[
            { id: "announcements", label: "News" },
            { id: "rules", label: "Guidelines" },
            { id: "events", label: "Gatherings" },
            { id: "wiki", label: "Guides" },
            { id: "roster", label: "Guardians" },
            { id: "join", label: "Join" },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="hover:text-[#1C2E20] transition hover:underline underline-offset-8 decoration-[#2F4832]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* VINES ATTACHED TO THE BOTTOM OF THIS STICKY NAVBAR */}
      <OrganicHangingVines />
    </header>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  return (
    <section className="pt-28 pb-12 text-center relative z-10 max-w-4xl mx-auto px-6">
      <motion.div variants={stagger} initial="hidden" animate="visible">
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white border border-[#A6C49F] text-[#1C2E20] text-[11px] font-bold tracking-[0.18em] uppercase shadow-sm">
          <span className="text-xs">✦</span> Garden Sanctuary & Guild
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="font-['Alex_Brush',cursive] text-4xl md:text-5xl text-[#2F4832] mb-1 font-semibold"
        >
          Enjoy Your Time at
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="text-6xl md:text-8xl font-['Cinzel',serif] font-bold tracking-[0.12em] text-[#1C2E20] uppercase mb-4"
        >
          Eve
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="font-['Cormorant_Garamond',serif] italic text-2xl md:text-3xl text-[#1C2E20] max-w-xl mx-auto mb-6 font-bold"
        >
          "We Welcome All"
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="text-sm md:text-base text-[#3A483C] max-w-lg mx-auto leading-relaxed font-medium mb-10"
        >
          A lush botanical sanctuary built on kindness, clean progression, and genuine community. Step under the canopy and bloom with us.
        </motion.p>

        <motion.div variants={fadeUp} className="flex justify-center gap-4">
          <a
            href="#join"
            className="px-8 py-3.5 rounded-2xl bg-[#1C2E20] text-[#EFF4EC] text-xs font-bold tracking-widest uppercase hover:bg-[#122015] transition shadow-md hover:shadow-lg"
          >
            Apply to Guild
          </a>
          <a
            href="#announcements"
            className="px-8 py-3.5 rounded-2xl bg-white border border-[#1C2E20]/30 text-[#1C2E20] text-xs font-bold tracking-widest uppercase hover:border-[#1C2E20] transition shadow-sm"
          >
            Read News
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------- ANNOUNCEMENTS ---------------- */

const announcementData = [
  {
    title: "Summer Solstice Gathering & Raid Launch",
    date: "July 20, 2026",
    tag: "Guild Event",
    summary: "Our journey into the new season begins this Friday! Join us in the voice lounge for pre-expedition tea and preparations.",
  },
  {
    title: "Garden Reserves Replenished",
    date: "July 15, 2026",
    tag: "Pantry & Vault",
    summary: "Free raid flasks, elixirs, and food feasts have been restocked in the Grove Vault for all participating adventurers.",
  },
];

function Announcements() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-6">
      <div className="flex items-center gap-3 mb-8">
        <FaBullhorn className="text-[#1C2E20] text-base" />
        <h2 className="text-2xl font-['Cinzel',serif] text-[#1C2E20] tracking-wider uppercase font-bold">Announcements</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {announcementData.map((item) => (
          <div
            key={item.title}
            className="p-7 rounded-2xl bg-white border border-[#A6C49F] shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] tracking-widest px-3 py-1 rounded-full bg-[#E5EFE2] text-[#1C2E20] font-bold uppercase">
                {item.tag}
              </span>
              <span className="text-xs text-[#526354] font-semibold">{item.date}</span>
            </div>
            <h3 className="text-lg font-[#Cinzel',serif] mb-2 text-[#1C2E20] font-bold tracking-wide">{item.title}</h3>
            <p className="text-[#3A483C] text-xs leading-relaxed font-medium">{item.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- GUIDELINES (ALL 9 OFFICIAL RULES) ---------------- */

const officialRules = [
  {
    num: "01",
    title: "The Golden Rule",
    subtitle: "Simple Decency",
    desc: "Treat everyone with basic decency. We’re all here to have fun and unwind. Disagreements happen, but keep conversations constructive. If you wouldn't say it to someone's face in a room full of people, don't type it here.",
  },
  {
    num: "02",
    title: "Real Life First",
    subtitle: "RL > Game",
    desc: "We get it—jobs, family, school, and sleep happen. Your real life always takes priority. If you'll be offline for longer than 7 consecutive days, or won't hit the 1,000 weekly activity points milestone, submit a staff ticket so we can save your spot!",
  },
  {
    num: "03",
    title: "All-Ages Main Channels",
    subtitle: "No Public NSFW",
    desc: "We have members under 18 in our community. Keep general chat, game chat, and main voice channels family-friendly. Explicit or graphic content is strictly restricted to our age-verified NSFW 18+ channel.",
  },
  {
    num: "04",
    title: "Keep it Legal",
    subtitle: "Safe & Online",
    desc: "No discussions or jokes regarding illegal activities, pirated content, or illicit substances. Anything violating game or Discord Terms of Service is prohibited to keep our community safe.",
  },
  {
    num: "05",
    title: "Zero Tolerance",
    subtitle: "No Bigotry",
    desc: "We want a safe space for everyone. Harassment, hate speech, sexism, racism, homophobia, or transphobia results in an immediate kick. No exceptions, no debate.",
  },
  {
    num: "06",
    title: "Keep Drama Offline",
    subtitle: "Private Mediation",
    desc: "Take personal disputes to private messages. If needed, reach out to an officer or leader to help mediate calmly. Guild chat remains a positive, comfortable space for all.",
  },
  {
    num: "07",
    title: "No Spoilers",
    subtitle: "Respect the Journey",
    desc: "Don't spoil story points, lore drops, or boss mechanics for others. Use designated spoiler channels or ask in chat before discussing late-game content.",
  },
  {
    num: "08",
    title: "Lending a Hand",
    subtitle: "Shared Harvests",
    desc: "We are a collective. Whenever possible, assist fellow guildmates with quests, gearing, or advice. You don't have to carry everyone 24/7, but generosity builds a stronger guild.",
  },
  {
    num: "09",
    title: "Play Fair & Honest",
    subtitle: "Guild Reputation",
    desc: "No cheating, exploiting, or scamming inside or outside the guild. Our reputation matters, and we hold ourselves to being honest, honorable players.",
  },
];

function GuildRulesSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-6">
      <div className="text-center mb-10">
        <span className="text-[10px] tracking-[0.25em] text-[#1C2E20] uppercase font-bold block mb-1">
          Sanctuary Covenant
        </span>
        <h2 className="text-3xl md:text-4xl font-['Cinzel',serif] text-[#1C2E20] font-bold tracking-wider uppercase">
          Guild Guidelines
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {officialRules.map((r) => (
          <div
            key={r.num}
            className="p-6 rounded-2xl bg-white border border-[#A6C49F] shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-['Cinzel',serif] text-xs font-bold tracking-widest text-[#1C2E20] flex items-center gap-1.5">
                  <span className="text-[10px]">❦</span> {r.num}.
                </span>
                <span className="text-[10px] tracking-widest px-2.5 py-0.5 rounded-full bg-[#E5EFE2] text-[#1C2E20] font-bold uppercase">
                  {r.subtitle}
                </span>
              </div>
              <h3 className="font-['Cinzel',serif] text-base text-[#1C2E20] font-bold mb-2 tracking-wide">
                {r.title}
              </h3>
              <p className="text-xs text-[#3A483C] leading-relaxed font-medium">
                {r.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- EVENTS / CALENDAR ---------------- */

const eventData = [
  { title: "Main Expedition: Progression", time: "Fri · 8:00 PM EST", requirements: "ilvl 620+ · Consumables Provided" },
  { title: "Catch-up Raid & Dungeons", time: "Sat · 6:00 PM EST", requirements: "Open to All Guild Members" },
  { title: "Cozy Garden Tea & Lounge", time: "Tue · 9:00 PM EST", requirements: "Casual · Open Voice Chat" },
];

function EventsCalendar() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-6">
      <div className="flex items-center gap-3 mb-8">
        <FaCalendarAlt className="text-[#1C2E20] text-base" />
        <h2 className="text-2xl font-['Cinzel',serif] text-[#1C2E20] tracking-wider uppercase font-bold">Gatherings</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {eventData.map((e) => (
          <div
            key={e.title}
            className="p-6 rounded-2xl bg-white border border-[#A6C49F] shadow-sm hover:shadow-md transition hover:-translate-y-1"
          >
            <span className="text-[10px] tracking-widest font-bold text-[#2F4832] block mb-2 uppercase">{e.time}</span>
            <h3 className="text-base font-['Cinzel',serif] font-bold mb-2 text-[#1C2E20]">{e.title}</h3>
            <p className="text-xs text-[#526354] border-t border-stone-100 pt-3 mt-3 font-medium">{e.requirements}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- WIKI ---------------- */

const wikiTopics = [
  { title: "Alchemy & Elixirs Guide", desc: "Required pots, food feasts, and elemental blessings for raid night." },
  { title: "Grove Bank Protocols", desc: "Sharing harvests, requesting gear, and contributing raw materials." },
  { title: "Class Build Library", desc: "Member-crafted build guides for optimization without toxicity." },
];

function WikiSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-6">
      <div className="flex items-center gap-3 mb-8">
        <FaBook className="text-[#1C2E20] text-base" />
        <h2 className="text-2xl font-['Cinzel',serif] text-[#1C2E20] tracking-wider uppercase font-bold">Field Guides</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {wikiTopics.map((w) => (
          <div
            key={w.title}
            className="p-6 rounded-2xl bg-white border border-[#A6C49F] shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-base font-['Cinzel',serif] font-bold mb-2 text-[#1C2E20]">{w.title}</h3>
            <p className="text-xs text-[#3A483C] mb-4 leading-relaxed font-medium">{w.desc}</p>
            <a href="#" className="text-[11px] text-[#1C2E20] tracking-widest font-bold uppercase hover:underline flex items-center gap-1">
              Read Guide →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- ROSTER ---------------- */

const officers = [
  { name: "EveLeader", role: "Grove Keeper", class: "Protector / Guardian" },
  { name: "OfficerLex", role: "Raid Weaver", class: "Restoration / Healer" },
  { name: "Tactician", role: "Elder", class: "Wild DPS / Theorycraft" },
];

function Roster() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-6">
      <div className="flex items-center gap-3 mb-8">
        <FaShieldAlt className="text-[#1C2E20] text-base" />
        <h2 className="text-2xl font-['Cinzel',serif] text-[#1C2E20] tracking-wider uppercase font-bold">Guardians</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {officers.map((o) => (
          <div
            key={o.name}
            className="p-6 rounded-2xl bg-white border border-[#A6C49F] flex items-center gap-4 shadow-sm"
          >
            <div className="w-11 h-11 rounded-full bg-[#E5EFE2] border border-[#A6C49F] flex items-center justify-center font-['Cinzel',serif] text-sm font-bold text-[#1C2E20]">
              {o.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-sm font-['Cinzel',serif] font-bold text-[#1C2E20] tracking-wide">{o.name}</h3>
              <p className="text-[10px] tracking-wider uppercase text-[#2F4832] font-bold">{o.role}</p>
              <p className="text-[11px] text-[#526354] font-medium">{o.class}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- JOIN / CONTACT ---------------- */

function JoinSection() {
  return (
    <section className="relative z-10 py-12 text-center max-w-3xl mx-auto px-6">
      <div className="p-10 md:p-14 rounded-3xl bg-white border border-[#A6C49F] shadow-lg relative">
        <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[#E5EFE2] border border-[#A6C49F] flex items-center justify-center text-[#1C2E20] text-sm font-serif">
          ❦
        </div>
        <span className="font-['Alex_Brush',cursive] text-4xl text-[#2F4832] block mb-1 font-semibold">
          Welcome Home
        </span>
        <h2 className="text-3xl md:text-4xl font-['Cinzel',serif] text-[#1C2E20] tracking-wider uppercase mb-3 font-bold">
          Find Your Place in Eve
        </h2>
        <p className="font-['Cormorant_Garamond',serif] italic text-xl text-[#1C2E20] mb-6 font-bold">
          "We Welcome All"
        </p>
        <p className="text-[#3A483C] text-xs md:text-sm mb-8 max-w-md mx-auto leading-relaxed font-medium">
          Whether you seek endgame progression or a tranquil community lounge under open branches, our sanctuary doors are always open.
        </p>
        <div className="flex justify-center">
          <a
            href="https://join.we-are-eve.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-[#1C2E20] text-[#EFF4EC] text-xs font-bold tracking-widest uppercase hover:bg-[#122015] transition shadow-md"
          >
            <FaDiscord className="text-base" /> Join Our Discord
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <footer className="text-center py-10 text-[#526354] text-xs font-bold tracking-widest uppercase">
      © {new Date().getFullYear()} Eve Guild · Est. 2026 · Planted with Care ❦
    </footer>
  );
}
