const detectIntent = require("./engine/intentDetector");
const extractKeywords = require("./keywordExtractor");
const buildContext = require("./engine/contextBuilder");

module.exports = {
  async process(message) {
    const detected = detectIntent(message); // ahora detecta { intent, greeting }

    // 👉 Saludo inicial o small talk
    if (detected.intent === "GREETING_INIT" || detected.intent === "SMALL_TALK") {
      return {
        response: "👋 ¡Hola! Bienvenido. Decime qué producto estás buscando y te ayudo.",
      };
    }

    // 👉 Producto (posible saludo + búsqueda)
    if (detected.intent === "PRODUCT_SEARCH") {
      const keywords = extractKeywords(message);
      const context = await buildContext(detected.intent, { keywords });

      if (!context.products || context.products.length === 0) {
        // Si había saludo incluido
        if (detected.greeting) {
          return {
            response:
              "¡Hola! 😄 No encontré productos disponibles con esas características.",
          };
        }
        return {
          response: "No encontré productos disponibles con esas características 😕",
        };
      }

      // 🛍️ Armar respuesta tipo vendedor
      const responseText = context.products
        .map((p) => {
          const price =
            p.unitPrice != null
              ? p.unitPrice - (p.unitPrice * (p.discount || 0)) / 100
              : "Consultar";

          const totalStock = Object.values(p.stock || {}).reduce(
            (sum, v) => sum + v,
            0
          );

          return `🔹 ${p.name}\nMarca: ${p.brand}\nCategoría: ${p.subCategory}\nPrecio: $${price}\nStock: ${totalStock}`;
        })
        .join("\n\n");

      // Si saludo + búsqueda
      if (detected.greeting) {
        return {
          response: `¡Hola! 😄 Mirá lo que tenemos disponible 👇\n\n${responseText}`,
        };
      }

      return {
        response: `¡Claro que sí! Mirá lo que tenemos disponible 👇\n\n${responseText}`,
      };
    }

    // 👉 No entendido
    return {
      response:
        "No estoy seguro de haber entendido 🤔 ¿Buscás algún producto en particular?",
    };
  },
};
