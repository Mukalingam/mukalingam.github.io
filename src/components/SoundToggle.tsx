import { useState, useEffect, useCallback, useRef } from "react";
import { MdVolumeUp, MdVolumeOff } from "react-icons/md";
import "./styles/SoundToggle.css";

let audioCtx: AudioContext | null = null;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

function playTone(freq: number, duration: number, volume: number = 0.03, type: OscillatorType = "sine") {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio not supported
  }
}

const SoundToggle = () => {
  const [enabled, setEnabled] = useState(false);
  const enabledRef = useRef(enabled);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  const playClick = useCallback(() => {
    if (!enabledRef.current) return;
    playTone(800, 0.08, 0.04, "sine");
  }, []);

  const playHover = useCallback(() => {
    if (!enabledRef.current) return;
    playTone(600, 0.05, 0.02, "sine");
  }, []);

  useEffect(() => {
    const handleClick = () => playClick();
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        playHover();
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("mouseover", handleHover);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("mouseover", handleHover);
    };
  }, [playClick, playHover]);

  const toggle = () => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);
    if (newEnabled) {
      // Play a welcome tone
      playTone(523, 0.15, 0.05, "sine");
      setTimeout(() => playTone(659, 0.15, 0.05, "sine"), 100);
      setTimeout(() => playTone(784, 0.2, 0.05, "sine"), 200);
    }
  };

  return (
    <button
      className={`sound-toggle ${enabled ? "sound-on" : ""}`}
      onClick={toggle}
      data-cursor="disable"
      aria-label={enabled ? "Mute sounds" : "Enable sounds"}
      title={enabled ? "Mute sounds" : "Enable sounds"}
    >
      {enabled ? <MdVolumeUp /> : <MdVolumeOff />}
    </button>
  );
};

export default SoundToggle;
