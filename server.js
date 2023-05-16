const express = require('express');
const app = express();
const port = 3000;
const notesRouter = require('./notes');


app.use(express.json());

app.use('/notes', notesRouter);


app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
