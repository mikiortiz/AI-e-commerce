module.exports = function detectIntent(message = "") {
  const text = message.toLowerCase().trim();

  // 👉 Primera interacción (mensaje vacío)
  if (!text) {
    return { intent: "GREETING_INIT", greeting: true };
  }

  // 👉 Detectamos si hay saludo
  const hasGreeting = /hola|buenas|hey|gracias/.test(text);

  // 👉 Detectamos si hay intención de producto
  const isProductSearch =
    /(mostr|ten|tie|ver|abra|hab|hay|busc|quier|necesit)/i.test(text);

  // 🔹 Caso: contiene búsqueda de producto
  if (isProductSearch) {
    return { intent: "PRODUCT_SEARCH", greeting: hasGreeting };
  }

  // 🔹 Caso: solo saludo
  if (hasGreeting) {
    return { intent: "SMALL_TALK", greeting: true };
  }

  // 🔹 Fallback: tokens >2 letras → asumimos búsqueda de producto
  const tokens = text.split(/\s+/).filter((w) => w.length > 2);
  if (tokens.length > 0) {
    return { intent: "PRODUCT_SEARCH", greeting: hasGreeting };
  }

  return { intent: "UNKNOWN", greeting: hasGreeting };
};
