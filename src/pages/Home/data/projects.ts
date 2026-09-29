import type { ProjectDto } from "./types";

const projects: ProjectDto[] = [
  {
    name: "Controle Financeiro",
    description:
      "Sistema completo de controle financeiro pessoal: lançamentos, contas, classificações e lançamentos recorrentes, com painel de indicadores.",
    tag: "Full stack",
    links: [
      { label: "Acessar sistema", url: "https://controle-financeiro.necro.com.br/" },
      { label: "API", url: "https://controle-financeiro-api.necro.com.br/" },
    ],
    repoUrl: "https://github.com/gabrielppd77/ControleFinanceiro",
    startDate: "2026-02-11",
  },
  {
    name: "MICAR",
    description:
      "Sistema para gerenciamento das manutenções de veículos, com cliente mobile consumindo a API.",
    tag: "API + Mobile",
    links: [{ label: "API", url: "https://micar-api.necro.com.br/" }],
    repoUrl: "https://github.com/gabrielppd77/Micar",
    startDate: "2026-07-24",
    isMobileApp: true,
  },
  {
    name: "RiceAndBeans",
    description:
      "Cardápio online acessado via QR code, com painel administrativo para o estabelecimento gerenciar o cardápio e loja para o cliente navegar pelos itens.",
    tag: "Full stack",
    links: [
      { label: "Acessar loja", url: "https://riceandbeans.necro.com.br/" },
      { label: "Painel admin", url: "https://admin.riceandbeans.necro.com.br/" },
      { label: "API", url: "https://api.riceandbeans.necro.com.br/" },
    ],
    repoUrl: "https://github.com/gabrielppd77/RiceAndBeans",
    startDate: "2025-02-18",
  },
  {
    name: "Backup Manager",
    description:
      "Serviço responsável pelo backup periódico do servidor, rodando como container isolado, sem interface pública.",
    tag: "Serviço / Infra",
    links: [],
    repoUrl: "https://github.com/gabrielppd77/BackupManager",
    startDate: "2025-04-29",
  },
];

export default projects;
