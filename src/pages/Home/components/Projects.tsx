import Grid from "@mui/material/Grid";

import SectionContainer from "@components/SectionContainer";

import projects from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <SectionContainer
      id="projetos"
      title="Projetos"
      color="#faff00"
      subtitle="Aplicações que desenvolvi, do backend ao mobile."
    >
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid key={project.name} size={{ xs: 12, sm: 6, md: 4 }}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  );
}
