const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { MessagingResponse } = require('twilio').twiml;

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('🤖 Chatbot Orifer Piel está funcionando con IA');
});

app.post('/demo-reply', async (req, res) => {
  const userMessage = req.body.Body?.trim();
  const twiml = new MessagingResponse();

  try {
    // Llama a la API de OpenAI (ChatGPT)
    const gptResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', // puedes usar 'gpt-4' si tu cuenta lo permite
        messages: [
          {
            role: 'system',
            content: `Eres un asistente para una tienda de chamarras de piel llamada Orifer Piel. Contesta con educación y ayuda a los clientes a resolver dudas sobre productos, precios, pagos, envíos y ubicación.`,
          },
          {
            role: 'user',
            content: userMessage,
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const replyText = gptResponse.data.choices[0].message.content.trim();
    twiml.message(replyText);
  } catch (error) {
    console.error('Error al conectar con OpenAI:', error.message);
    twiml.message('Lo siento 😓, hubo un problema técnico al generar la respuesta. Intenta de nuevo en un momento.');
  }

  res.type('text/xml');
  res.send(twiml.toString());
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando con IA en puerto ${PORT}`);
});
