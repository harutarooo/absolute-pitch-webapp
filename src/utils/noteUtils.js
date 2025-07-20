const noteFreqs = {
  C: 261.63,
  D: 293.66,
  E: 329.63,
  F: 349.23,
  G: 392.00,
  A: 440.00,
  B: 493.88,
};

export function getFrequency(note) {
  return noteFreqs[note] || 440;
}

export function isCorrect(selected, answer) {
  return selected[0] === answer[0];
}
