import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

import SectionContainer from "@components/SectionContainer";

const CONTACTS = [
  {
    label: "GitHub",
    href: "https://github.com/gabrielppd77",
    icon: <GitHubIcon fontSize="large" />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/gabrielppd77",
    icon: <LinkedInIcon fontSize="large" />,
  },
  {
    label: "E-mail",
    href: "mailto:gabrielppd77@outlook.com",
    icon: <EmailIcon fontSize="large" />,
  },
];

const CONTACT_COLORS = ["#ff2bd6", "#00f0ff", "#faff00"];

export default function Contact() {
  return (
    <SectionContainer
      id="contato"
      title="Contato"
      color="#00f0ff"
      subtitle="Vamos conversar sobre um projeto ou oportunidade?"
    >
      <Stack direction="row" spacing={3}>
        {CONTACTS.map((contact, index) => {
          const glowColor = CONTACT_COLORS[index % CONTACT_COLORS.length];

          return (
            <Tooltip key={contact.label} title={contact.label}>
              <IconButton
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: glowColor,
                  border: `2px solid ${glowColor}`,
                  animation: "glow-pulse 1.8s ease-in-out infinite",
                  animationDelay: `${index * -0.6}s`,
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: "scale(1.2) rotate(-10deg)",
                  },
                }}
              >
                {contact.icon}
              </IconButton>
            </Tooltip>
          );
        })}
      </Stack>
      <Typography
        variant="body2"
        sx={{
          fontFamily: '"Press Start 2P", monospace',
          fontSize: "0.7rem",
          color: "#faff00",
          textShadow: "0 0 8px #faff00",
        }}
      >
        gabrielppd77@outlook.com
      </Typography>
    </SectionContainer>
  );
}
