import { useEffect, useRef, useMemo } from "react";
import type { ReactNode } from "react";
import { FaDiscord, FaBook, FaCalendarAlt, FaBullhorn, FaShieldAlt } from "react-icons/fa";
import { motion, useScroll, useTransform, useSpring, useVelocity } from "framer-motion";
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

/* ---------------- INTERACTIVE FALLING PETALS CANVAS ---------------- */

interface Petal {
  id: number;
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
}

function FallingPetalsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0, time: Date.now() });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = (now - lastMouseRef.current.time) || 16;
      const vx = (e.clientX - lastMouseRef.current.x) / dt;
      const vy = (e.clientY - lastMouseRef.current.y) / dt;

      mouseRef.current = { x: e.clientX, y: e.clientY, vx, vy };
      lastMouseRef.current = { x: e.clientX, y: e.clientY, time: now };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const count = Math.floor((width * height) / 35000);
    const petals: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 6 + 4,
      speedY: Math.random() * 0.3 + 0.3,
      speedX: (Math.random() - 0.5) * 0.6,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.5 + 0.3,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const m = mouseRef.current;

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.4;
        p.rotation += p.rotSpeed;
        p.rotSpeed *= 0.98;

        const dx = p.x - m.x;
        const dy = p.y - m.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 140;

        if (dist < maxDist && dist > 0) {
          const force = (1 - dist / maxDist);
          p.x += (dx / dist) * force * 2.0 + m.vx * 1;
          p.y += (dy / dist) * force * 1.5 + m.vy * 0.8;
        }

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = "#9CD870";

        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      mouseRef.current.vx *= 0.9;
      mouseRef.current.vy *= 0.9;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-30" />;
}

/* ---------------- DELICATE STYLIZED VINES OVERLAY ---------------- */
/*
  Denser, fuller drape — closer to a real trailing houseplant:
  - leaves are asymmetric (like an elm/ivy leaf, not a symmetric almond),
    with feather veins fanning off a curved midrib and a light-to-dark
    gradient fill for depth instead of flat color
  - ~40% of points get a second, smaller overlapping leaf so the vine
    reads as a full cluster rather than single-file beads
  - top drape spans corner-to-corner again and hanging vines run the
    full first screen, matching the fuller reference composition
  - still sits BEHIND the main content (z-[5], under main's z-10), so
    density can't come at the cost of covering the text — the vines
    show in the gaps around words and cards, never over them
*/

interface LeafData {
  x: number;
  y: number;
  angle: number;
  scale: number;
  kind: "a" | "b" | "bud";
}

interface VineData {
  path: string;
  leaves: LeafData[];
}

function generateVine(
  x0: number, y0: number,
  x1: number, y1: number,
  x2: number, y2: number,
  leafCount: number,
  scale = 1
): VineData {
  const leaves: LeafData[] = [];
  for (let i = 1; i < leafCount; i++) {
    // small jitter so leaves don't sit at perfectly even intervals
    const jitter = (Math.random() - 0.5) * 0.03;
    const t = i / leafCount + jitter;
    const u = 1 - t;
    const x = u * u * x0 + 2 * u * t * x1 + t * t * x2;
    const y = u * u * y0 + 2 * u * t * y1 + t * t * y2;

    const dx = 2 * u * (x1 - x0) + 2 * t * (x2 - x1);
    const dy = 2 * u * (y1 - y0) + 2 * t * (y2 - y1);
    const tangent = Math.atan2(dy, dx) * (180 / Math.PI);

    // alternate leaf sides, with a little natural angle variance
    const offsetAngle = (i % 2 === 0 ? 1 : -1) * (42 + Math.random() * 20);

    // leaves read fuller near the stem and taper off toward the tip
    const fade = 0.6 + 0.4 * (1 - t);

    const kind: LeafData["kind"] = i % 6 === 0 ? "bud" : i % 2 === 0 ? "a" : "b";
    const baseScale = scale * fade * (0.85 + Math.random() * 0.3);

    leaves.push({ x, y, angle: tangent + offsetAngle, scale: baseScale, kind });

    // ~40% chance of a smaller companion leaf tucked behind it, for
    // the fuller, overlapping-cluster look instead of single-file leaves
    if (kind !== "bud" && Math.random() < 0.4) {
      leaves.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        angle: tangent + offsetAngle * (Math.random() < 0.5 ? -1 : 1) + (Math.random() - 0.5) * 20,
        scale: baseScale * (0.55 + Math.random() * 0.2),
        kind: kind === "a" ? "b" : "a",
      });
    }
  }
  return { path: `M ${x0} ${y0} Q ${x1} ${y1} ${x2} ${y2}`, leaves };
}

function StylizedVineOverlay() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const bounceY = useSpring(useTransform(scrollVelocity, [-1500, 1500], [-16, 16]), { stiffness: 42, damping: 11 });
  const swingL = useSpring(useTransform(scrollVelocity, [-1500, 1500], [5, -5]), { stiffness: 42, damping: 11 });
  const swingR = useSpring(useTransform(scrollVelocity, [-1500, 1500], [-5, 5]), { stiffness: 42, damping: 11 });

  // Fuller, corner-to-corner top drape plus long hanging side vines —
  // deliberately dense now that the layer sits behind the content.
  const vines = useMemo(() => ({
    top1: generateVine(-60, -50, 260, 130, 560, -40, 24, 0.62),
    top2: generateVine(160, -50, 510, 190, 860, -40, 26, 0.66),
    top3: generateVine(460, -50, 760, 150, 1060, -40, 24, 0.6),
    top4: generateVine(820, -50, 1060, 110, 1300, -50, 20, 0.55),
    hangL1: generateVine(28, -50, -5, 320, 20, 800, 26, 0.65),
    hangL2: generateVine(75, -50, 42, 160, 60, 460, 16, 0.5),
    hangR1: generateVine(1172, -50, 1205, 320, 1180, 800, 26, 0.65),
    hangR2: generateVine(1125, -50, 1158, 160, 1140, 460, 16, 0.5),
  }), []);

  // Asymmetric, feather-veined leaf silhouette with a light-to-dark
  // gradient fill — reads as an actual leaf rather than a flat cutout.
  const LeafDefs = (
    <>
      <linearGradient id="leafGradA" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#B7E09A" />
        <stop offset="100%" stopColor="#5E9E45" />
      </linearGradient>
      <linearGradient id="leafGradB" x1="0%" y1="10%" x2="100%" y2="90%">
        <stop offset="0%" stopColor="#9FCE7A" />
        <stop offset="100%" stopColor="#4B8A38" />
      </linearGradient>
      <g id="stylized-leaf-a">
        <path
          d="M0 0 C 4 -10, 16 -17, 32 -3 C 27 5, 19 15, 8 12 C 3 10, 0 4, 0 0 Z"
          fill="url(#leafGradA)"
          stroke="#31502C"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path d="M2 -0.5 C 11 -2, 21 -3, 29 -3.5" stroke="#31502C" strokeWidth="0.7" strokeLinecap="round" fill="none" opacity="0.6" />
        <path d="M7 -1.3 L 13 -8 M13 -2 L 20 -10 M19 -2.4 L 25 -8.5 M8 0.6 L 12 6.5 M14 0 L 18 7" stroke="#31502C" strokeWidth="0.55" strokeLinecap="round" opacity="0.5" />
      </g>
      <g id="stylized-leaf-b">
        <path
          d="M0 0 C 5 -9, 15 -13, 27 -1 C 22 6, 13 12, 5 9 C 1 7, 0 3, 0 0 Z"
          fill="url(#leafGradB)"
          stroke="#2C4328"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path d="M2 -0.3 C 9 -1.6, 17 -2, 24 -1.5" stroke="#2C4328" strokeWidth="0.7" strokeLinecap="round" fill="none" opacity="0.6" />
        <path d="M6 -1 L 11 -6.5 M11 -1.6 L 16.5 -8 M6.5 0.6 L 10 5.5 M11.5 0 L 15 6" stroke="#2C4328" strokeWidth="0.55" strokeLinecap="round" opacity="0.5" />
      </g>
      <g id="stylized-bud">
        <circle cx="0" cy="0" r="3" fill="#F3C9D9" stroke="#2C3B2A" strokeWidth="1.1" />
        <circle cx="0.6" cy="-0.6" r="1" fill="#FBE4ED" />
      </g>
    </>
  );

  const renderVineGroup = (data: VineData, thickness = 2.2) => (
    <>
      <path d={data.path} stroke="#2E3B29" strokeWidth={thickness} fill="none" strokeLinecap="round" opacity={0.75} />
      {data.leaves.map((l, i) => (
        <use
          key={i}
          href={l.kind === "bud" ? "#stylized-bud" : l.kind === "a" ? "#stylized-leaf-a" : "#stylized-leaf-b"}
          transform={`translate(${l.x} ${l.y}) rotate(${l.angle}) scale(${l.scale})`}
        />
      ))}
    </>
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      <svg className="absolute top-0 left-0 w-full h-screen" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMin slice">
        <defs>{LeafDefs}</defs>

        {/* TOP SWOOPING CANOPY (full corner-to-corner drape) */}
        <motion.g style={{ y: bounceY }} animate={{ y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
          {renderVineGroup(vines.top1)}
          {renderVineGroup(vines.top3)}
          {renderVineGroup(vines.top4)}
          <motion.g animate={{ y: [0, 6, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
            {renderVineGroup(vines.top2)}
          </motion.g>
        </motion.g>

        {/* LEFT HANGING VINES */}
        <motion.g style={{ rotate: swingL, transformOrigin: "28px 0px" }} animate={{ rotate: [0, 1.5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
          {renderVineGroup(vines.hangL1)}
          <motion.g animate={{ rotate: [0, -1, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} style={{ transformOrigin: "75px 0px" }}>
            {renderVineGroup(vines.hangL2, 1.8)}
          </motion.g>
        </motion.g>

        {/* RIGHT HANGING VINES */}
        <motion.g style={{ rotate: swingR, transformOrigin: "1172px 0px" }} animate={{ rotate: [0, -1.5, 0] }} transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}>
          {renderVineGroup(vines.hangR1)}
          <motion.g animate={{ rotate: [0, 1, 0] }} transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 0.7 }} style={{ transformOrigin: "1125px 0px" }}>
            {renderVineGroup(vines.hangR2, 1.8)}
          </motion.g>
        </motion.g>
      </svg>
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
      {/* 1. Scaled, delicate vines overlay — now sits behind the content */}
      <StylizedVineOverlay />

      {/* 2. Soft background gradient shift */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(194,214,188,0.5),rgba(239,244,236,0.98))] z-0 pointer-events-none"
      />

      <Navbar />

      {/* 3. Main Text Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6">
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
      </main>

      {/* 4. Subtle, interactive ambient petal physics layer */}
      <FallingPetalsCanvas />

      <Footer />
    </div>
  );
}

/* ---------------- FLORAL DIVIDER ---------------- */

function FloralDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-16 opacity-70">
      <div className="h-px bg-gradient-to-r from-transparent via-[#1C2E20]/30 to-transparent w-28 md:w-48" />
      <span className="text-[#1C2E20] text-xs font-serif tracking-widest">✦ ❦ ✦</span>
      <div className="h-px bg-gradient-to-r from-transparent via-[#1C2E20]/30 to-transparent w-28 md:w-48" />
    </div>
  );
}

/* ---------------- STICKY NAVBAR ---------------- */

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
            { id: "roster", label: "The Council" },
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
    </header>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  return (
    <section className="pt-28 pb-12 text-center relative z-10 max-w-3xl mx-auto">
      <motion.div variants={stagger} initial="hidden" animate="visible">
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white border border-[#A6C49F] text-[#1C2E20] text-[11px] font-bold tracking-[0.18em] uppercase shadow-sm">
          <span className="text-xs">✦</span> Sanctuary & Guild
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
          A sanctuary built on kindness, clean progression, and genuine community. Step inside and belong with us.
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
    title: "Sanctuary Reserves Replenished",
    date: "July 15, 2026",
    tag: "Pantry & Vault",
    summary: "Free raid flasks, elixirs, and food feasts have been restocked in the Vault for all participating adventurers.",
  },
];

function Announcements() {
  return (
    <section className="py-6">
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
    <section className="py-6">
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
  { title: "Sanctuary Tea & Lounge", time: "Tue · 9:00 PM EST", requirements: "Casual · Open Voice Chat" },
];

function EventsCalendar() {
  return (
    <section className="py-6">
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
  { title: "Sanctuary Bank Protocols", desc: "Sharing harvests, requesting gear, and contributing raw materials." },
  { title: "Class Build Library", desc: "Member-crafted build guides for optimization without toxicity." },
];

function WikiSection() {
  return (
    <section className="py-6">
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

const councilMembers = [
  { name: "lychee", role: "The Sovereign" },
  { name: "juju", role: "Seraphim" },
  { name: "xSumo", role: "Cherubim" },
];

function Roster() {
  return (
    <section className="py-6">
      <div className="flex items-center gap-3 mb-8">
        <FaShieldAlt className="text-[#1C2E20] text-base" />
        <h2 className="text-2xl font-['Cinzel',serif] text-[#1C2E20] tracking-wider uppercase font-bold">The Council</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {councilMembers.map((c) => (
          <div
            key={c.name}
            className="p-6 rounded-2xl bg-white border border-[#A6C49F] flex items-center gap-4 shadow-sm"
          >
            <div className="w-11 h-11 rounded-full bg-[#E5EFE2] border border-[#A6C49F] flex items-center justify-center font-['Cinzel',serif] text-sm font-bold text-[#1C2E20]">
              {c.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-sm font-['Cinzel',serif] font-bold text-[#1C2E20] tracking-wide">{c.name}</h3>
              <p className="text-[10px] tracking-wider uppercase text-[#2F4832] font-bold">{c.role}</p>
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
    <section className="relative z-10 py-12 text-center max-w-3xl mx-auto">
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
          Whether you seek endgame progression or a tranquil community lounge, our sanctuary doors are always open.
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
    <footer className="text-center py-10 text-[#526354] text-xs font-bold tracking-widest uppercase relative z-10">
      © {new Date().getFullYear()} Eve Guild · Est. 2026 · Planted with Care ❦
    </footer>
  );
}
