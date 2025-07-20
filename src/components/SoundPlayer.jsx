import { getFrequency } from '../utils/noteUtils';

let audioCtx = null;
let oscillator = null;
let stopTimeout = null;

export function playSound(note) {
  stopSound(); // 既存の音を止めてから再生
  if (!note) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  oscillator = audioCtx.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.value = getFrequency(note);
  oscillator.connect(audioCtx.destination);
  oscillator.start();
  stopTimeout = setTimeout(() => {
    stopSound();
  }, 2000);
}

export function stopSound() {
  if (stopTimeout) {
    clearTimeout(stopTimeout);
    stopTimeout = null;
  }
  if (oscillator) {
    try {
      oscillator.stop();
      oscillator.disconnect();
    } catch (e) {}
    oscillator = null;
  }
  if (audioCtx && audioCtx.state !== 'closed') {
    try {
      audioCtx.close();
    } catch (e) {}
    audioCtx = null;
  }
}

// ダミーコンポーネント（UIなし）
const SoundPlayer = () => null;
export default SoundPlayer;
