const STOP_WORDS = [
  "me", "mostrarias", "mostrar", "hay", "tenes",
  "quiero", "busco", "necesito", "unos", "unas",
  "un", "una", "por", "favor", "?"
];

module.exports = function extractKeywords(message = "") {
  return message
    .toLowerCase()
    .replace(/[¿?]/g, "")
    .split(" ")
    .filter(w => w && !STOP_WORDS.includes(w));
};
