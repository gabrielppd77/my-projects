import type { InfraToolDto } from "./types";

const infraTools: InfraToolDto[] = [
  {
    name: "Minio",
    description: "Armazenamento de arquivos estatísticos",
    url: "http://minio.necro.com.br/",
  },
  {
    name: "n8n",
    description: "Automação de rotinas",
    url: "https://n8n.necro.com.br/",
  },
  {
    name: "PgAdmin",
    description: "Administração do banco PostgreSQL de produção",
    url: "http://pgadmin.necro.com.br/",
  },
  {
    name: "Portainer",
    description: "Gestão dos containers Docker",
    url: "http://portainer.necro.com.br/",
  },
  {
    name: "Nginx Proxy Manager",
    description: "Proxy reverso e inversão de domínios do servidor",
    url: "http://proxy.necro.com.br/",
  },
  {
    name: "Seq",
    description: "Log de auditoria e log de erros",
    url: "http://seq.necro.com.br/",
  },
];

export default infraTools;
