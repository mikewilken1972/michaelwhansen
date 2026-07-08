import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Check,
  Globe,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  Coffee,
  MessageSquare,
  Award,
  FileText,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Send,
  Rocket,
  Edit2,
  Save,
  Plus,
  Trash2,
  RefreshCcw,
  X,
  Lock,
  Key,
  Mail
} from "lucide-react";

// SÆT TIL false FOR AT FJERNE DEN MIDLERTIDIGE FORSIDE HELT NÅR SITET ER KLAR
const IS_UNDER_CONSTRUCTION = true;

interface Inquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  date: string;
}

interface Content {
  headerEyebrow: string;
  headerName: string;
  nav1: string;
  nav2: string;
  nav3: string;
  nav4: string;
  heroTagline: string;
  heroTitle: string;
  heroSubTitle: string;
  heroDescription: string;
  heroBtn1: string;
  heroBtn2: string;
  profileName: string;
  profileTitle: string;
  profileQuote: string;
  profileStatus: string;
  challengeEyebrow: string;
  challengeTitle: string;
  challengeDesc: string;
  challenges: { title: string; desc: string; tag: string }[];
  quote: string;
  phasesEyebrow: string;
  phasesTitle: string;
  phasesDesc: string;
  phases: { name: string; title: string; desc: string; points: string[]; duration: string }[];
  whyEyebrow: string;
  whyTitle: string;
  whyDesc: string;
  whyPoints: { title: string; desc: string; icon: string }[];
  cvTitle: string;
  cvDesc: string;
  contactEyebrow: string;
  contactTitle: string;
  contactDesc: string;
  contactPerk1: string;
  contactPerk2: string;
  contactFormTitle: string;
  contactJobTitleLabel: string;
  jobTitle: string;
  footerLocation: string;
  footerRights: string;
}

const DEFAULT_CONTENT: Content = {
  headerEyebrow: "SaaS Go-To-Market Specialist",
  headerName: "Michael W. Hansen",
  nav1: "Udfordringen",
  nav2: "Ydelser",
  nav3: "Hvem er jeg",
  nav4: "Kontakt",
  heroTagline: "Powerful Business Developer for SaaS",
  heroTitle: "Skalér din SaaS",
  heroSubTitle: "internationalt.",
  heroDescription: "Mange succesfulde, danske SMV SaaS-virksomheder rammer en mur, når de vil krydse landegrænserne. Den salgsmodel, der fungerer perfekt på hjemmemarkedet, kan sjældent kopieres direkte til udlandet.",
  heroBtn1: "Tag SaaS GTM test",
  heroBtn2: "Book en kaffesnak",
  profileName: "Michael W. Hansen",
  profileTitle: "SaaS GTM Executive",
  profileQuote: "\"Jeg tror ikke på tykke konsulentrapporter. Min hjælp er hands-on – fra klar strategi til reel eksekvering.\"",
  profileStatus: "Ledig til 2 nye partnerskaber i Q3/Q4",
  challengeEyebrow: "01. Udfordringen",
  challengeTitle: "Uden den rigtige retning koster ekspansionen dyrt",
  challengeDesc: "Uden international erfaring i bagagen bliver ekspansionen hurtigt en dyr og tidskrævende proces med “trial and error”. Jeg hjælper jer med at undgå begynderfejlene.",
  challenges: [
    { title: "Direkte Salg vs Partner Kanal?", desc: "Skal vi satse på direkte opsøgende salg, eller er en partnerkanal vejen frem? Hvad giver den bedste pipeline?", tag: "Pipeline optimering" },
    { title: "Skal vi have tech-alliancer?", desc: "Hvordan udnytter vi tech-alliancer (f.eks. Microsoft Co-sell) strategisk til at få global rækkevidde?", tag: "Økosystemer" },
    { title: "International markedsføring?", desc: "Hvordan griber vi den internationale markedsføring an? Skal vi kopiere vores metoder fra Danmark?", tag: "Lokaliseret marketing" }
  ],
  quote: "Jeg hjælper jer med at lægge den rigtige Go-To-Market Strategi – og jeg eksekverer den sammen med jer.",
  phasesEyebrow: "02. Kommercielt Forløb",
  phasesTitle: "Fra klar strategi til reel eksekvering",
  phasesDesc: "Jeg tror ikke på tykke konsulentrapporter, der samler støv i skuffen. Min hjælp er hands-on og bygget op som et naturligt forløb i to faser, der sikrer dig både strategisk retning og kommerciel slagkraft.",
  phases: [
    {
      name: "Fase 1",
      title: "Go-To-Market Readiness",
      desc: "Strategisk afklaring: Vi starter med at lægge fundamentet. Gennem en fokuseret workshop og tæt dialog analyserer vi jeres produktkompleksitet, målgruppe og branche for at skabe en knivskarp ekspansionsplan.",
      points: ["Workshop-baseret analyse af jeres SaaS produkt", "Komplet kortlægning af den mest optimale målgruppe", "Ekspansionsplan klar til øjeblikkelig eksekvering"],
      duration: "EST. WORKSHOPS: 2-3 UGER"
    },
    {
      name: "Fase 2",
      title: "Fractional Commercial Leader",
      desc: "Eksekvering: Når strategien er lagt, slipper jeg jer ikke. Jeg træder ind som en integreret del af jeres team på deltid (typisk over 3-6 måneder) for at drive planen ud i livet.",
      points: ["Håndgribelig og operationel kommerciel ledelse", "Opbygning af partnerkanaler & Microsoft Co-sell", "Sikre stabil overlevering til jeres interne salgsteam"],
      duration: "EST. DELTID: 3-6 MÅNEDER"
    }
  ],
  whyEyebrow: "03. Hvorfor Michael?",
  whyTitle: "Hvorfor samarbejde med mig?",
  whyDesc: "Når du arbejder med mig, får du en kommerciel partner, der har prøvet det før. Med mange års erfaring fra den internationale SaaS-scene bringer jeg dokumenteret erfaring og et stærkt netværk med på banen.",
  whyPoints: [
    { title: "Geografisk fokus", desc: "Min absolutte spidskompetence og netværk ligger i Nordeuropa (inkl. Norden og UK) samt APAC-regionen. Derudover har jeg solid erfaring med at hjælpe virksomheder i gang på det amerikanske marked.", icon: "globe" },
    { title: "Alliancer & Partnerkanal", desc: "Jeg ved præcis, hvordan man bygger og modner en partnerkanal, og hvordan man navigerer i komplekse økosystemer som Microsofts Co-sell program for at opnå maksimal synlighed og support.", icon: "award" },
    { title: "Fleksibilitet", desc: "I får den tunge kommercielle ledelse (CRO-niveau / kommerciel direktør), I har brug for lige nu, uden at skulle ansætte en fuldtidsdirektør fra dag ét. Det holder omkostningerne nede.", icon: "rocket" }
  ],
  cvTitle: "Se mit CV på LinkedIn",
  cvDesc: "På LinkedIn finder du mit CV, der viser hvilke virksomheder jeg har arbejdet for de seneste 20 år, samt hvilke spændende udfordringer jeg har arbejdet med gennem årene.",
  contactEyebrow: "Lad os tale sammen",
  contactTitle: "Skal vi tage den første snak?",
  contactDesc: "Lad os tage en uforpligtende dialog om, hvor din virksomhed står i dag, og hvordan vi bedst kan gribe jeres næste internationale marked an.",
  contactPerk1: "Uforpligtende kaffemøde i København el. virtuelt",
  contactPerk2: "Konkrete råd til din SaaS-skaleringsmodel",
  contactFormTitle: "Send besked eller anmod om en snak",
  contactJobTitleLabel: "Erhvervstitel",
  jobTitle: "Powerful Business Developer for SaaS",
  footerLocation: "Based in Copenhagen, Denmark",
  footerRights: `© ${new Date().getFullYear()} Michael W. Hansen. All Rights Reserved`
};

export default function App() {
  // Content State
  const [content, setContent] = useState<Content>(DEFAULT_CONTENT);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Midlertidig forside & Skjult adgang State
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("preview") === "true" || params.get("access") === "mwh" || params.get("access") === "admin") {
        localStorage.setItem("mwh_preview_unlocked", "true");
        return true;
      }
      return localStorage.getItem("mwh_preview_unlocked") === "true";
    }
    return false;
  });

  const [splashEmail, setSplashEmail] = useState("");
  const [splashSubscribed, setSplashSubscribed] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [unlockPassword, setUnlockPassword] = useState("");
  const [unlockError, setUnlockError] = useState("");
  const [showSplashContact, setShowSplashContact] = useState(false);

  // Booking & Contact State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Interactive SaaS Self-Check State
  const [checkStep, setCheckStep] = useState(0);
  const [answers, setAnswers] = useState({
    model: "",
    alliance: "",
    marketing: "",
  });
  const [assessmentResult, setAssessmentResult] = useState<string | null>(null);

  // Load inquiries and content from localStorage
  useEffect(() => {
    const savedInquiries = localStorage.getItem("mwh_inquiries");
    if (savedInquiries) {
      try {
        setInquiries(JSON.parse(savedInquiries));
      } catch (e) {
        console.error("Failed to parse inquiries", e);
      }
    }

    const savedContent = localStorage.getItem("mwh_content");
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (e) {
        console.error("Failed to parse content", e);
      }
    }
  }, []);

  const saveContent = (newContent: Content) => {
    setContent(newContent);
    localStorage.setItem("mwh_content", JSON.stringify(newContent));
  };

  const handleContentChange = (key: keyof Content, value: any) => {
    saveContent({ ...content, [key]: value });
  };

  const resetContent = () => {
    if (window.confirm("Er du sikker på, at du vil gendanne alt indhold til standard?")) {
      saveContent(DEFAULT_CONTENT);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const newInquiry: Inquiry = {
      id: Math.random().toString(36).substring(2, 9),
      name: formData.name,
      email: formData.email,
      company: formData.company || "Enkeltmand/SaaS startup",
      message: formData.message,
      date: new Date().toLocaleDateString("da-DK", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    localStorage.setItem("mwh_inquiries", JSON.stringify(updated));
    setIsSubmitted(true);
    setFormData({ name: "", email: "", company: "", message: "" });

    setTimeout(() => {
      setIsSubmitted(false);
    }, 6000);
  };

  const handleAnswer = (key: string, value: string) => {
    const nextAnswers = { ...answers, [key]: value };
    setAnswers(nextAnswers);

    if (key === "marketing") {
      let score = 0;
      if (nextAnswers.model === "partner") score += 2;
      if (nextAnswers.alliance === "yes") score += 2;
      if (nextAnswers.marketing === "adapted") score += 2;

      let advice = "";
      if (score === 6) {
        advice = "Din SaaS er yderst moden til international skalering! I har forstået vigtigheden af tilpasset markedsføring, partnerkanaler og økosystemer. Lad os tage en snak om, hvordan vi ruller strategien ud i praksis.";
      } else if (score >= 4) {
        advice = "I har et solidt fundament, men der er kritiske områder, hvor I risikerer dyre begynderfejl (f.eks. ved at kopiere den danske markedsføring direkte eller mangle strategiske alliancer). Vi bør strukturere jeres Go-To-Market readiness i Fase 1.";
      } else {
        advice = "Ekspansion uden for Danmark kan blive en stor 'trial and error' udskrivning med jeres nuværende setup. For at minimere risikoen bør vi afklare jeres direkte vs. partnerkanal model og opbygge en skarp model for udlandet først.";
      }
      setAssessmentResult(advice);
      setCheckStep(3);
    } else {
      setCheckStep((prev) => prev + 1);
    }
  };

  const resetAssessment = () => {
    setAnswers({ model: "", alliance: "", marketing: "" });
    setAssessmentResult(null);
    setCheckStep(0);
  };

  const handleAdminLogin = () => {
    if (isAdmin) {
      setIsAdmin(false);
      setIsEditMode(false);
      return;
    }
    const pwd = window.prompt("Indtast admin adgangskode (demo adgangskode: admin):");
    if (pwd === "admin") {
      setIsAdmin(true);
      setIsEditMode(true);
    } else if (pwd !== null) {
      alert("Forkert adgangskode");
    }
  };

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (unlockPassword.toLowerCase() === "admin" || unlockPassword.toLowerCase() === "mwh2026") {
      setIsUnlocked(true);
      localStorage.setItem("mwh_preview_unlocked", "true");
      setShowUnlockModal(false);
      setUnlockError("");
      setUnlockPassword("");
    } else {
      setUnlockError("Forkert adgangskode. Prøv f.eks. 'admin' eller 'mwh2026'.");
    }
  };

  const handleLockSplash = () => {
    setIsUnlocked(false);
    localStorage.removeItem("mwh_preview_unlocked");
  };

  const handleSplashSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!splashEmail) return;
    
    const savedEmails = localStorage.getItem("mwh_splash_subscribers");
    let emails = [];
    try {
      emails = savedEmails ? JSON.parse(savedEmails) : [];
    } catch (err) {
      emails = [];
    }
    emails.push({ email: splashEmail, date: new Date().toISOString() });
    localStorage.setItem("mwh_splash_subscribers", JSON.stringify(emails));
    
    setSplashSubscribed(true);
    setSplashEmail("");
    
    setTimeout(() => {
      setSplashSubscribed(false);
    }, 5000);
  };

  // Helper to render editable text
  const EditableText = ({ value, onSave, label, textarea = false, className = "" }: { value: string, onSave: (v: string) => void, label: string, textarea?: boolean, className?: string }) => {
    if (!isEditMode) return <span className={className}>{value}</span>;
    return (
      <span className="block w-full">
        <label className="text-[9px] uppercase tracking-widest text-emerald-500/60 font-mono block mb-1">{label}</label>
        {textarea ? (
          <textarea
            value={value}
            onChange={(e) => onSave(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-emerald-500/50"
            rows={3}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onSave(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-emerald-500/50"
          />
        )}
      </span>
    );
  };

  if (IS_UNDER_CONSTRUCTION && !isUnlocked) {
    return (
      <div className="bg-[#0A0A0A] text-[#F4F4F5] min-h-screen w-full flex flex-col justify-between font-sans selection:bg-zinc-800 selection:text-white overflow-hidden relative">
        {/* Decorative background glow effects */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-zinc-500/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Top Header Bar */}
        <header className="max-w-6xl w-full mx-auto px-6 md:px-12 pt-8 flex justify-between items-center relative z-10">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-[0.3em] font-semibold text-emerald-500 mb-1">
              SaaS Go-To-Market Specialist
            </span>
            <span className="text-lg font-bold tracking-tight text-white">
              Michael W. Hansen
            </span>
          </div>
          <div>
            <button
              onClick={() => setShowUnlockModal(true)}
              className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-500 hover:text-emerald-400 transition-colors bg-zinc-900/40 border border-zinc-800 px-3.5 py-2 rounded font-mono"
              title="Preview adgang"
            >
              <Key className="w-3 h-3 text-emerald-500/70" />
              <span>Preview</span>
            </button>
          </div>
        </header>

        {/* Main Content / Splash Section */}
        <main className="max-w-4xl w-full mx-auto px-6 md:px-12 py-12 md:py-20 flex flex-col items-center text-center justify-center relative z-10 my-auto">
          {/* Pulsing globe icon wrapper */}
          <div className="mb-8 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <Rocket className="w-6 h-6 text-emerald-400" />
          </div>

          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400 bg-emerald-950/40 px-4 py-1.5 rounded-full border border-emerald-900/40 mb-6">
            Ny digital profil undervejs
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-none mb-6 uppercase">
            Skalér din SaaS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
              internationalt
            </span>
          </h1>

          <p className="text-sm md:text-base text-zinc-400 max-w-xl leading-relaxed mb-10">
            Jeg bygger i øjeblikket en helt ny digital platform til ambitiøse danske SaaS-virksomheder.
            Her vil du finde operationelle GTM-forløb, indsigt i partnerkanaler og økosystemer samt en 
            interaktiv readiness-test. Vi åbner snart for fuld adgang.
          </p>

          {/* Subscription & Actions */}
          <div className="w-full max-w-md flex flex-col gap-4 mb-10">
            <form onSubmit={handleSplashSubscribe} className="flex gap-2 w-full p-1.5 bg-zinc-900/60 border border-zinc-850 rounded-lg">
              <input
                type="email"
                required
                value={splashEmail}
                onChange={(e) => setSplashEmail(e.target.value)}
                placeholder="Indtast din e-mail..."
                className="bg-transparent flex-1 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 text-xs font-bold rounded uppercase tracking-wider transition-colors shrink-0"
              >
                Få besked
              </button>
            </form>

            <AnimatePresence>
              {splashSubscribed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 bg-emerald-950/40 border border-emerald-900/50 text-emerald-400 text-xs rounded text-center"
                >
                  Mange tak! Du får direkte besked ved lancering.
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-2">
              <button
                onClick={() => setShowSplashContact(true)}
                className="px-6 py-3 bg-zinc-900 hover:bg-zinc-850 text-white border border-zinc-800 rounded text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 group shadow-lg"
              >
                <Coffee className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
                <span>Book en kaffesnak nu</span>
              </button>
              <a
                href="https://www.linkedin.com/in/michaelwhansen"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-transparent hover:bg-zinc-950 text-zinc-400 hover:text-white rounded border border-zinc-900 hover:border-zinc-800 text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shrink-0"
              >
                <Linkedin className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>LinkedIn profil</span>
              </a>
            </div>
          </div>
        </main>

        {/* Minimal Splash Footer */}
        <footer className="max-w-6xl w-full mx-auto px-6 md:px-12 pb-8 pt-4 border-t border-zinc-950 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-mono relative z-10">
          <div>Based in Copenhagen, Denmark</div>
          <div>© {new Date().getFullYear()} Michael W. Hansen. All Rights Reserved</div>
        </footer>

        {/* Sleek Password Unlock Modal */}
        <AnimatePresence>
          {showUnlockModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowUnlockModal(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-zinc-950 border border-zinc-850 rounded-xl max-w-sm w-full p-6 shadow-2xl z-10"
              >
                <button
                  onClick={() => setShowUnlockModal(false)}
                  className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="text-center mb-6">
                  <div className="mx-auto w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mb-3 text-emerald-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight">Preview Adgang</h3>
                  <p className="text-xs text-zinc-500 mt-1">Indtast koden for at fjerne den midlertidige forside.</p>
                </div>

                <form onSubmit={handleUnlockSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest text-zinc-500 mb-1.5 font-mono">Adgangskode</label>
                    <input
                      type="password"
                      required
                      value={unlockPassword}
                      onChange={(e) => setUnlockPassword(e.target.value)}
                      placeholder="Indtast f.eks. admin eller mwh2026"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2.5 text-sm text-white placeholder-zinc-650 focus:outline-none focus:border-emerald-500/50 transition-colors"
                    />
                  </div>

                  {unlockError && (
                    <p className="text-xs text-red-400 leading-snug">{unlockError}</p>
                  )}

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowUnlockModal(false)}
                      className="flex-1 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-bold rounded uppercase tracking-wider transition-colors"
                    >
                      Luk
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded uppercase tracking-wider transition-colors"
                    >
                      Lås op
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Lead Capture Booking / Inquiry Modal */}
        <AnimatePresence>
          {showSplashContact && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSplashContact(false)}
                className="absolute inset-0 bg-black/90 backdrop-blur-sm fixed"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="relative bg-zinc-950 border border-zinc-850 rounded-xl max-w-xl w-full p-6 md:p-8 shadow-2xl z-10 my-8"
              >
                <button
                  onClick={() => setShowSplashContact(false)}
                  className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="mb-6">
                  <span className="text-[9px] uppercase tracking-widest text-emerald-500 font-mono block mb-1">Direkte Kontakt</span>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight">Lad os tage en uforpligtende snak</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Selvom websitet ikke er helt åbent, er jeg fuldt tilgængelig for rådgivning og samarbejde. Send din besked, så vender jeg tilbage.
                  </p>
                </div>

                <form onSubmit={(e) => {
                  handleFormSubmit(e);
                  setTimeout(() => {
                    setShowSplashContact(false);
                  }, 4000);
                }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5 font-mono">Navn *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                        placeholder="Anders Nielsen"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5 font-mono">E-mail adresse *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                        placeholder="anders@saascompany.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5 font-mono">Virksomhed (valgfri)</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      placeholder="F.eks. OptiSaaS ApS"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5 font-mono">Besked *</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                      placeholder="Skriv lidt om jeres SaaS og jeres ekspansionsplaner..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded tracking-wider uppercase transition-colors"
                  >
                    Send besked
                  </button>
                </form>

                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 p-4 rounded bg-emerald-950/40 border border-emerald-900 text-emerald-400 text-xs flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span>Anmodning modtaget! Du hører fra mig hurtigst muligt.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0A0A] text-[#F4F4F5] min-h-screen w-full flex flex-col font-sans selection:bg-zinc-800 selection:text-white overflow-x-hidden">
      
      {/* Staging Warning Banner */}
      {IS_UNDER_CONSTRUCTION && isUnlocked && (
        <div className="bg-emerald-950/95 border-b border-emerald-900/50 text-emerald-400 px-4 py-2.5 text-xs font-mono flex flex-col sm:flex-row justify-between items-center gap-2 relative z-50 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)] shrink-0" />
            <span><strong>STAGING PREVIEW:</strong> Du ser sitet via en tidlig preview-nøgle. Forsiden er låst for eksterne gæster.</span>
          </div>
          <button
            onClick={handleLockSplash}
            className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-black text-[10px] font-bold rounded uppercase tracking-wider transition-colors shrink-0"
          >
            Lås og test forside
          </button>
        </div>
      )}
      
      {/* CMS Control Button (Floating) */}
      {isAdmin && (
        <>
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all ${isEditMode ? 'bg-emerald-500 text-black' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'}`}
            title={isEditMode ? "Gem og afslut redigering" : "Rediger indhold"}
          >
            {isEditMode ? <Save className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
          </button>
          
          {isEditMode && (
            <button
              onClick={resetContent}
              className="fixed bottom-24 right-6 z-50 p-4 rounded-full bg-red-950/40 text-red-400 border border-red-900 shadow-2xl transition-all hover:bg-red-900 hover:text-white"
              title="Gendan Standard Indhold"
            >
              <RefreshCcw className="w-5 h-5" />
            </button>
          )}
        </>
      )}

      {/* Decorative subtle background accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-10 w-[400px] h-[400px] bg-zinc-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto px-6 md:px-12 py-8 flex flex-col flex-1 relative z-10">
        
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16 md:mb-24 border-b border-zinc-900 pb-6">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-emerald-500 mb-1">
              <EditableText value={content.headerEyebrow} onSave={(v) => handleContentChange("headerEyebrow", v)} label="Header Eyebrow" />
            </span>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              <EditableText value={content.headerName} onSave={(v) => handleContentChange("headerName", v)} label="Header Navn" />
            </h1>
          </div>
          <nav className="flex items-center gap-6 mt-4 sm:mt-0 text-[11px] uppercase tracking-widest font-semibold text-zinc-400">
            <a href="#skalering" className="hover:text-white transition-colors">
              <EditableText value={content.nav1} onSave={(v) => handleContentChange("nav1", v)} label="Nav Link 1" />
            </a>
            <a href="#faser" className="hover:text-white transition-colors">
              <EditableText value={content.nav2} onSave={(v) => handleContentChange("nav2", v)} label="Nav Link 2" />
            </a>
            <a href="#hvorfor" className="hover:text-white transition-colors">
              <EditableText value={content.nav3} onSave={(v) => handleContentChange("nav3", v)} label="Nav Link 3" />
            </a>
            <a href="#snak" className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 transition-all text-[10px]">
              <EditableText value={content.nav4} onSave={(v) => handleContentChange("nav4", v)} label="Nav Link 4" />
            </a>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
            
            <div className="lg:col-span-8 flex flex-col">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium w-fit mb-6 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <EditableText
                  value={content.heroTagline}
                  onSave={(v) => handleContentChange("heroTagline", v)}
                  label="Hero Tagline"
                />
              </div>
              
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.95] text-white">
                <EditableText
                  value={content.heroTitle}
                  onSave={(v) => handleContentChange("heroTitle", v)}
                  label="Hero Overskrift 1"
                /> <br />
                <span className="text-zinc-500 font-light italic">
                  <EditableText
                    value={content.heroSubTitle}
                    onSave={(v) => handleContentChange("heroSubTitle", v)}
                    label="Hero Overskrift 2"
                  />
                </span>
              </h2>

              <div className="mt-8">
                <EditableText
                  value={content.heroDescription}
                  onSave={(v) => handleContentChange("heroDescription", v)}
                  label="Hero Beskrivelse"
                  textarea
                  className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl block"
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#assessment"
                  className="px-6 py-3.5 bg-white text-black font-semibold rounded hover:bg-zinc-200 transition-all text-sm flex items-center gap-2 group shadow-lg"
                >
                  <EditableText value={content.heroBtn1} onSave={(v) => handleContentChange("heroBtn1", v)} label="Knap 1" />
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#snak"
                  className="px-6 py-3.5 bg-transparent text-white font-semibold rounded border border-zinc-800 hover:bg-zinc-950 hover:border-zinc-700 transition-all text-sm flex items-center gap-2"
                >
                  <EditableText value={content.heroBtn2} onSave={(v) => handleContentChange("heroBtn2", v)} label="Knap 2" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 lg:sticky lg:top-8">
              <div className="relative group rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 p-6 flex flex-col items-center text-center shadow-2xl">
                <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-emerald-950 to-zinc-900 border-2 border-zinc-800 flex items-center justify-center relative overflow-hidden mb-6">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/50 via-zinc-900/80 to-zinc-950" />
                  <div className="w-20 h-24 rounded-3xl bg-zinc-800 relative mt-4 shadow-inner flex flex-col justify-end items-center overflow-hidden">
                    <div className="w-10 h-6 border-b-2 border-zinc-500 rounded-full mb-8" />
                    <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-zinc-300 to-zinc-400 opacity-90 rounded-t-3xl" />
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-zinc-400 to-zinc-600 opacity-40 rounded-b-3xl" />
                  </div>
                  <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-emerald-400 opacity-60 blur-[1px] animate-pulse" />
                  <div className="absolute top-12 flex gap-1 justify-center z-10">
                    <div className="w-6 h-4 border-2 border-zinc-400/50 rounded-md" />
                    <div className="w-2 h-0.5 bg-zinc-400/50 mt-2" />
                    <div className="w-6 h-4 border-2 border-zinc-400/50 rounded-md" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">
                  <EditableText value={content.profileName} onSave={(v) => handleContentChange("profileName", v)} label="Profil Navn" />
                </h3>
                <p className="text-xs text-emerald-400 uppercase tracking-widest font-mono mb-4">
                  <EditableText value={content.profileTitle} onSave={(v) => handleContentChange("profileTitle", v)} label="Profil Titel" />
                </p>
                <div className="w-full h-px bg-zinc-900 my-3" />
                <p className="text-xs text-zinc-400 leading-relaxed italic mb-6">
                  <EditableText value={content.profileQuote} onSave={(v) => handleContentChange("profileQuote", v)} label="Profil Citat" textarea />
                </p>
                <div className="flex items-center gap-2 text-[11px] font-medium bg-emerald-950/40 text-emerald-400 border border-emerald-900/50 px-3 py-1.5 rounded-full w-full justify-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)] animate-pulse shrink-0" />
                  <EditableText value={content.profileStatus} onSave={(v) => handleContentChange("profileStatus", v)} label="Profil Status" />
                </div>
                <div className="flex gap-4 mt-6">
                  <a href="https://www.linkedin.com/in/michaelwhansen" target="_blank" rel="noreferrer" className="p-2 rounded bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors" title="LinkedIn"><Linkedin className="w-4 h-4" /></a>
                  <a href="#" className="p-2 rounded bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors" title="X"><Twitter className="w-4 h-4" /></a>
                  <a href="#" className="p-2 rounded bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors" title="Facebook"><Facebook className="w-4 h-4" /></a>
                  <a href="#" className="p-2 rounded bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors" title="Instagram"><Instagram className="w-4 h-4" /></a>
                </div>
              </div>
            </div>
          </div>

          <section id="skalering" className="scroll-mt-12 py-16 border-t border-zinc-900">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1">
                <span className="text-xs font-mono uppercase text-emerald-400 tracking-widest block mb-4">
                  <EditableText value={content.challengeEyebrow} onSave={(v) => handleContentChange("challengeEyebrow", v)} label="Udfordring Eyebrow" />
                </span>
                <h3 className="text-3xl font-extrabold text-white uppercase tracking-tight">
                  <EditableText value={content.challengeTitle} onSave={(v) => handleContentChange("challengeTitle", v)} label="Udfordring Overskrift" />
                </h3>
                <div className="mt-4">
                  <EditableText value={content.challengeDesc} onSave={(v) => handleContentChange("challengeDesc", v)} label="Udfordring Beskrivelse" textarea className="text-zinc-400 text-sm leading-relaxed block" />
                </div>
              </div>

              <div className="lg:col-span-2 relative">
                {isEditMode && (
                  <button
                    onClick={() => {
                      const newList = [...content.challenges, { title: "Ny udfordring", desc: "Beskrivelse her", tag: "Kategori" }];
                      handleContentChange("challenges", newList);
                    }}
                    className="absolute -top-12 right-0 flex items-center gap-1 text-[10px] text-emerald-400 font-bold uppercase tracking-wider bg-zinc-900 px-3 py-1.5 rounded border border-zinc-800 hover:bg-zinc-800"
                  >
                    <Plus className="w-3 h-3" /> Tilføj Udfordring
                  </button>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {content.challenges.map((c, idx) => (
                    <div key={idx} className="p-6 rounded-lg bg-zinc-950 border border-zinc-900 flex flex-col justify-between group relative">
                      {isEditMode && (
                        <button
                          onClick={() => {
                            const newList = content.challenges.filter((_, i) => i !== idx);
                            handleContentChange("challenges", newList);
                          }}
                          className="absolute -top-2 -right-2 p-1.5 bg-red-950 text-red-400 rounded-full border border-red-900 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                      <div>
                        <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 mb-6 font-mono text-xs font-bold">?</div>
                        <h4 className="text-base font-bold text-white mb-2">
                          <EditableText value={c.title} onSave={(v) => { const newList = [...content.challenges]; newList[idx].title = v; handleContentChange("challenges", newList); }} label="Titel" />
                        </h4>
                        <EditableText value={c.desc} onSave={(v) => { const newList = [...content.challenges]; newList[idx].desc = v; handleContentChange("challenges", newList); }} label="Beskrivelse" textarea className="text-xs text-zinc-400 leading-relaxed block" />
                      </div>
                      <div className="text-[10px] text-zinc-600 uppercase tracking-widest mt-6 font-mono">
                        <EditableText value={c.tag} onSave={(v) => { const newList = [...content.challenges]; newList[idx].tag = v; handleContentChange("challenges", newList); }} label="Tag/Kategori" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 rounded bg-emerald-950/10 border border-emerald-900/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="max-w-2xl">
                <div className="text-white font-medium text-base">
                  <EditableText value={content.quote} onSave={(v) => handleContentChange("quote", v)} label="Citat/Opsummering" textarea />
                </div>
              </div>
              <a href="#faser" className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded tracking-wider uppercase transition-colors">Se faserne</a>
            </div>
          </section>

          <section id="faser" className="scroll-mt-12 py-16 border-t border-zinc-900">
            <span className="text-xs font-mono uppercase text-emerald-400 tracking-widest block mb-4">
              <EditableText value={content.phasesEyebrow} onSave={(v) => handleContentChange("phasesEyebrow", v)} label="Faser Eyebrow" />
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight mb-4">
              <EditableText value={content.phasesTitle} onSave={(v) => handleContentChange("phasesTitle", v)} label="Faser Overskrift" />
            </h3>
            <div className="mb-12">
              <EditableText value={content.phasesDesc} onSave={(v) => handleContentChange("phasesDesc", v)} label="Faser Beskrivelse" textarea className="text-zinc-400 text-base font-light max-w-2xl block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              {isEditMode && (
                <button
                  onClick={() => {
                    const newList = [...content.phases, { name: "Ny Fase", title: "Titel", desc: "Beskrivelse", points: ["Punkt 1"], duration: "Varighed" }];
                    handleContentChange("phases", newList);
                  }}
                  className="absolute -top-12 right-0 flex items-center gap-1 text-[10px] text-emerald-400 font-bold uppercase tracking-wider bg-zinc-900 px-3 py-1.5 rounded border border-zinc-800 hover:bg-zinc-800"
                >
                  <Plus className="w-3 h-3" /> Tilføj Fase
                </button>
              )}
              {content.phases.map((p, idx) => (
                <div key={idx} className="p-8 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between group relative overflow-hidden">
                  {isEditMode && (
                    <button
                      onClick={() => {
                        const newList = content.phases.filter((_, i) => i !== idx);
                        handleContentChange("phases", newList);
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-red-950 text-red-400 rounded-full border border-red-900 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[40px] pointer-events-none" />
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <span className="px-2.5 py-1 text-xs font-mono font-bold bg-zinc-900 text-emerald-400 border border-zinc-800 rounded">
                        <EditableText value={p.name} onSave={(v) => { const newList = [...content.phases]; newList[idx].name = v; handleContentChange("phases", newList); }} label="Fase Navn" />
                      </span>
                      <h4 className="text-xl font-bold text-white">
                        <EditableText value={p.title} onSave={(v) => { const newList = [...content.phases]; newList[idx].title = v; handleContentChange("phases", newList); }} label="Titel" />
                      </h4>
                    </div>
                    <div className="mb-6">
                      <EditableText value={p.desc} onSave={(v) => { const newList = [...content.phases]; newList[idx].desc = v; handleContentChange("phases", newList); }} label="Beskrivelse" textarea className="text-zinc-300 text-sm leading-relaxed block" />
                    </div>
                    <ul className="space-y-3 text-xs text-zinc-400">
                      {p.points.map((pt, pidx) => (
                        <li key={pidx} className="flex items-start gap-2 group/pt relative">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <EditableText value={pt} onSave={(v) => { const newList = [...content.phases]; newList[idx].points[pidx] = v; handleContentChange("phases", newList); }} label={`Punkt ${pidx + 1}`} className="block" />
                          {isEditMode && (
                            <button onClick={() => { const newList = [...content.phases]; newList[idx].points = newList[idx].points.filter((_, i) => i !== pidx); handleContentChange("phases", newList); }} className="opacity-0 group-hover/pt:opacity-100 p-0.5 text-red-500/60 hover:text-red-400 transition-opacity">
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </li>
                      ))}
                      {isEditMode && (
                        <li>
                          <button onClick={() => { const newList = [...content.phases]; newList[idx].points.push("Nyt punkt"); handleContentChange("phases", newList); }} className="flex items-center gap-1 text-[10px] text-emerald-400/60 hover:text-emerald-400 font-bold uppercase tracking-wider mt-2">
                            <Plus className="w-3 h-3" /> Tilføj Punkt
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="mt-8 pt-6 border-t border-zinc-900 text-[11px] font-mono text-zinc-500">
                    <EditableText value={p.duration} onSave={(v) => { const newList = [...content.phases]; newList[idx].duration = v; handleContentChange("phases", newList); }} label="Varighed" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="hvorfor" className="scroll-mt-12 py-16 border-t border-zinc-900">
            <span className="text-xs font-mono uppercase text-emerald-400 tracking-widest block mb-4">
              <EditableText value={content.whyEyebrow} onSave={(v) => handleContentChange("whyEyebrow", v)} label="Hvorfor Eyebrow" />
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight mb-4">
              <EditableText value={content.whyTitle} onSave={(v) => handleContentChange("whyTitle", v)} label="Hvorfor Overskrift" />
            </h3>
            <div className="mb-12">
              <EditableText value={content.whyDesc} onSave={(v) => handleContentChange("whyDesc", v)} label="Hvorfor Beskrivelse" textarea className="text-zinc-400 text-base font-light max-w-2xl block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {isEditMode && (
                <button
                  onClick={() => {
                    const newList = [...content.whyPoints, { title: "Nyt punkt", desc: "Beskrivelse", icon: "globe" }];
                    handleContentChange("whyPoints", newList);
                  }}
                  className="absolute -top-12 right-0 flex items-center gap-1 text-[10px] text-emerald-400 font-bold uppercase tracking-wider bg-zinc-900 px-3 py-1.5 rounded border border-zinc-800 hover:bg-zinc-800"
                >
                  <Plus className="w-3 h-3" /> Tilføj Punkt
                </button>
              )}
              {content.whyPoints.map((p, idx) => (
                <div key={idx} className="p-6 rounded-lg bg-zinc-950 border border-zinc-900 group relative">
                  {isEditMode && (
                    <button
                      onClick={() => {
                        const newList = content.whyPoints.filter((_, i) => i !== idx);
                        handleContentChange("whyPoints", newList);
                      }}
                      className="absolute -top-2 -right-2 p-1.5 bg-red-950 text-red-400 rounded-full border border-red-900 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                  <div className="w-10 h-10 rounded bg-zinc-900 flex items-center justify-center text-emerald-400 border border-zinc-800 mb-6">
                    {p.icon === "globe" && <Globe className="w-5 h-5" />}
                    {p.icon === "award" && <Award className="w-5 h-5" />}
                    {p.icon === "rocket" && <Rocket className="w-5 h-5" />}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">
                    <EditableText value={p.title} onSave={(v) => { const newList = [...content.whyPoints]; newList[idx].title = v; handleContentChange("whyPoints", newList); }} label="Titel" />
                  </h4>
                  <EditableText value={p.desc} onSave={(v) => { const newList = [...content.whyPoints]; newList[idx].desc = v; handleContentChange("whyPoints", newList); }} label="Beskrivelse" textarea className="text-zinc-400 text-sm leading-relaxed block" />
                </div>
              ))}
            </div>
          </section>

          <section className="py-16 border-t border-zinc-900">
            <div className="p-8 rounded-lg bg-zinc-950 border border-zinc-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-xl font-bold text-white uppercase">
                    <EditableText value={content.cvTitle} onSave={(v) => handleContentChange("cvTitle", v)} label="CV Titel" />
                  </h4>
                </div>
                <div className="mb-2">
                  <EditableText value={content.cvDesc} onSave={(v) => handleContentChange("cvDesc", v)} label="CV Beskrivelse" textarea className="text-zinc-400 text-sm leading-relaxed block" />
                </div>
              </div>
              <div className="flex flex-col gap-3 min-w-[200px]">
                <a href="https://www.linkedin.com/in/michaelwhansen" target="_blank" rel="noreferrer" className="px-5 py-3 rounded bg-zinc-900 border border-zinc-800 text-white font-semibold text-center hover:bg-zinc-800 hover:border-zinc-700 transition-all text-sm flex items-center justify-center gap-2">
                  <Linkedin className="w-4 h-4 text-[#0077B5]" /> LinkedIn Profil <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                </a>
              </div>
            </div>
          </section>

          <section id="snak" className="scroll-mt-12 py-16 border-t border-zinc-900">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5">
                <span className="text-xs font-mono uppercase text-emerald-400 tracking-widest block mb-4">
                  <EditableText value={content.contactEyebrow} onSave={(v) => handleContentChange("contactEyebrow", v)} label="Kontakt Eyebrow" />
                </span>
                <h3 className="text-3xl font-extrabold text-white uppercase tracking-tight mb-4">
                  <EditableText value={content.contactTitle} onSave={(v) => handleContentChange("contactTitle", v)} label="Kontakt Overskrift" />
                </h3>
                <div className="mb-6">
                  <EditableText value={content.contactDesc} onSave={(v) => handleContentChange("contactDesc", v)} label="Kontakt Beskrivelse" textarea className="text-zinc-400 text-sm leading-relaxed block" />
                </div>
                <div className="p-4 rounded bg-zinc-950 border border-zinc-900 space-y-4">
                  <div className="flex items-center gap-3 text-zinc-300 text-xs">
                    <Coffee className="w-4 h-4 text-emerald-400 shrink-0" />
                    <EditableText value={content.contactPerk1} onSave={(v) => handleContentChange("contactPerk1", v)} label="Fordel 1" />
                  </div>
                  <div className="flex items-center gap-3 text-zinc-300 text-xs">
                    <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                    <EditableText value={content.contactPerk2} onSave={(v) => handleContentChange("contactPerk2", v)} label="Fordel 2" />
                  </div>
                </div>
                <div className="mt-8">
                  <span className="block text-[10px] uppercase tracking-widest text-zinc-600 mb-2">
                    <EditableText value={content.contactJobTitleLabel} onSave={(v) => handleContentChange("contactJobTitleLabel", v)} label="Jobtitel Label" />
                  </span>
                  <div className="text-sm font-semibold text-zinc-300 font-mono">
                    <EditableText value={content.jobTitle} onSave={(v) => handleContentChange("jobTitle", v)} label="Jobtitel" />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Send className="w-4 h-4 text-emerald-400 shrink-0" />
                    <EditableText value={content.contactFormTitle} onSave={(v) => handleContentChange("contactFormTitle", v)} label="Formular Titel" />
                  </h4>
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5 font-mono">Navn *</label><input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder="F.eks. Anders Nielsen" /></div>
                      <div><label className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5 font-mono">E-mail adresse *</label><input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder="anders@saascompany.com" /></div>
                    </div>
                    <div><label className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5 font-mono">Virksomhed (valgfri)</label><input type="text" name="company" value={formData.company} onChange={handleInputChange} className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder="F.eks. OptiSaaS ApS" /></div>
                    <div><label className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5 font-mono">Besked / Hvad vil du høre mere om? *</label><textarea name="message" required rows={4} value={formData.message} onChange={handleInputChange} className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none" placeholder="Skriv lidt om jeres SaaS og hvilke markeder I kigger på..." /></div>
                    <button type="submit" className="w-full px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded tracking-wider uppercase transition-colors">Send anmodning</button>
                  </form>
                  <AnimatePresence>{isSubmitted && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-4 p-4 rounded bg-emerald-950/40 border border-emerald-900 text-emerald-400 text-xs flex items-center gap-2"><CheckCircle2 className="w-5 h-5 shrink-0" /><span>Mange tak! Din besked er blevet gemt lokalt og simuleret sendt til Michael. Vi svarer så hurtigt som muligt over kaffen!</span></motion.div>)}</AnimatePresence>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="flex flex-col md:flex-row justify-between items-start md:items-end mt-16 pt-8 border-t border-zinc-900 gap-6 md:gap-0 text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-medium font-mono">
          <div>
            <EditableText value={content.footerLocation} onSave={(v) => handleContentChange("footerLocation", v)} label="Footer Lokation" />
          </div>
          <div className="flex gap-4 md:gap-6 items-center">
            <a href="https://www.linkedin.com/in/michaelwhansen" target="_blank" rel="noreferrer" className="hover:text-zinc-400 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">X</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Facebook</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Instagram</a>
            <button onClick={handleAdminLogin} className="text-zinc-700 hover:text-emerald-500 transition-colors ml-4" title="Admin Login">
              <Lock className="w-3 h-3" />
            </button>
          </div>
          <div>
            <EditableText value={content.footerRights} onSave={(v) => handleContentChange("footerRights", v)} label="Footer Rettigheder" />
          </div>
        </footer>
      </div>
    </div>
  );
}
