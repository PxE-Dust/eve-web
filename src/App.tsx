import { useEffect } from "react";
import type { ReactNode } from "react";
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

/* ---------------- FAIRYCORE CANOPY & ARCH OVERLAY ---------------- */

function FairycoreCanopyOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* 1. FAIRY LIGHT GLOW PULLS (TWINKLING STRING LIGHTS) */}
      <div className="absolute inset-0 z-10 opacity-70">
        <div className="absolute top-[8%] left-[15%] w-2 h-2 rounded-full bg-[#FFE8AD] shadow-[0_0_12px_4px_rgba(255,232,173,0.8)] animate-pulse" />
        <div className="absolute top-[14%] left-[22%] w-1.5 h-1.5 rounded-full bg-[#FFF3D1] shadow-[0_0_10px_3px_rgba(255,243,209,0.8)] animate-pulse [animation-delay:0.7s]" />
        <div className="absolute top-[6%] right-[18%] w-2.5 h-2.5 rounded-full bg-[#FFE8AD] shadow-[0_0_15px_5px_rgba(255,232,173,0.9)] animate-pulse [animation-delay:1.2s]" />
        <div className="absolute top-[20%] right-[25%] w-2 h-2 rounded-full bg-[#FFF3D1] shadow-[0_0_12px_4px_rgba(255,243,209,0.8)] animate-pulse [animation-delay:0.4s]" />
        <div className="absolute top-[32%] left-[8%] w-1.5 h-1.5 rounded-full bg-[#FFE8AD] shadow-[0_0_10px_3px_rgba(255,232,173,0.7)] animate-pulse [animation-delay:1.5s]" />
        <div className="absolute top-[45%] right-[9%] w-2 h-2 rounded-full bg-[#FFF3D1] shadow-[0_0_12px_4px_rgba(255,243,209,0.8)] animate-pulse [animation-delay:0.9s]" />
      </div>

      {/* 2. TOP DENSE CANOPY (ARCH OVERHANG) */}
      <svg
        className="absolute top-0 left-0 w-full h-36 sm:h-48 md:h-60 text-[#142617] drop-shadow-md"
        preserveAspectRatio="none"
        viewBox="0 0 1200 200"
      >
        <defs>
          <linearGradient id="canopyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#122415" stopOpacity="0.98" />
            <stop offset="70%" stopColor="#1c3621" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#2a4c30" stopOpacity="0" />
          </linearGradient>
          {/* Heart/Ivy Leaf Def */}
          <g id="ivyLeaf">
            <path d="M 0 0 C -8 -10, -18 -5, -12 8 C -8 15, 0 22, 0 22 C 0 22, 8 15, 12 8 C 18 -5, 8 -10, 0 0 Z" fill="currentColor" />
          </g>
          <g id="hangingVine">
            <path d="M 0 0 Q 10 40 -5 80 T 5 150 T -2 220" stroke="currentColor" strokeWidth="2" fill="none" />
            <use href="#ivyLeaf" x="0" y="30" transform="scale(0.8) rotate(15)" />
            <use href="#ivyLeaf" x="8" y="70" transform="scale(0.9) rotate(-25)" />
            <use href="#ivyLeaf" x="-6" y="110" transform="scale(0.75) rotate(40)" />
            <use href="#ivyLeaf" x="5" y="150" transform="scale(0.85) rotate(-10)" />
            <use href="#ivyLeaf" x="-2" y="190" transform="scale(0.6) rotate(20)" />
          </g>
        </defs>

        {/* Dense Base Arch Fill */}
        <path d="M-20,-10 L1220,-10 L1220,60 Q900,120 600,80 Q300,120 -20,60 Z" fill="url(#canopyGrad)" />

        {/* Overhanging Hanging Leaf Tendrils (Flanking the center) */}
        <g fill="#1a331e" className="text-[#1a331e]">
          <use href="#hangingVine" x="60" y="30" transform="scale(1.1)" />
          <use href="#hangingVine" x="140" y="40" transform="scale(1.3) rotate(5)" />
          <use href="#hangingVine" x="230" y="25" transform="scale(0.95)" />
          <use href="#hangingVine" x="320" y="50" transform="scale(0.7) rotate(-5)" />

          {/* Short center dips to keep hero text clear */}
          <use href="#hangingVine" x="520" y="10" transform="scale(0.35)" />
          <use href="#hangingVine" x="680" y="10" transform="scale(0.35) rotate(10)" />

          <use href="#hangingVine" x="880" y="45" transform="scale(0.75)" />
          <use href="#hangingVine" x="970" y="20" transform="scale(1.05) rotate(-8)" />
          <use href="#hangingVine" x="1060" y="35" transform="scale(1.25)" />
          <use href="#hangingVine" x="1140" y="15" transform="scale(1)" />
        </g>
      </svg>

      {/* 3. LEFT WOODEN PILLAR & WRAPPED FOLIAGE */}
      <svg
        className="absolute top-0 left-0 h-full w-24 sm:w-36 md:w-56 text-[#142617]"
        preserveAspectRatio="none"
        viewBox="0 0 200 1000"
      >
        {/* Trunk / Wooden Pillar shadow */}
        <path d="M-10,-10 Q40,300 20,600 T30,1010 L-10,1010 Z" fill="#0f1c11" opacity="0.9" />
        <path d="M15,-10 Q65,250 45,550 T55,1010" stroke="#1c3621" strokeWidth="8" fill="none" opacity="0.6" />

        {/* Wrapped Ivy Garland Layer */}
        <g fill="#1a351e" className="text-[#1a351e]">
          <use href="#hangingVine" x="30" y="100" transform="scale(1.2) rotate(-15)" />
          <use href="#hangingVine" x="50" y="300" transform="scale(1.4) rotate(-5)" />
          <use href="#hangingVine" x="40" y="550" transform="scale(1.1) rotate(-10)" />
          <use href="#hangingVine" x="60" y="750" transform="scale(1.3) rotate(-20)" />
        </g>
      </svg>

      {/* 4. RIGHT WOODEN PILLAR & WRAPPED FOLIAGE */}
      <svg
        className="absolute top-0 right-0 h-full w-24 sm:w-36 md:w-56 text-[#142617]"
        preserveAspectRatio="none"
        viewBox="0 0 200 1000"
      >
        {/* Trunk / Wooden Pillar shadow */}
        <path d="M210,-10 Q160,300 180,600 T170,1010 L210,1010 Z" fill="#0f1c11" opacity="0.9" />
        <path d="M185,-10 Q135,250 155,550 T145,1010" stroke="#1c3621" strokeWidth="8" fill="none" opacity="0.6" />

        {/* Wrapped Ivy Garland Layer */}
        <g fill="#1a351e" className="text-[#1a351e]">
          <use href="#hangingVine" x="150" y="80" transform="scale(1.2) rotate(15)" />
          <use href="#hangingVine" x="130" y="280" transform="scale(1.35) rotate(10)" />
          <use href="#hangingVine" x="140" y="520" transform="scale(1.15) rotate(5)" />
          <use href="#hangingVine" x="120" y="720" transform="scale(1.3) rotate(18)" />
        </g>
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
      {/* Fairycore Wedding Arch Canopy Frame */}
      <FairycoreCanopyOverlay />

      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(194,214,188,0.5),rgba(239,244,236,0.98))] z-0 pointer-events-none"
      />

      <Navbar />

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
    </header>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  return (
    <section className="pt-28 pb-12 text-center relative z-10 max-w-3xl mx-auto">
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
  { title: "Cozy Garden Tea & Lounge", time: "Tue · 9:00 PM EST", requirements: "Casual · Open Voice Chat" },
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
  { title: "Grove Bank Protocols", desc: "Sharing harvests, requesting gear, and contributing raw materials." },
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

const officers = [
  { name: "EveLeader", role: "Grove Keeper", class: "Protector / Guardian" },
  { name: "OfficerLex", role: "Raid Weaver", class: "Restoration / Healer" },
  { name: "Tactician", role: "Elder", class: "Wild DPS / Theorycraft" },
];

function Roster() {
  return (
    <section className="py-6">
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
    <footer className="text-center py-10 text-[#526354] text-xs font-bold tracking-widest uppercase relative z-10">
      © {new Date().getFullYear()} Eve Guild · Est. 2026 · Planted with Care ❦
    </footer>
  );
}
