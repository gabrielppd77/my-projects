import Box from "@mui/material/Box";

const STAR_COUNT = 70;
const BLOBS = [
  { color: "#ff2bd6", top: "10%", left: "5%", size: 380, delay: "0s" },
  { color: "#00f0ff", top: "45%", left: "70%", size: 440, delay: "-6s" },
  { color: "#faff00", top: "75%", left: "20%", size: 300, delay: "-12s" },
  { color: "#7c3aed", top: "20%", left: "55%", size: 360, delay: "-3s" },
];

const STARS = Array.from({ length: STAR_COUNT }, (_, index) => ({
  id: index,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 3 + 1,
  duration: `${Math.random() * 3 + 1.5}s`,
  delay: `${Math.random() * -5}s`,
  color: ["#fff", "#00f0ff", "#ff2bd6", "#faff00"][index % 4],
}));

export default function NeonBackground() {
  return (
    <Box
      aria-hidden
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #07000f 0%, #1a0033 55%, #3b0050 100%)",
      }}
    >
      {BLOBS.map((blob) => (
        <Box
          key={blob.color}
          sx={{
            position: "absolute",
            top: blob.top,
            left: blob.left,
            width: blob.size,
            height: blob.size,
            borderRadius: "50%",
            background: blob.color,
            filter: "blur(110px)",
            opacity: 0.35,
            animation: `blob-float 18s ease-in-out ${blob.delay} infinite`,
          }}
        />
      ))}

      {STARS.map((star) => (
        <Box
          key={star.id}
          sx={{
            position: "absolute",
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            borderRadius: "50%",
            background: star.color,
            boxShadow: `0 0 6px ${star.color}`,
            animation: `star-twinkle ${star.duration} ease-in-out ${star.delay} infinite`,
          }}
        />
      ))}

      <Box
        sx={{
          position: "absolute",
          left: "50%",
          bottom: "32vh",
          width: { xs: 220, md: 360 },
          height: { xs: 110, md: 180 },
          borderRadius: "360px 360px 0 0",
          background:
            "repeating-linear-gradient(180deg, #faff00 0 14px, #ff7a00 14px 20px, transparent 20px 26px)",
          maskImage: "linear-gradient(180deg, #000 55%, transparent 100%)",
          boxShadow: "0 0 80px #ff2bd6",
          opacity: 0.55,
          animation: "sun-sink 6s ease-in-out infinite",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          left: "-50%",
          right: "-50%",
          bottom: 0,
          height: "34vh",
          transform: "perspective(320px) rotateX(62deg)",
          transformOrigin: "bottom",
          backgroundImage:
            "linear-gradient(#ff2bd6 2px, transparent 2px), linear-gradient(90deg, #ff2bd6 2px, transparent 2px)",
          backgroundSize: "60px 60px",
          maskImage: "linear-gradient(0deg, #000 30%, transparent 100%)",
          animation: "grid-scroll 1.2s linear infinite",
          opacity: 0.7,
        }}
      />
    </Box>
  );
}
