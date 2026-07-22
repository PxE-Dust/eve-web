import { useEffect, useRef } from "react";
import { FaDiscord, FaBook, FaCalendarAlt, FaBullhorn, FaShieldAlt } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
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

/* ---------------- FLOATING BOTANICAL LEAVES & SPORES ---------------- */

function BotanicalAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Drifting Leaves */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`leaf-${i}`}
          className="absolute text-[#2F4832]/30 text-2xl"
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
          🌿
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

/* ---------------- HANGING WILLOW & VINE CORNERS ---------------- */

function HangingVines() {
  return (
    <div className="pointer-events-none absolute top-0 inset-x-0 h-56 z-10 overflow-hidden opacity-50">
      {/* Left Hanging Vines */}
      <svg className="absolute left-0 top-0 w-72 h-56 text-[#1C2E20]" viewBox="0 0 200 150" fill="none" stroke="currentColor">
        <path d="M 0 0 Q 30 60 50 120" strokeWidth="1" />
        <path d="M 0 0 Q 60 40 110 90" strokeWidth="0.8" />
        <path d="M 0 0 Q 15 80 20 140" strokeWidth="1" />
        <path d="M 0 0 Q 80 30 140 70" strokeWidth="0.7" />
        <circle cx="50" cy="120" r="3" fill="currentColor" />
        <circle cx="110" cy="90" r="2.5" fill="currentColor" />
        <circle cx="20" cy="140" r="3" fill="currentColor" />
        <circle cx="140" cy="70" r="2" fill="currentColor" />
      </svg>
      {/* Right Hanging Vines */}
      <svg className="absolute right-0 top-0 w-72 h-56 text-[#1C2E20] transform scale-x-[-1]" viewBox="0 0 200 150" fill="none" stroke="currentColor">
        <path d="M 0 0 Q 30 60 50 120" strokeWidth="1" />
        <path d="M 0 0 Q 60 40 110 90" strokeWidth="0.8" />
        <path d="M 0 0 Q 15 80 20 140" strokeWidth="1" />
        <path d="M 0 0 Q 80 30 140 70" strokeWidth="0.7" />
        <circle cx="50" cy="120" r="3" fill="currentColor" />
        <circle cx="110" cy="90" r="2.5" fill="currentColor" />
        <circle cx="20" cy="140" r="3" fill="currentColor" />
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
    <div className="relative bg-[#EFF4EC] text-[#273229] min-h-screen antialiased overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      <BotanicalAtmosphere />
      <CoolGlow />
      <HangingVines />

      {/* Softer, Slightly Deeper Background Ambient Vignette */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(194,214,188,0.4),rgba(239,244,236,0.95))] z-0 pointer-events-none"
      />

      <Navbar />
      <Hero />
      <FloralDivider />
      <GuildRulesSection />
      <FloralDivider />
      <Announcements />
      <FloralDivider />
      <EventsCalendar />
      <FloralDivider />
      <WikiSection />
      <FloralDivider />
      <Roster />
      <FloralDivider />
      <JoinSection />
      <Footer />
    </div>
  );
}

/* ---------------- BOTANICAL DIVIDER ---------------- */

function FloralDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-16 opacity-80">
      <div className="h-px bg-gradient-to-r from-transparent via-[#1C2E20]/30 to-transparent w-28 md:w-48" />
      <span className="text-[#1C2E20] text-sm">🌱</span>
      <div className="h-px bg-gradient-to-r from-transparent via-[#1C2E20]/30 to-transparent w-28 md:w-48" />
    </div>
  );
}

/* ---------------- NAVBAR ---------------- */

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#EFF4EC]/95 border-b border-[#1C2E20]/15 backdrop-blur-md shadow-xs">
      <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#DCE7D8] border border-[#A6C49F] flex items-center justify-center text-[#1C2E20] text-sm">
            🌿
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
            { id: "rules", label: "Guidelines" },
            { id: "announcements", label: "News" },
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
    </nav>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  return (
    <section className="pt-40 pb-12 text-center relative z-10 max-w-4xl mx-auto px-6">
      <motion.div variants={stagger} initial="hidden" animate="visible">
        {/* Crisp Badge */}
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white border border-[#A6C49F] text-[#1C2E20] text-[11px] font-bold tracking-[0.18em] uppercase shadow-sm">
          <span>🌿</span> Garden Sanctuary & Guild
        </motion.div>

        {/* Script Accent Subtitle */}
        <motion.p
          variants={fadeUp}
          className="font-['Alex_Brush',cursive] text-4xl md:text-5xl text-[#2F4832] mb-1 font-semibold"
        >
          Enjoy Your Time at
        </motion.p>

        {/* High Elegance Main Header */}
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
            href="#rules"
            className="px-8 py-3.5 rounded-2xl bg-white border border-[#1C2E20]/30 text-[#1C2E20] text-xs font-bold tracking-widest uppercase hover:border-[#1C2E20] transition shadow-sm"
          >
            Read Guidelines
          </a>
        </motion.div>
      </motion.div>
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
    <section id="rules" className="max-w-4xl mx-auto px-6 py-6">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="text-center mb-10">
        <span className="text-[10px] tracking-[0.25em] text-[#1C2E20] uppercase font-bold block mb-1">
          Sanctuary Covenant
        </span>
        <h2 className="text-3xl md:text-4xl font-['Cinzel',serif] text-[#1C2E20] font-bold tracking-wider uppercase">
          Guild Guidelines
        </h2>
      </motion.div>

      {/* Crisp White Card Container against Sage Mist */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        className="p-8 md:p-10 rounded-3xl bg-white border border-[#A6C49F] shadow-lg relative overflow-hidden"
      >
        <div className="absolute top-3 left-3 text-[#1C2E20]/30 text-sm">🌿</div>
        <div className="absolute top-3 right-3 text-[#1C2E20]/30 text-sm">🌿</div>
        <div className="absolute bottom-3 left-3 text-[#1C2E20]/30 text-sm">🌿</div>
        <div className="absolute bottom-3 right-3 text-[#1C2E20]/30 text-sm">🌿</div>

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {rules.map((r, idx) => (
            <div key={idx} className="flex flex-col p-5 rounded-2xl bg-[#F4F8F3] border border-[#D0E2CC]">
              <span className="font-['Cinzel',serif] text-xs font-bold tracking-widest text-[#1C2E20] mb-2 flex items-center gap-1">
                🪴 0{idx + 1}.
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
    <section id="announcements" className="max-w-5xl mx-auto px-6 py-6">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="flex items-center gap-3 mb-8">
        <FaBullhorn className="text-[#1C2E20] text-base" />
        <h2 className="text-2xl font-['Cinzel',serif] text-[#1C2E20] tracking-wider uppercase font-bold">Announcements</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {announcementData.map((item) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
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
          </motion.div>
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
    <section id="events" className="max-w-5xl mx-auto px-6 py-6">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="flex items-center gap-3 mb-8">
        <FaCalendarAlt className="text-[#1C2E20] text-base" />
        <h2 className="text-2xl font-['Cinzel',serif] text-[#1C2E20] tracking-wider uppercase font-bold">Gatherings</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {eventData.map((e) => (
          <motion.div
            key={e.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            whileHover={{ y: -3 }}
            className="p-6 rounded-2xl bg-white border border-[#A6C49F] shadow-sm hover:shadow-md transition"
          >
            <span className="text-[10px] tracking-widest font-bold text-[#2F4832] block mb-2 uppercase">{e.time}</span>
            <h3 className="text-base font-['Cinzel',serif] font-bold mb-2 text-[#1C2E20]">{e.title}</h3>
            <p className="text-xs text-[#526354] border-t border-stone-100 pt-3 mt-3 font-medium">{e.requirements}</p>
          </motion.div>
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
    <section id="wiki" className="max-w-5xl mx-auto px-6 py-6">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="flex items-center gap-3 mb-8">
        <FaBook className="text-[#1C2E20] text-base" />
        <h2 className="text-2xl font-['Cinzel',serif] text-[#1C2E20] tracking-wider uppercase font-bold">Field Guides</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {wikiTopics.map((w) => (
          <motion.div
            key={w.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="p-6 rounded-2xl bg-white border border-[#A6C49F] shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-base font-['Cinzel',serif] font-bold mb-2 text-[#1C2E20]">{w.title}</h3>
            <p className="text-xs text-[#3A483C] mb-4 leading-relaxed font-medium">{w.desc}</p>
            <a href="#" className="text-[11px] text-[#1C2E20] tracking-widest font-bold uppercase hover:underline flex items-center gap-1">
              Read Guide →
            </a>
          </motion.div>
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
    <section id="roster" className="max-w-5xl mx-auto px-6 py-6">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="flex items-center gap-3 mb-8">
        <FaShieldAlt className="text-[#1C2E20] text-base" />
        <h2 className="text-2xl font-['Cinzel',serif] text-[#1C2E20] tracking-wider uppercase font-bold">Guardians</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {officers.map((o) => (
          <motion.div
            key={o.name}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- JOIN / CONTACT ---------------- */

function JoinSection() {
  return (
    <section id="join" className="relative z-10 py-12 text-center max-w-3xl mx-auto px-6">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        className="p-10 md:p-14 rounded-3xl bg-white border border-[#A6C49F] shadow-lg relative"
      >
        <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[#E5EFE2] border border-[#A6C49F] flex items-center justify-center text-[#1C2E20] text-sm">
          🌱
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
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-[#1C2E20] text-[#EFF4EC] text-xs font-bold tracking-widest uppercase hover:bg-[#122015] transition shadow-md"
          >
            <FaDiscord className="text-base" /> Join Our Discord
          </a>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <footer className="text-center py-10 text-[#526354] text-xs font-bold tracking-widest uppercase">
      © {new Date().getFullYear()} Eve Guild · Est. 2026 · Planted with Care 🌿
    </footer>
  );
}
