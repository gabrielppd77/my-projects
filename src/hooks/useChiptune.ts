import { useEffect, useState } from "react";

import { createChiptunePlayer } from "@audio/chiptune";
import usePersistentNumber from "@hooks/usePersistentNumber";

export const CHIPTUNE_TOGGLE_ATTRIBUTE = "data-chiptune-toggle";

const ACTIVATION_EVENTS = ["click", "keydown", "touchend"] as const;

export default function useChiptune() {
  const [mutedFlag, setMutedFlag] = usePersistentNumber("chiptune:muted");
  const [isPlaying, setIsPlaying] = useState(false);
  const [player] = useState(createChiptunePlayer);

  useEffect(() => () => player.dispose(), [player]);

  useEffect(() => {
    if (mutedFlag === 1 || isPlaying) {
      return;
    }

    let isActive = true;

    void player.tryAutoplay().then((started) => {
      if (started && isActive) {
        removeListeners();
        setIsPlaying(true);
      }
    });

    function handleFirstInteraction(event: Event) {
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest(`[${CHIPTUNE_TOGGLE_ATTRIBUTE}]`)) {
        return;
      }

      removeListeners();
      void player.start();
      setIsPlaying(true);
    }

    function removeListeners() {
      ACTIVATION_EVENTS.forEach((type) => window.removeEventListener(type, handleFirstInteraction));
    }

    ACTIVATION_EVENTS.forEach((type) => window.addEventListener(type, handleFirstInteraction));

    return () => {
      isActive = false;
      removeListeners();
    };
  }, [mutedFlag, isPlaying, player]);

  function toggle() {
    if (isPlaying) {
      player.stop();
      setIsPlaying(false);
      setMutedFlag(1);
      return;
    }

    void player.start();
    setIsPlaying(true);
    setMutedFlag(0);
  }

  return { isPlaying, toggle };
}
