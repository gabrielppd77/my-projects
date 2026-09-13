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

export default function Contact() {
  return (
    <SectionContainer
      id="contato"
      title="Contato"
      subtitle="Vamos conversar sobre um projeto ou oportunidade?"
    >
      <Stack direction="row" spacing={3}>
        {CONTACTS.map((contact) => (
          <Tooltip key={contact.label} title={contact.label}>
            <IconButton
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              sx={{ border: "1px solid", borderColor: "divider" }}
            >
              {contact.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Stack>
      <Typography variant="body2" color="text.secondary">
        gabrielppd77@outlook.com
      </Typography>
    </SectionContainer>
  );
}
