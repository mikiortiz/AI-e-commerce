const Product = require("../../models/Product");

module.exports = async function buildContext(intent, data = {}) {
    
  if (intent !== "PRODUCT_SEARCH") {
    return {};
  }

  const keywords = data.keywords || [];

  if (!keywords.length) {
    return { products: [] };
  }

  // 🔎 Armamos condiciones dinámicas
  const orConditions = [];

  keywords.forEach((word) => {
    const regex = new RegExp(word, "i");

    orConditions.push(
      { name: regex },
      { subCategory: regex },
      { brand: regex }
    );
  });

  const products = await Product.find({
    active: true,
    $or: orConditions,
  })
    .limit(5)
    .select("name brand subCategory unitPrice discount stock colors")
    .lean();

  return { products };
};
