module.exports = function buildResponse(intent, context = {}) {
  switch (intent) {
    case "SMALL_TALK":
      return context.message;

    default:
      return "Hola 😊 Puedo ayudarte con productos, sucursales o envíos.";
  }
};
