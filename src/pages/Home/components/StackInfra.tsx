import Grid from "@mui/material/Grid";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import StorageIcon from "@mui/icons-material/Storage";

import SectionContainer from "@components/SectionContainer";
import NeonCard from "@components/NeonCard";

import infraTools from "../data/infra";

const ICON_COLORS = ["#00f0ff", "#ff2bd6", "#faff00"];

export default function StackInfra() {
  return (
    <SectionContainer
      id="stack"
      title="Infraestrutura & Stack"
      subtitle="Serviços self-hosted que sustentam as aplicações em produção."
    >
      <Grid container spacing={3}>
        {infraTools.map((tool, index) => {
          const iconColor = ICON_COLORS[index % ICON_COLORS.length];

          return (
            <Grid key={tool.name} size={{ xs: 12, sm: 6, md: 4 }}>
              <NeonCard>
                <CardActionArea
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ height: "100%" }}
                >
                  <CardContent>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <StorageIcon
                        sx={{
                          color: iconColor,
                          filter: `drop-shadow(0 0 6px ${iconColor})`,
                          animation: "on-air-blink 2s steps(1) infinite",
                          animationDelay: `${index * -0.35}s`,
                        }}
                      />
                      <Stack>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                          {tool.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {tool.description}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </NeonCard>
            </Grid>
          );
        })}
      </Grid>
    </SectionContainer>
  );
}
