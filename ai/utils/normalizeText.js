module.exports = function normalizeText(text = "") {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // saca acentos
    .replace(/\b(tienen|tendrian|tendran|tenes|tenes|tenian)\b/g, "hay")
    .trim();
};
