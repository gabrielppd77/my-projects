import Typography from "@mui/material/Typography";

import SectionContainer from "@components/SectionContainer";

export default function About() {
  return (
    <SectionContainer id="sobre" title="Sobre">
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 720 }}>
        Sou desenvolvedor full stack, com foco em construir sistemas web e APIs
        robustas do zero ao deploy. Gosto de entender o problema de ponta a
        ponta: do design da arquitetura até a infraestrutura que sustenta a
        aplicação em produção, incluindo containers, automações e
        observabilidade.
      </Typography>
    </SectionContainer>
  );
}
