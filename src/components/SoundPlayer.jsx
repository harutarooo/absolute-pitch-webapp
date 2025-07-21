import { getFrequency } from '../utils/noteUtils';

let audioCtx = null;
let oscillator = null;
let gainNode = null;
let stopTimeout = null;
export function playSound(note) {
  stopSound(); // 既存の音を止めてから再生
  if (!note) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  oscillator = audioCtx.createOscillator();
  oscillator.type = 'sine';
  const freq = getFrequency(note);
  oscillator.frequency.value = freq;
  // 音量調整: 高音ほど音量を下げる
  gainNode = audioCtx.createGain();
  // 65Hz～3951Hzの範囲を想定し、対数的に減衰（例: 65Hzで1.0, 3951Hzで0.2程度）
  let volume = 1.0;
  if (freq > 65) {
    volume = Math.max(0.2, 1.0 - Math.log2(freq / 65) * 0.15); // 調整可
  }
  gainNode.gain.value = volume;
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
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
    } catch (e) { }
    oscillator = null;
  }
  if (gainNode) {
    try {
      gainNode.disconnect();
    } catch (e) { }
    gainNode = null;
  }
  if (audioCtx && audioCtx.state !== 'closed') {
    try {
      audioCtx.close();
    } catch (e) { }
    audioCtx = null;
  }
}

// ダミーコンポーネント（UIなし）
const SoundPlayer = () => null;
export default SoundPlayer;
