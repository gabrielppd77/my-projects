import Box from "@mui/material/Box";

interface NeonMarqueeProps {
  items: string[];
  reverse?: boolean;
  color?: string;
}

export default function NeonMarquee(props: NeonMarqueeProps) {
  const { items, reverse = false, color = "#faff00" } = props;
  const loop = [...items, ...items];

  return (
    <Box
      sx={{
        overflow: "hidden",
        py: 1.5,
        borderTop: `2px solid ${color}`,
        borderBottom: `2px solid ${color}`,
        background: "rgba(7, 0, 15, 0.85)",
        boxShadow: `0 0 20px ${color}, inset 0 0 20px ${color}55`,
        transform: reverse ? "rotate(1.5deg)" : "rotate(-1.5deg)",
        my: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "max-content",
          gap: 6,
          animation: `marquee 22s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {loop.map((item, index) => (
          <Box
            key={`${item}-${index}`}
            component="span"
            sx={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: { xs: "0.7rem", md: "0.9rem" },
              color,
              whiteSpace: "nowrap",
              textShadow: `0 0 8px ${color}`,
            }}
          >
            ★ {item}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
