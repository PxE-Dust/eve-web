import { useEffect, useRef } from "react";
import { FaDiscord, FaBook, FaCalendarAlt, FaBullhorn, FaLeaf, FaShieldAlt } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";

/* ---------------- ANIMATION VARIANTS ---------------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ---------------- SUNLIGHT GLOW ---------------- */

function SunGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate(${e.clientX - 60}px, ${e.clientY - 60}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 w-[120px] h-[120px] rounded-full bg-amber-200/40 blur-3xl z-0"
    />
  );
}

/* ---------------- DRIFTING LEAVES / SPORES ---------------- */

function DriftingLeaves() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-emerald-600/20 text-xs"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
            rotate: Math.random() * 360,
          }}
          animate={{
            y: [-30, 30, -30],
            x: [-20, 20, -20],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 14 + Math.random() * 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🍃
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------- APP ---------------- */

export default function App() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, -80]);

  return (
    <div className="relative bg-stone-50 text-stone-800 min-h-screen antialiased overflow-hidden font-sans">
      <DriftingLeaves />
      <SunGlow />

      {/* Subtle Sunbeam Radial Gradient */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(240,253,244,0.8),transparent_70%)] z-0 pointer-events-none"
      />

      <Navbar />
      <Hero />
      <Divider />
      <Announcements />
      <Divider />
      <EventsCalendar />
      <Divider />
      <WikiSection />
      <Divider />
      <Roster />
      <Divider />
      <JoinSection />
      <Footer />
    </div>
  );
}

/* ---------------- SHARED ---------------- */

function Divider() {
  return <div className="h-px bg-emerald-900/10 my-20 max-w-6xl mx-auto" />;
}

/* ---------------- NAVBAR ---------------- */

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-stone-50/80 border-b border-emerald-900/10 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
            <FaLeaf className="text-sm" />
          </div>
          <span className="font-semibold tracking-wider text-emerald-900 text-lg uppercase font-serif">
            Eve
          </span>
        </div>

        <div className="hidden md:flex space-x-6 text-sm text-stone-600 font-medium">
          {[
            { id: "announcements", label: "Announcements" },
            { id: "events", label: "Events & Raids" },
            { id: "wiki", label: "Wiki" },
            { id: "roster", label: "Roster" },
            { id: "join", label: "Join Us" },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="hover:text-emerald-700 transition"
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
    <section className="pt-40 pb-20 text-center relative z-10 max-w-4xl mx-auto px-6">
      <motion.div variants={stagger} initial="hidden" animate="visible">
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-300/60 text-emerald-800 text-xs font-semibold tracking-wide uppercase">
          <FaLeaf className="text-emerald-600" /> Sanctuary for Adventurers
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-7xl font-serif font-normal mb-6 leading-tight tracking-tight text-emerald-950"
        >
          Welcome to <span className="text-emerald-700 italic">Eve</span>.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed font-light"
        >
          A grounded, welcoming community blooming in the wild. We cultivate clean progression, calm coordination, and lasting friendships under open skies.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 flex justify-center gap-4">
          <a
            href="#join"
            className="px-6 py-3 rounded-xl bg-emerald-700 text-stone-50 font-medium hover:bg-emerald-800 transition shadow-sm"
          >
            Apply to Guild
          </a>
          <a
            href="#events"
            className="px-6 py-3 rounded-xl bg-white border border-stone-200 text-stone-700 font-medium hover:border-emerald-400 transition shadow-sm"
          >
            Explore Schedule
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
    tag: "Guild News",
    summary: "Our journey into the new season begins this Friday! Prepare your gear and join us for ritual prep before the gates open.",
  },
  {
    title: "Guild Bank & Botanist Reserves",
    date: "July 15, 2026",
    tag: "Pantry & Stock",
    summary: "Free raid flasks, potions, and food feasts have been replenished in the Grove Bank for all active members.",
  },
];

function Announcements() {
  return (
    <section id="announcements" className="max-w-6xl mx-auto px-6 py-8">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="flex items-center gap-3 mb-8">
        <FaBullhorn className="text-emerald-700 text-xl" />
        <h2 className="text-3xl font-serif text-emerald-950">Grove Announcements</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {announcementData.map((item) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-900/10 shadow-sm hover:border-emerald-300 transition"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                {item.tag}
              </span>
              <span className="text-xs text-stone-400">{item.date}</span>
            </div>
            <h3 className="text-xl font-medium mb-2 text-stone-800">{item.title}</h3>
            <p className="text-stone-600 text-sm leading-relaxed">{item.summary}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- EVENTS / CALENDAR ---------------- */

const eventData = [
  { title: "Main Expedition: Hard Mode", time: "Fri · 8:00 PM EST", requirements: "ilvl 620+ · Consumables Provided" },
  { title: "Wanderer's Catch-up Raid", time: "Sat · 6:00 PM EST", requirements: "Open to All Sprouts & Members" },
  { title: "Guild Gathering & Dungeons", time: "Tue · 9:00 PM EST", requirements: "Casual · Cozy Voice Lounge" },
];

function EventsCalendar() {
  return (
    <section id="events" className="max-w-6xl mx-auto px-6 py-8">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="flex items-center gap-3 mb-8">
        <FaCalendarAlt className="text-emerald-700 text-xl" />
        <h2 className="text-3xl font-serif text-emerald-950">Upcoming Gatherings</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {eventData.map((e) => (
          <motion.div
            key={e.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl bg-white/80 border border-emerald-900/10 shadow-sm hover:border-emerald-400/50 hover:shadow-md transition"
          >
            <span className="text-xs font-semibold text-emerald-700 block mb-1 uppercase tracking-wider">{e.time}</span>
            <h3 className="text-lg font-medium mb-2 text-stone-800">{e.title}</h3>
            <p className="text-xs text-stone-500 border-t border-stone-100 pt-3 mt-3">{e.requirements}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- WIKI ---------------- */

const wikiTopics = [
  { title: "Herbalism & Raid Elixirs", desc: "Required pots, food feasts, and elemental blessings for raid night." },
  { title: "Grove Bank Protocols", desc: "Sharing harvests, requesting gear, and contributing raw materials." },
  { title: "Class Build Vault", desc: "Member-crafted build guides for optimization without toxicity." },
];

function WikiSection() {
  return (
    <section id="wiki" className="max-w-6xl mx-auto px-6 py-8">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="flex items-center gap-3 mb-8">
        <FaBook className="text-emerald-700 text-xl" />
        <h2 className="text-3xl font-serif text-emerald-950">Field Guides & Lore</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {wikiTopics.map((w) => (
          <motion.div
            key={w.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="p-6 rounded-2xl bg-white/60 border border-stone-200/80 hover:bg-white transition"
          >
            <h3 className="text-lg font-medium mb-2 text-stone-800">{w.title}</h3>
            <p className="text-sm text-stone-600 mb-4 leading-relaxed">{w.desc}</p>
            <a href="#" className="text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1">
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
    <section id="roster" className="max-w-6xl mx-auto px-6 py-8">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="flex items-center gap-3 mb-8">
        <FaShieldAlt className="text-emerald-700 text-xl" />
        <h2 className="text-3xl font-serif text-emerald-950">Grove Guardians</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {officers.map((o) => (
          <motion.div
            key={o.name}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="p-6 rounded-2xl bg-white/80 border border-emerald-900/10 flex items-center gap-4 shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center font-bold text-emerald-800">
              {o.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-medium text-stone-800">{o.name}</h3>
              <p className="text-xs text-emerald-700 font-medium">{o.role}</p>
              <p className="text-xs text-stone-400">{o.class}</p>
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
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="p-10 rounded-3xl bg-gradient-to-b from-emerald-50/80 to-stone-100 border border-emerald-200/60 shadow-sm">
        <FaLeaf className="text-3xl text-emerald-700 mx-auto mb-4" />
        <h2 className="text-3xl font-serif text-emerald-950 mb-3">Find Your Home in Eve</h2>
        <p className="text-stone-600 text-sm mb-6 max-w-md mx-auto leading-relaxed">
          Whether you are looking for high-tier progression or a tranquil community lounge, our doors are open.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 text-stone-50 font-medium hover:bg-emerald-800 transition shadow-sm"
          >
            <FaDiscord className="text-lg" /> Join Our Discord
          </a>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <footer className="text-center py-8 text-stone-400 text-sm">
      © {new Date().getFullYear()} Eve Guild · Planted with Care 🌱
    </footer>
  );
}
