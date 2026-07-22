import { useEffect, useRef } from "react";
import { FaDiscord, FaBook, FaCalendarAlt, FaBullhorn, FaShieldAlt, FaHeart } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";

/* ---------------- ANIMATION VARIANTS ---------------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

/* ---------------- DRIFTING BUTTERFLIES & FIREFLIES ---------------- */

function AmbientNature() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Drifting Golden Butterflies */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`butterfly-${i}`}
          className="absolute text-amber-500/40 text-xl"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-30, 30, -30],
            rotate: [-10, 15, -10],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🦋
        </motion.div>
      ))}

      {/* Floating Soft Glow Spores */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.div
          key={`spore-${i}`}
          className="absolute w-2 h-2 rounded-full bg-amber-200/50 blur-[1px]"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
            opacity: 0.2,
          }}
          animate={{
            y: [-40, 40, -40],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ---------------- CURSED / SUNLIGHT MOUSE GLOW ---------------- */

function SunGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate(${e.clientX - 100}px, ${e.clientY - 100}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 w-[200px] h-[200px] rounded-full bg-amber-100/30 blur-3xl z-0 transition-transform duration-100 ease-out"
    />
  );
}

/* ---------------- MAIN APP ---------------- */

export default function App() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, -100]);

  useEffect(() => {
    // Inject custom elegant fonts dynamically
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div className="relative bg-[#f7f6f0] text-stone-800 min-h-screen antialiased overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      <AmbientNature />
      <SunGlow />

      {/* Sunbeam Light Gradient */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_10%,rgba(163,193,150,0.25),transparent_60%)] z-0 pointer-events-none"
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

/* ---------------- FLORAL DIVIDER ---------------- */

function FloralDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-16 opacity-60">
      <div className="h-px bg-gradient-to-r from-transparent via-[#2F4832]/30 to-transparent w-32 md:w-48" />
      <span className="text-amber-600 text-sm">🌸</span>
      <div className="h-px bg-gradient-to-r from-transparent via-[#2F4832]/30 to-transparent w-32 md:w-48" />
    </div>
  );
}

/* ---------------- NAVBAR ---------------- */

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#f7f6f0]/85 border-b border-[#2F4832]/10 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#9AB88A]/20 border border-[#9AB88A] flex items-center justify-center text-[#2F4832]">
            <span className="text-lg">🦋</span>
          </div>
          <div>
            <span className="font-['Playfair_Display',serif] tracking-wider text-[#2F4832] font-semibold text-xl uppercase block leading-none">
              Eve
            </span>
            <span className="text-[10px] tracking-widest text-stone-500 uppercase font-medium">Est. 2026</span>
          </div>
        </div>

        <div className="hidden md:flex space-x-7 text-sm text-stone-600 font-medium">
          {[
            { id: "rules", label: "Rules" },
            { id: "announcements", label: "Announcements" },
            { id: "events", label: "Gatherings" },
            { id: "wiki", label: "Guides" },
            { id: "roster", label: "Guardians" },
            { id: "join", label: "Join Us" },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="hover:text-[#2F4832] transition hover:underline underline-offset-8 decoration-amber-400"
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
    <section className="pt-40 pb-16 text-center relative z-10 max-w-4xl mx-auto px-6">
      <motion.div variants={stagger} initial="hidden" animate="visible">
        {/* Arch Branding Card Preview */}
        <motion.div variants={fadeUp} className="mx-auto mb-8 w-48 h-64 rounded-t-full bg-[#9AB88A]/30 border-2 border-[#9AB88A]/60 flex flex-col items-center justify-center p-6 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
          <span className="text-3xl mb-1">🦋</span>
          <h1 className="font-['Caveat',cursive] text-5xl text-[#2F4832] font-bold leading-tight">Eve</h1>
          <p className="text-[11px] uppercase tracking-widest text-stone-600 font-semibold mt-1">Est. 2026</p>
        </motion.div>

        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-[#9AB88A]/20 border border-[#9AB88A]/40 text-[#2F4832] text-xs font-semibold tracking-wider uppercase">
          <span className="text-amber-500">✨</span> Sanctuary & Community
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="text-4xl md:text-6xl font-['Playfair_Display',serif] font-normal mb-3 text-[#2F4832] tracking-tight"
        >
          Welcome to <span className="italic font-normal">Eve</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="font-['Caveat',cursive] text-4xl text-amber-700 font-bold mb-6"
        >
          "We Welcome All"
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="text-base md:text-lg text-stone-600 max-w-xl mx-auto leading-relaxed font-light mb-8"
        >
          A botanical haven built on kindness, progression, and genuine friendship. Step under the canopy and grow with us.
        </motion.p>

        <motion.div variants={fadeUp} className="flex justify-center gap-4">
          <a
            href="#join"
            className="px-7 py-3 rounded-2xl bg-[#2F4832] text-[#f7f6f0] font-medium hover:bg-[#233826] transition shadow-md hover:shadow-lg"
          >
            Apply to Guild
          </a>
          <a
            href="#rules"
            className="px-7 py-3 rounded-2xl bg-white border border-stone-200 text-stone-700 font-medium hover:border-[#9AB88A] transition shadow-sm"
          >
            Read Guidelines
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------- GUILD RULES (Chalkboard / Botanical Card Theme) ---------------- */

function GuildRulesSection() {
  const rules = [
    { title: "Inclusivity First", desc: "We are a safe, welcoming sanctuary for players of all backgrounds, experience levels, and playstyles." },
    { title: "Kindness & Calm", desc: "Constructive feedback over toxicity. We clear content together with patience and good spirits." },
    { title: "Community Support", desc: "Share resources, assist sprouts, and pass along gear or alchemy from the Grove Bank freely." },
  ];

  return (
    <section id="rules" className="max-w-4xl mx-auto px-6 py-8">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-['Playfair_Display',serif] text-[#2F4832] mb-2">Guild Guidelines</h2>
        <p className="font-['Caveat',cursive] text-2xl text-stone-500">To ensure the fun and safety of the guild</p>
      </motion.div>

      {/* Chalkboard Styled Container matching your image */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        className="p-8 md:p-12 rounded-3xl bg-[#232725] text-stone-100 border-4 border-[#333a36] shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-4 right-4 text-3xl opacity-20">🌿</div>
        <div className="absolute bottom-4 left-4 text-3xl opacity-20">🪴</div>

        <div className="grid md:grid-cols-3 gap-6 relative z-10">
          {rules.map((r, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="font-['Caveat',cursive] text-2xl text-amber-300 block mb-1">0{idx + 1}.</span>
              <h3 className="font-['Playfair_Display',serif] text-lg text-emerald-200 mb-2">{r.title}</h3>
              <p className="text-xs text-stone-300 leading-relaxed font-light">{r.desc}</p>
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
    summary: "Our journey into the new season begins this Friday! Prepare your gear and join us in voice chat for pre-raid rituals.",
  },
  {
    title: "Botanist Reserves Replenished",
    date: "July 15, 2026",
    tag: "Pantry & Stock",
    summary: "Free raid flasks, potions, and food feasts are ready in the Grove Vault for all members participating in progression.",
  },
];

function Announcements() {
  return (
    <section id="announcements" className="max-w-5xl mx-auto px-6 py-8">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="flex items-center gap-3 mb-8">
        <FaBullhorn className="text-[#2F4832] text-xl" />
        <h2 className="text-3xl font-['Playfair_Display',serif] text-[#2F4832]">Grove Announcements</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {announcementData.map((item) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="p-7 rounded-2xl bg-white/80 border border-[#2F4832]/10 shadow-sm hover:border-[#9AB88A] transition"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs px-3 py-1 rounded-full bg-[#9AB88A]/20 text-[#2F4832] font-semibold">
                {item.tag}
              </span>
              <span className="text-xs text-stone-400">{item.date}</span>
            </div>
            <h3 className="text-xl font-['Playfair_Display',serif] mb-2 text-stone-800">{item.title}</h3>
            <p className="text-stone-600 text-sm leading-relaxed">{item.summary}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- EVENTS / CALENDAR ---------------- */

const eventData = [
  { title: "Main Expedition: Progression", time: "Fri · 8:00 PM EST", requirements: "ilvl 620+ · Consumables Provided" },
  { title: "Sprout & Catch-up Raid", time: "Sat · 6:00 PM EST", requirements: "Open to All Guild Members" },
  { title: "Cozy Dungeon & Coffee Night", time: "Tue · 9:00 PM EST", requirements: "Casual · Open Voice Lounge" },
];

function EventsCalendar() {
  return (
    <section id="events" className="max-w-5xl mx-auto px-6 py-8">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="flex items-center gap-3 mb-8">
        <FaCalendarAlt className="text-[#2F4832] text-xl" />
        <h2 className="text-3xl font-['Playfair_Display',serif] text-[#2F4832]">Upcoming Gatherings</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {eventData.map((e) => (
          <motion.div
            key={e.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl bg-white/80 border border-[#2F4832]/10 shadow-sm hover:border-amber-400 transition"
          >
            <span className="text-xs font-semibold text-amber-700 block mb-1 uppercase tracking-wider">{e.time}</span>
            <h3 className="text-lg font-['Playfair_Display',serif] mb-2 text-stone-800">{e.title}</h3>
            <p className="text-xs text-stone-500 border-t border-stone-100 pt-3 mt-3">{e.requirements}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- WIKI ---------------- */

const wikiTopics = [
  { title: "Herbalism & Alchemy Vault", desc: "Required pots, food feasts, and elemental blessings for raid night." },
  { title: "Grove Bank Protocols", desc: "Sharing harvests, requesting gear, and contributing raw materials." },
  { title: "Class Build Guides", desc: "Member-crafted build guides for optimization without toxicity." },
];

function WikiSection() {
  return (
    <section id="wiki" className="max-w-5xl mx-auto px-6 py-8">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" className="flex items-center gap-3 mb-8">
        <FaBook className="text-[#2F4832] text-xl" />
        <h2 className="text-3xl font-['Playfair_Display',serif] text-[#2F4832]">Field Guides & Lore</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {wikiTopics.map((w) => (
          <motion.div
            key={w.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="p-6 rounded-2xl bg-white/60 border border-stone-200 hover:bg-white transition"
          >
            <h3 className="text-lg font-['Playfair_Display',serif] mb-2 text-stone-800">{w.title}</h3>
            <p className="text-sm text-stone-600 mb-4 leading-relaxed">{w.desc}</p>
            <a href="#" className="text-xs text-[#2F4832] font-semibold hover:underline flex items-center gap-1">
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
        <FaShieldAlt className="text-[#2F4832] text-xl" />
        <h2 className="text-3xl font-['Playfair_Display',serif] text-[#2F4832]">Grove Guardians</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {officers.map((o) => (
          <motion.div
            key={o.name}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="p-6 rounded-2xl bg-white/80 border border-[#2F4832]/10 flex items-center gap-4 shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-[#9AB88A]/30 border border-[#9AB88A] flex items-center justify-center font-bold text-[#2F4832]">
              {o.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-medium text-stone-800">{o.name}</h3>
              <p className="text-xs text-amber-700 font-semibold">{o.role}</p>
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
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        className="p-10 md:p-14 rounded-3xl bg-gradient-to-b from-[#9AB88A]/20 to-[#f7f6f0] border border-[#9AB88A]/40 shadow-sm relative overflow-hidden"
      >
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xl">
          <FaHeart />
        </div>
        <h2 className="text-3xl md:text-4xl font-['Playfair_Display',serif] text-[#2F4832] mb-2">Find Your Place in Eve</h2>
        <p className="font-['Caveat',cursive] text-3xl text-amber-700 mb-6">"We Welcome All"</p>
        <p className="text-stone-600 text-sm mb-8 max-w-md mx-auto leading-relaxed font-light">
          Whether you're pushing high-tier raid content or looking for a relaxing community lounge under the trees, our doors are open.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#2F4832] text-[#f7f6f0] font-medium hover:bg-[#233826] transition shadow-md"
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
      © {new Date().getFullYear()} Eve Guild · EST. 2026 · Planted with Care 🌱
    </footer>
  );
}
