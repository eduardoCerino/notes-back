const express = require('express');
const router = express.Router();
const connection = require('./db');

router.get('/', (req, res) => {
  const query = 'SELECT * FROM notes';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener las notas:', err);
      res.status(500).json({ message: 'Error al obtener las notas' });
      return;
    }
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM notes WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error al obtener la nota:', err);
      res.status(500).json({ message: 'Error al obtener la nota' });
      return;
    }
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: 'Nota no encontrada' });
    }
  });
});

router.post('/', (req, res) => {
  const note = req.body;
  const query = 'INSERT INTO notes SET ?';
  connection.query(query, note, (err, results) => {
    if (err) {
      console.error('Error al crear la nota:', err);
      res.status(500).json({ message: 'Error al crear la nota' });
      return;
    }
    res.status(201).json({ message: 'Nota creada exitosamente' });
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const note = req.body;
  const query = 'UPDATE notes SET ? WHERE id = ?';
  connection.query(query, [note, id], (err, results) => {
    if (err) {
      console.error('Error al actualizar la nota:', err);
      res.status(500).json({ message: 'Error al actualizar la nota' });
      return;
    }
    if (results.affectedRows > 0) {
      res.json({ message: 'Nota actualizada exitosamente' });
    } else {
      res.status(404).json({ message: 'Nota no encontrada' });
    }
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM notes WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error al eliminar la nota:', err);
      res.status(500).json({ message: 'Error al eliminar la nota' });
      return;
    }
    if (results.affectedRows > 0) {
      res.json({ message: 'Nota eliminada exitosamente' });
    } else {
      res.status(404).json({ message: 'Nota no encontrada' });
    }
  });
});

module.exports = router;
