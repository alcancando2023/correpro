/**
 * Core product design guidelines, architecture schemas, and strategy modules for Corre+.
 */

export interface ProductDocSection {
  id: string;
  title: string;
  icon: string;
  category: 'Branding & Business' | 'Architecture & Tech' | 'Growth & Strategy';
  content: string;
}

export const productDocSections: ProductDocSection[] = [
  {
    id: "product-vision",
    title: "Visão do Produto",
    icon: "Sparkles",
    category: "Branding & Business",
    content: `
### Visão Geral

O Corre+ foi projetado para ajudar entregadores a acompanhar seus ganhos, despesas operacionais e desempenho ao longo do tempo de forma simples e intuitiva.

O objetivo é transformar dados diários em informações úteis para tomada de decisão, sem planilhas complexas e sem processos burocráticos.

---

### Proposta de Valor

*   **Foco no Corre Real:** Todo trabalhador autônomo enfrenta oscilações de ganhos semanais e flutuações no custo do combustível.
*   **Decisões Baseadas em Dados:** O aplicativo organiza seus dados em médias inteligentes (por entrega, por dia, lucro líquido real), permitindo saber qual veículo ou período traz o melhor retorno financeiro real.
*   **Independência Operacional:** Sem anúncios intrusivos ou poluição visual, mantendo o foco do usuário no que realmente importa: a consolidação segura do seu patrimônio de trabalho.
`
  },
  {
    id: "branding",
    title: "Identidade & Design",
    icon: "Layers",
    category: "Branding & Business",
    content: `
### A Identidade: Corre+

A expressão **"fazer o corre"** representa a força de vontade, o dinamismo e o empenho diário de quem trabalha prestando serviços de transporte e entregas. 

O sufixo **"PRO"** reflete a profissionalização do entregador parceiro, equipando-o com ferramentas eficientes e transparentes de nível corporativo.

---

### Diretrizes de Interface (Visual Guidelines)

*   **Tom de Voz:** Direto, transparente e altamente profissional. Sem termos rebuscados de finanças corporativas e sem gírias forçadas de marketing. Usamos termos claros: **Lucro Líquido**, **Ganhos Brutos**, **Custo de Combustível** e **Horas Ativas**.
*   **Design Minimalista Escuro:** O fundo escuro profundo economiza a bateria de dispositivos com telas AMOLED, amplamente utilizados em longas jornadas externas, e garante excelente legibilidade sob luz solar intensa.
*   **Aparência Premium:** Layout clean inspirado em referências contemporâneas de tecnologia financeira de alta relevância (como Linear, Stripe e Notion), utilizando espaçamentos generosos e linhas de divisão sutis em favor do foco de uso.
`
  },
  {
    id: "database",
    title: "Banco de Dados & Supabase",
    icon: "Database",
    category: "Architecture & Tech",
    content: `
### Estrutura do Banco de Dados (PostgreSQL)

O modelo foi projetado para ser altamente enxuto, priorizando buscas rápidas por períodos e minimizando o tráfego de rede para garantir bom funcionamento em conexões móveis.

#### 1. Tabela \`profiles\` (Cadastro e Parâmetros)
\`\`\`sql
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  vehicle_type VARCHAR(20) DEFAULT 'moto' CHECK (vehicle_type IN ('moto', 'bike', 'car')),
  daily_goal NUMERIC(10,2) DEFAULT 150.00,
  monthly_goal NUMERIC(10,2) DEFAULT 3500.00,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

#### 2. Tabela \`delivery_days\` (Registro Diário de Performance)
\`\`\`sql
CREATE TABLE public.delivery_days (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  earnings NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  deliveries INTEGER NOT NULL DEFAULT 0 CHECK (deliveries >= 0),
  fuel_cost NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  hours_worked NUMERIC(4,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  
  -- Um registro por dia por conta para evitar inconsistências
  UNIQUE(profile_id, date)
);

CREATE INDEX idx_delivery_days_profile_date ON public.delivery_days(profile_id, date DESC);
\`\`\`

---

### Row Level Security (RLS)
Garante total segurança no tráfego de dados, permitindo gravação e consulta restritas ao autor do perfil:

\`\`\`sql
ALTER TABLE public.delivery_days ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gerenciamento individual de registros diários" 
ON public.delivery_days 
FOR ALL 
TO authenticated 
USING (profile_id = auth.uid()) 
WITH CHECK (profile_id = auth.uid());
\`\`\`
`
  },
  {
    id: "architecture",
    title: "Arquitetura e Offline-First",
    icon: "Cpu",
    category: "Architecture & Tech",
    content: `
### Detalhes Técnicos da Aplicação

Para obter um aplicativo ágil e confiável nas ruas, a stack técnica é construída sob o pilar de armazenamento local e sincronização eficiente.

#### Sincronização Local (Offline-First)
Como os entregadores operam frequentemente em locais de sinal instável (como subsolos de shoppings ou garagens), o fluxo de dados prioriza a resiliência local:

1.  **Persistência Rápida:** Registros do dia são gravados primeiramente no banco NoSQL embarcado no aparelho (Isar/Hive DB) com latência inferior a **1ms**.
2.  **Sincronização em Background:** O repositório monitora a presença de rede móvel ativa para transmitir o acúmulo de registros locais de forma síncrona aos servidores do banco.
3.  **Criptografia Local:** Informações confidenciais de lucros e despesas são protegidas e isoladas em sandbox do sistema operacional do smartphone.
`
  },
  {
    id: "roadmap",
    title: "Roadmap de Lançamento",
    icon: "Calendar",
    category: "Architecture & Tech",
    content: `
### Marcos de Desenvolvimento (Linha do Tempo)

#### Fase 1: Interface Clássica (Atual)
*   Dashboard rápido com faturamento bruto, gastos e saldo líquido real.
*   Registro diário ágil (ganho, entregas, combustível, horas ativas).
*   Visualizações gráficas límpidas das metas diárias e do acumulado mensal.

#### Fase 2: Alertas de Manutenção Preventiva
*   Calculador automático baseado na quilometragem estimada ou tempo decorrido.
*   Alertas push de troca de óleo, lonas de freios e pneus, reduzindo imprevistos de pista.

#### Fase 3: Parcerias Estruturadas
*   Oferecimento de benefícios estruturados (como cupons de desconto locais em postos de combustível e oficinas mecânicas do bairro).

#### Fase 4: Exportação de Relatórios
*   Visualizador contábil simplificado para fins de controle individual de Microempreendedor Individual (MEI).
`
  },
  {
    id: "retention",
    title: "Experiência de Uso & Engajamento",
    icon: "TrendingUp",
    category: "Growth & Strategy",
    content: `
### Práticas de Retenção Orgânica

O sucesso do aplicativo depende de se tornar um hábito diário amigável na rotina rápida dos entregadores.

*   **Redução de Atrito:** O formulário de registro deve requerer pouquíssimos toques para preenchimento. Com campos predefinidos pelo padrão do último dia registrado, o salvamento acontece em menos de 10 segundos.
*   **Consolidação Positiva:** Acompanhar a barra de progresso da meta diária e mensal preencher-se com dados de lucro real serve de motivação intrínseca para manter os lançamentos em dia.
*   **Transparência Absoluta:** O usuário é dono de seus próprios dados financeiros, podendo limpar o histórico ou redefinir a conta sem qualquer barreira ou necessidade de termos complexos.
`
  }
];
