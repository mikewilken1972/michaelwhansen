/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  Compass,
  Rocket,
  Coffee,
  MessageSquare,
  Award,
  FileText,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Send,
  Zap,
  Briefcase
} from "lucide-react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  date: string;
}

export default function App() {
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

  // Load inquiries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("mwh_inquiries");
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse inquiries", e);
      }
    }
  }, []);

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

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 6000);
  };

  // SaaS Self-Check Handler
  const handleAnswer = (key: string, value: string) => {
    const nextAnswers = { ...answers, [key]: value };
    setAnswers(nextAnswers);

    if (key === "marketing") {
      // Calculate assessment
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

  return (
    <div className="bg-[#0A0A0A] text-[#F4F4F5] min-h-screen w-full flex flex-col font-sans selection:bg-zinc-800 selection:text-white overflow-x-hidden">
      
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-10 w-[400px] h-[400px] bg-zinc-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto px-6 md:px-12 py-8 flex flex-col flex-1 relative z-10">
        
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16 md:mb-24 border-b border-zinc-900 pb-6">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-emerald-500 mb-1">
              SaaS Go-To-Market Specialist
            </span>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              Michael W. Hansen
            </h1>
          </div>
          <nav className="flex items-center gap-6 mt-4 sm:mt-0 text-[11px] uppercase tracking-widest font-semibold text-zinc-400">
            <a href="#skalering" className="hover:text-white transition-colors">Udfordringen</a>
            <a href="#faser" className="hover:text-white transition-colors">Ydelser</a>
            <a href="#hvorfor" className="hover:text-white transition-colors">Hvem er jeg</a>
            <a href="#snak" className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 transition-all text-[10px]">
              Kontakt
            </a>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
            
            {/* Left side text */}
            <div className="lg:col-span-8 flex flex-col">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium w-fit mb-6 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Powerful Business Developer for SaaS
              </div>
              
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.95] text-white">
                Skalér din SaaS <br />
                <span className="text-zinc-500 font-light italic">internationalt.</span>
              </h2>

              <p className="mt-8 text-lg md:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl">
                Mange succesfulde, danske SMV SaaS-virksomheder rammer en mur, når de vil krydse landegrænserne. Den salgsmodel, der fungerer perfekt på hjemmemarkedet, kan sjældent kopieres direkte til udlandet.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#assessment"
                  className="px-6 py-3.5 bg-white text-black font-semibold rounded hover:bg-zinc-200 transition-all text-sm flex items-center gap-2 group shadow-lg"
                >
                  Tag SaaS GTM test
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#snak"
                  className="px-6 py-3.5 bg-transparent text-white font-semibold rounded border border-zinc-800 hover:bg-zinc-950 hover:border-zinc-700 transition-all text-sm flex items-center gap-2"
                >
                  Book en kaffesnak
                </a>
              </div>
            </div>

            {/* Right side Portrait Card representation */}
            <div className="lg:col-span-4 lg:sticky lg:top-8">
              <div className="relative group rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 p-6 flex flex-col items-center text-center shadow-2xl">
                
                {/* Custom Stylized Silhouette / Vector Headshot Illustration */}
                <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-emerald-950 to-zinc-900 border-2 border-zinc-800 flex items-center justify-center relative overflow-hidden mb-6">
                  
                  {/* Styled abstract face outline that resembles a smiling, mature man with light beard */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/50 via-zinc-900/80 to-zinc-950" />
                  
                  {/* Human Head Minimal Shape */}
                  <div className="w-20 h-24 rounded-3xl bg-zinc-800 relative mt-4 shadow-inner flex flex-col justify-end items-center overflow-hidden">
                    {/* Smiling Face Lines */}
                    <div className="w-10 h-6 border-b-2 border-zinc-500 rounded-full mb-8" />
                    {/* Gray hair representational crown */}
                    <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-zinc-300 to-zinc-400 opacity-90 rounded-t-3xl" />
                    {/* Gray Beard representational chin block */}
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-zinc-400 to-zinc-600 opacity-40 rounded-b-3xl" />
                  </div>

                  {/* Absolute subtle sparkle */}
                  <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-emerald-400 opacity-60 blur-[1px] animate-pulse" />
                  
                  {/* Glasses silhouette style */}
                  <div className="absolute top-12 flex gap-1 justify-center z-10">
                    <div className="w-6 h-4 border-2 border-zinc-400/50 rounded-md" />
                    <div className="w-2 h-0.5 bg-zinc-400/50 mt-2" />
                    <div className="w-6 h-4 border-2 border-zinc-400/50 rounded-md" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">Michael W. Hansen</h3>
                <p className="text-xs text-emerald-400 uppercase tracking-widest font-mono mb-4">
                  SaaS GTM Executive
                </p>

                <div className="w-full h-px bg-zinc-900 my-3" />
                
                <p className="text-xs text-zinc-400 leading-relaxed italic mb-6">
                  "Jeg tror ikke på tykke konsulentrapporter. Min hjælp er hands-on – fra klar strategi til reel eksekvering."
                </p>

                {/* Status Indicator */}
                <div className="flex items-center gap-2 text-[11px] font-medium bg-emerald-950/40 text-emerald-400 border border-emerald-900/50 px-3 py-1.5 rounded-full w-full justify-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)] animate-pulse" />
                  Ledig til 2 nye partnerskaber i Q3/Q4
                </div>

                {/* Social Connect Group */}
                <div className="flex gap-4 mt-6">
                  <a
                    href="https://www.linkedin.com/in/michaelwhansen"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="p-2 rounded bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                    title="X"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="p-2 rounded bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                    title="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="p-2 rounded bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Section: The Three Dilemmas / Skalering */}
          <section id="skalering" className="scroll-mt-12 py-16 border-t border-zinc-900">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1">
                <span className="text-xs font-mono uppercase text-emerald-400 tracking-widest block mb-4">
                  01. Udfordringen
                </span>
                <h3 className="text-3xl font-extrabold text-white uppercase tracking-tight">
                  Uden den rigtige retning koster ekspansionen dyrt
                </h3>
                <p className="mt-4 text-zinc-400 text-sm leading-relaxed">
                  Uden international erfaring i bagagen bliver ekspansionen hurtigt en dyr og tidskrævende proces med “trial and error”. Jeg hjælper jer med at undgå begynderfejlene.
                </p>
              </div>

              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Card 1 */}
                <div className="p-6 rounded-lg bg-zinc-950 border border-zinc-900 flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 mb-6 font-mono text-xs font-bold">
                      ?
                    </div>
                    <h4 className="text-base font-bold text-white mb-2">
                      Direkte Salg vs Partner Kanal?
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Skal vi satse på direkte opsøgende salg, eller er en partnerkanal vejen frem? Hvad giver den bedste pipeline?
                    </p>
                  </div>
                  <div className="text-[10px] text-zinc-600 uppercase tracking-widest mt-6 font-mono">
                    Pipeline optimering
                  </div>
                </div>

                {/* Card 2 */}
                <div className="p-6 rounded-lg bg-zinc-950 border border-zinc-900 flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 mb-6 font-mono text-xs font-bold">
                      ★
                    </div>
                    <h4 className="text-base font-bold text-white mb-2">
                      Skal vi have tech-alliancer?
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Hvordan udnytter vi tech-alliancer (f.eks. Microsoft Co-sell) strategisk til at få global rækkevidde?
                    </p>
                  </div>
                  <div className="text-[10px] text-zinc-600 uppercase tracking-widest mt-6 font-mono">
                    Økosystemer
                  </div>
                </div>

                {/* Card 3 */}
                <div className="p-6 rounded-lg bg-zinc-950 border border-zinc-900 flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 mb-6 font-mono text-xs font-bold">
                      →
                    </div>
                    <h4 className="text-base font-bold text-white mb-2">
                      International markedsføring?
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Hvordan griber vi den internationale markedsføring an? Skal vi kopiere vores metoder fra Danmark?
                    </p>
                  </div>
                  <div className="text-[10px] text-zinc-600 uppercase tracking-widest mt-6 font-mono">
                    Lokaliseret marketing
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-12 p-8 rounded bg-emerald-950/10 border border-emerald-900/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="max-w-2xl">
                <p className="text-white font-medium text-base">
                  "Jeg hjælper jer med at lægge den rigtige Go-To-Market Strategi – og jeg eksekverer den sammen med jer."
                </p>
              </div>
              <a
                href="#faser"
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded tracking-wider uppercase transition-colors"
              >
                Se faserne
              </a>
            </div>
          </section>

          {/* Section: Faser (Fra klar strategi til reel eksekvering) */}
          <section id="faser" className="scroll-mt-12 py-16 border-t border-zinc-900">
            <span className="text-xs font-mono uppercase text-emerald-400 tracking-widest block mb-4">
              02. Kommercielt Forløb
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight mb-4">
              Fra klar strategi til reel eksekvering
            </h3>
            <p className="text-zinc-400 text-base font-light max-w-2xl mb-12">
              Jeg tror ikke på tykke konsulentrapporter, der samler støv i skuffen. Min hjælp er hands-on og bygget op som et naturligt forløb i to faser, der sikrer dig både strategisk retning og kommerciel slagkraft.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Phase 1 */}
              <div className="p-8 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-2.5 py-1 text-xs font-mono font-bold bg-zinc-900 text-emerald-400 border border-zinc-800 rounded">
                      Fase 1
                    </span>
                    <h4 className="text-xl font-bold text-white">Go-To-Market Readiness</h4>
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                    <strong>Strategisk afklaring:</strong> Vi starter med at lægge fundamentet. Gennem en fokuseret workshop og tæt dialog analyserer vi jeres produktkompleksitet, målgruppe og branche for at skabe en knivskarp ekspansionsplan.
                  </p>
                  <ul className="space-y-3 text-xs text-zinc-400">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      Workshop-baseret analyse af jeres SaaS produkt
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      Komplet kortlægning af den mest optimale målgruppe
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      Ekspansionsplan klar til øjeblikkelig eksekvering
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-zinc-900 text-[11px] font-mono text-zinc-500">
                  EST. WORKSHOPS: 2-3 UGER
                </div>
              </div>

              {/* Phase 2 */}
              <div className="p-8 rounded-lg bg-zinc-950 border border-emerald-950/50 hover:border-emerald-900/50 transition-all flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[40px] pointer-events-none" />
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-2.5 py-1 text-xs font-mono font-bold bg-emerald-950/50 text-emerald-400 border border-emerald-900/40 rounded">
                      Fase 2
                    </span>
                    <h4 className="text-xl font-bold text-white">Fractional Commercial Leader</h4>
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                    <strong>Eksekvering:</strong> Når strategien er lagt, slipper jeg jer ikke. Jeg træder ind som en integreret del af jeres team på deltid (typisk over 3-6 måneder) for at drive planen ud i livet.
                  </p>
                  <ul className="space-y-3 text-xs text-zinc-400">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      Håndgribelig og operationel kommerciel ledelse
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      Opbygning af partnerkanaler & Microsoft Co-sell
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      Sikre stabil overlevering til jeres interne salgsteam
                    </li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-zinc-900 text-[11px] font-mono text-emerald-400">
                  EST. DELTID: 3-6 MÅNEDER
                </div>
              </div>

            </div>
          </section>

          {/* Interactive SaaS Self-Check Tool Section */}
          <section id="assessment" className="scroll-mt-12 py-16 border-t border-zinc-900 bg-zinc-950/30 -mx-6 px-6 md:-mx-12 md:px-12 rounded-xl">
            <div className="max-w-3xl mx-auto">
              <span className="text-xs font-mono uppercase text-emerald-400 tracking-widest block mb-4">
                SaaS GTM Selv-Check
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 uppercase">
                Er jeres SaaS klar til udlandet?
              </h3>
              <p className="text-zinc-400 text-sm mb-8">
                Tag denne ultrakorte 3-spørgsmåls test for at se, om I har de mest almindelige faldgruber dækket af.
              </p>

              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 md:p-8 relative">
                
                <AnimatePresence mode="wait">
                  {checkStep === 0 && (
                    <motion.div
                      key="step0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <span className="text-xs text-zinc-500 font-mono">Spørgsmål 1 af 3</span>
                      <h4 className="text-lg font-bold text-white">
                        Hvilken salgsmodel fungerer bedst for jer på jeres hjemmemarked lige nu?
                      </h4>
                      <div className="grid grid-cols-1 gap-3 pt-2">
                        <button
                          onClick={() => handleAnswer("model", "direct")}
                          className="w-full text-left p-4 rounded bg-zinc-900 border border-zinc-800 hover:border-emerald-500 transition-all text-sm font-medium text-zinc-200"
                        >
                          Direkte opsøgende salg (Outbound / Inbound)
                        </button>
                        <button
                          onClick={() => handleAnswer("model", "partner")}
                          className="w-full text-left p-4 rounded bg-zinc-900 border border-zinc-800 hover:border-emerald-500 transition-all text-sm font-medium text-zinc-200"
                        >
                          En etableret partnerkanal eller forhandlerled
                        </button>
                        <button
                          onClick={() => handleAnswer("model", "plg")}
                          className="w-full text-left p-4 rounded bg-zinc-900 border border-zinc-800 hover:border-emerald-500 transition-all text-sm font-medium text-zinc-200"
                        >
                          Product-Led Growth (PLG) / Selvbetjening
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {checkStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <span className="text-xs text-zinc-500 font-mono">Spørgsmål 2 af 3</span>
                      <h4 className="text-lg font-bold text-white">
                        Har I integreret tech-alliancer (f.eks. Microsoft, Salesforce, HubSpot co-sell) i jeres salgsstrategi?
                      </h4>
                      <div className="grid grid-cols-1 gap-3 pt-2">
                        <button
                          onClick={() => handleAnswer("alliance", "yes")}
                          className="w-full text-left p-4 rounded bg-zinc-900 border border-zinc-800 hover:border-emerald-500 transition-all text-sm font-medium text-zinc-200"
                        >
                          Ja, vi har aktive tech-alliancer, der skaber leads
                        </button>
                        <button
                          onClick={() => handleAnswer("alliance", "no")}
                          className="w-full text-left p-4 rounded bg-zinc-900 border border-zinc-800 hover:border-emerald-500 transition-all text-sm font-medium text-zinc-200"
                        >
                          Nej, vi har ingen decideret alliancesalgs-fokus endnu
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {checkStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <span className="text-xs text-zinc-500 font-mono">Spørgsmål 3 af 3</span>
                      <h4 className="text-lg font-bold text-white">
                        Hvordan planlægger I at gribe international markedsføring an?
                      </h4>
                      <div className="grid grid-cols-1 gap-3 pt-2">
                        <button
                          onClick={() => handleAnswer("marketing", "copy")}
                          className="w-full text-left p-4 rounded bg-zinc-900 border border-zinc-800 hover:border-emerald-500 transition-all text-sm font-medium text-zinc-200"
                        >
                          Vi kopierer vores nuværende danske metoder og oversætter dem
                        </button>
                        <button
                          onClick={() => handleAnswer("marketing", "adapted")}
                          className="w-full text-left p-4 rounded bg-zinc-900 border border-zinc-800 hover:border-emerald-500 transition-all text-sm font-medium text-zinc-200"
                        >
                          Vi skaber en fuldstændig ny, lokalt tilpasset og segmenteret model
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {checkStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-2 text-emerald-400">
                        <ShieldCheck className="w-6 h-6" />
                        <h4 className="text-lg font-bold text-white">Resultat af dit selv-check</h4>
                      </div>
                      
                      <div className="p-4 rounded bg-zinc-900 border border-zinc-800 text-sm leading-relaxed text-zinc-300">
                        {assessmentResult}
                      </div>

                      <div className="flex flex-wrap gap-4 pt-2">
                        <a
                          href="#snak"
                          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded tracking-wider uppercase transition-colors"
                        >
                          Book kaffemøde om dette
                        </a>
                        <button
                          onClick={resetAssessment}
                          className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold rounded tracking-wider uppercase transition-colors border border-zinc-800"
                        >
                          Prøv igen
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>
          </section>

          {/* Section: Hvorfor samarbejde med mig? */}
          <section id="hvorfor" className="scroll-mt-12 py-16 border-t border-zinc-900">
            <span className="text-xs font-mono uppercase text-emerald-400 tracking-widest block mb-4">
              03. Hvorfor Michael?
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight mb-4">
              Hvorfor samarbejde med mig?
            </h3>
            <p className="text-zinc-400 text-base font-light max-w-2xl mb-12">
              Når du arbejder med mig, får du en kommerciel partner, der har prøvet det før. Med mange års erfaring fra den internationale SaaS-scene bringer jeg dokumenteret erfaring og et stærkt netværk med på banen.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Point 1 */}
              <div className="p-6 rounded-lg bg-zinc-950 border border-zinc-900">
                <div className="w-10 h-10 rounded bg-zinc-900 flex items-center justify-center text-emerald-400 border border-zinc-800 mb-6">
                  <Globe className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3">Geografisk fokus</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Min absolutte spidskompetence og netværk ligger i Nordeuropa (inkl. Norden og UK) samt APAC-regionen. Derudover har jeg solid erfaring med at hjælpe virksomheder i gang på det amerikanske marked.
                </p>
              </div>

              {/* Point 2 */}
              <div className="p-6 rounded-lg bg-zinc-950 border border-zinc-900">
                <div className="w-10 h-10 rounded bg-zinc-900 flex items-center justify-center text-emerald-400 border border-zinc-800 mb-6">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3">Alliancer & Partnerkanal</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Jeg ved præcis, hvordan man bygger og modner en partnerkanal, og hvordan man navigerer i komplekse økosystemer som Microsofts Co-sell program for at opnå maksimal synlighed og support.
                </p>
              </div>

              {/* Point 3 */}
              <div className="p-6 rounded-lg bg-zinc-950 border border-zinc-900">
                <div className="w-10 h-10 rounded bg-zinc-900 flex items-center justify-center text-emerald-400 border border-zinc-800 mb-6">
                  <Rocket className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3">Fleksibilitet</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  I får den tunge kommercielle ledelse (CRO-niveau / kommerciel direktør), I har brug for lige nu, uden at skulle ansætte en fuldtidsdirektør fra dag ét. Det holder omkostningerne nede.
                </p>
              </div>

            </div>
          </section>

          {/* CV Section */}
          <section className="py-16 border-t border-zinc-900">
            <div className="p-8 rounded-lg bg-zinc-950 border border-zinc-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-xl font-bold text-white uppercase">Se mit CV på LinkedIn</h4>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  På LinkedIn finder du mit CV, der viser hvilke virksomheder jeg har arbejdet for de seneste 20 år, samt hvilke spændende udfordringer jeg har arbejdet med gennem årene.
                </p>
                <p className="text-zinc-500 text-xs mt-3 italic">
                  CV'et fortæller ikke alt, men hvis du har fået lyst til at vide mere, så lad os tage en snak over en kop kaffe!
                </p>
              </div>

              <div className="flex flex-col gap-3 min-w-[200px]">
                <a
                  href="https://www.linkedin.com/in/michaelwhansen"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded bg-zinc-900 border border-zinc-800 text-white font-semibold text-center hover:bg-zinc-800 hover:border-zinc-700 transition-all text-sm flex items-center justify-center gap-2"
                >
                  <Linkedin className="w-4 h-4 text-[#0077B5]" />
                  LinkedIn Profil
                  <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                </a>
              </div>
            </div>
          </section>

          {/* Contact / Snak & Inbox Section */}
          <section id="snak" className="scroll-mt-12 py-16 border-t border-zinc-900">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              <div className="lg:col-span-5">
                <span className="text-xs font-mono uppercase text-emerald-400 tracking-widest block mb-4">
                  Lad os tale sammen
                </span>
                <h3 className="text-3xl font-extrabold text-white uppercase tracking-tight mb-4">
                  Skal vi tage den første snak?
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Lad os tage en uforpligtende dialog om, hvor din virksomhed står i dag, og hvordan vi bedst kan gribe jeres næste internationale marked an.
                </p>

                <div className="p-4 rounded bg-zinc-950 border border-zinc-900 space-y-4">
                  <div className="flex items-center gap-3 text-zinc-300 text-xs">
                    <Coffee className="w-4 h-4 text-emerald-400" />
                    <span>Uforpligtende kaffemøde i København el. virtuelt</span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-300 text-xs">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Konkrete råd til din SaaS-skaleringsmodel</span>
                  </div>
                </div>

                <div className="mt-8">
                  <span className="block text-[10px] uppercase tracking-widest text-zinc-600 mb-2">
                    Erhvervstitel
                  </span>
                  <p className="text-sm font-semibold text-zinc-300 font-mono">
                    Powerful Business Developer for SaaS
                  </p>
                </div>
              </div>

              {/* Contact form and Live Demo Inbox */}
              <div className="lg:col-span-7">
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 md:p-8">
                  <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Send className="w-4 h-4 text-emerald-400" />
                    Send besked eller anmod om en snak
                  </h4>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5 font-mono">
                          Navn *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                          placeholder="F.eks. Anders Nielsen"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5 font-mono">
                          E-mail adresse *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                          placeholder="anders@saascompany.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5 font-mono">
                        Virksomhed (valgfri)
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                        placeholder="F.eks. OptiSaaS ApS"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5 font-mono">
                        Besked / Hvad vil du høre mere om? *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-900/60 border border-zinc-800 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                        placeholder="Skriv lidt om jeres SaaS og hvilke markeder I kigger på..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded tracking-wider uppercase transition-colors"
                    >
                      Send anmodning
                    </button>
                  </form>

                  {/* Toast/Notification success state */}
                  <AnimatePresence>
                    {isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-4 p-4 rounded bg-emerald-950/40 border border-emerald-900 text-emerald-400 text-xs flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <span>Mange tak! Din besked er blevet gemt lokalt og simuleret sendt til Michael. Vi svarer så hurtigt som muligt over kaffen!</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Locally Saved Inquiries list (simulating inbox review for client preview) */}
                  {inquiries.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-zinc-900">
                      <span className="block text-[10px] uppercase tracking-widest text-zinc-600 mb-3 font-mono">
                        Modtagne forespørgsler (gemt i din browser)
                      </span>
                      <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
                        {inquiries.map((inq) => (
                          <div key={inq.id} className="p-3 rounded bg-zinc-900/40 border border-zinc-900 text-xs">
                            <div className="flex justify-between text-[10px] text-zinc-500 font-mono mb-1">
                              <span>{inq.company}</span>
                              <span>{inq.date}</span>
                            </div>
                            <div className="font-semibold text-white mb-1">
                              {inq.name} ({inq.email})
                            </div>
                            <p className="text-zinc-400 line-clamp-2">{inq.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="flex flex-col md:flex-row justify-between items-start md:items-end mt-16 pt-8 border-t border-zinc-900 gap-6 md:gap-0 text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-medium font-mono">
          <div>Based in Copenhagen, Denmark</div>
          <div className="flex gap-4 md:gap-6">
            <a href="https://www.linkedin.com/in/michaelwhansen" target="_blank" rel="noreferrer" className="hover:text-zinc-400 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">X</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Facebook</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Instagram</a>
          </div>
          <div>© {new Date().getFullYear()} Michael W. Hansen. All Rights Reserved</div>
        </footer>

      </div>
    </div>
  );
}
