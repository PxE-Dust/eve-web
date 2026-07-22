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

/* ---------------- FLOATING BOTANICAL ATMOSPHERE ---------------- */

function BotanicalAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Floating Soft Green Spores */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.div
          key={`spore-${i}`}
          className="absolute w-2 h-2 rounded-full bg-[#8FA885]/35 blur-[1px]"
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

/* ---------------- VECTOR LEAF CLUSTER SUB-COMPONENT ---------------- */

interface LeafClusterProps {
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  color?: string;
  delay?: number;
}

function LeafCluster({ x, y, scale = 1, rotate = 0, color = "#1C2E20", delay = 0 }: LeafClusterProps) {
  return (
    <motion.g
      transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotate})`}
      animate={{
        rotate: [rotate - 6, rotate + 6, rotate - 6],
        scale: [scale * 0.96, scale * 1.04, scale * 0.96],
      }}
      transition={{
        duration: 3.5 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {/* Central Stem connection */}
      <path d="M 0 0 L 0 12" stroke={color} strokeWidth="2" opacity="0.8" />

      {/* Main Center Leaf */}
      <path
        d="M 0 0 C -8 -16, -12 -28, 0 -38 C 12 -28, 8 -16, 0 0 Z"
        fill={color}
      />
      <path d="M 0 0 L 0 -32" stroke="#8FA885" strokeWidth="0.8" opacity="0.5" />

      {/* Left Pair Leaf */}
      <g transform="translate(-4, -10) rotate(-42)">
        <path
          d="M 0 0 C -6 -12, -10 -20, 0 -28 C 10 -20, 6 -12, 0 0 Z"
          fill={color}
          opacity="0.9"
        />
      </g>

      {/* Right Pair Leaf */}
      <g transform="translate(4, -10) rotate(42)">
        <path
          d="M 0 0 C -6 -12, -10 -20, 0 -28 C 10 -20, 6 -12, 0 0 Z"
          fill={color}
          opacity="0.9"
        />
      </g>

      {/* Outer Tip Leaf */}
      <g transform="translate(0, -22) scale(0.7)">
        <path
          d="M 0 0 C -6 -12, -10 -20, 0 -26 C 10 -20, 6 -12, 0 0 Z"
          fill="#2A402D"
        />
      </g>
    </motion.g>
  );
}

/* ---------------- LUSH DRAPED GREENERY ---------------- */

function LushHangingVines() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const rawScrollAngleLeft = useTransform(scrollVelocity, [-2000, 2000], [14, -14]);
  const rawScrollAngleRight = useTransform(scrollVelocity, [-2000, 2000], [-14, 14]);

  const springLeft = useSpring(rawScrollAngleLeft, { stiffness: 18, damping: 8, mass: 1.2 });
  const springRight = useSpring(rawScrollAngleRight, { stiffness: 18, damping: 8, mass: 1.2 });

  return (
    <div className="pointer-events-none absolute top-full inset-x-0 h-[880px] z-10 overflow-visible">
      {/* ---------------- OVERHEAD DENSE TOP CANOPY ---------------- */}
      <div className="absolute top-0 inset-x-0 h-[100px] pointer-events-none z-20 overflow-hidden">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 100">
          <defs>
            <linearGradient id="canopyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1C2E20" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#243828" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#243828" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Continuous canopy fill */}
          <rect width="1200" height="60" fill="url(#canopyGrad)" />

          {/* Draped canopy leaf silhouette clusters across header beam */}
          {Array.from({ length: 28 }).map((_, i) => {
            const x = i * 45 - 20;
            const y = 30 + (i % 3) * 12;
            const scale = 0.8 + (i % 4) * 0.15;
            return (
              <g key={`top-canopy-${i}`} transform={`translate(${x}, ${y}) scale(${scale})`}>
                <path d="M 0 0 C -15 20, -25 35, 0 50 C 25 35, 15 20, 0 0 Z" fill="#1C2E20" />
                <path d="M -15 -10 C -30 10, -35 25, -15 40 C 5 25, 0 10, -15 -10 Z" fill="#283D2A" />
                <path d="M 15 -10 C 0 10, -5 25, 15 40 C 35 25, 30 10, 15 -10 Z" fill="#152418" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* ================= FAR LEFT HEAVY WALL DRAPE ================= */}
      <motion.div
        style={{ rotate: springLeft, transformOrigin: "top left" }}
        animate={{ rotate: [0, 2, -1.5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-[340px] h-[850px]"
      >
        <svg className="w-full h-full" viewBox="0 0 340 850" fill="none">
          {/* Main Thick Vines */}
          <path d="M 10 -20 C 60 180, -20 380, 80 580 C 120 680, 40 760, 65 840" stroke="#1C2E20" strokeWidth="6" strokeLinecap="round" />
          <path d="M 25 -20 C 80 160, 10 340, 100 520 C 130 600, 70 720, 80 810" stroke="#283D2A" strokeWidth="4" strokeLinecap="round" />
          <path d="M 5 -20 C 100 120, 50 300, 130 460 C 160 520, 30 620, 45 720" stroke="#152418" strokeWidth="3" strokeLinecap="round" />

          {/* Dense Foliage Clusters along Main Left Drape */}
          <LeafCluster x={20} y={40} scale={1.3} rotate={-15} color="#1C2E20" delay={0.1} />
          <LeafCluster x={50} y={110} scale={1.4} rotate={35} color="#283D2A" delay={0.3} />
          <LeafCluster x={35} y={180} scale={1.2} rotate={-30} color="#152418" delay={0.5} />
          <LeafCluster x={25} y={260} scale={1.5} rotate={20} color="#1C2E20" delay={0.2} />
          <LeafCluster x={45} y={350} scale={1.3} rotate={-40} color="#283D2A" delay={0.4} />
          <LeafCluster x={75} y={440} scale={1.4} rotate={30} color="#1C2E20" delay={0.6} />
          <LeafCluster x={105} y={530} scale={1.3} rotate={-20} color="#152418" delay={0.2} />
          <LeafCluster x={85} y={630} scale={1.2} rotate={25} color="#283D2A" delay={0.5} />
          <LeafCluster x={55} y={720} scale={1.1} rotate={-15} color="#1C2E20" delay={0.3} />
          <LeafCluster x={65} y={810} scale={0.9} rotate={10} color="#283D2A" delay={0.1} />

          {/* Inner Branch Tendril Clutter */}
          <LeafCluster x={80} y={150} scale={1.1} rotate={50} color="#1C2E20" delay={0.7} />
          <LeafCluster x={110} y={320} scale={1.2} rotate={-45} color="#283D2A" delay={0.4} />
          <LeafCluster x={140} y={480} scale={1.0} rotate={35} color="#152418" delay={0.8} />
        </svg>
      </motion.div>

      {/* ================= MID-LEFT DRAPING TENDRILS ================= */}
      <motion.div
        style={{ rotate: springLeft, transformOrigin: "top center" }}
        animate={{ rotate: [0, -1.8, 1.8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        className="absolute top-0 left-[22%] w-[260px] h-[620px] hidden sm:block"
      >
        <svg className="w-full h-full" viewBox="0 0 260 620" fill="none">
          <path d="M 130 -20 C 190 140, 90 300, 150 460 C 175 530, 130 580, 140 610" stroke="#1C2E20" strokeWidth="4" strokeLinecap="round" />
          <path d="M 140 -20 C 170 100, 120 240, 175 380" stroke="#283D2A" strokeWidth="2.5" strokeLinecap="round" />

          <LeafCluster x={140} y={60} scale={1.2} rotate={15} color="#1C2E20" delay={0.2} />
          <LeafCluster x={165} y={150} scale={1.3} rotate={-35} color="#283D2A" delay={0.5} />
          <LeafCluster x={125} y={250} scale={1.2} rotate={30} color="#152418" delay={0.3} />
          <LeafCluster x={145} y={350} scale={1.3} rotate={-25} color="#1C2E20" delay={0.6} />
          <LeafCluster x={165} y={450} scale={1.1} rotate={40} color="#283D2A" delay={0.1} />
          <LeafCluster x={140} y={550} scale={0.9} rotate={-10} color="#1C2E20" delay={0.4} />
        </svg>
      </motion.div>

      {/* ================= MID-RIGHT DRAPING TENDRILS ================= */}
      <motion.div
        style={{ rotate: springRight, transformOrigin: "top center" }}
        animate={{ rotate: [0, 1.8, -1.8, 0] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="absolute top-0 right-[22%] w-[260px] h-[640px] hidden sm:block"
      >
        <svg className="w-full h-full" viewBox="0 0 260 640" fill="none">
          <path d="M 130 -20 C 70 150, 170 310, 105 480 C 85 550, 120 600, 115 630" stroke="#1C2E20" strokeWidth="4" strokeLinecap="round" />
          <path d="M 120 -20 C 85 110, 140 250, 85 390" stroke="#283D2A" strokeWidth="2.5" strokeLinecap="round" />

          <LeafCluster x={115} y={70} scale={1.2} rotate={-20} color="#1C2E20" delay={0.4} />
          <LeafCluster x={90} y={160} scale={1.3} rotate={30} color="#283D2A" delay={0.1} />
          <LeafCluster x={145} y={260} scale={1.2} rotate={-40} color="#152418" delay={0.7} />
          <LeafCluster x={115} y={370} scale={1.3} rotate={25} color="#1C2E20" delay={0.3} />
          <LeafCluster x={95} y={480} scale={1.1} rotate={-15} color="#283D2A" delay={0.5} />
          <LeafCluster x={115} y={580} scale={0.9} rotate={20} color="#1C2E20" delay={0.2} />
        </svg>
      </motion.div>

      {/* ================= FAR RIGHT HEAVY WALL DRAPE ================= */}
      <motion.div
        style={{ rotate: springRight, transformOrigin: "top right" }}
        animate={{ rotate: [0, -2, 1.5, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        className="absolute top-0 right-0 w-[340px] h-[860px]"
      >
        <svg className="w-full h-full transform scale-x-[-1]" viewBox="0 0 340 860" fill="none">
          {/* Main Thick Vines */}
          <path d="M 10 -20 C 60 190, -20 390, 80 600 C 120 700, 40 780, 65 850" stroke="#1C2E20" strokeWidth="6" strokeLinecap="round" />
          <path d="M 25 -20 C 80 170, 10 350, 100 540 C 130 620, 70 740, 80 830" stroke="#283D2A" strokeWidth="4" strokeLinecap="round" />
          <path d="M 5 -20 C 100 130, 50 310, 130 480 C 160 540, 30 640, 45 740" stroke="#152418" strokeWidth="3" strokeLinecap="round" />

          {/* Dense Foliage Clusters along Main Right Drape */}
          <LeafCluster x={20} y={45} scale={1.3} rotate={-15} color="#1C2E20" delay={0.2} />
          <LeafCluster x={50} y={120} scale={1.4} rotate={35} color="#283D2A" delay={0.4} />
          <LeafCluster x={35} y={190} scale={1.2} rotate={-30} color="#152418" delay={0.1} />
          <LeafCluster x={25} y={270} scale={1.5} rotate={20} color="#1C2E20" delay={0.5} />
          <LeafCluster x={45} y={360} scale={1.3} rotate={-40} color="#283D2A" delay={0.3} />
          <LeafCluster x={75} y={450} scale={1.4} rotate={30} color="#1C2E20" delay={0.7} />
          <LeafCluster x={105} y={550} scale={1.3} rotate={-20} color="#152418" delay={0.2} />
          <LeafCluster x={85} y={650} scale={1.2} rotate={25} color="#283D2A" delay={0.6} />
          <LeafCluster x={55} y={740} scale={1.1} rotate={-15} color="#1C2E20" delay={0.4} />
          <LeafCluster x={65} y={830} scale={0.9} rotate={10} color="#283D2A" delay={0.1} />

          {/* Inner Branch Tendril Clutter */}
          <LeafCluster x={80} y={160} scale={1.1} rotate={50} color="#1C2E20" delay={0.3} />
          <LeafCluster x={110} y={340} scale={1.2} rotate={-45} color="#283D2A" delay={0.6} />
          <LeafCluster x={140} y={500} scale={1.0} rotate={35} color="#152418" delay={0.2} />
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

      <Navbar />

      <ScrollFocusSection>
        <Hero />
      </ScrollFocusSection>

      <FloralDivider />

      <ScrollFocusSection id="announcements">
        <Announcements />
      </ScrollFocusSection>

      <FloralDivider />

      <ScrollFocusSection id="rules">
        <GuildRulesSection />
      </ScrollFocusSection>

      <FloralDivider />

      <ScrollFocusSection id="events">
        <EventsCalendar />
      </ScrollFocusSection>

      <FloralDivider />

      <ScrollFocusSection id="wiki">
        <WikiSection />
      </ScrollFocusSection>

      <FloralDivider />

      <ScrollFocusSection id="roster">
        <Roster />
      </ScrollFocusSection>

      <FloralDivider />

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

      <LushHangingVines />
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
        <p className="font-[#Cormorant_Garamond',serif] italic text-xl text-[#1C2E20] mb-6 font-bold">
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
