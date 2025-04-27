const express = require('express');
const app = express();
app.use(express.json());

app.get('/ping', (req, res) => {
  res.send({ message: 'Bot activo' });
});

app.post('/webhook', (req, res) => {
  const message = req.body.Body?.toLowerCase() || '';

  let reply = 'Hola, gracias por contactar a Orifer Piel. ¿En qué podemos ayudarte?';

  if (message.includes('chamarra') || message.includes('modelo')) {
    reply = `Estos son algunos modelos:\n\nDama:\n- Francia\n- Boston\n- Sinaí\n- Rockera\n- Levis\n\nCaballero:\n- Gladiador\n- Motociclista\n- Levis\n- Berlín\n\nPrecios:\n- Dama: $1790 MXN\n- Caballero: $1890 MXN\n\nColores: tinto, canela, miel, azul mezclilla, negro.`;
  }

  if (message.includes('pago') || message.includes('transferencia')) {
    reply = `Aceptamos pagos por transferencia, Mercado Pago, PayPal y depósitos bancarios.`;
  }

  if (message.includes('envío') || message.includes('entrega')) {
    reply = `Costo de envío depende del destino. Proporciónanos tu ubicación para cotizarlo.`;
  }

  res.send(`
    <Response>
      <Message>${reply}</Message>
    </Response>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor funcionando en puerto', PORT);
});
