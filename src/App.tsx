import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Clock, 
  Settings, 
  Plus, 
  Trash, 
  Download, 
  User, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  Database, 
  Cpu, 
  Coins, 
  Check, 
  Bike, 
  Car, 
  RefreshCw,
  Activity,
  Calendar
} from 'lucide-react';
import { productDocSections, ProductDocSection } from './data';
import { DeliveryDay, UserProfile } from './types';

// Default mock data for first launch experience
const INITIAL_DELIVERY_DAYS: DeliveryDay[] = [
  { id: '1', date: '2026-06-07', earnings: 180.00, deliveries: 15, fuelCost: 25.00, hoursWorked: 8.0, notes: 'Entrega na Zona Sul, sem ocorrências', mileage: 42 },
  { id: '2', date: '2026-06-08', earnings: 220.00, deliveries: 18, fuelCost: 30.00, hoursWorked: 9.5, notes: 'Dia chuvoso, gorjetas extras no centro', mileage: 58 },
  { id: '3', date: '2026-06-09', earnings: 140.00, deliveries: 11, fuelCost: 20.00, hoursWorked: 6.0, notes: '', mileage: 35 },
  { id: '4', date: '2026-06-10', earnings: 195.00, deliveries: 16, fuelCost: 22.00, hoursWorked: 7.5, notes: 'Pneu esvaziou à tarde, mas corre rendeu bastante', mileage: 48 },
  { id: '5', date: '2026-06-11', earnings: 165.00, deliveries: 13, fuelCost: 25.00, hoursWorked: 7.0, notes: 'Apenas corridas expressas perto do centro', mileage: 39 }
];

const INITIAL_PROFILE: UserProfile = {
  name: 'Tiago Sousa',
  dailyGoal: 150.00,
  monthlyGoal: 3500.00,
  vehicleType: 'moto',
  isPremium: false // Kept internally for structure compatibility, but UI contains no premium limitations.
};

export default function App() {
  // Sync core data using localStorage
  const [deliveryDays, setDeliveryDays] = useState<DeliveryDay[]>(() => {
    const saved = localStorage.getItem('correpro_delivery_days');
    return saved ? JSON.parse(saved) : INITIAL_DELIVERY_DAYS;
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('correpro_profile');
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  useEffect(() => {
    localStorage.setItem('correpro_delivery_days', JSON.stringify(deliveryDays));
  }, [deliveryDays]);

  useEffect(() => {
    localStorage.setItem('correpro_profile', JSON.stringify(profile));
  }, [profile]);

  // Documentation navigation (Left side)
  const [selectedDocCategory, setSelectedDocCategory] = useState<'All' | 'Branding & Business' | 'Architecture & Tech' | 'Growth & Strategy'>('All');
  const [activeDocId, setActiveDocId] = useState<string>('product-vision');

  // Simulator tabs inside smartphone (Right side)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'add' | 'stats' | 'profile'>('dashboard');

  // Daily Logging Input states
  const [inputEarnings, setInputEarnings] = useState<string>('180');
  const [inputDeliveries, setInputDeliveries] = useState<string>('14');
  const [inputFuel, setInputFuel] = useState<string>('25');
  const [inputHours, setInputHours] = useState<string>('8');
  const [inputDate, setInputDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [inputNotes, setInputNotes] = useState<string>('');
  const [inputMileage, setInputMileage] = useState<string>('');
  const [isSavedAnimation, setIsSavedAnimation] = useState(false);
  const [savedSummary, setSavedSummary] = useState<DeliveryDay | null>(null);
  const [selectedDayDetail, setSelectedDayDetail] = useState<DeliveryDay | null>(null);

  // Chart and analytical states
  const [chartType, setChartType] = useState<'bars' | 'candles'>('bars');
  const [selectedChartIndex, setSelectedChartIndex] = useState<number | null>(null);

  // Simple Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Preset loaders for simulation testing
  const resetToDefault = () => {
    setDeliveryDays(INITIAL_DELIVERY_DAYS);
    setProfile(INITIAL_PROFILE);
    triggerToast("Registros restaurados para o padrão!");
  };

  const clearAllData = () => {
    setDeliveryDays([]);
    setProfile({
      ...profile,
      name: "Entregador Parceiro",
      dailyGoal: 150,
      monthlyGoal: 3500
    });
    triggerToast("Histórico local limpo.");
  };

  const loadHighPerformanceScenario = () => {
    const highPerformData: DeliveryDay[] = [
      { id: 'hp1', date: '2026-06-05', earnings: 280.00, deliveries: 22, fuelCost: 35.00, hoursWorked: 10.0 },
      { id: 'hp2', date: '2026-06-06', earnings: 340.00, deliveries: 26, fuelCost: 40.00, hoursWorked: 11.5 },
      { id: 'hp3', date: '2026-06-07', earnings: 310.00, deliveries: 24, fuelCost: 38.00, hoursWorked: 10.5 },
      { id: 'hp4', date: '2026-06-08', earnings: 290.00, deliveries: 21, fuelCost: 35.00, hoursWorked: 9.0 },
      { id: 'hp5', date: '2026-06-09', earnings: 325.00, deliveries: 25, fuelCost: 42.00, hoursWorked: 11.0 }
    ];
    setDeliveryDays(highPerformData);
    triggerToast("Carregados lançamentos de faturamento alto.");
  };

  // Calculations for total statistics
  const totalEarnings = deliveryDays.reduce((acc, curr) => acc + curr.earnings, 0);
  const totalFuelCost = deliveryDays.reduce((acc, curr) => acc + curr.fuelCost, 0);
  const totalDeliveries = deliveryDays.reduce((acc, curr) => acc + curr.deliveries, 0);
  const totalHours = deliveryDays.reduce((acc, curr) => acc + curr.hoursWorked, 0);
  
  const totalNetProfit = totalEarnings - totalFuelCost;
  const averageEarningsPerDelivery = totalDeliveries > 0 ? (totalEarnings / totalDeliveries) : 0;
  const averageEarningsPerHour = totalHours > 0 ? (totalEarnings / totalHours) : 0;
  const averageEarningsPerDay = deliveryDays.length > 0 ? (totalEarnings / deliveryDays.length) : 0;

  // Last logged day dashboard parameters
  const lastDay = deliveryDays.length > 0 ? deliveryDays[deliveryDays.length - 1] : null;

  // Weekday performance calculation helper
  const weekdayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const getBestAndWorstDays = () => {
    const sums: { [key: number]: { earnings: number, count: number } } = {};
    deliveryDays.forEach(day => {
      const d = new Date(day.date + 'T00:00:00');
      const dayOfWeek = d.getDay();
      if (!sums[dayOfWeek]) {
        sums[dayOfWeek] = { earnings: 0, count: 0 };
      }
      sums[dayOfWeek].earnings += day.earnings;
      sums[dayOfWeek].count += 1;
    });

    let bestDayName = 'Sem dados';
    let maxAvg = 0;

    Object.keys(sums).forEach(key => {
      const idx = parseInt(key);
      const avg = sums[idx].earnings / sums[idx].count;
      if (avg > maxAvg) {
        maxAvg = avg;
        bestDayName = weekdayNames[idx];
      }
    });

    return { best: bestDayName };
  };

  const weekdayStats = getBestAndWorstDays();

  // Best day of the month calculation (highest daily earnings recorded)
  const getBestDayOfMonthInfo = () => {
    if (deliveryDays.length === 0) return { day: 'Sem dados', value: 0 };
    let bestDay = deliveryDays[0];
    deliveryDays.forEach(day => {
      if (day.earnings > bestDay.earnings) {
        bestDay = day;
      }
    });
    
    const dateParts = bestDay.date.split('-');
    const formattedDate = dateParts.length >= 3 ? `${dateParts[2]}/${dateParts[1]}` : bestDay.date;
    
    return {
      day: formattedDate,
      value: bestDay.earnings
    };
  };

  const bestDayOfMonth = getBestDayOfMonthInfo();

  // Evolution statistics calculation compared to other period splits
  const getEvolutionStats = () => {
    let weekPercent = "+12%";
    let monthPercent = "+8%";
    let weekIsPositive = true;
    let monthIsPositive = true;

    if (deliveryDays.length >= 4) {
      const mid = Math.floor(deliveryDays.length / 2);
      const half1 = deliveryDays.slice(0, mid);
      const half2 = deliveryDays.slice(mid);
      
      const sum1 = half1.reduce((acc, d) => acc + (d.earnings - d.fuelCost), 0);
      const sum2 = half2.reduce((acc, d) => acc + (d.earnings - d.fuelCost), 0);
      
      if (sum1 > 0) {
        const diff = ((sum2 - sum1) / sum1) * 100;
        weekPercent = `${diff >= 0 ? '+' : ''}${diff.toFixed(0)}%`;
        weekIsPositive = diff >= 0;
      }
    }

    if (profile.monthlyGoal > 0) {
      const completedRatio = (totalNetProfit / profile.monthlyGoal) * 100;
      const diff = completedRatio - 48; // Compare progression vs baseline
      monthPercent = `${diff >= 0 ? '+' : ''}${diff.toFixed(0)}%`;
      monthIsPositive = diff >= 0;
    }

    return { weekPercent, monthPercent, weekIsPositive, monthIsPositive };
  };

  const evolution = getEvolutionStats();

  // New Day Submission handler
  const handleSaveDay = (e: React.FormEvent) => {
    e.preventDefault();
    const earnings = parseFloat(inputEarnings) || 0;
    const deliveries = parseInt(inputDeliveries) || 0;
    const fuelCost = parseFloat(inputFuel) || 0;
    const hoursWorked = parseFloat(inputHours) || 0;
    const notes = inputNotes.trim() || undefined;
    const mileage = inputMileage ? (parseFloat(inputMileage) || undefined) : undefined;

    if (!inputDate) {
      triggerToast("Selecione uma data válida.");
      return;
    }

    const filtered = deliveryDays.filter(day => day.date !== inputDate);

    const newRecord: DeliveryDay = {
      id: Date.now().toString(),
      date: inputDate,
      earnings,
      deliveries,
      fuelCost,
      hoursWorked,
      notes,
      mileage
    };

    setDeliveryDays([...filtered, newRecord].sort((a,b) => a.date.localeCompare(b.date)));
    setSavedSummary(newRecord);
    setInputNotes('');
    setInputMileage('');
    triggerToast(`Dia ${inputDate.split('-').reverse().slice(0, 2).join('/')} salvo com sucesso!`);
  };

  const deleteDay = (id: string) => {
    setDeliveryDays(deliveryDays.filter(day => day.id !== id));
    triggerToast("Registro diário excluído.");
  };

  // Selected doc section
  const currentDoc = productDocSections.find(doc => doc.id === activeDocId) || productDocSections[0];

  // Helper filters for docs tab
  const filteredDocSections = productDocSections.filter(doc => {
    if (selectedDocCategory === 'All') return true;
    return doc.category === selectedDocCategory;
  });

  return (
    <div className="min-h-screen bg-[#090909] text-[#FFFFFF] font-sans antialiased selection:bg-[#FF8A00] selection:text-black relative bg-radar-glow">
      
      {/* Toast Alert Portal */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#151515] px-5 py-3 rounded-xl flex items-center gap-2.5 border border-[#242424] max-w-sm w-full shadow-2xl shadow-black/80 animate-fade-in animate-duration-200">
          <div className="h-1.5 w-1.5 rounded-full bg-[#FF8A00] animate-pulse" />
          <p className="text-xs font-semibold text-[#FFFFFF]">{toastMessage}</p>
        </div>
      )}

      {/* Hero Top Branding Header - Professional, Swiss, Premium Style */}
      <header className="border-b border-[#242424] bg-[#111111]/95 backdrop-blur-md sticky top-0 z-40 inner-glow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded bg-[#FF8A00] flex items-center justify-center font-extrabold text-[#090909] text-lg tracking-tighter shadow-sm shadow-[#FF8A00]/20">
              C
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight text-[#FFFFFF]">Corre<span className="text-[#FF8A00]">+</span></h1>
                <span className="text-[10px] bg-[#1B1B1B] text-[#BDBDBD] px-2 py-0.5 rounded border border-[#242424] font-mono font-medium">
                  PROPOSTA MVP V1.0
                </span>
              </div>
              <p className="text-[11px] text-[#BDBDBD]">Visão Estrutural & Protótipo Funcional Interativo para Entregadores Autônomos</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap text-[10px] text-[#BDBDBD]">
            <span className="bg-[#151515] px-2.5 py-1 rounded border border-[#242424] font-mono">
              Notion Style
            </span>
            <span className="bg-[#151515] px-2.5 py-1 rounded border border-[#242424] font-mono">
              Linear Grid
            </span>
          </div>
        </div>
      </header>

      {/* Main Grid: Interactive Docs (Left) & Smartphone Phone Simulator (Right) */}
      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Clean Document Reader - 7 Cols */}
        <div className="col-span-1 lg:col-span-7 flex flex-col gap-6" id="documentation-hub">
          
          {/* Header intro briefing box */}
          <div className="bg-[#151515] border border-[#242424] p-6 rounded-xl clean-card-shadow inner-glow">
            <div className="flex items-center gap-1.5 text-[#FF8A00] mb-2 font-mono text-[10px] font-bold tracking-wider uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              <span>DIRETRIZES DE PROJETO</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-[#FFFFFF] tracking-tight mb-2">
              Planejamento Técnico & Filosofia de Design
            </h2>
            <p className="text-xs text-[#BDBDBD] leading-relaxed font-sans">
              Proposta integrada de interface esportiva sob uma ótica ultra-minimalista. Navegue pela documentação técnica estrutural abaixo. No simulador ao lado, avalie a experiência real de acompanhamento de caixa e rotina do entregador.
            </p>
          </div>

          {/* Docs Tab Categories Filter */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 border-b border-[#242424] scrollbar-none">
            <button 
              onClick={() => setSelectedDocCategory('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                selectedDocCategory === 'All' 
                ? 'bg-[#1B1B1B] border border-[#FF8A00] text-[#FF8A00]' 
                : 'bg-transparent text-[#BDBDBD] hover:text-[#FFFFFF]'
              }`}
            >
              Todos os Temas
            </button>
            <button 
              onClick={() => setSelectedDocCategory('Branding & Business')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                selectedDocCategory === 'Branding & Business' 
                ? 'bg-[#1B1B1B] border border-[#FF8A00] text-[#FF8A00]' 
                : 'bg-transparent text-[#BDBDBD] hover:text-[#FFFFFF]'
              }`}
            >
              Identidade & Visão
            </button>
            <button 
              onClick={() => setSelectedDocCategory('Architecture & Tech')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                selectedDocCategory === 'Architecture & Tech' 
                ? 'bg-[#1B1B1B] border border-[#FF8A00] text-[#FF8A00]' 
                : 'bg-transparent text-[#BDBDBD] hover:text-[#FFFFFF]'
              }`}
            >
              Arquitetura & Código
            </button>
            <button 
              onClick={() => setSelectedDocCategory('Growth & Strategy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                selectedDocCategory === 'Growth & Strategy' 
                ? 'bg-[#1B1B1B] border border-[#FF8A00] text-[#FF8A00]' 
                : 'bg-transparent text-[#BDBDBD] hover:text-[#FFFFFF]'
              }`}
            >
              Uso & Engajamento
            </button>
          </div>

          {/* Mini Cards Hub */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {filteredDocSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveDocId(section.id)}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  activeDocId === section.id 
                    ? 'bg-[#1B1B1B] border-[#FF8A00] text-[#FFFFFF] clean-card-shadow' 
                    : 'bg-[#151515] border-[#242424] hover:border-[#FF8A00] text-[#BDBDBD] hover:text-[#FFFFFF]'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 text-[9px] font-mono font-bold text-[#BDBDBD]">
                  <span>{section.category.split(' ')[0].toUpperCase()}</span>
                </div>
                <h4 className="text-xs font-semibold leading-tight line-clamp-1">{section.title}</h4>
              </button>
            ))}
          </div>

          {/* Active document text view */}
          <div className="bg-[#151515] border border-[#242424] rounded-xl flex-1 flex flex-col min-h-[440px] clean-card-shadow inner-glow">
            <div className="border-b border-[#242424] bg-[#111111] px-5 py-3 flex items-center justify-between">
              <span className="text-[10px] font-bold font-mono tracking-wider text-[#FF8A00]">
                CAPÍTULO / {currentDoc.category}
              </span>
              <span className="text-[10px] text-[#BDBDBD] flex items-center gap-1">
                <FileText className="h-3 w-3" /> Whitepaper_Corre.md
              </span>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[500px] flex-1 text-xs text-[#BDBDBD] leading-relaxed space-y-4">
              <h3 className="text-base font-bold text-[#FFFFFF] mb-2 pb-1.5 border-b border-[#242424]">
                {currentDoc.title}
              </h3>
              
              <div className="space-y-4">
                {currentDoc.content.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.trim().startsWith('###')) {
                    return <h4 key={idx} className="text-xs font-bold text-[#FF8A00] mt-4 uppercase tracking-wider">{paragraph.replace('###', '').trim()}</h4>;
                  }
                  if (paragraph.trim().startsWith('*')) {
                    return (
                      <ul key={idx} className="space-y-1 pl-4 list-disc text-[#BDBDBD]">
                        {paragraph.split('\n').map((line, lidx) => {
                          const cleaned = line.replace(/^\s*\*\s*/, '').trim();
                          const parts = cleaned.split('**');
                          if (parts.length > 2) {
                            return (
                              <li key={lidx}>
                                <strong className="text-[#FFFFFF]">{parts[1]}</strong>{parts.slice(2).join('')}
                              </li>
                            );
                          }
                          return <li key={lidx}>{cleaned}</li>;
                        })}
                      </ul>
                    );
                  }
                  if (paragraph.trim().startsWith('```sql')) {
                    const code = paragraph.replace('```sql', '').replace('```', '').trim();
                    return (
                      <div key={idx} className="relative mt-2 rounded-lg overflow-hidden border border-[#242424]">
                        <div className="bg-[#1B1B1B] px-4 py-1.5 flex items-center justify-between text-[10px] text-[#BDBDBD] font-mono">
                          <span>SQL Schema (Supabase)</span>
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(code);
                              triggerToast("SQL Schema copiado!");
                            }}
                            className="text-[#FF8A00] hover:underline cursor-pointer"
                          >
                            Copiar
                          </button>
                        </div>
                        <pre className="bg-[#090909] p-3 overflow-x-auto text-[10px] text-[#FF8A00] font-mono leading-relaxed max-h-48">
                          {code}
                        </pre>
                      </div>
                    );
                  }
                  if (paragraph.trim().startsWith('```text')) {
                    const code = paragraph.replace('```text', '').replace('```', '').trim();
                    return (
                      <div key={idx} className="bg-[#090909] p-3 rounded-lg border border-[#242424] font-mono text-[10px] text-[#BDBDBD] whitespace-pre overflow-x-auto">
                        {code}
                      </div>
                    );
                  }
                  return <p key={idx}>{paragraph}</p>;
                })}
              </div>
            </div>
          </div>

          {/* Product Vision Footer Bar replacing monetisation links */}
          <div className="bg-[#151515] border border-[#242424] p-4 rounded-xl flex items-center justify-between text-xs clean-card-shadow inner-glow">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-[#BDBDBD]" />
              <span className="text-[#BDBDBD]">Nenhum jargão promocional. Foco integral em utilidade e pista.</span>
            </div>
            <span className="text-[10px] text-[#FF8A00] font-mono font-bold">Corre+ PROTOTYPE</span>
          </div>

        </div>

        {/* RIGHT COLUMN: Phone Simulation Frame - 5 Cols */}
        <div className="col-span-1 lg:col-span-5 flex flex-col items-center gap-6">
          
          {/* SIMULATOR CONTROLLER */}
          <div className="w-full bg-[#151515] border border-[#242424] p-4.5 rounded-xl flex flex-col gap-3 shadow-lg select-none inner-glow">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#BDBDBD] flex items-center gap-1.5 font-mono">
                <Settings className="h-4 w-4 text-[#FF8A00]" /> Dados do Painel de Simulação
              </h3>
              <span className="text-[8px] text-[#FF8A00] font-mono bg-[#1B1B1B] px-1.5 py-0.5 rounded border border-[#242424]">LOCAL BACKEND</span>
            </div>
            
            <p className="text-[11px] text-[#BDBDBD] leading-relaxed">
              Disparamos rotinas locais para testar a reatividade automática de fórmulas matemáticas e gráficos.
            </p>
 
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={loadHighPerformanceScenario}
                className="bg-[#1B1B1B] hover:bg-[#242424] text-[#FF8A00] py-1.5 px-2.5 rounded text-[11px] font-bold border border-[#242424] hover:border-[#FF8A00] transition-all text-center cursor-pointer"
              >
                Ganhos Altos
              </button>
              <button 
                onClick={resetToDefault}
                className="bg-[#1B1B1B] hover:bg-[#242424] text-[#FFFFFF] py-1.5 px-2.5 rounded text-[11px] font-bold border border-[#242424] hover:border-[#BDBDBD] transition-all text-center cursor-pointer"
              >
                Resetar Filtro
              </button>
              <button 
                onClick={clearAllData}
                className="bg-[#1B1B1B] hover:bg-[#341A1A] text-[#EF4444] py-1.5 px-2.5 rounded text-[11px] font-bold border border-[#242424] hover:border-[#EF4444] transition-all text-center cursor-pointer"
              >
                Zerar Dados
              </button>
            </div>
          </div>
 
          {/* SMARTPHONE DEVICE WRAPPER */}
          <div className="relative w-full max-w-[340px] bg-[#111111] p-3 rounded-[40px] border-4 border-[#242424] shadow-2xl overflow-hidden inner-glow">
            
            {/* Front Camera notches */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-28 bg-[#111111] rounded-b-xl z-30 flex items-center justify-center">
              <div className="h-1 w-8 bg-[#242424] rounded-full mb-1" />
            </div>
 
            {/* Screen Content Wrapper */}
            <div className="relative bg-[#0A0A0A] min-h-[580px] rounded-[30px] overflow-hidden flex flex-col pt-3 border border-[#242424]">
              
              {/* Ambient glow */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 h-44 w-56 bg-[#FF8A00]/15 rounded-full blur-3xl pointer-events-none z-0" />
              
              {/* Internal Device Status Header */}
              <div className="relative z-10 px-5 pt-1.5 pb-2 flex justify-between items-center text-[9px] text-[#8a8a8a] select-none">
                <span>12:00</span>
                <span className="text-[8px] uppercase tracking-widest font-medium text-[#FF8A00]">GPS ativo</span>
                <span>99% 🔋</span>
              </div>
 
              {/* Scrollable container viewport */}
              <div className="relative z-10 flex-1 overflow-y-auto px-4 pt-3.5 pb-24 max-h-[460px] scrollbar-none space-y-4">
                
                {/* TAB 1: DASHBOARD */}
                {activeTab === 'dashboard' && (
                  <div className="space-y-4 font-sans">
                    
                    {/* Welcome Block */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-[#8a8a8a] block">Boa tarde</span>
                        <h3 className="text-base font-medium text-[#FFFFFF]">{profile.name}</h3>
                      </div>
                      <div className="h-9 w-9 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center shadow-inner">
                        {profile.vehicleType === 'moto' && <Bike className="h-4 w-4 text-[#FF8A00]" />}
                        {profile.vehicleType === 'bike' && <Activity className="h-4 w-4 text-[#FF8A00]" />}
                        {profile.vehicleType === 'car' && <Car className="h-4 w-4 text-[#FF8A00]" />}
                      </div>
                    </div>
 
                    {/* RECENT OR GENERAL NET PROFIT CARD */}
                    <div className="bg-gradient-to-br from-[#1c1108] via-[#151515] to-[#0e0e0e] border border-[#2e1c0a] p-4 rounded-2xl relative overflow-hidden inner-glow">
                      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[#FF8A00]/15 blur-2xl pointer-events-none" />
                      <p className="text-[10px] font-medium text-[#FF8A00] tracking-wider uppercase">Lucro Líquido Acumulado</p>
                      
                      {deliveryDays.length === 0 ? (
                        <div className="py-2">
                          <h2 className="text-3xl font-semibold text-[#FFFFFF] tracking-tight">R$ 0,00</h2>
                          <p className="text-[9px] text-[#BDBDBD] mt-1">Nenhum corre registrado nesta semana.</p>
                        </div>
                      ) : (
                        <div className="py-1">
                          <h2 className="text-3xl font-semibold text-[#FFFFFF] tracking-tight">
                            R$ {totalNetProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </h2>
                          <p className="text-[9.5px] text-[#BDBDBD] mt-0.5">
                            Saldo real livre descontando R$ {totalFuelCost.toFixed(0)} de despesas.
                          </p>
                          {/* Evolution indicator row */}
                          <div className="flex items-center gap-2 mt-1.5 pt-1.5 border-t border-[#242424]/40 text-[9px]">
                            <div className="flex items-center gap-1">
                              <span className="text-[8px] text-[#BDBDBD] font-mono uppercase">Vs. semana ant.:</span>
                              <span className={`font-bold font-mono ${evolution.weekIsPositive ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                                {evolution.weekPercent}
                              </span>
                            </div>
                            <div className="h-2.5 w-[1px] bg-[#242424]" />
                            <div className="flex items-center gap-1">
                              <span className="text-[8px] text-[#BDBDBD] font-mono uppercase">Vs. mês ant.:</span>
                              <span className={`font-bold font-mono ${evolution.monthIsPositive ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                                {evolution.monthPercent}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
 
                      {/* Financial statistics grid row */}
                      <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-[#242424] text-left">
                        <div>
                          <p className="text-[8px] text-[#BDBDBD] font-mono uppercase">Ganhos Brutos</p>
                          <p className="font-semibold text-[#FFFFFF] font-mono text-[11px]">R$ {totalEarnings.toFixed(0)}</p>
                        </div>
                        <div>
                          <p className="text-[8px] text-[#BDBDBD] font-mono uppercase">Entregas</p>
                          <p className="font-semibold text-[#FFFFFF] font-mono text-[11px]">{totalDeliveries} u.</p>
                        </div>
                        <div>
                          <p className="text-[8px] text-[#FF8A00] font-mono uppercase font-semibold">Meta Diária</p>
                          <p className="font-semibold text-[#FF8A00] font-mono text-[11px]">R$ {profile.dailyGoal.toFixed(0)}</p>
                        </div>
                      </div>
 
                      {/* Goal tracking slider indicators */}
                      {lastDay && (
                        <div className="mt-3.5 pt-1 space-y-1">
                          <div className="flex justify-between items-center text-[9px] text-[#BDBDBD]">
                            <span>Último faturamento vs. Meta</span>
                            <span className="font-bold text-[#FFFFFF] font-mono">
                              {lastDay.earnings >= profile.dailyGoal 
                                ? 'Alcançada! ✓' 
                                : `${((lastDay.earnings / profile.dailyGoal) * 100).toFixed(0)}%`
                              }
                            </span>
                          </div>
                          <div className="h-1 w-full bg-[#090909] rounded-full overflow-hidden">
                            <div 
                              className="bg-[#FF8A00] h-full rounded-full transition-all duration-300" 
                              style={{ width: `${Math.min(100, (lastDay.earnings / profile.dailyGoal) * 100)}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
 
                    {/* LAST LOGGED CORRE SUMMARY DETAILS */}
                    <div className="bg-[#151515] border border-[#242424] p-3.5 rounded-xl space-y-3 inner-glow">
                      <div className="flex items-center justify-between pb-1.5 border-b border-[#242424]/60">
                        <span className="text-[10px] font-bold text-[#FFFFFF] uppercase tracking-wider font-mono">Último Lançamento</span>
                        <span className="text-[9px] text-[#BDBDBD] font-mono">
                          {lastDay ? lastDay.date.split('-').reverse().slice(0, 2).join('/') : 'Sem registros'}
                        </span>
                      </div>
 
                      {lastDay ? (
                        <div className="grid grid-cols-2 gap-3 text-left">
                          <div>
                            <span className="text-[8.5px] text-[#BDBDBD] uppercase block">Ganhos de Pista</span>
                            <span className="text-xs font-bold text-[#FFFFFF] font-mono">R$ {lastDay.earnings.toFixed(2)}</span>
                          </div>
                          <div>
                            <span className="text-[8.5px] text-[#BDBDBD] uppercase block">Combustível Gasto</span>
                            <span className="text-xs font-bold text-[#EF4444] font-mono">R$ {lastDay.fuelCost.toFixed(2)}</span>
                          </div>
                          <div>
                            <span className="text-[8.5px] text-[#BDBDBD] uppercase block">Lucro Líquido</span>
                            <span className="text-xs font-bold text-[#22C55E] font-mono">R$ {(lastDay.earnings - lastDay.fuelCost).toFixed(2)}</span>
                          </div>
                          <div>
                            <span className="text-[8.5px] text-[#BDBDBD] uppercase block">Entregas Realizadas</span>
                            <span className="text-xs font-bold text-[#FFFFFF] font-mono">{lastDay.deliveries} corridas</span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-[10px] text-[#BDBDBD] italic">Nenhum faturamento catalogado. Vá para a aba "+" para lançar.</p>
                      )}
                    </div>
 
                    {/* GENERAL MVP CORE INDEX STATISTICS PANEL */}
                    <div className="bg-[#151515] border border-[#242424] p-3 rounded-xl inner-glow">
                      <span className="text-[9px] font-bold text-[#BDBDBD] uppercase tracking-wider block mb-2 font-mono">Métricas de Faturamento</span>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-[#090909] p-2 rounded border border-[#242424]/70">
                          <span className="text-[8px] text-[#BDBDBD] block">MÉDIA/ENTREGA</span>
                          <span className="font-bold text-[#FFFFFF] font-mono">R$ {averageEarningsPerDelivery.toFixed(2)}</span>
                        </div>
                        <div className="bg-[#090909] p-2 rounded border border-[#242424]/70">
                          <span className="text-[8px] text-[#BDBDBD] block">MÉDIA/HORA</span>
                          <span className="font-bold text-[#FFFFFF] font-mono">R$ {averageEarningsPerHour.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
 
                    {/* Call to fast add action */}
                    <button
                      onClick={() => setActiveTab('add')}
                      className="w-full py-3 bg-[#FF8A00] text-[#0A0A0A] font-medium text-xs rounded-2xl hover:bg-[#E65C00] transition-all flex items-center justify-center gap-1.5 focus:outline-none cursor-pointer"
                    >
                      <Plus className="h-4 w-4 stroke-[2.5px]" /> Registrar novo corre
                    </button>
 
                  </div>
                )}
 
                {/* TAB 2: REGISTER SYSTEM (DAILY LOGGING FORM) */}
                {activeTab === 'add' && (
                  <div className="space-y-4 font-sans text-left">
                    <div>
                      <h3 className="text-sm font-bold text-[#FFFFFF] tracking-tight">Lançamento Rápido</h3>
                      <p className="text-[9.5px] text-[#BDBDBD]">Lançamento rápido do dia de trabalho em pista</p>
                    </div>
 
                    {savedSummary ? (
                      <div className="bg-[#151515] border border-[#FF8A00]/30 p-4 rounded-xl text-left space-y-4 animate-fade-in my-2 inner-glow">
                        <div className="flex items-center gap-2 pb-2 border-b border-[#242424]">
                          <div className="h-6 w-6 rounded-full bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/30 flex items-center justify-center font-bold text-xs">
                            ✓
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#FFFFFF] tracking-tight">Corre Gravado!</h4>
                            <p className="text-[8.5px] text-[#BDBDBD] font-mono">
                              {savedSummary.date.split('-').reverse().join('/')}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[7.5px] uppercase font-bold text-[#BDBDBD] font-mono tracking-wider">RESUMO DO OPERACIONAL</span>
                          
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-[#090909] border border-[#242424] p-2 rounded-lg">
                              <span className="text-[8px] text-[#BDBDBD] block font-mono">GANHOS</span>
                              <span className="font-bold text-[#FFFFFF] font-mono text-[11px]">R$ {savedSummary.earnings.toFixed(2)}</span>
                            </div>
                            <div className="bg-[#090909] border border-[#242424] p-2 rounded-lg">
                              <span className="text-[8px] text-[#EF4444] block font-mono">COMBUSTÍVEL</span>
                              <span className="font-bold text-[#EF4444] font-mono text-[11px]">-R$ {savedSummary.fuelCost.toFixed(2)}</span>
                            </div>
                            <div className="bg-[#090909] border border-[#FF8A00]/20 p-2 rounded-lg col-span-2 text-center">
                              <span className="text-[8px] text-[#22C55E] block font-mono uppercase font-bold">LUCRO ESTIMADO</span>
                              <span className="font-extrabold text-[#22C55E] font-mono text-sm leading-none block my-1">
                                R$ {(savedSummary.earnings - savedSummary.fuelCost).toFixed(2)}
                              </span>
                            </div>
                            <div className="bg-[#090909] border border-[#242424] p-2 rounded-lg">
                              <span className="text-[8px] text-[#BDBDBD] block font-mono">ENTREGAS</span>
                              <span className="font-bold text-[#FFFFFF] font-mono text-[11px]">{savedSummary.deliveries} u.</span>
                            </div>
                            <div className="bg-[#090909] border border-[#242424] p-2 rounded-lg">
                              <span className="text-[8px] text-[#BDBDBD] block font-mono">TEMPO</span>
                              <span className="font-bold text-[#FFFFFF] font-mono text-[11px]">{savedSummary.hoursWorked}h</span>
                            </div>
                            {savedSummary.mileage !== undefined && (
                              <div className="bg-[#090909] border border-[#242424] p-2 rounded-lg col-span-2">
                                <span className="text-[8px] text-[#BDBDBD] block font-mono uppercase">KM RODADOS</span>
                                <span className="font-bold text-[#FFFFFF] font-mono text-[11px]">{savedSummary.mileage} KM</span>
                              </div>
                            )}
                            {savedSummary.notes && (
                              <div className="bg-[#090909] border border-[#242424]/60 p-2 rounded-lg col-span-2 text-left">
                                <span className="text-[8px] text-[#BDBDBD] block font-mono uppercase">OBSERVAÇÕES DO DIA</span>
                                <p className="text-[9px] text-[#BDBDBD] italic whitespace-pre-wrap leading-tight mt-0.5">{savedSummary.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setSavedSummary(null);
                            setActiveTab('dashboard');
                          }}
                          className="w-full py-2.5 bg-[#FF8A00] text-[#090909] font-extrabold text-xs rounded-xl hover:bg-[#E65C00] transition-all text-center uppercase tracking-wider cursor-pointer shadow-md shadow-[#FF8A00]/10"
                        >
                          Ir para o Dashboard
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSaveDay} className="space-y-3">
                        
                        {/* Core Faturamento Bruto */}
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-[#BDBDBD] font-mono tracking-wide">
                            Ganhos Totais (Bruto)
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#BDBDBD] font-mono">
                              R$
                            </span>
                            <input 
                              type="number" 
                              required
                              className="w-full bg-[#151515] border border-[#242424] focus:border-[#FF8A00] py-2 pl-9 pr-3 text-sm font-bold font-mono text-[#FFFFFF] rounded-lg focus:outline-none"
                              placeholder="0"
                              value={inputEarnings}
                              onChange={(e) => setInputEarnings(e.target.value)}
                            />
                          </div>
                          {/* Speed presets */}
                          <div className="flex gap-1 py-0.5">
                            {['120', '150', '200', '250'].map(val => (
                              <button
                                key={val}
                                type="button"
                                onClick={() => setInputEarnings(val)}
                                className={`px-2 py-0.5 text-[9px] font-mono rounded border transition-colors cursor-pointer ${
                                  inputEarnings === val 
                                    ? 'bg-[#1B1B1B] text-[#FF8A00] border-[#FF8A00]' 
                                    : 'bg-[#151515] text-[#BDBDBD] border-[#242424] hover:text-[#FFFFFF] hover:border-[#FF8A00]'
                                }`}
                              >
                                R$ {val}
                              </button>
                            ))}
                          </div>
                        </div>
 
                        {/* Deliveries & Hours worked */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase font-bold text-[#BDBDBD] font-mono">
                              Entregas Feitas
                            </label>
                            <input 
                              type="number" 
                              required
                              className="w-full bg-[#151515] border border-[#242424] focus:border-[#FF8A00] p-2 text-xs font-bold font-mono text-[#FFFFFF] rounded-lg focus:outline-none"
                              placeholder="12"
                              value={inputDeliveries}
                              onChange={(e) => setInputDeliveries(e.target.value)}
                            />
                          </div>
 
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase font-bold text-[#BDBDBD] font-mono">
                              Horas Trabalhadas
                            </label>
                            <input 
                              type="number" 
                              required
                              step="0.5"
                              className="w-full bg-[#151515] border border-[#242424] focus:border-[#FF8A00] p-2 text-xs font-bold font-mono text-[#FFFFFF] rounded-lg focus:outline-none"
                              placeholder="8.0"
                              value={inputHours}
                              onChange={(e) => setInputHours(e.target.value)}
                            />
                          </div>
                        </div>
 
                        {/* Fuel Cost & Mileage (optional) */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[9px] uppercase font-bold text-[#BDBDBD] font-mono">
                              Combustível (R$)
                            </label>
                            <input 
                              type="number" 
                              required
                              className="w-full bg-[#151515] border border-[#242424] focus:border-[#FF8A00] p-2 text-xs font-bold font-mono text-[#FFFFFF] rounded-lg focus:outline-none"
                              placeholder="20.00"
                              value={inputFuel}
                              onChange={(e) => setInputFuel(e.target.value)}
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] uppercase font-bold text-[#BDBDBD] font-mono">
                              KM Rodados (Opcional)
                            </label>
                            <input 
                              type="number" 
                              className="w-full bg-[#151515] border border-[#242424] focus:border-[#FF8A00] p-2 text-xs font-bold font-mono text-[#FFFFFF] rounded-lg focus:outline-none"
                              placeholder="ex: 45"
                              value={inputMileage}
                              onChange={(e) => setInputMileage(e.target.value)}
                            />
                          </div>
                        </div>

                        {/* Free notes (optional) */}
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-[#BDBDBD] font-mono">
                            Observações do Dia (Opcional)
                          </label>
                          <textarea 
                            rows={2}
                            className="w-full bg-[#151515] border border-[#242424] focus:border-[#FF8A00] p-2 text-xs text-[#FFFFFF] rounded-lg focus:outline-none resize-none"
                            placeholder="Nome de clientes, endereços, ocorrências..."
                            value={inputNotes}
                            onChange={(e) => setInputNotes(e.target.value)}
                          />
                        </div>
 
                        {/* Logging Date */}
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-[#BDBDBD] font-mono">
                            Data da Operação
                          </label>
                          <input 
                            type="date" 
                            required
                            className="w-full bg-[#151515] border border-[#242424] focus:border-[#FF8A00] p-2 text-xs font-mono text-[#FFFFFF] rounded-lg focus:outline-none"
                            value={inputDate}
                            onChange={(e) => setInputDate(e.target.value)}
                          />
                        </div>
 
                        {/* Submit */}
                        <button
                          type="submit"
                          className="w-full py-2.5 bg-[#FF8A00] text-[#090909] font-extrabold text-xs rounded-xl hover:bg-[#E65C00] transition-all text-center uppercase tracking-wider mt-1.5 cursor-pointer shadow-md shadow-[#FF8A00]/10"
                        >
                          Salvar Registro
                        </button>
 
                      </form>
                    )}
                  </div>
                )}

                {/* TAB 3: STATS VIEWER (Evolução mensal, Médias, Lançamentos anteriores) */}
                {activeTab === 'stats' && (
                  <div className="space-y-4 font-sans text-left">
                    <div>
                      <h3 className="text-sm font-bold text-[#FFFFFF] tracking-tight">Rotina & Evolução</h3>
                      <p className="text-[9.5px] text-[#BDBDBD]">Histórico e médias de rentabilidade real</p>
                    </div>

                    {/* Three-column micro metrics grid */}
                    <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                      <div className="bg-[#151515] border border-[#242424] p-1.5 rounded-lg inner-glow flex flex-col justify-between min-h-[54px]">
                        <span className="text-[7px] text-[#BDBDBD] font-bold uppercase tracking-wider block leading-tight font-mono">MÉDIA DIÁRIA</span>
                        <span className="font-semibold text-[#FFFFFF] font-mono text-[11px] mt-auto">R$ {averageEarningsPerDay.toFixed(0)}</span>
                      </div>
                      <div className="bg-[#151515] border border-[#242424] p-1.5 rounded-lg inner-glow flex flex-col justify-between min-h-[54px]">
                        <span className="text-[7px] text-[#BDBDBD] font-bold uppercase tracking-wider block leading-tight font-sans font-mono">MELHOR DIA / SEMANA</span>
                        <span className="font-semibold text-[#FF8A00] font-mono text-[11px] mt-auto">{weekdayStats.best}</span>
                      </div>
                      <div className="bg-[#151515] border border-[#242424] p-1.5 rounded-lg inner-glow flex flex-col justify-between min-h-[54px] border-r-2 border-r-[#FF8A00]/50">
                        <span className="text-[7px] text-[#FF8A00] font-extrabold uppercase tracking-wider block leading-tight font-mono">MELHOR DO MÊS</span>
                        <div className="mt-auto">
                          <span className="font-semibold text-[#FFFFFF] font-mono text-[9px] block leading-none mb-0.5">{bestDayOfMonth.day}</span>
                          <span className="font-bold text-[10px] font-mono text-[#22C55E] block leading-none">R$ {bestDayOfMonth.value.toFixed(0)}</span>
                        </div>
                      </div>
                    </div>

                    {/* SVG Interactive Candlestick / Bar Chart representation */}
                    <div className="bg-[#151515] border border-[#242424] p-3 rounded-lg space-y-2.5 inner-glow">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-[#BDBDBD] uppercase tracking-wider font-mono">Evolução do Faturamento</span>
                        
                        {/* Interactive toggle */}
                        <div className="flex bg-[#090909] border border-[#242424] p-0.5 rounded-md text-[8px] font-mono">
                          <button
                            type="button"
                            onClick={() => { setChartType('bars'); setSelectedChartIndex(null); }}
                            className={`px-2 py-0.5 rounded-sm transition-all cursor-pointer ${
                              chartType === 'bars' ? 'bg-[#FF8A00] text-[#090909] font-bold' : 'text-[#BDBDBD] hover:text-[#FFFFFF]'
                            }`}
                          >
                            Barras
                          </button>
                          <button
                            type="button"
                            onClick={() => { setChartType('candles'); setSelectedChartIndex(null); }}
                            className={`px-2 py-0.5 rounded-sm transition-all cursor-pointer ${
                              chartType === 'candles' ? 'bg-[#FF8A00] text-[#090909] font-bold' : 'text-[#BDBDBD] hover:text-[#FFFFFF]'
                            }`}
                          >
                            Velas
                          </button>
                        </div>
                      </div>

                      {deliveryDays.length === 0 ? (
                        <div className="h-28 flex items-center justify-center text-[10px] text-[#BDBDBD] italic">
                          Gráfico vazio.
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {/* Premium Micro Hover/Click Info Panel */}
                          <div className="h-4 flex items-center justify-between text-[8.5px] font-mono">
                            {selectedChartIndex !== null && deliveryDays[selectedChartIndex] ? (
                              (() => {
                                const day = deliveryDays[selectedChartIndex];
                                const net = day.earnings - day.fuelCost;
                                return (
                                  <>
                                    <span className="text-[#FF8A00] font-bold">
                                      {day.date.split('-').reverse().slice(0, 2).join('/')}
                                    </span>
                                    <span className="text-[#BDBDBD]">
                                      Bruto: <strong className="text-[#FFFFFF]">R${day.earnings.toFixed(0)}</strong> | 
                                      Comb: <strong className="text-[#EF4444]">R${day.fuelCost.toFixed(0)}</strong> | 
                                      Líq: <strong className={net >= profile.dailyGoal ? "text-[#22C55E]" : "text-[#FF8A00]"}>R${net.toFixed(0)}</strong>
                                    </span>
                                  </>
                                );
                              })()
                            ) : (
                              <span className="text-[#BDBDBD] italic text-[8.5px]">
                                Toque na {chartType === 'bars' ? 'barra' : 'vela'} para ver detalhes
                              </span>
                            )}
                          </div>

                          <div className="h-24 w-full relative">
                            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                              {/* Horizontal lines representing threshold markers */}
                              <line x1="0" y1="20" x2="100" y2="20" stroke="#242424" strokeWidth="0.5" strokeDasharray="1 2" />
                              <line x1="0" y1="55" x2="100" y2="55" stroke="#242424" strokeWidth="0.5" strokeDasharray="1 2" />
                              <line x1="0" y1="90" x2="100" y2="90" stroke="#242424" strokeWidth="0.5" />
                              
                              {(() => {
                                const maxVal = Math.max(...deliveryDays.map(d => d.earnings), 1);
                                const laneWidth = 100 / deliveryDays.length;
                                const barWidth = laneWidth * 0.55;

                                return deliveryDays.map((day, idx) => {
                                  const x = (idx * laneWidth) + (laneWidth - barWidth) / 2;
                                  
                                  const gross = day.earnings;
                                  const fuel = day.fuelCost;
                                  const net = gross - fuel;
                                  const goal = profile.dailyGoal;

                                  // scale calculations (90 is base, 20 is top, so height is 70)
                                  const y0 = 90;
                                  const yGross = 90 - (gross / maxVal) * 70;
                                  const yNet = 90 - (Math.max(0, net) / maxVal) * 70;
                                  const yFuel = 90 - (fuel / maxVal) * 70;
                                  const yGoal = 90 - (Math.min(goal, maxVal) / maxVal) * 70;

                                  const isSelected = selectedChartIndex === idx;

                                  if (chartType === 'candles') {
                                    // CANDLESTICK CHART TYPE
                                    const bodyY = Math.min(yNet, yFuel);
                                    const bodyHeight = Math.abs(yFuel - yNet);
                                    
                                    // Is Net Profit >= Daily Goal?
                                    const hitGoal = net >= goal;
                                    const bodyColor = hitGoal ? '#22C55E' : '#FF8A00'; // green or premium orange

                                    return (
                                      <g 
                                        key={day.id} 
                                        className="cursor-pointer"
                                        onClick={() => setSelectedChartIndex(idx)}
                                        onMouseEnter={() => setSelectedChartIndex(idx)}
                                      >
                                        {/* Background hover bar */}
                                        <rect 
                                          x={idx * laneWidth} 
                                          y="10" 
                                          width={laneWidth} 
                                          height="80" 
                                          fill={isSelected ? '#FF8A00' : 'transparent'} 
                                          opacity="0.05" 
                                          rx="2"
                                        />

                                        {/* Wick (vertical guide line) */}
                                        <line 
                                          x1={x + barWidth / 2} 
                                          y1={yGross} 
                                          x2={x + barWidth / 2} 
                                          y2={y0} 
                                          stroke={isSelected ? '#FF8A00' : '#242424'} 
                                          strokeWidth="1" 
                                        />

                                        {/* Goal Marker Indicator on this lane */}
                                        <circle 
                                          cx={x + barWidth / 2} 
                                          cy={yGoal} 
                                          r="1.5" 
                                          fill="#FFFFFF" 
                                          opacity="0.5" 
                                        />

                                        {/* Candle Body */}
                                        <rect 
                                          x={x} 
                                          y={bodyY} 
                                          width={barWidth} 
                                          height={Math.max(bodyHeight, 2)} 
                                          fill={bodyColor} 
                                          stroke={isSelected ? '#FFFFFF' : 'none'}
                                          strokeWidth="0.8"
                                          rx="1"
                                        />

                                        {/* Fuel Base representation (red footer below candle body) */}
                                        {fuel > 0 && (
                                          <rect 
                                            x={x + barWidth * 0.2} 
                                            y={yFuel} 
                                            width={barWidth * 0.6} 
                                            height={Math.max(y0 - yFuel, 1.5)} 
                                            fill="#EF4444" 
                                            opacity="0.8"
                                            rx="0.5"
                                          />
                                        )}
                                      </g>
                                    );
                                  } else {
                                    // STACKED BAR CHART TYPE
                                    const fuelHeight = y0 - yFuel;
                                    const netHeight = yFuel - yGross;

                                    return (
                                      <g 
                                        key={day.id} 
                                        className="cursor-pointer"
                                        onClick={() => setSelectedChartIndex(idx)}
                                        onMouseEnter={() => setSelectedChartIndex(idx)}
                                      >
                                        {/* Background hover bar */}
                                        <rect 
                                          x={idx * laneWidth} 
                                          y="10" 
                                          width={laneWidth} 
                                          height="80" 
                                          fill={isSelected ? '#FF8A00' : 'transparent'} 
                                          opacity="0.05" 
                                          rx="2"
                                        />

                                        {/* Net Profit segment */}
                                        {netHeight > 0 && (
                                          <rect 
                                            x={x} 
                                            y={yGross} 
                                            width={barWidth} 
                                            height={netHeight} 
                                            fill="#22C55E" 
                                            stroke={isSelected ? '#FFFFFF' : 'none'}
                                            strokeWidth="0.8"
                                            rx="1.5"
                                          />
                                        )}

                                        {/* Fuel cost segment */}
                                        {fuelHeight > 0 && (
                                          <rect 
                                            x={x} 
                                            y={yFuel} 
                                            width={barWidth} 
                                            height={fuelHeight} 
                                            fill="#EF4444" 
                                            opacity="0.95"
                                            rx="1.5"
                                          />
                                        )}
                                      </g>
                                    );
                                  }
                                });
                              })()}
                            </svg>
                          </div>

                          {/* x-axis */}
                          <div className="flex justify-between text-[8px] text-[#BDBDBD] font-mono pt-1">
                            {deliveryDays.map(day => (
                              <span key={day.id}>{day.date.substring(8, 10)}</span>
                            ))}
                          </div>

                          {/* Intelligent Legend */}
                          <div className="flex items-center justify-center gap-3 text-[7.5px] text-[#BDBDBD] font-mono pt-1 border-t border-[#242424]/40">
                            <span className="flex items-center gap-1">
                              <span className="h-1.5 w-1.5 bg-[#22C55E] rounded-full inline-block" /> Lucro Líquido
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="h-1.5 w-1.5 bg-[#EF4444] rounded-full inline-block" /> Combustível
                            </span>
                            {chartType === 'candles' && (
                              <span className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 bg-[#FF8A00] rounded-full inline-block" /> Meta Não Batida
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* LEDGER/LIST OF REGISTERED DAYS */}
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-bold text-[#BDBDBD] uppercase tracking-wider block font-mono">Histórico de Corres</span>
                      
                      {deliveryDays.length === 0 ? (
                        <p className="text-[10px] text-[#BDBDBD] italic">Sem registros salvos.</p>
                      ) : (
                        <div className="space-y-1.5 max-h-[120px] overflow-y-auto">
                          {deliveryDays.slice().reverse().map(day => (
                            <div 
                              key={day.id}
                              onClick={() => setSelectedDayDetail(day)}
                              className="p-2 rounded bg-[#090909] hover:bg-[#151515] hover:border-[#FF8A00]/40 border border-[#242424]/60 flex items-center justify-between text-[11px] cursor-pointer transition-all duration-200"
                            >
                              <div>
                                <p className="font-bold text-[#FFFFFF] font-mono">
                                  {day.date.split('-').reverse().slice(0, 2).join('/')}
                                </p>
                                <p className="text-[9px] text-[#BDBDBD]">
                                  {day.deliveries} entregas • {day.hoursWorked}h
                                </p>
                              </div>

                              <div className="flex items-center gap-2">
                                <div className="text-right font-mono">
                                  <span className="font-bold text-[#FFFFFF] block text-[10px] leading-tight">
                                    R$ {day.earnings.toFixed(0)} <span className="text-[7.5px] font-normal text-[#BDBDBD]/80">bruto</span>
                                  </span>
                                  <span className="text-[8px] text-[#EF4444] block leading-tight">
                                    -R$ {day.fuelCost.toFixed(0)} <span className="text-[7.5px] text-[#BDBDBD]/80 font-normal">gasto</span>
                                  </span>
                                  <span className="text-[9px] text-[#22C55E] block font-semibold leading-tight">
                                    Líq: R$ {(day.earnings - day.fuelCost).toFixed(0)}
                                  </span>
                                </div>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteDay(day.id);
                                  }}
                                  className="p-1 hover:bg-[#1B1B1B] text-[#BDBDBD] hover:text-[#EF4444] transition-colors rounded cursor-pointer relative z-10"
                                  title="Delete checkin"
                                >
                                  <Trash className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                )}

                {/* TAB 4: PROFILE & BASE CONFIGURATIONS */}
                {activeTab === 'profile' && (
                  <div className="space-y-4 font-sans text-left">
                    <div>
                      <h3 className="text-sm font-bold text-[#FFFFFF] tracking-tight">Perfil de Pista</h3>
                      <p className="text-[9.5px] text-[#BDBDBD]">Configure suas metas de receita e veículo</p>
                    </div>

                    <div className="bg-[#151515] border border-[#242424] p-3 rounded-lg space-y-3 inner-glow">
                      
                      {/* Name editor */}
                      <div className="space-y-1">
                        <label className="text-[8.5px] uppercase font-bold text-[#BDBDBD] font-mono block">
                          Nome do Entregador
                        </label>
                        <input 
                          type="text"
                          className="w-full bg-[#090909] border border-[#242424] focus:border-[#FF8A00] p-2 text-xs font-bold text-[#FFFFFF] rounded-lg focus:outline-none"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        />
                      </div>

                      {/* Daily goal edit */}
                      <div className="space-y-1">
                        <label className="text-[8.5px] uppercase font-bold text-[#BDBDBD] font-mono block">
                          Meta de Faturamento Diário (R$)
                        </label>
                        <input 
                          type="number"
                          className="w-full bg-[#090909] border border-[#242424] focus:border-[#FF8A00] p-2 text-xs font-bold font-mono text-[#FF8A00] rounded-lg focus:outline-none"
                          value={profile.dailyGoal}
                          onChange={(e) => setProfile({ ...profile, dailyGoal: parseFloat(e.target.value) || 0 })}
                        />
                      </div>

                      {/* Vehicle selection */}
                      <div className="space-y-1">
                        <label className="text-[8.5px] uppercase font-bold text-[#BDBDBD] font-mono block">
                          Veículo Principal
                        </label>
                        <select 
                          className="w-full bg-[#090909] border border-[#242424] p-2 text-xs font-semibold text-[#FFFFFF] rounded-lg focus:outline-none"
                          value={profile.vehicleType}
                          onChange={(e) => setProfile({ ...profile, vehicleType: e.target.value as any })}
                        >
                          <option value="moto" className="bg-[#151515]">Motocicleta (Combustível)</option>
                          <option value="bike" className="bg-[#151515]">Bicicleta (Pedal/E-Bike)</option>
                          <option value="car" className="bg-[#151515]">Carro Operacional</option>
                        </select>
                      </div>

                    </div>

                    {/* Product philosophy note replacing marketing cards */}
                    <div className="bg-[#1B1B1B] border border-[#242424] p-3 rounded-lg inner-glow">
                      <span className="text-[8px] text-[#BDBDBD] font-mono font-bold block mb-1 uppercase tracking-wider">Anotação do Produto</span>
                      <p className="text-[9px] text-[#BDBDBD] leading-relaxed">
                        Os dados do Corre+ são guardados localmente no seu dispositivo e não são compartilhados. Interface otimizada sob o conceito de privacidade e controle individual de caixa.
                      </p>
                    </div>

                  </div>
                )}

              </div>

              {/* LEDGER DAY DETAIL HIGH END DIALOG OVERLAY */}
              {selectedDayDetail && (
                <div className="absolute inset-0 bg-[#090909]/95 z-50 p-4 flex flex-col justify-center animate-fade-in">
                  <div className="bg-[#151515] border border-[#242424] rounded-2xl p-4.5 space-y-3.5 shadow-2xl inner-glow text-left">
                    
                    <div className="flex items-center justify-between pb-2 border-b border-[#242424]">
                      <h4 className="text-[10px] font-bold text-[#FFFFFF] tracking-wider uppercase font-mono">Detalhes do Corre</h4>
                      <span className="text-[10px] text-[#FF8A00] font-mono font-bold bg-[#1B1B1B] border border-[#242424] px-1.5 py-0.5 rounded">
                        {selectedDayDetail.date.split('-').reverse().join('/')}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        
                        <div className="bg-[#090909] border border-[#242424] p-2 rounded-lg">
                          <span className="text-[7px] text-[#BDBDBD] block font-mono">FATURAMENTO BRUTO</span>
                          <span className="font-bold text-[#FFFFFF] font-mono text-[11px]">R$ {selectedDayDetail.earnings.toFixed(2)}</span>
                        </div>
                        
                        <div className="bg-[#090909] border border-[#242424] p-2 rounded-lg">
                          <span className="text-[7px] text-[#EF4444] block font-mono">COMBUSTÍVEL GASTO</span>
                          <span className="font-bold text-[#EF4444] font-mono text-[11px]">-R$ {selectedDayDetail.fuelCost.toFixed(2)}</span>
                        </div>

                        <div className="bg-[#090909] border border-[#22C55E]/30 p-2 rounded-lg col-span-2 text-center">
                          <span className="text-[7px] text-[#22C55E] block font-mono uppercase font-bold">LUCRO LÍQUIDO REAL</span>
                          <span className="font-extrabold text-[#22C55E] font-mono text-sm block mt-0.5 leading-none">
                            R$ {(selectedDayDetail.earnings - selectedDayDetail.fuelCost).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>

                        <div className="bg-[#090909] border border-[#242424] p-2 rounded-lg">
                          <span className="text-[7px] text-[#BDBDBD] block font-mono">ENTREGAS REALIZADAS</span>
                          <span className="font-bold text-[#FFFFFF] font-mono text-[11px]">{selectedDayDetail.deliveries} entregas</span>
                        </div>
                        
                        <div className="bg-[#090909] border border-[#242424] p-2 rounded-lg">
                          <span className="text-[7px] text-[#BDBDBD] block font-mono">HORAS TRABALHADAS</span>
                          <span className="font-bold text-[#FFFFFF] font-mono text-[11px]">{selectedDayDetail.hoursWorked}h</span>
                        </div>

                        <div className="bg-[#090909] border border-[#242424] p-2 rounded-lg col-span-2">
                          <span className="text-[7px] text-[#BDBDBD] block font-mono uppercase">KM RODADOS</span>
                          <span className="font-bold text-[#FFFFFF] font-mono text-[11px]">
                            {selectedDayDetail.mileage !== undefined ? `${selectedDayDetail.mileage} KM` : 'Não registrado'}
                          </span>
                        </div>

                        <div className="bg-[#090909] border border-[#242424]/60 p-2.5 rounded-lg col-span-2 text-left space-y-1">
                          <span className="text-[7px] text-[#BDBDBD] block font-mono uppercase">OBSERVAÇÕES DO DIA</span>
                          <p className="text-[9.5px] text-[#BDBDBD] italic leading-relaxed whitespace-pre-wrap">
                            {selectedDayDetail.notes || 'Nenhuma observação anotada para este corre diário.'}
                          </p>
                        </div>

                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedDayDetail(null)}
                      className="w-full py-2 bg-[#FF8A00] text-[#090909] font-extrabold text-[11px] rounded-xl hover:bg-[#E65C00] transition-colors text-center uppercase tracking-wider cursor-pointer shadow-md shadow-[#FF8A00]/15"
                    >
                      Fechar Detalhes
                    </button>
                    
                  </div>
                </div>
              )}

              {/* TACTILE SMARTPHONE SMART BOTTOM NAVIGATION BAR */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#0A0A0A] border-t border-[#1f1f1f] px-4 pt-2 pb-3 flex justify-around items-center z-20 rounded-b-[26px]">
                
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex flex-col items-center gap-1 py-1 px-2.5 transition-colors cursor-pointer ${
                    activeTab === 'dashboard' ? 'text-[#FF8A00]' : 'text-[#6b6b6b] hover:text-[#FFFFFF]'
                  }`}
                  id="tab-dashboard"
                >
                  <Activity className="h-5 w-5" />
                  <span className="text-[8px] font-medium">Início</span>
                </button>

                <button 
                  onClick={() => setActiveTab('stats')}
                  className={`flex flex-col items-center gap-1 py-1 px-2.5 transition-colors cursor-pointer ${
                    activeTab === 'stats' ? 'text-[#FF8A00]' : 'text-[#6b6b6b] hover:text-[#FFFFFF]'
                  }`}
                  id="tab-stats"
                >
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-[8px] font-medium">Gráficos</span>
                </button>

                <button 
                  onClick={() => setActiveTab('add')}
                  className="relative -top-6 h-12 w-12 rounded-full bg-[#FF8A00] text-[#0A0A0A] font-medium flex items-center justify-center ring-6 ring-[#0A0A0A] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  id="tab-add"
                >
                  <Plus className="h-5 w-5 stroke-[2.5px]" />
                </button>

                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`flex flex-col items-center gap-1 py-1 px-2.5 transition-colors cursor-pointer ${
                    activeTab === 'profile' ? 'text-[#FF8A00]' : 'text-[#6b6b6b] hover:text-[#FFFFFF]'
                  }`}
                  id="tab-profile-2"
                >
                  <User className="h-5 w-5" />
                  <span className="text-[8px] font-medium">Perfil</span>
                </button>

                <button
                  onClick={() => triggerToast("Em breve: histórico completo de corres.")}
                  className="flex flex-col items-center gap-1 py-1 px-2.5 transition-colors cursor-pointer text-[#6b6b6b] hover:text-[#FFFFFF]"
                  id="tab-history"
                >
                  <Calendar className="h-5 w-5" />
                  <span className="text-[8px] font-medium">Histórico</span>
                </button>

              </div>

            </div>
          </div>

          {/* Quick interactive user experience guidelines summary box */}
          <div className="w-full bg-[#151515] border border-[#242424] p-4 rounded-xl inner-glow">
            <h4 className="text-xs font-bold text-[#FFFFFF] mb-2 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#FF8A00]" /> Guia Prático de Demonstração:
            </h4>
            <ul className="text-[11px] text-[#BDBDBD] space-y-1.5 pl-1 leading-normal text-left">
              <li>1. Clique em <strong className="text-[#FFFFFF]">Ganhos Altos</strong> para alimentar o fluxo de gráficos simulados com valores realistas.</li>
              <li>2. Toque no botão <strong className="text-[#FFFFFF] font-mono">+</strong> central na tela do smartphone para ver o lançamento expresso de um novo corre diário.</li>
              <li>3. Na aba <strong className="text-[#FFFFFF]">Gráficos</strong>, veja as métricas brutas calculadas e o demonstrativo de evolução financeira.</li>
              <li>4. Altere metrificações de autonomia de faturamento de pista a qualquer momento na aba <strong className="text-[#FFFFFF]">Perfil</strong>.</li>
            </ul>
          </div>

        </div>

      </main>

      {/* Footer System Architecture Info */}
      <footer className="border-t border-[#242424] bg-[#090909] py-8 text-[#BDBDBD] text-xs mt-12 text-left">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 Corre+ Plataforma. Todos os direitos reservados. Foco integral na autonomia do entregador.</p>
          <div className="flex gap-4">
            <span className="hover:text-[#FFFFFF] transition-colors">Stack Offline-First</span>
            <span>•</span>
            <span className="hover:text-[#FFFFFF] transition-colors">PostgreSQL Supabase Ready</span>
            <span>•</span>
            <span className="hover:text-[#FFFFFF] transition-colors">MVP Proposal V1.0.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Custom simple fallback icon for clean compiling
function TargetIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
