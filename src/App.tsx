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

/* ---------------- NATURAL EXTRA-LONG HANGING VINES WITH BLOSSOMS & BREEZE ---------------- */

function OrganicHangingVines() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Map scroll speed/direction to inertia rotation
  const rawScrollAngleLeft = useTransform(scrollVelocity, [-2000, 2000], [18, -18]);
  const rawScrollAngleRight = useTransform(scrollVelocity, [-2000, 2000], [-18, 18]);

  // Spring physics for natural weight, bounce, and gravity damping
  const physicsSpringLeft = useSpring(rawScrollAngleLeft, { stiffness: 20, damping: 7, mass: 1.4 });
  const physicsSpringRight = useSpring(rawScrollAngleRight, { stiffness: 20, damping: 7, mass: 1.4 });

  return (
    <div className="pointer-events-none absolute top-full inset-x-0 h-[600px] z-10 overflow-visible opacity-90">
      {/* LEFT DEEP LUSH VINE BRANCH WITH BLOSSOMS */}
      <motion.div
        style={{ rotate: physicsSpringLeft, transformOrigin: "top left" }}
        animate={{
          rotate: [0, 3, -2, 3.5, 0],
          skewX: [0, 1.5, -1.5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-0 w-[360px] h-[600px]"
      >
        <svg className="w-full h-full" viewBox="0 0 320 580" fill="none">
          {/* Main Vine Tendrils */}
          <path d="M 0 0 C 60 100, 10 220, 80 380 C 110 450, 60 520, 95 570" stroke="#1C2E20" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 0 0 C 110 70, 120 200, 170 320 C 200 400, 150 480, 180 540" stroke="#1C2E20" strokeWidth="2" strokeLinecap="round" />
          <path d="M 0 0 C 40 140, 20 280, 45 420 C 60 480, 35 530, 50 575" stroke="#1C2E20" strokeWidth="1.5" strokeLinecap="round" />

          {/* Leaves (Dark Botanical Green) */}
          <g fill="#1C2E20">
            {/* Top Cluster */}
            <path d="M 12 20 Q 35 10 22 38 Q 2 35 12 20 Z" />
            <path d="M 28 32 Q 55 22 40 52 Q 18 48 28 32 Z" />
            <path d="M 48 25 Q 72 20 58 48 Q 32 45 48 25 Z" />

            {/* Mid Vine Foliage */}
            <path d="M 32 105 Q 60 98 45 125 Q 22 122 32 105 Z" />
            <path d="M 48 160 Q 78 155 62 185 Q 35 182 48 160 Z" />
            <path d="M 95 90 Q 122 85 108 112 Q 82 110 95 90 Z" />
            <path d="M 125 155 Q 152 150 135 178 Q 110 175 125 155 Z" />
            <path d="M 142 210 Q 170 205 152 232 Q 128 230 142 210 Z" />
            <path d="M 68 250 Q 95 242 80 270 Q 55 268 68 250 Z" />

            {/* Lower Vine Foliage */}
            <path d="M 85 320 Q 112 315 95 342 Q 72 340 85 320 Z" />
            <path d="M 120 370 Q 148 365 130 395 Q 105 392 120 370 Z" />
            <path d="M 160 430 Q 185 425 168 452 Q 145 450 160 430 Z" />
            <path d="M 50 360 Q 75 355 60 382 Q 38 380 50 360 Z" />
            <path d="M 62 440 Q 88 435 72 462 Q 48 460 62 440 Z" />

            {/* Hanging Tips */}
            <path d="M 80 500 Q 100 495 88 518 Q 68 515 80 500 Z" />
            <path d="M 90 545 Q 108 542 98 560 Q 80 558 90 545 Z" />
            <path d="M 172 510 Q 190 505 180 528 Q 160 525 172 510 Z" />
          </g>

          {/* Blooming Blossoms (Soft Rose White & Blush Pink) */}
          <g>
            {/* Flower 1 - Mid Top */}
            <g transform="translate(62, 135)">
              <circle cx="0" cy="0" r="7" fill="#FBF0F2" />
              <circle cx="-5" cy="-4" r="5" fill="#F3D5DB" />
              <circle cx="5" cy="-4" r="5" fill="#F3D5DB" />
              <circle cx="-6" cy="3" r="5" fill="#F3D5DB" />
              <circle cx="6" cy="3" r="5" fill="#F3D5DB" />
              <circle cx="0" cy="7" r="5" fill="#F3D5DB" />
              <circle cx="0" cy="0" r="3.5" fill="#D2A478" />
            </g>

            {/* Flower 2 - Mid Low */}
            <g transform="translate(145, 270)">
              <circle cx="0" cy="0" r="6" fill="#FBF0F2" />
              <circle cx="-4" cy="-4" r="4.5" fill="#E8BCC6" />
              <circle cx="4" cy="-4" r="4.5" fill="#E8BCC6" />
              <circle cx="-5" cy="2" r="4.5" fill="#E8BCC6" />
              <circle cx="5" cy="2" r="4.5" fill="#E8BCC6" />
              <circle cx="0" cy="5" r="4.5" fill="#E8BCC6" />
              <circle cx="0" cy="0" r="3" fill="#D2A478" />
            </g>

            {/* Flower 3 - Deep Long Tip */}
            <g transform="translate(100, 420)">
              <circle cx="0" cy="0" r="7" fill="#FBF0F2" />
              <circle cx="-5" cy="-4" r="5" fill="#F3D5DB" />
              <circle cx="5" cy="-4" r="5" fill="#F3D5DB" />
              <circle cx="-6" cy="3" r="5" fill="#F3D5DB" />
              <circle cx="6" cy="3" r="5" fill="#F3D5DB" />
              <circle cx="0" cy="7" r="5" fill="#F3D5DB" />
              <circle cx="0" cy="0" r="3.5" fill="#D2A478" />
            </g>

            {/* Floral Buds along the length */}
            <circle cx="28" cy="210" r="3" fill="#FBF0F2" stroke="#2F4832" strokeWidth="0.8" />
            <circle cx="78" cy="350" r="3.5" fill="#F3D5DB" stroke="#2F4832" strokeWidth="0.8" />
            <circle cx="165" cy="480" r="3" fill="#FBF0F2" stroke="#2F4832" strokeWidth="0.8" />
          </g>
        </svg>
      </motion.div>

      {/* RIGHT DEEP LUSH VINE BRANCH WITH BLOSSOMS */}
      <motion.div
        style={{ rotate: physicsSpringRight, transformOrigin: "top right" }}
        animate={{
          rotate: [0, -3, 2, -3.5, 0],
          skewX: [0, -1.5, 1.5, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute top-0 right-0 w-[360px] h-[600px]"
      >
        <svg className="w-full h-full transform scale-x-[-1]" viewBox="0 0 320 580" fill="none">
          {/* Main Vine Tendrils */}
          <path d="M 0 0 C 60 100, 10 220, 80 380 C 110 450, 60 520, 95 570" stroke="#1C2E20" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 0 0 C 110 70, 120 200, 170 320 C 200 400, 150 480, 180 540" stroke="#1C2E20" strokeWidth="2" strokeLinecap="round" />
          <path d="M 0 0 C 40 140, 20 280, 45 420 C 60 480, 35 530, 50 575" stroke="#1C2E20" strokeWidth="1.5" strokeLinecap="round" />

          {/* Leaves */}
          <g fill="#1C2E20">
            <path d="M 12 20 Q 35 10 22 38 Q 2 35 12 20 Z" />
            <path d="M 28 32 Q 55 22 40 52 Q 18 48 28 32 Z" />
            <path d="M 48 25 Q 72 20 58 48 Q 32 45 48 25 Z" />
            <path d="M 32 105 Q 60 98 45 125 Q 22 122 32 105 Z" />
            <path d="M 48 160 Q 78 155 62 185 Q 35 182 48 160 Z" />
            <path d="M 95 90 Q 122 85 108 112 Q 82 110 95 90 Z" />
            <path d="M 125 155 Q 152 150 135 178 Q 110 175 125 155 Z" />
            <path d="M 142 210 Q 170 205 152 232 Q 128 230 142 210 Z" />
            <path d="M 68 250 Q 95 242 80 270 Q 55 268 68 250 Z" />
            <path d="M 85 320 Q 112 315 95 342 Q 72 340 85 320 Z" />
            <path d="M 120 370 Q 148 365 130 395 Q 105 392 120 370 Z" />
            <path d="M 160 430 Q 185 425 168 452 Q 145 450 160 430 Z" />
            <path d="M 50 360 Q 75 355 60 382 Q 38 380 50 360 Z" />
            <path d="M 62 440 Q 88 435 72 462 Q 48 460 62 440 Z" />
            <path d="M 80 500 Q 100 495 88 518 Q 68 515 80 500 Z" />
            <path d="M 90 545 Q 108 542 98 560 Q 80 558 90 545 Z" />
            <path d="M 172 510 Q 190 505 180 528 Q 160 525 172 510 Z" />
          </g>

          {/* Blooming Blossoms */}
          <g>
            <g transform="translate(62, 135)">
              <circle cx="0" cy="0" r="7" fill="#FBF0F2" />
              <circle cx="-5" cy="-4" r="5" fill="#F3D5DB" />
              <circle cx="5" cy="-4" r="5" fill="#F3D5DB" />
              <circle cx="-6" cy="3" r="5" fill="#F3D5DB" />
              <circle cx="6" cy="3" r="5" fill="#F3D5DB" />
              <circle cx="0" cy="7" r="5" fill="#F3D5DB" />
              <circle cx="0" cy="0" r="3.5" fill="#D2A478" />
            </g>

            <g transform="translate(145, 270)">
              <circle cx="0" cy="0" r="6" fill="#FBF0F2" />
              <circle cx="-4" cy="-4" r="4.5" fill="#E8BCC6" />
              <circle cx="4" cy="-4" r="4.5" fill="#E8BCC6" />
              <circle cx="-5" cy="2" r="4.5" fill="#E8BCC6" />
              <circle cx="5" cy="2" r="4.5" fill="#E8BCC6" />
              <circle cx="0" cy="5" r="4.5" fill="#E8BCC6" />
              <circle cx="0" cy="0" r="3" fill="#D2A478" />
            </g>

            <g transform="translate(100, 420)">
              <circle cx="0" cy="0" r="7" fill="#FBF0F2" />
              <circle cx="-5" cy="-4" r="5" fill="#F3D5DB" />
              <circle cx="5" cy="-4" r="5" fill="#F3D5DB" />
              <circle cx="-6" cy="3" r="5" fill="#F3D5DB" />
              <circle cx="6" cy="3" r="5" fill="#F3D5DB" />
              <circle cx="0" cy="7" r="5" fill="#F3D5DB" />
              <circle cx="0" cy="0" r="3.5" fill="#D2A478" />
            </g>

            <circle cx="28" cy="210" r="3" fill="#FBF0F2" stroke="#2F4832" strokeWidth="0.8" />
            <circle cx="78" cy="350" r="3.5" fill="#F3D5DB" stroke="#2F4832" strokeWidth="0.8" />
            <circle cx="165" cy="480" r="3" fill="#FBF0F2" stroke="#2F4832" strokeWidth="0.8" />
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

      {/* STICKY TOP NAVBAR (STAYS AT TOP OF SCREEN ALWAYS + ANCHORED EXTENDED VINES) */}
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

      {/* 2. GUIDELINES */}
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
            <h3 className="text-lg font-['Cinzel',serif] mb-2 text-[#1C2E20] font-bold tracking-wide">{item.title}</h3>
            <p className="text-[#3A483C] text-xs leading-relaxed font-medium">{item.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- GUIDELINES ---------------- */

function GuildRulesSection() {
  const rules = [
    { title: "Warmth & Inclusivity", desc: "We are a safe, welcoming sanctuary for players of all paths, backgrounds, and experience levels." },
    { title: "Patience & Calm", desc: "Constructive feedback over toxicity. We clear content together with patience, kindness, and good cheer." },
    { title: "Shared Harvests", desc: "Pass along potions, gear, and wisdom from the Grove Bank to help fellow members bloom." },
  ];

  return (
    <section className="max-w-4xl mx-auto px-6 py-6">
      <div className="text-center mb-10">
        <span className="text-[10px] tracking-[0.25em] text-[#1C2E20] uppercase font-bold block mb-1">
          Sanctuary Covenant
        </span>
        <h2 className="text-3xl md:text-4xl font-['Cinzel',serif] text-[#1C2E20] font-bold tracking-wider uppercase">
          Guild Guidelines
        </h2>
      </div>

      <div className="p-8 md:p-10 rounded-3xl bg-white border border-[#A6C49F] shadow-lg relative overflow-hidden">
        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {rules.map((r, idx) => (
            <div key={idx} className="flex flex-col p-5 rounded-2xl bg-[#F4F8F3] border border-[#D0E2CC]">
              <span className="font-['Cinzel',serif] text-xs font-bold tracking-widest text-[#1C2E20] mb-2 flex items-center gap-1.5">
                <span className="text-[10px]">❦</span> 0{idx + 1}.
              </span>
              <h3 className="font-['Cinzel',serif] text-base text-[#1C2E20] font-bold mb-2 tracking-wide">
                {r.title}
              </h3>
              <p className="text-xs text-[#3A483C] leading-relaxed font-medium">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
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
