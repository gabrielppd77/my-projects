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
  },
  {
    name: "MICAR",
    description:
      "Sistema para gerenciamento das manutenções de veículos, com cliente mobile consumindo a API.",
    tag: "API + Mobile",
    links: [{ label: "API", url: "https://micar-api.necro.com.br/" }],
    repoUrl: "https://github.com/gabrielppd77/Micar",
    isMobileApp: true,
  },
  {
    name: "Backup Manager",
    description:
      "Serviço responsável pelo backup periódico do servidor, rodando como container isolado, sem interface pública.",
    tag: "Serviço / Infra",
    links: [],
    repoUrl: "https://github.com/gabrielppd77/BackupManager",
  },
];

export default projects;
