const express = require('express');
const app = express();
app.use(express.json());

// Usamos el puerto dinámico de Render
const PORT = process.env.PORT || 10000;

app.post('/demo-reply', (req, res) => {
    const mensajeUsuario = req.body.Body.toLowerCase();
    let respuesta;

    if (mensajeUsuario.includes('catalogo')) {
        respuesta = '📚 Nuestro catálogo de modelos de dama: Francia, Boston, Sinaí, Rockera, Levis. Modelos de caballero: Gladiador, Motociclista, Levis, Berlín.';
    } else if (mensajeUsuario.includes('precio')) {
        respuesta = '💵 Precio dama: $1790 MXN, caballero: $1890 MXN. Contamos con tallas extra (costo adicional).';
    } else if (mensajeUsuario.includes('envio') || mensajeUsuario.includes('envíos')) {
        respuesta = '🚚 Envíos a todo México. El costo varía según el destino. ¡Contáctanos para cotizar!';
    } else {
        respuesta = '👋 Hola, gracias por contactar a Orifer Piel. ¿En qué puedo ayudarte? Puedes preguntarme sobre catálogo, precios o envíos.';
    }

    res.send({
        message: respuesta
    });
});

app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente.');
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
});
