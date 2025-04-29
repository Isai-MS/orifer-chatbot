const express = require('express');
const bodyParser = require('body-parser');
const { MessagingResponse } = require('twilio').twiml;

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente.');
});

app.post('/demo-reply', (req, res) => {
  const mensaje = req.body.Body ? req.body.Body.toLowerCase() : '';
  const twiml = new MessagingResponse();

  let respuesta;

  if (mensaje.includes("hola")) {
    respuesta = "Hola 👋, gracias por contactar a Orifer Piel. ¿En qué puedo ayudarte?";
  } else if (mensaje.includes("precio") || mensaje.includes("cuánto cuesta")) {
    respuesta = "Los precios son: $1790 para dama y $1890 para caballero. ¿Te gustaría ver nuestro catálogo?";
  } else if (mensaje.includes("catálogo")) {
    respuesta = "Modelos Dama: Francia, Boston, Sinaí, Rockera, Levis.\nModelos Caballero: Gladiador, Motociclista, Levis, Berlín.\nTallas S hasta XXL. Colores: tinto, canela, miel, azul mezclilla, negro.";
  } else if (mensaje.includes("envío") || mensaje.includes("envios")) {
    respuesta = "Hacemos envíos a todo México 🇲🇽. Solo proporciónanos tu ubicación para cotizar.";
  } else if (mensaje.includes("forma de pago") || mensaje.includes("pago")) {
    respuesta = "Aceptamos transferencia, Mercado Pago, PayPal y depósito bancario.";
  } else {
    respuesta = "Lo siento, no entendí tu mensaje. ¿Podrías repetirlo o preguntarme por el catálogo, precios o formas de envío?";
  }

  twiml.message(respuesta);
  res.type('text/xml');
  res.send(twiml.toString());
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});
