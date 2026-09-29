import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AndroidIcon from "@mui/icons-material/Android";

import NeonCard from "@components/NeonCard";

import type { ProjectDto } from "../data/types";

interface ProjectCardProps {
  project: ProjectDto;
}

function formatStartDate(isoDate: string) {
  const [year, month] = isoDate.split("-").map(Number);
  return new Date(year, month - 1).toLocaleDateString("pt-BR", {
    month: "short",
    year: "numeric",
  });
}

export default function ProjectCard(props: ProjectCardProps) {
  const { project } = props;

  return (
    <NeonCard>
      <CardContent sx={{ flex: 1 }}>
        <Stack spacing={1.5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={1}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 900, color: "#fff", textShadow: "0 0 10px #ff2bd6" }}
            >
              {project.name}
            </Typography>
            <Chip
              label={project.tag}
              size="small"
              color="warning"
              variant="outlined"
              sx={{ boxShadow: "0 0 8px #faff00", flexShrink: 0 }}
            />
          </Stack>
          <Typography variant="caption" color="text.secondary">
            Início: {formatStartDate(project.startDate)}
          </Typography>
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
            color="secondary"
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
          color="secondary"
          startIcon={<GitHubIcon />}
        >
          Ver código
        </Button>
      </CardActions>
    </NeonCard>
  );
}
