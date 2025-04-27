// Código para responder mensajes en WhatsApp

exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.MessagingResponse();

  // Lo que el cliente escribe
  const incomingMessage = event.Body ? event.Body.trim() : "";

  // Convertir a minúsculas para que no importe cómo escriban
  const msg = incomingMessage.toLowerCase();

  if (msg === "1") {
    twiml.message(`🧥 Catálogo de chamarras:

Modelos Dama: Francia, Boston, Sinaí, Rockera, Levis
Modelos Caballero: Gladiador, Motociclista, Levis, Berlín

Tallas disponibles: S, M, L, XL, XXL (Tallas extra: costo adicional)
Colores: Tinto, Canela, Miel, Azul Mezclilla, Negro
`);
  } else if (msg === "2") {
    twiml.message(`💵 Precios y Envíos:

Precios:
- Dama: $1,790 MXN
- Caballero: $1,890 MXN

Métodos de pago: Transferencia, MercadoPago, PayPal, Depósito bancario.

Costo de envío: Varía según destino. Por favor, proporciónanos tu ubicación para cotizar el envío.
`);
  } else if (msg === "3") {
    twiml.message(`👨‍💼 Gracias por tu interés. Un asesor se pondrá en contacto contigo pronto. ¡Orifer Piel agradece tu preferencia!`);
  } else {
    // Respuesta por defecto si no escriben 1, 2 o 3
    twiml.message(`¡Hola! Bienvenido a *Orifer Piel* 👋🏼

¿Qué deseas hacer hoy?

1️⃣ Ver catálogo de chamarras  
2️⃣ Saber precios y envíos  
3️⃣ Hablar con un asesor

(Responde con el número de la opción que quieras.)`);
  }

  callback(null, twiml);
};
