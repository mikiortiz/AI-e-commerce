const aiEngine = require("../ai");

exports.ask = async (req, res) => {
  try {
    const { message } = req.body;

    const result = await aiEngine.process(message);

    // 🟢 Respuesta directa
    if (result.response) {
      return res.json({ response: result.response });
    }

    const products = result.context?.products || [];

    if (!products.length) {
      return res.json({
        response:
          "No encontré productos disponibles con esas características 😕",
      });
    }

    // 🛍️ Respuesta tipo vendedor
    const responseText = products
      .map((p) => {
        const price =
          p.unitPrice != null
            ? p.unitPrice - (p.unitPrice * (p.discount || 0)) / 100
            : "Consultar";

        const totalStock = Object.values(p.stock || {}).reduce(
          (sum, v) => sum + v,
          0,
        );

        return `🔹 ${p.name}
Marca: ${p.brand}
Categoría: ${p.subCategory}
Precio: $${price}
Stock: ${totalStock}`;
      })
      .join("\n\n");

    res.json({
      response: `¡Claro que sí! Mirá lo que tenemos disponible 👇\n\n${responseText}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      response: "Ocurrió un error al procesar tu consulta 😓",
    });
  }
};
