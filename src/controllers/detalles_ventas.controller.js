import { pool } from '../db.js';

// Obtener detalles de una venta específica por id_venta
export const obtenerDetallesVenta = async (req, res) => {
  try {
    const { id } = req.params; // Obtener id_venta del parámetro de la ruta
    const [result] = await pool.query(`
      SELECT 
        dv.id_detalle_venta,
        p.nombre_producto,
        p.descripcion AS descripcion_producto,
        dv.cantidad,
        dv.precio_unitario,
        (dv.cantidad * dv.precio_unitario) AS subtotal
      FROM Detalles_Ventas dv
      INNER JOIN Productos p ON dv.id_producto = p.id_producto
      WHERE dv.id_venta = ?
    `, [id]);

    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'Detalles de la venta no encontrados' });
    }

    res.json(result);
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los detalles de la venta.',
      error: error.message
    });
  }
};