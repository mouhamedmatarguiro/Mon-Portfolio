import React, { useEffect, useRef, useState } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

.mmg-root{
  --bg:#0C1512;
  --surface:#12201B;
  --surface-2:#172A23;
  --line:#28402F;
  --ink:#EDF3EF;
  --muted:#8FA79B;
  --green:#17B26A;
  --gold:#F4C430;
  --red:#E63946;
  background:var(--bg);
  color:var(--ink);
  font-family:'Inter',sans-serif;
  -webkit-font-smoothing:antialiased;
  min-height:100vh;
  position:relative;
}
.mmg-root .font-display{font-family:'Space Grotesk',sans-serif;}
.mmg-root .font-mono{font-family:'JetBrains Mono',monospace;}
.mmg-root a{color:inherit; text-decoration:none;}
.mmg-root ::selection{background:var(--green);color:#08120E;}

/* Signature: shimmering flag-gradient bar */
.mmg-flagbar{
  height:4px;
  width:100%;
  background:linear-gradient(90deg, var(--green) 0%, var(--gold) 33%, var(--red) 50%, var(--gold) 67%, var(--green) 100%);
  background-size:200% 100%;
  animation:mmg-shimmer 6s linear infinite;
}
@keyframes mmg-shimmer{
  0%{background-position:0% 0%;}
  100%{background-position:200% 0%;}
}

.mmg-bp-grid{
  background-image:
    linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size:40px 40px;
  opacity:0.3;
}
.mmg-corner{position:relative; transition:border-color 0.3s ease, transform 0.3s ease;}
.mmg-corner::before,.mmg-corner::after{
  content:"";
  position:absolute;
  width:14px;height:14px;
  opacity:0.8;
  transition:border-color 0.3s ease;
}
.mmg-corner::before{top:-1px;left:-1px;border-top:2px solid var(--green);border-left:2px solid var(--green);}
.mmg-corner::after{bottom:-1px;right:-1px;border-bottom:2px solid var(--green);border-right:2px solid var(--green);}
.mmg-corner.mmg-hover:hover{transform:translateY(-4px); border-color:var(--green);}
.mmg-corner.mmg-hover:hover::before,.mmg-corner.mmg-hover:hover::after{border-color:var(--gold);}

.mmg-tag{
  font-family:'JetBrains Mono',monospace;
  font-size:11px;
  letter-spacing:0.03em;
  padding:4px 10px;
  border:1px solid var(--line);
  border-radius:3px;
  color:var(--muted);
  background:rgba(255,255,255,0.02);
  white-space:nowrap;
  display:inline-block;
  transition:border-color 0.25s ease, color 0.25s ease;
}
.mmg-tag:hover{border-color:var(--green); color:var(--ink);}

.mmg-eyebrow{
  font-family:'JetBrains Mono',monospace;
  font-size:12px;
  letter-spacing:0.15em;
  color:var(--green);
}

.mmg-reveal{
  opacity:0;
  transform:translateY(18px);
  transition:opacity 0.7s ease, transform 0.7s ease;
}
.mmg-reveal.in{opacity:1; transform:translateY(0);}

/* Hero staggered entrance */
.mmg-enter{opacity:0; transform:translateY(14px); animation:mmg-fade-up 0.7s ease forwards;}
.mmg-enter-1{animation-delay:0.05s;}
.mmg-enter-2{animation-delay:0.2s;}
.mmg-enter-3{animation-delay:0.35s;}
.mmg-enter-4{animation-delay:0.5s;}
.mmg-enter-5{animation-delay:0.65s;}
@keyframes mmg-fade-up{
  to{opacity:1; transform:translateY(0);}
}

/* CTA hover */
.mmg-cta-primary{transition:transform 0.25s ease, box-shadow 0.25s ease;}
.mmg-cta-primary:hover{transform:translateY(-2px); box-shadow:0 8px 24px -8px rgba(23,178,106,0.5);}
.mmg-cta-secondary{transition:border-color 0.25s ease, transform 0.25s ease;}
.mmg-cta-secondary:hover{border-color:var(--gold); transform:translateY(-2px);}

/* Stack diagram bars grow on reveal */
.mmg-bar-track{
  background:var(--surface-2);
  border:1px solid var(--line);
  overflow:hidden;
}
.mmg-bar-fill{
  height:100%;
  width:0%;
  display:flex;
  align-items:center;
  padding:0 12px;
  transition:width 1s cubic-bezier(0.16,1,0.3,1);
}
.mmg-bar-fill.grow{width:var(--target-w);}

/* nav link underline */
.mmg-navlink{position:relative; padding-bottom:2px;}
.mmg-navlink::after{
  content:"";
  position:absolute;
  left:0; bottom:-2px;
  width:0%; height:1px;
  background:var(--gold);
  transition:width 0.25s ease;
}
.mmg-navlink:hover::after{width:100%;}

/* status pulse */
.mmg-pulse{position:relative;}
.mmg-pulse::before{
  content:"";
  position:absolute; inset:-4px;
  border-radius:9999px;
  border:1px solid var(--green);
  animation:mmg-pulse-ring 2s ease-out infinite;
}
@keyframes mmg-pulse-ring{
  0%{transform:scale(0.6); opacity:0.8;}
  100%{transform:scale(1.8); opacity:0;}
}

@media (prefers-reduced-motion: reduce){
  .mmg-flagbar, .mmg-enter, .mmg-pulse::before, .mmg-bar-fill{animation:none !important; transition:none !important;}
  .mmg-enter{opacity:1; transform:none;}
}
`;

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            setVisible(true);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "" }) {
  const [ref] = useReveal();
  return (
    <div ref={ref} className={`mmg-reveal ${className}`}>
      {children}
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ["#a-propos", "À propos"],
    ["#competences", "Compétences"],
    ["#projets", "Projets"],
    ["#formation", "Formation"],
    ["#contact", "Contact"],
  ];
  return (
    <div className="sticky top-0 z-50">
      <div className="mmg-flagbar"></div>
      <header style={{ background: "rgba(12,21,18,0.92)", borderBottom: "1px solid var(--line)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" className="font-display font-semibold text-lg">
            MMG<span style={{ color: "var(--green)" }}>.</span>
          </a>
          <nav className="hidden md:flex gap-8 font-mono text-xs" style={{ color: "var(--muted)" }}>
            {links.map(([href, label]) => (
              <a key={href} href={href} className="mmg-navlink" style={{ letterSpacing: "0.05em" }}>
                {label.toUpperCase()}
              </a>
            ))}
          </nav>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden font-mono text-xs px-3 py-1 border rounded"
            style={{ borderColor: "var(--line)" }}
          >
            MENU
          </button>
        </div>
        {open && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-3 font-mono text-xs" style={{ color: "var(--muted)" }}>
            {links.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>
                {label.toUpperCase()}
              </a>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}

function StackDiagram() {
  const [ref, visible] = useReveal();
  const layers = [
    { label: "INTERFACE", sub: "React · Angular · UI", w: 100 },
    { label: "LOGIQUE", sub: "Laravel · Node/Express", w: 88 },
    { label: "DONNÉES", sub: "MySQL · PostgreSQL · MongoDB", w: 76 },
    { label: "MOBILE", sub: "Flutter · Kotlin", w: 64 },
    { label: "SYSTÈMES", sub: "Maintenance · Admin", w: 52 },
  ];
  return (
    <div className="w-full" ref={ref}>
      {layers.map((l, i) => (
        <div key={l.label} className="flex items-center gap-3 mb-2">
          <div className="font-mono text-[10px] w-6 text-right" style={{ color: "var(--muted)" }}>
            {`0${i + 1}`}
          </div>
          <div className="flex-1 mmg-bar-track rounded-sm h-9">
            <div
              className={`mmg-bar-fill${visible ? " grow" : ""}`}
              style={{
                "--target-w": `${l.w}%`,
                transitionDelay: `${i * 0.12}s`,
                borderLeft: `3px solid ${i % 2 === 0 ? "var(--green)" : "var(--gold)"}`,
              }}
            >
              <span className="font-mono text-[11px] font-medium whitespace-nowrap">{l.label}</span>
              <span className="font-mono text-[10px] ml-3 hidden sm:inline whitespace-nowrap" style={{ color: "var(--muted)" }}>
                {l.sub}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden" style={{ borderBottom: "1px solid var(--line)" }}>
      <div className="absolute inset-0 mmg-bp-grid pointer-events-none"></div>
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 relative grid md:grid-cols-2 gap-14 items-center">
        <div>
          <div className="mmg-eyebrow mb-4 mmg-enter mmg-enter-1">// DÉVELOPPEUR WEB JUNIOR — DAKAR, SÉNÉGAL</div>
          <h1 className="font-display font-semibold leading-tight mb-6 text-4xl md:text-5xl mmg-enter mmg-enter-2">
            Je construis des applications web,
            <br />
            <span style={{ color: "var(--green)" }}>couche par couche.</span>
          </h1>
          <p className="max-w-lg mb-8 text-base mmg-enter mmg-enter-3" style={{ color: "var(--muted)", lineHeight: 1.7 }}>
            Diplômé en Génie Logiciel et Systèmes d'Information (ESP Dakar), je conçois des plateformes web
            complètes — de l'interface à la base de données — avec une attention particulière portée à la
            structure et à la rigueur du code.
          </p>
          <div className="flex flex-wrap gap-4 mmg-enter mmg-enter-4">
            <a
              href="#projets"
              className="mmg-cta-primary px-5 py-3 rounded-sm font-mono text-xs font-medium"
              style={{ background: "var(--green)", color: "#08120E" }}
            >
              VOIR MES PROJETS →
            </a>
            <a
              href="#contact"
              className="mmg-cta-secondary px-5 py-3 rounded-sm font-mono text-xs font-medium border"
              style={{ borderColor: "var(--line)" }}
            >
              ME CONTACTER
            </a>
          </div>
        </div>

        <div
          className="mmg-corner mmg-enter mmg-enter-5 flex flex-col items-center gap-6 p-8"
          style={{ background: "var(--surface)", border: "1px solid var(--line)" }}
        >
          {/* Photo de profil */}
          <img
            src="/photo.jpg"
            alt="Mouhamed Matar Guiro"
            className="w-28 h-28 rounded-full object-cover"
            style={{ border: "2px solid var(--green)" }}
          />
          <div className="w-full">
            <div className="font-mono text-[10px] mb-3 text-center" style={{ color: "var(--muted)" }}>
              FIG. 01 — PILE TECHNIQUE
            </div>
            <StackDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-12">
      <div className="mmg-eyebrow mb-3">{eyebrow}</div>
      <h2 className="font-display font-semibold text-2xl md:text-3xl">{title}</h2>
    </div>
  );
}

function About() {
  return (
    <section id="a-propos" className="max-w-6xl mx-auto px-6 py-20">
      <Reveal>
        <SectionHeading eyebrow="// 01 — PROFIL" title="À propos" />
        <div className="grid md:grid-cols-3 gap-12">
          <p className="md:col-span-2 text-base" style={{ color: "var(--muted)", lineHeight: 1.8 }}>
            Je suis un développeur web junior basé à Rufisque, Dakar, formé en Génie Logiciel et Systèmes
            d'Information à l'École Supérieure Polytechnique de Dakar. J'aime prendre un besoin flou et le
            transformer en un système clair : une modélisation UML propre, un backend bien structuré, une
            interface simple à utiliser.
            <br />
            <br />
            J'ai travaillé sur trois projets concrets — une plateforme de soutien scolaire, un système de gestion
            de parrainages et une application de localisation de pharmacies de garde — qui m'ont permis de
            pratiquer l'ensemble du cycle de développement, de l'analyse des besoins au déploiement.
            <br />
            <br />
            Je continue aussi à explorer, en autodidacte, le développement mobile (Flutter, Kotlin) et
            l'administration systèmes, pour élargir ma compréhension de l'infrastructure qui fait tourner une
            application.
          </p>
          <div className="flex flex-col gap-4">
            <div className="mmg-corner mmg-hover p-4" style={{ background: "var(--surface)", border: "1px solid var(--line)" }}>
              <div className="font-mono text-[10px] mb-1" style={{ color: "var(--muted)" }}>FORMATION</div>
              <div className="font-display text-sm">Génie Logiciel & SI</div>
            </div>
            <div className="mmg-corner mmg-hover p-4" style={{ background: "var(--surface)", border: "1px solid var(--line)" }}>
              <div className="font-mono text-[10px] mb-1" style={{ color: "var(--muted)" }}>LOCALISATION</div>
              <div className="font-display text-sm">Rufisque, Dakar, SN</div>
            </div>
            <div className="mmg-corner mmg-hover p-4" style={{ background: "var(--surface)", border: "1px solid var(--line)" }}>
              <div className="font-mono text-[10px] mb-1" style={{ color: "var(--muted)" }}>LANGUES</div>
              <div className="font-display text-sm">Français, Anglais</div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Skills() {
  const groups = [
    { name: "Front-end", accent: "var(--green)", items: ["React.js", "Angular", "Astro.js", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"] },
    { name: "Back-end", accent: "var(--gold)", items: ["Laravel", "Node.js", "Express.js", "Spring Boot"] },
    { name: "Mobile", accent: "var(--green)", items: ["Flutter", "Kotlin"] },
    { name: "Bases de données", accent: "var(--gold)", items: ["MySQL", "PostgreSQL", "MongoDB"] },
    { name: "Langages", accent: "var(--green)", items: ["JavaScript", "TypeScript", "PHP", "SQL", "Java", "C"] },
    { name: "Systèmes & outils", accent: "var(--gold)", items: ["Maintenance informatique", "Administration systèmes", "Git/GitHub", "VS Code", "Figma", "UML"] },
  ];
  return (
    <section id="competences" className="py-20" style={{ background: "var(--surface)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeading eyebrow="// 02 — SPÉCIFICATIONS" title="Compétences techniques" />
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((g) => (
            <Reveal key={g.name}>
              <div className="mmg-corner mmg-hover p-5 h-full" style={{ background: "var(--bg)", border: "1px solid var(--line)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full" style={{ background: g.accent }}></div>
                  <div className="font-mono text-xs" style={{ color: "var(--muted)" }}>{g.name.toUpperCase()}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span key={it} className="mmg-tag">{it}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ num, title, period, place, desc, stack }) {
  return (
    <Reveal>
      <div className="mmg-corner mmg-hover p-6 h-full flex flex-col" style={{ background: "var(--surface)", border: "1px solid var(--line)" }}>
        <div className="flex items-start justify-between mb-4">
          <span className="font-mono text-[10px]" style={{ color: "var(--muted)" }}>{`PROJET_0${num}`}</span>
          <span className="font-mono text-[10px]" style={{ color: "var(--green)" }}>{period}</span>
        </div>
        <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
        <div className="font-mono text-[11px] mb-4" style={{ color: "var(--muted)" }}>{place}</div>
        <p className="text-sm mb-5 flex-1" style={{ color: "var(--muted)", lineHeight: 1.7 }}>{desc}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {stack.map((s) => (
            <span key={s} className="mmg-tag">{s}</span>
          ))}
        </div>
        <div className="flex gap-3 font-mono text-[11px]">
          <span className="px-3 py-2 rounded-sm" style={{ border: "1px dashed var(--line)", color: "var(--muted)" }}>
            DÉPÔT GITHUB — BIENTÔT
          </span>
        </div>
      </div>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="projets" className="max-w-6xl mx-auto px-6 py-20">
      <Reveal>
        <SectionHeading eyebrow="// 03 — RÉALISATIONS" title="Projets" />
      </Reveal>
      <div className="grid md:grid-cols-3 gap-6">
        <ProjectCard
          num="1"
          title="Plateforme de soutien scolaire en ligne"
          period="Mai — Juil. 2025"
          place="Defar Sci, Dakar"
          desc="Conception et développement d'une plateforme web éducative : interface React moderne, API REST Node.js/Express, et base de données MongoDB pour les contenus pédagogiques."
          stack={["React", "Node.js", "Express", "MongoDB"]}
        />
        <ProjectCard
          num="2"
          title="Application de gestion des parrainages"
          period="Fév. — Avr. 2025"
          place="ESP Dakar"
          desc="Analyse des besoins et modélisation UML, puis développement backend avec Laravel pour gérer l'authentification, les rôles et les relations de parrainage entre utilisateurs."
          stack={["Laravel", "UML", "MySQL"]}
        />
        <ProjectCard
          num="3"
          title="Gestion des pharmacies de garde"
          period="Avr. — Juin 2024"
          place="Defar Sci, Dakar"
          desc="Plateforme web de localisation des pharmacies de garde à Dakar, avec base de données MySQL et interface responsive en HTML, CSS et Bootstrap."
          stack={["HTML5", "CSS3", "Bootstrap", "MySQL"]}
        />
      </div>
    </section>
  );
}

function Education() {
  const items = [
    { title: "Licence en Génie Logiciel et Systèmes d'Information", place: "ESP Dakar", period: "2024 — 2025" },
    { title: "Diplôme Supérieur de Technologie en Informatique (DST)", place: "ESP Dakar", period: "2022 — 2024" },
    { title: "Baccalauréat Scientifique S2", place: "Lycée Moderne de Rufisque", period: "2015 — 2018" },
  ];
  return (
    <section id="formation" className="py-20" style={{ background: "var(--surface)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionHeading eyebrow="// 04 — PARCOURS" title="Formation" />
        </Reveal>
        <div className="relative pl-8" style={{ borderLeft: "1px dashed var(--line)" }}>
          {items.map((it, i) => (
            <Reveal key={it.title}>
              <div className="relative mb-10">
                <div
                  className="absolute w-3 h-3 rounded-full"
                  style={{ left: "-38px", top: "4px", background: i === 0 ? "var(--green)" : "var(--muted)" }}
                ></div>
                <div className="font-mono text-[11px] mb-1" style={{ color: "var(--green)" }}>{it.period}</div>
                <div className="font-display font-medium text-base mb-1">{it.title}</div>
                <div className="font-mono text-[11px]" style={{ color: "var(--muted)" }}>{it.place}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-24">
      <Reveal>
        <SectionHeading eyebrow="// 05 — DISPONIBLE" title="Travaillons ensemble" />
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="mb-8 max-w-lg text-base" style={{ color: "var(--muted)", lineHeight: 1.8 }}>
              Je suis à la recherche d'un poste de développeur junior. Si un projet, un stage ou une
              collaboration vous semble être une bonne rencontre, n'hésitez pas à me contacter.
            </p>
            <div className="flex flex-col gap-4">
              <a href="mailto:gmouhamed9650@gmail.com" className="font-mono text-sm flex items-center gap-3">
                <span className="mmg-tag">EMAIL</span> gmouhamed9650@gmail.com
              </a>
              <a href="tel:+221708482993" className="font-mono text-sm flex items-center gap-3">
                <span className="mmg-tag">TÉL</span> +221 70 848 29 93
              </a>
              <div className="font-mono text-sm flex items-center gap-3">
                <span className="mmg-tag">LIEU</span> Arafat 2, Rufisque, Sénégal
              </div>
            </div>
          </div>
          <div className="mmg-corner p-6" style={{ background: "var(--surface)", border: "1px solid var(--line)" }}>
            <div className="font-mono text-[10px] mb-3" style={{ color: "var(--muted)" }}>STATUT ACTUEL</div>
            <div className="flex items-center gap-2 mb-4">
              <span className="mmg-pulse w-2 h-2 rounded-full inline-block" style={{ background: "var(--green)" }}></span>
              <span className="font-display text-sm">Disponible immédiatement</span>
            </div>
            <div className="font-mono text-[11px]" style={{ color: "var(--muted)", lineHeight: 1.8 }}>
              Ouvert aux postes junior full-stack,
              <br />
              stages et missions freelance.
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2 font-mono text-[11px]" style={{ color: "var(--muted)" }}>
        <span>© {new Date().getFullYear()} Mouhamed Matar Guiro</span>
        <span>Dakar, Sénégal</span>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <div className="mmg-root">
      <style>{CSS}</style>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}
