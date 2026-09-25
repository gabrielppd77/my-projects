import Typography from "@mui/material/Typography";

import SectionContainer from "@components/SectionContainer";
import NeonCard from "@components/NeonCard";

export default function About() {
  return (
    <SectionContainer id="sobre" title="Sobre" color="#00f0ff">
      <NeonCard sx={{ maxWidth: 760, "&:hover": { animation: "border-spin 1s linear infinite" } }}>
        <Typography variant="body1" color="text.secondary" sx={{ p: 3 }}>
          Sou desenvolvedor full stack, com foco em construir sistemas web e APIs
          robustas do zero ao deploy. Gosto de entender o problema de ponta a
          ponta: do design da arquitetura até a infraestrutura que sustenta a
          aplicação em produção, incluindo containers, automações e
          observabilidade.
        </Typography>
      </NeonCard>
    </SectionContainer>
  );
}
