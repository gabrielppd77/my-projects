import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import StorageIcon from "@mui/icons-material/Storage";

import SectionContainer from "@components/SectionContainer";

import infraTools from "../data/infra";

export default function StackInfra() {
  return (
    <SectionContainer
      id="stack"
      title="Infraestrutura & Stack"
      subtitle="Serviços self-hosted que sustentam as aplicações em produção."
    >
      <Grid container spacing={3}>
        {infraTools.map((tool) => (
          <Grid key={tool.name} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardActionArea
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ height: "100%" }}
              >
                <CardContent>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <StorageIcon color="primary" />
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
            </Card>
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  );
}
