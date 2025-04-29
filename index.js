
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
  const msg = req.body.Body ? req.body.Body.toLowerCase() : '';
  const twiml = new MessagingResponse();

  let respuesta = '';

  // Saludo inicial con nombre de marca
  if (msg.includes('hola') || msg.includes('buenos') || msg.includes('qué tal')) {
    respuesta = '👋 ¡Hola! Bienvenido a Orifer Piel. ¿En qué puedo ayudarte hoy?
Puedes preguntarme por:
- Catálogo
- Precios
- Envíos
- Ubicación
- Garantía
- Formas de pago';
  }

  // Catálogo
  else if (msg.includes('catalogo') || msg.includes('catálogo') || msg.includes('modelos')) {
    respuesta = '📚 Catálogo de chamarras:

👩 Dama: Francia, Boston, Sinaí, Rockera, Levis
👨 Caballero: Gladiador, Motociclista, Levis, Berlín

Tallas disponibles: S a XXL (tallas extra con costo adicional)
Colores: Tinto, Canela, Miel, Azul Mezclilla, Negro.';
  }

  // Precios
  else if (msg.includes('precio') || msg.includes('cuánto cuesta')) {
    respuesta = '💵 Nuestros precios son:
- Chamarras de dama: $1,790 MXN
- Chamarras de caballero: $1,890 MXN
Tallas extra tienen un costo adicional.';
  }

  // Envíos
  else if (msg.includes('envio') || msg.includes('envíos') || msg.includes('enviar')) {
    respuesta = '📦 Hacemos envíos nacionales e internacionales. El costo depende del destino. Por favor, indícanos tu ubicación para cotizar.';
  }

  // Ubicación
  else if (msg.includes('ubicacion') || msg.includes('dirección') || msg.includes('donde están')) {
    respuesta = '🏬 Nuestra tienda física está ubicada en Plaza Polar, conjunto estrella L-26. También puedes comprar en línea. ¿Te gustaría ver el catálogo?';
  }

  // Garantía
  else if (msg.includes('garantia') || msg.includes('garantía')) {
    respuesta = '✅ Todas nuestras chamarras tienen garantía contra defectos de fabricación. Puedes solicitar cambios dentro de los primeros 15 días con comprobante.';
  }

  // Pagos
  else if (msg.includes('pago') || msg.includes('pagos') || msg.includes('formas de pago')) {
    respuesta = '💳 Aceptamos transferencia, depósito bancario, Mercado Pago y PayPal. ¿Te gustaría que te enviemos los datos para pagar?';
  }

  // Respuesta por defecto
  else {
    respuesta = '🤖 Lo siento, no entendí tu mensaje. Puedes preguntarme por:
- Catálogo
- Precios
- Envíos
- Ubicación
- Garantía
- Formas de pago';
  }

  twiml.message(respuesta);
  res.type('text/xml');
  res.send(twiml.toString());
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});
