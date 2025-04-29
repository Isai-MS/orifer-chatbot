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

  if (msg.includes('hola') || msg.includes('buenos') || msg.includes('qué tal')) {
    respuesta = '👋 ¡Hola! Bienvenido a Orifer Piel. ¿En qué puedo ayudarte hoy?
Puedes preguntarme por:
- Catálogo
- Precios
- Envíos
- Ubicación
- Garantía
- Formas de pago';
  } else if (msg.includes('catalogo') || msg.includes('catálogo') || msg.includes('modelos')) {
    respuesta = '📚 Catálogo de chamarras:

👩 Dama: Francia, Boston, Sinaí, Rockera, Levis
👨 Caballero: Gladiador, Motociclista, Levis, Berlín

Tallas: S a XXL (tallas extra con costo adicional)
Colores: Tinto, Canela, Miel, Azul Mezclilla, Negro.';
  } else if (msg.includes('precio') || msg.includes('cuánto cuesta')) {
    respuesta = '💵 Precios:
- Dama: $1,790 MXN
- Caballero: $1,890 MXN
Tallas extra tienen costo adicional.';
  } else if (msg.includes('envio') || msg.includes('envíos') || msg.includes('enviar')) {
    respuesta = '📦 Enviamos a todo México y al extranjero. El costo depende del destino. Indícanos tu ubicación para cotizar.';
  } else if (msg.includes('ubicacion') || msg.includes('dirección') || msg.includes('donde están')) {
    respuesta = '📍 Tienda física: Plaza Polar, conjunto estrella L-26.
También puedes comprar en línea.';
  } else if (msg.includes('garantia') || msg.includes('garantía')) {
    respuesta = '✅ Nuestras chamarras tienen garantía por defectos de fabricación. Cambios dentro de 15 días con comprobante.';
  } else if (msg.includes('pago') || msg.includes('pagos')) {
    respuesta = '💳 Aceptamos transferencia, Mercado Pago, PayPal y depósito bancario.';
  } else {
    respuesta = '🤖 No entendí tu mensaje. Pregúntame por:
- Catálogo
- Precios
- Envíos
- Ubicación
- Garantía
- Pagos';
  }

  twiml.message(respuesta);
  res.type('text/xml');
  res.send(twiml.toString());
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});
