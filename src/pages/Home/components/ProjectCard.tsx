import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AndroidIcon from "@mui/icons-material/Android";

import type { ProjectDto } from "../data/types";

interface ProjectCardProps {
  project: ProjectDto;
}

export default function ProjectCard(props: ProjectCardProps) {
  const { project } = props;

  return (
    <Card
      variant="outlined"
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Stack spacing={1.5}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {project.name}
            </Typography>
            <Chip label={project.tag} size="small" color="primary" variant="outlined" />
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {project.description}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, flexWrap: "wrap", gap: 1 }}>
        {project.links.map((link) => (
          <Button
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            variant="contained"
            startIcon={<OpenInNewIcon />}
          >
            {link.label}
          </Button>
        ))}
        {project.isMobileApp ? (
          <Button
            href={project.appDownloadUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            variant="outlined"
            disabled={!project.appDownloadUrl}
            startIcon={<AndroidIcon />}
          >
            {project.appDownloadUrl ? "Baixar app" : "App em breve"}
          </Button>
        ) : null}
        <Button
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          variant="text"
          startIcon={<GitHubIcon />}
        >
          Ver código
        </Button>
      </CardActions>
    </Card>
  );
}
