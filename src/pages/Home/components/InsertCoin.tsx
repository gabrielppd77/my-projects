import { useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import SectionContainer from "@components/SectionContainer";
import NeonCard from "@components/NeonCard";
import usePersistentNumber from "@hooks/usePersistentNumber";

import { COMBO_WINDOW_MS, MILESTONE_STEP, getComboTier } from "../data/combo";

interface FloatingGain {
  id: number;
  x: number;
  y: number;
  value: number;
  color: string;
}

interface ConfettiPiece {
  id: number;
  x: string;
  y: string;
  rotate: string;
  color: string;
}

const PIXEL_FONT = '"Press Start 2P", monospace';
const CONFETTI_COLORS = ["#ff2bd6", "#00f0ff", "#faff00", "#7c3aed", "#ff003c"];
const CONFETTI_COUNT = 36;

function createConfetti(startId: number): ConfettiPiece[] {
  return Array.from({ length: CONFETTI_COUNT }, (_, index) => {
    const angle = (Math.PI * 2 * index) / CONFETTI_COUNT + Math.random() * 0.4;
    const distance = 120 + Math.random() * 160;

    return {
      id: startId + index,
      x: `${Math.cos(angle) * distance}px`,
      y: `${Math.sin(angle) * distance}px`,
      rotate: `${Math.random() * 720 - 360}deg`,
      color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
    };
  });
}

export default function InsertCoin() {
  const [fichas, setFichas] = usePersistentNumber("insert-coin:fichas");
  const [bestCombo, setBestCombo] = usePersistentNumber("insert-coin:best-combo");
  const [combo, setCombo] = useState(0);
  const [flipKey, setFlipKey] = useState(0);
  const [gains, setGains] = useState<FloatingGain[]>([]);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [extraLifeKey, setExtraLifeKey] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const lastClickAtRef = useRef(0);
  const comboTimeoutRef = useRef<number | undefined>(undefined);
  const nextIdRef = useRef(0);

  useEffect(() => () => window.clearTimeout(comboTimeoutRef.current), []);

  const tier = getComboTier(combo);

  function scheduleComboReset() {
    window.clearTimeout(comboTimeoutRef.current);
    comboTimeoutRef.current = window.setTimeout(() => setCombo(0), COMBO_WINDOW_MS);
  }

  function handleInsertCoin(event: React.MouseEvent<HTMLButtonElement>) {
    const now = performance.now();
    const nextCombo = now - lastClickAtRef.current < COMBO_WINDOW_MS ? combo + 1 : 1;
    const nextTier = getComboTier(nextCombo);
    const nextFichas = fichas + nextTier.multiplier;
    lastClickAtRef.current = now;

    const rect = event.currentTarget.getBoundingClientRect();
    const isKeyboardClick = event.detail === 0;
    const gainId = nextIdRef.current++;

    setCombo(nextCombo);
    setFichas(nextFichas);
    setBestCombo(Math.max(bestCombo, nextCombo));
    setFlipKey((previous) => previous + 1);

    scheduleComboReset();

    if (prefersReducedMotion) {
      return;
    }

    setGains((previous) => [
      ...previous,
      {
        id: gainId,
        x: isKeyboardClick ? rect.width / 2 : event.clientX - rect.left,
        y: isKeyboardClick ? rect.height / 2 : event.clientY - rect.top,
        value: nextTier.multiplier,
        color: nextTier.color,
      },
    ]);

    if (Math.floor(nextFichas / MILESTONE_STEP) > Math.floor(fichas / MILESTONE_STEP)) {
      setConfetti(createConfetti(nextIdRef.current));
      nextIdRef.current += CONFETTI_COUNT;
      setExtraLifeKey((previous) => previous + 1);
      setIsShaking(true);
    }
  }

  function removeGain(id: number) {
    setGains((previous) => previous.filter((gain) => gain.id !== id));
  }

  function removeConfettiPiece(id: number) {
    setConfetti((previous) => previous.filter((piece) => piece.id !== id));
  }

  return (
    <SectionContainer
      id="fichas"
      title="Insert Coin"
      color="#faff00"
      subtitle="Clique na ficha. Clique rápido pra fazer combo e ganhar mais fichas."
    >
      <NeonCard sx={{ "&:hover": { animation: "border-spin 1s linear infinite" } }}>
        <Box
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget) {
              setIsShaking(false);
            }
          }}
          sx={{
            position: "relative",
            overflow: "hidden",
            px: { xs: 2, md: 6 },
            py: { xs: 4, md: 6 },
            animation: isShaking ? "screen-shake 0.4s linear 2" : "none",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 4, md: 8 }}
            alignItems="center"
            justifyContent="center"
          >
            <Box sx={{ position: "relative", perspective: 600 }}>
              <ButtonBase
                aria-label="Inserir ficha"
                onClick={handleInsertCoin}
                sx={{
                  position: "relative",
                  width: { xs: 170, md: 210 },
                  height: { xs: 170, md: 210 },
                  borderRadius: "50%",
                  userSelect: "none",
                  transition: "transform 0.08s ease",
                  "&:active": { transform: "scale(0.9)" },
                  "&:focus-visible": {
                    outline: "3px dashed #00f0ff",
                    outlineOffset: 8,
                  },
                }}
              >
                <Box
                  key={flipKey}
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    background:
                      "radial-gradient(circle at 35% 30%, #fff9b0 0%, #faff00 25%, #f5a300 70%, #a35a00 100%)",
                    border: "8px double #a35a00",
                    boxShadow: `0 0 20px ${tier.color}, 0 0 50px ${tier.color}, inset 0 0 18px rgba(0,0,0,0.45)`,
                    animation: flipKey > 0 ? "coin-flip 0.35s ease-out" : "none",
                    transition: "box-shadow 0.2s ease",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: PIXEL_FONT,
                      fontSize: { xs: "2.4rem", md: "3rem" },
                      color: "#7a3d00",
                      textShadow: "2px 2px 0 #fff3a0",
                    }}
                  >
                    ¢
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: PIXEL_FONT,
                      fontSize: "0.6rem",
                      color: "#7a3d00",
                      mt: 1,
                    }}
                  >
                    FICHA
                  </Typography>
                </Box>

                {gains.map((gain) => (
                  <Box
                    key={gain.id}
                    component="span"
                    aria-hidden
                    onAnimationEnd={() => removeGain(gain.id)}
                    sx={{
                      position: "absolute",
                      left: gain.x,
                      top: gain.y,
                      pointerEvents: "none",
                      fontFamily: PIXEL_FONT,
                      fontSize: gain.value > 1 ? "1.1rem" : "0.85rem",
                      color: gain.color,
                      textShadow: `0 0 8px ${gain.color}`,
                      whiteSpace: "nowrap",
                      animation: "float-up 0.8s ease-out forwards",
                    }}
                  >
                    +{gain.value}
                  </Box>
                ))}
              </ButtonBase>

              {confetti.map((piece) => (
                <Box
                  key={piece.id}
                  aria-hidden
                  onAnimationEnd={() => removeConfettiPiece(piece.id)}
                  style={
                    {
                      "--confetti-x": piece.x,
                      "--confetti-y": piece.y,
                      "--confetti-rotate": piece.rotate,
                    } as React.CSSProperties
                  }
                  sx={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: 10,
                    height: 16,
                    background: piece.color,
                    boxShadow: `0 0 8px ${piece.color}`,
                    pointerEvents: "none",
                    animation: "confetti-burst 1.1s ease-out forwards",
                  }}
                />
              ))}
            </Box>

            <Stack spacing={2.5} alignItems={{ xs: "center", md: "flex-start" }} sx={{ minWidth: 0 }}>
              <Stack spacing={1} alignItems={{ xs: "center", md: "flex-start" }}>
                <Typography sx={{ fontFamily: PIXEL_FONT, fontSize: "0.7rem", color: "text.secondary" }}>
                  FICHAS
                </Typography>
                <Typography
                  aria-live="polite"
                  sx={{
                    fontFamily: PIXEL_FONT,
                    fontSize: { xs: "1.8rem", md: "2.6rem" },
                    color: "#faff00",
                    textShadow: "0 0 10px #faff00, 0 0 30px #f5a300",
                    letterSpacing: "0.05em",
                  }}
                >
                  {String(fichas).padStart(6, "0")}
                </Typography>
              </Stack>

              <Box sx={{ minHeight: 76, width: { xs: 240, md: 300 } }}>
                {combo >= 2 ? (
                  <Stack spacing={1} alignItems={{ xs: "center", md: "flex-start" }}>
                    <Typography
                      key={combo}
                      sx={{
                        fontFamily: PIXEL_FONT,
                        fontSize: { xs: "1rem", md: "1.2rem" },
                        color: tier.color,
                        textShadow: `0 0 10px ${tier.color}`,
                        animation: "combo-pop 0.2s ease-out",
                      }}
                    >
                      COMBO x{combo}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: PIXEL_FONT,
                        fontSize: "0.65rem",
                        color: tier.color,
                      }}
                    >
                      {tier.label} +{tier.multiplier} POR CLIQUE
                    </Typography>
                    <Box
                      sx={{
                        width: "100%",
                        height: 6,
                        background: "rgba(255,255,255,0.1)",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        key={combo}
                        sx={{
                          height: "100%",
                          background: tier.color,
                          boxShadow: `0 0 8px ${tier.color}`,
                          transformOrigin: "left",
                          animation: `combo-drain ${COMBO_WINDOW_MS}ms linear forwards`,
                        }}
                      />
                    </Box>
                  </Stack>
                ) : (
                  <Typography
                    sx={{
                      fontFamily: PIXEL_FONT,
                      fontSize: "0.75rem",
                      color: "#00f0ff",
                      animation: "on-air-blink 1s steps(1) infinite",
                      textAlign: { xs: "center", md: "left" },
                    }}
                  >
                    INSERT COIN ▶
                  </Typography>
                )}
              </Box>

              <Typography sx={{ fontFamily: PIXEL_FONT, fontSize: "0.6rem", color: "#ff2bd6" }}>
                RECORDE DE COMBO: {bestCombo}
              </Typography>
            </Stack>
          </Stack>

          {extraLifeKey > 0 ? (
            <Typography
              key={extraLifeKey}
              aria-hidden
              sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                opacity: 0,
                pointerEvents: "none",
                fontFamily: PIXEL_FONT,
                fontSize: { xs: "1.2rem", md: "2rem" },
                color: "#fff",
                whiteSpace: "nowrap",
                textShadow: "0 0 10px #ff2bd6, 0 0 30px #ff2bd6, 0 0 60px #00f0ff",
                animation: "extra-life 1.4s ease-out forwards",
              }}
            >
              {Math.floor(fichas / MILESTONE_STEP) * MILESTONE_STEP} FICHAS!
            </Typography>
          ) : null}
        </Box>
      </NeonCard>
    </SectionContainer>
  );
}
