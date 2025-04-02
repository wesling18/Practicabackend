import { pool } from '../db.js';

// Obtener todos los categoria
export const obtenerCategorias= async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM Categorias');
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los datos de los categoria.',
      error: error
    });
  }
};


// Registrar una nueva categoría
export const registrarCategoria = async (req, res) => {
  try {
    const { nombre_categoria, descripcion_categoria } = req.body;

    const [result] = await pool.query(
      'INSERT INTO categorias (nombre_categoria, descripcion_categoria) VALUES (?, ?)',
      [nombre_categoria, descripcion_categoria]
    );

    res.status(201).json({ id_categoria: result.insertId });
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al registrar la categoría.',
      error: error
    });
  }
};