import { useEffect, useRef } from "react";
import { FaDiscord, FaBook, FaCalendarAlt, FaBullhorn, FaShieldAlt } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";

/* ---------------- ANIMATION VARIANTS ---------------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ---------------- AMBIENT MIST & GLOW ---------------- */

function AmbientGlow() {
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
      className="pointer-events-none fixed top-0 left-0 w-[240px] h-[240px] rounded-full bg-[#E5EDE0]/40 blur-3xl z-0 transition-transform duration-150 ease-out"
    />
  );
}

/* ---------------- HANGING WILLOW SVG ACCENTS ---------------- */

function WillowBranches() {
  return (
    <div className="pointer-events-none absolute top-0 inset-x-0 h-48 z-10 overflow-hidden opacity-30">
      {/* Left Hanging Vines */}
      <svg className="absolute left-0 top-0 w-64 h-48 text-[#2F4832]" viewBox="0 0 200 150" fill="none" stroke="currentColor">
        <path d="M 0 0 Q 30 60 50 120" strokeWidth="1" />
        <path d="M 0 0 Q 60 40 110 90" strokeWidth="0.8" />
        <path d="M 0 0 Q 15 80 20 140" strokeWidth="1" />
        <circle cx="50" cy="120" r="2" fill="currentColor" />
        <circle cx="110" cy="90" r="2" fill="currentColor" />
        <circle cx="20" cy="140" r="2" fill="currentColor" />
      </svg>
      {/* Right Hanging Vines */}
      <svg className="absolute right-0 top-0 w-64 h-48 text-[#2F4832] transform scale-x-[-1]" viewBox="0 0 200 150" fill="none" stroke="currentColor">
        <path d="M 0 0 Q 30 60 50 120" strokeWidth="1" />
        <path d="M 0 0 Q 60 40 110 90" strokeWidth="0.8" />
        <path d="M 0 0 Q 15 80 20 140" strokeWidth="1" />
        <circle cx="50" cy="120" r="2" fill="currentColor" />
        <circle cx="110" cy="90" r="2" fill="currentColor" />
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
      "https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div className="relative bg-[#FDFBF7] text-[#2C352E] min-h-screen antialiased overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      <AmbientGlow />
      <WillowBranches />

      {/* Subtle Mist Radial */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(216,228,212,0.35),transparent_70%)] z-0 pointer-events-none"
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
    <div className="flex items-center justify-center gap-3 my-20 opacity-70">
      <div className="h-px bg-gradient-to-r from-transparent via-[#2F4832]/20 to-transparent w-28 md:w-44" />
      <svg className="w-5 h-5 text-[#2F4832]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 2C12 2 14.5 8 19 9C14.5 10 12 16 12 16C12 16 9.5 10 5 9C9.5 8 12 2 12 2Z" />
        <path d="M12 16V22" />
      </svg>
      <div className="h-px bg-gradient-to-r from-transparent via-[#2F4832]/20 to-transparent w-28 md:w-44" />
    </div>
  );
}

/* ---------------- NAVBAR ---------------- */

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#FDFBF7]/90 border-b border-[#2F4832]/10 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="font-['Cinzel',serif] tracking-[0.25em] text-[#2F4832] font-semibold text-xl uppercase">
            Eve
          </span>
          <span className="text-[10px] tracking-[0.2em] text-[#2F4832]/60 uppercase border-l border-[#2F4832]/20 pl-4 py-0.5">
            Est. 2026
          </span>
        </div>

        <div className="hidden md:flex space-x-8 text-xs tracking-widest text-[#2C352E]/70 font-medium uppercase">
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
              className="hover:text-[#2F4832] transition hover:underline underline-offset-8 decoration-[#8FA885]"
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
    <section className="pt-44 pb-16 text-center relative z-10 max-w-4xl mx-auto px-6">
      <motion.div variants={stagger} initial="hidden" animate="visible">
        {/* Top Framing Pill */}
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-6 px-4 py-1 rounded-full bg-[#E8EFE5] border border-[#C5D8C0] text-[#2F4832] text-[11px] font-medium tracking-[0.2em] uppercase">
          Garden Sanctuary & Guild
        </motion.div>

        {/* Script Accent Subtitle */}
        <motion.p
          variants={fadeUp}
          className="font-['Alex_Brush',cursive] text-4xl md:text-5xl text-[#2F4832] mb-1"
        >
          Enjoy Your Time at
        </motion.p>

        {/* High Elegance Main Header */}
        <motion.h1
          variants={fadeUp}
          className="text-6xl md:text-8xl font-['Cinzel',serif] font-normal tracking-[0.15em] text-[#2F4832] uppercase mb-6"
        >
          Eve
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="font-['Cormorant_Garamond',serif] italic text-2xl md:text-3xl text-[#526354] max-w-xl mx-auto mb-8 font-light"
        >
          "We Welcome All"
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="text-sm md:text-base text-stone-600 max-w-lg mx-auto leading-relaxed font-light mb-10"
        >
          A peaceful, garden-inspired community blooming in the wild. We cultivate clean progression, calm coordination, and genuine warmth under open skies.
        </motion.p>

        <motion.div variants={fadeUp} className="flex justify-center gap-5">
          <a
            href="#join"
            className="px-8 py-3.5 rounded-full bg-[#2F4832] text-[#FDFBF7] text-xs font-medium tracking-widest uppercase hover:bg-[#223625] transition shadow-sm"
          >
            Apply to Guild
          </a>
          <a
            href="#events"
            className="px-8 py-3.5 rounded-full bg-white border border-[#2F4832]/20 text-[#2C352E] text-xs font-medium tracking-widest uppercase hover:border-[#2F4832] transition shadow-sm"
          >
            View Schedule
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------- GUIDELINES (Garden / Frame Design) ---------------- */

function GuildRulesSection() {
  const rules = [
    { title: "Warmth & Inclusivity", desc: "We are a safe, welcoming space for players of all paths, backgrounds, and playstyles." },
    { title: "Patience & Calm", desc: "Constructive feedback over toxicity. We clear challenging content together with patience and good cheer." },
    { title: "Shared Harvests", desc: "Pass along potions, feasts, and knowledge from the Grove Bank to support fellow members freely." },
  ];

  return (
    <section id="rules" className="max-w-4xl mx-auto px-6 py-8">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="text-center mb-12">
        <span className="text-[10px] tracking-[0.25em] text-[#2F4832]/70 uppercase font-semibold block mb-2">
          Sanctuary Covenant
        </span>
        <h2 className="text-3xl md:text-4xl font-['Cinzel',serif] text-[#2F4832] tracking-wider uppercase">
          Guild Guidelines
        </h2>
      </motion.div>

      {/* Elegant Line Framed Card */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        className="p-8 md:p-12 rounded-2xl bg-white/80 border border-[#2F4832]/20 shadow-sm relative"
      >
        {/* Subtle Frame Corner Markers */}
        <div className="absolute top-3 left-3 text-[#2F4832]/30 text-xs">┼</div>
        <div className="absolute top-3 right-3 text-[#2F4832]/30 text-xs">┼</div>
        <div className="absolute bottom-3 left-3 text-[#2F4832]/30 text-xs">┼</div>
        <div className="absolute bottom-3 right-3 text-[#2F4832]/30 text-xs">┼</div>

        <div className="grid md:grid-cols-3 gap-8">
          {rules.map((r, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="font-['Cinzel',serif] text-xs tracking-widest text-[#8FA885] mb-2">
                0{idx + 1}
              </span>
              <h3 className="font-['Cinzel',serif] text-base text-[#2F4832] mb-2 tracking-wide">
                {r.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
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
    summary: "Our journey into the new season begins this Friday! Join us in the voice sanctuary for pre-expedition preparations.",
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
    <section id="announcements" className="max-w-5xl mx-auto px-6 py-8">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="flex items-center gap-3 mb-8">
        <FaBullhorn className="text-[#2F4832] text-sm" />
        <h2 className="text-2xl font-['Cinzel',serif] text-[#2F4832] tracking-wider uppercase">Announcements</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {announcementData.map((item) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="p-8 rounded-xl bg-white/70 border border-[#2F4832]/15 shadow-sm hover:border-[#2F4832]/40 transition"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] tracking-widest px-3 py-1 rounded-full bg-[#E8EFE5] text-[#2F4832] font-semibold uppercase">
                {item.tag}
              </span>
              <span className="text-xs text-stone-400 font-light">{item.date}</span>
            </div>
            <h3 className="text-lg font-['Cinzel',serif] mb-2 text-[#2F4832] tracking-wide">{item.title}</h3>
            <p className="text-stone-600 text-xs leading-relaxed font-light">{item.summary}</p>
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
    <section id="events" className="max-w-5xl mx-auto px-6 py-8">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="flex items-center gap-3 mb-8">
        <FaCalendarAlt className="text-[#2F4832] text-sm" />
        <h2 className="text-2xl font-['Cinzel',serif] text-[#2F4832] tracking-wider uppercase">Gatherings</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {eventData.map((e) => (
          <motion.div
            key={e.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            whileHover={{ y: -3 }}
            className="p-6 rounded-xl bg-white/70 border border-[#2F4832]/15 shadow-sm hover:border-[#2F4832]/40 transition"
          >
            <span className="text-[10px] tracking-widest font-semibold text-[#526354] block mb-2 uppercase">{e.time}</span>
            <h3 className="text-base font-['Cinzel',serif] mb-2 text-[#2F4832]">{e.title}</h3>
            <p className="text-xs text-stone-500 border-t border-stone-100 pt-3 mt-3 font-light">{e.requirements}</p>
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
    <section id="wiki" className="max-w-5xl mx-auto px-6 py-8">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="flex items-center gap-3 mb-8">
        <FaBook className="text-[#2F4832] text-sm" />
        <h2 className="text-2xl font-['Cinzel',serif] text-[#2F4832] tracking-wider uppercase">Field Guides</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {wikiTopics.map((w) => (
          <motion.div
            key={w.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="p-6 rounded-xl bg-white/50 border border-[#2F4832]/10 hover:bg-white transition"
          >
            <h3 className="text-base font-['Cinzel',serif] mb-2 text-[#2F4832]">{w.title}</h3>
            <p className="text-xs text-stone-600 mb-4 leading-relaxed font-light">{w.desc}</p>
            <a href="#" className="text-[11px] text-[#2F4832] tracking-widest font-semibold uppercase hover:underline flex items-center gap-1">
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
    <section id="roster" className="max-w-5xl mx-auto px-6 py-8">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="flex items-center gap-3 mb-8">
        <FaShieldAlt className="text-[#2F4832] text-sm" />
        <h2 className="text-2xl font-['Cinzel',serif] text-[#2F4832] tracking-wider uppercase">Guardians</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {officers.map((o) => (
          <motion.div
            key={o.name}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="p-6 rounded-xl bg-white/70 border border-[#2F4832]/15 flex items-center gap-4 shadow-sm"
          >
            <div className="w-10 h-10 rounded-full bg-[#E8EFE5] border border-[#C5D8C0] flex items-center justify-center font-['Cinzel',serif] text-sm font-semibold text-[#2F4832]">
              {o.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-sm font-['Cinzel',serif] text-[#2F4832] tracking-wide">{o.name}</h3>
              <p className="text-[10px] tracking-wider uppercase text-[#526354] font-medium">{o.role}</p>
              <p className="text-[11px] text-stone-400 font-light">{o.class}</p>
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
        className="p-10 md:p-14 rounded-2xl bg-white/80 border border-[#2F4832]/20 shadow-sm relative"
      >
        <span className="font-['Alex_Brush',cursive] text-4xl text-[#2F4832] block mb-1">
          Welcome Home
        </span>
        <h2 className="text-3xl md:text-4xl font-['Cinzel',serif] text-[#2F4832] tracking-wider uppercase mb-3">
          Find Your Place in Eve
        </h2>
        <p className="font-['Cormorant_Garamond',serif] italic text-xl text-[#526354] mb-6 font-light">
          "We Welcome All"
        </p>
        <p className="text-stone-600 text-xs md:text-sm mb-8 max-w-md mx-auto leading-relaxed font-light">
          Whether you seek endgame progression or a tranquil community lounge under open branches, our sanctuary doors are always open.
        </p>
        <div className="flex justify-center">
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#2F4832] text-[#FDFBF7] text-xs font-medium tracking-widest uppercase hover:bg-[#223625] transition shadow-md"
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
    <footer className="text-center py-10 text-stone-400 text-xs font-light tracking-widest uppercase">
      © {new Date().getFullYear()} Eve Guild · Est. 2026 · Planted with Care
    </footer>
  );
}
