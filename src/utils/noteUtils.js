export function getFrequency(note) {
  // note: "C" など
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const n = noteNames.indexOf(note);
  if (n === -1) return 440;
  // 2～7オクターブの範囲でランダム
  const octave = Math.floor(Math.random() * (7 - 2 + 1)) + 2;
  const midi = (octave + 1) * 12 + n;
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export function isCorrect(selected, answer) {
  // 完全一致のみ正解
  return selected === answer;
}
