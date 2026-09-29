type Step = number | null;

const BPM = 118;
const STEP_SECONDS = 60 / BPM / 4;
const STEPS_PER_BAR = 16;
const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD_SECONDS = 0.12;
const MASTER_VOLUME = 0.22;
const FADE_SECONDS = 0.6;

const CHORDS = [
  { bass: 45, tones: [69, 72, 76] },
  { bass: 41, tones: [65, 69, 72] },
  { bass: 48, tones: [72, 76, 79] },
  { bass: 43, tones: [67, 71, 74] },
];

const ARP_PATTERN = [0, 1, 2, 3, 2, 1, 0, 1, 0, 1, 2, 3, 2, 1, 2, 3];
const BASS_PATTERN = [0, 0, 12, 0, 0, 12, 0, 12];

const MELODY: Step[][] = [
  [76, null, 76, 74, 72, null, 69, null],
  [72, null, 72, 74, 76, null, 77, 76],
  [79, null, 76, null, 72, null, 76, 79],
  [79, null, 77, 76, 74, null, 71, null],
];

const TOTAL_BARS = CHORDS.length * 2;

function midiToFrequency(note: number) {
  return 440 * Math.pow(2, (note - 69) / 12);
}

function createPulseWave(context: AudioContext, dutyCycle: number) {
  const harmonics = 32;
  const real = new Float32Array(harmonics);
  const imag = new Float32Array(harmonics);

  for (let n = 1; n < harmonics; n++) {
    real[n] = (2 / (n * Math.PI)) * Math.sin(n * Math.PI * dutyCycle);
  }

  return context.createPeriodicWave(real, imag);
}

function createNoiseBuffer(context: AudioContext) {
  const buffer = context.createBuffer(1, context.sampleRate * 0.1, context.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < data.length; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  return buffer;
}

export function createChiptunePlayer() {
  let context: AudioContext | null = null;
  let master: GainNode | null = null;
  let leadWave: PeriodicWave | null = null;
  let arpWave: PeriodicWave | null = null;
  let noiseBuffer: AudioBuffer | null = null;
  let schedulerId: number | undefined;
  let stopTimeoutId: number | undefined;
  let currentStep = 0;
  let nextStepTime = 0;

  function playTone(wave: PeriodicWave | OscillatorType, note: number, time: number, duration: number, volume: number) {
    if (!context || !master) {
      return;
    }

    const oscillator = context.createOscillator();
    const gain = context.createGain();

    if (wave instanceof PeriodicWave) {
      oscillator.setPeriodicWave(wave);
    } else {
      oscillator.type = wave;
    }

    oscillator.frequency.setValueAtTime(midiToFrequency(note), time);
    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    oscillator.connect(gain).connect(master);
    oscillator.start(time);
    oscillator.stop(time + duration + 0.02);
  }

  function playHiHat(time: number, volume: number) {
    if (!context || !master || !noiseBuffer) {
      return;
    }

    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();

    source.buffer = noiseBuffer;
    filter.type = "highpass";
    filter.frequency.value = 7000;
    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.05);

    source.connect(filter).connect(gain).connect(master);
    source.start(time);
    source.stop(time + 0.06);
  }

  function playKick(time: number) {
    if (!context || !master) {
      return;
    }

    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(150, time);
    oscillator.frequency.exponentialRampToValueAtTime(40, time + 0.12);
    gain.gain.setValueAtTime(0.5, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.15);

    oscillator.connect(gain).connect(master);
    oscillator.start(time);
    oscillator.stop(time + 0.16);
  }

  function scheduleStep(step: number, time: number) {
    if (!arpWave || !leadWave) {
      return;
    }

    const bar = Math.floor(step / STEPS_PER_BAR);
    const stepInBar = step % STEPS_PER_BAR;
    const chord = CHORDS[bar % CHORDS.length];
    const arpTones = [...chord.tones, chord.tones[0] + 12];

    playTone(arpWave, arpTones[ARP_PATTERN[stepInBar]], time, STEP_SECONDS * 0.9, 0.05);

    if (stepInBar % 2 === 0) {
      const eighth = stepInBar / 2;
      playTone("triangle", chord.bass + BASS_PATTERN[eighth], time, STEP_SECONDS * 1.8, 0.28);
      playHiHat(time, 0.04);

      const isMelodySection = bar >= CHORDS.length;
      const melodyNote = MELODY[bar % CHORDS.length][eighth];
      if (isMelodySection && melodyNote !== null) {
        playTone(leadWave, melodyNote, time, STEP_SECONDS * 1.9, 0.07);
      }
    }

    if (stepInBar % 4 === 0) {
      playKick(time);
    }
  }

  function scheduler() {
    if (!context) {
      return;
    }

    while (nextStepTime < context.currentTime + SCHEDULE_AHEAD_SECONDS) {
      scheduleStep(currentStep, nextStepTime);
      nextStepTime += STEP_SECONDS;
      currentStep = (currentStep + 1) % (TOTAL_BARS * STEPS_PER_BAR);
    }
  }

  function ensureContext() {
    if (!context) {
      context = new AudioContext();
      master = context.createGain();
      master.gain.value = 0;
      master.connect(context.destination);
      leadWave = createPulseWave(context, 0.25);
      arpWave = createPulseWave(context, 0.125);
      noiseBuffer = createNoiseBuffer(context);
    }

    return context;
  }

  async function tryAutoplay() {
    if (ensureContext().state !== "running") {
      return false;
    }

    await start();
    return true;
  }

  async function start() {
    window.clearTimeout(stopTimeoutId);

    context = ensureContext();
    await context.resume();

    if (!master) {
      return;
    }

    const now = context.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(MASTER_VOLUME, now + FADE_SECONDS);

    if (schedulerId === undefined) {
      currentStep = 0;
      nextStepTime = now + 0.05;
      schedulerId = window.setInterval(scheduler, LOOKAHEAD_MS);
    }
  }

  function stop() {
    if (!context || !master) {
      return;
    }

    const now = context.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(0, now + FADE_SECONDS);

    const activeContext = context;
    stopTimeoutId = window.setTimeout(() => {
      window.clearInterval(schedulerId);
      schedulerId = undefined;
      void activeContext.suspend();
    }, FADE_SECONDS * 1000);
  }

  function dispose() {
    window.clearTimeout(stopTimeoutId);
    window.clearInterval(schedulerId);
    schedulerId = undefined;
    void context?.close();
    context = null;
    master = null;
  }

  return { start, stop, tryAutoplay, dispose };
}
