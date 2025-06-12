import { pool } from '../db.js';

// Obtener detalles de una venta específica por id_venta
export const obtenerDetallesVenta = async (req, res) => {
  try {
    const { id_venta } = req.params; // Usar id_venta para consistencia
    console.log(`Buscando detalles para id_venta: ${id_venta}`); // Depuración
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
    `, [id_venta]);

    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'Detalles de la venta no encontrados' });
    }

    res.json(result);
  } catch (error) {
    console.error('Error en obtenerDetallesVenta:', error); // Depuración
    return res.status(500).json({
      mensaje: 'Ha ocurrido un error al leer los detalles de la venta.',
      error: error.message
    });
  }
};