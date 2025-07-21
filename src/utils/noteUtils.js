// 12音の周波数（C4基準）
const noteFreqs = {
  C: 261.63,
  'C#': 277.18,
  D: 293.66,
  'D#': 311.13,
  E: 329.63,
  F: 349.23,
  'F#': 369.99,
  G: 392.00,
  'G#': 415.30,
  A: 440.00,
  'A#': 466.16,
  B: 493.88,
};

export function getFrequency(note) {
  return noteFreqs[note] || 440;
}

export function isCorrect(selected, answer) {
  // 完全一致のみ正解
  return selected === answer;
}
