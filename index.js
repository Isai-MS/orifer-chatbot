const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { MessagingResponse } = require('twilio').twiml;

const app = express();
const PORT = process.env.PORT || 10000;

// Aumentar el límite de tamaño para análisis del cuerpo de la solicitud
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));

// Middleware para registrar solicitudes
app.use((req, res, next) => {
  console.log(`Received ${req.method} request at ${req.path}`);
  next();
});

app.get('/', (req, res) => {
  res.send('🤖 Chatbot Orifer Piel está funcionando correctamente con IA');
});

app.post('/demo-reply', async (req, res) => {
  const userMessage = req.body.Body?.trim() || '';
  const twiml = new MessagingResponse();

  // Si el mensaje está vacío
  if (!userMessage) {
    twiml.message('Por favor envía un mensaje con tu consulta.');
    return res.type('text/xml').send(twiml.toString());
  }

  try {
    console.log('Procesando mensaje:', userMessage);
    
    const gptResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `Eres un asistente para Orifer Piel, especialista en chamarras de piel. 
                      Información importante:
                      - Precios: Dama $1,790 MXN, Caballero $1,890 MXN
                      - Envíos a todo México
                      - Ubicación: Plaza Polar, conjunto estrella L-26
                      - Aceptamos Mercado Pago, PayPal y transferencias
                      Responde de manera amable y profesional en español.`,
          },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 300,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 5000 // 5 segundos de timeout
      }
    );

    const replyText = gptResponse.data.choices[0]?.message?.content?.trim() || 
                     'No pude generar una respuesta. ¿Podrías reformular tu pregunta?';
    
    console.log('Respuesta de OpenAI:', replyText);
    twiml.message(replyText);
  } catch (error) {
    console.error('Error detallado:', {
      message: error.message,
      response: error.response?.data,
      code: error.code
    });
    
    // Respuesta de fallback con información básica
    twiml.message(`Disculpa, estoy teniendo dificultades técnicas. Mientras tanto, te comparto información básica:
📍 Ubicación: Plaza Polar, conjunto estrella L-26
💵 Precios: Dama $1,790 - Caballero $1,890
📦 Enviamos a todo México`);
  }

  res.type('text/xml');
  res.send(twiml.toString());
});

// Manejo de errores global
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});
