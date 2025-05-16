import { pool2 } from '../db.js';

// **1. Análisis de Ventas por Dimensión Tiempo**

export const totalVentasPorDia = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT DATE_FORMAT(t.fecha, '%Y-%m-%d') AS dia, SUM(hv.total_linea) AS total_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Tiempo t ON hv.fecha = t.fecha
       GROUP BY t.fecha
       ORDER BY t.fecha;`
    );
    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron estadísticas de ventas.' });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Ha ocurrido un error al obtener las estadísticas de ventas.', error: error.message });
  }
};

export const totalVentasPorMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT t.mes, ROUND(SUM(hv.total_linea), 1) AS total_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Tiempo t ON hv.fecha = t.fecha
       GROUP BY t.mes
       ORDER BY t.mes;`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las ventas por mes.', error: error.message });
  }
};

export const totalVentasPorAño = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT t.año, ROUND(SUM(hv.total_linea), 2) AS total_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Tiempo t ON hv.fecha = t.fecha
       GROUP BY t.año
       ORDER BY t.año;`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las ventas por año.', error: error.message });
  }
};

// **2. Análisis de Ventas por Empleado**

export const totalVentasPorEmpleado = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT e.primer_nombre, e.segundo_nombre, e.primer_apellido, ROUND(SUM(hv.total_linea), 2) AS total_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Empleados e ON hv.id_empleado = e.id_empleado
       GROUP BY e.id_empleado, e.primer_nombre, e.segundo_nombre, e.primer_apellido
       ORDER BY total_ventas DESC;`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las ventas por empleado.', error: error.message });
  }
};

export const cantidadVentasPorEmpleado = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT e.primer_nombre, e.segundo_nombre, e.primer_apellido, COUNT(DISTINCT hv.id_venta) AS cantidad_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Empleados e ON hv.id_empleado = e.id_empleado
       GROUP BY e.id_empleado, e.primer_nombre, e.segundo_nombre, e.primer_apellido
       ORDER BY cantidad_ventas DESC;`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener la cantidad de ventas por empleado.', error: error.message });
  }
};

export const totalVentasPorEmpleadoYMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT e.primer_nombre, e.segundo_nombre, e.primer_apellido, t.año, t.mes, SUM(hv.total_linea) AS total_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Empleados e ON hv.id_empleado = e.id_empleado
       JOIN Dim_Tiempo t ON hv.fecha = t.fecha
       GROUP BY e.id_empleado, e.primer_nombre, e.segundo_nombre, e.primer_apellido, t.año, t.mes
       ORDER BY t.año, t.mes, total_ventas DESC;`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las ventas por empleado y mes.', error: error.message });
  }
};

// **3. Análisis de Ventas por Cliente**

export const totalComprasPorCliente = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.primer_nombre, c.segundo_nombre, c.primer_apellido, ROUND(SUM(hv.total_linea), 2) AS total_compras
       FROM Hecho_Ventas hv
       JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
       GROUP BY c.id_cliente, c.primer_nombre, c.segundo_nombre, c.primer_apellido
       ORDER BY total_compras DESC;`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las compras por cliente.', error: error.message });
  }
};

export const cantidadComprasPorCliente = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.primer_nombre, c.segundo_nombre, c.primer_apellido, COUNT(DISTINCT hv.id_venta) AS cantidad_compras
       FROM Hecho_Ventas hv
       JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
       GROUP BY c.id_cliente, c.primer_nombre, c.segundo_nombre, c.primer_apellido
       ORDER BY cantidad_compras DESC;`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener la cantidad de compras por cliente.', error: error.message });
  }
};

export const totalComprasPorClienteYMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.primer_nombre, c.segundo_nombre, c.primer_apellido, t.año, t.mes, SUM(hv.total_linea) AS total_compras
       FROM Hecho_Ventas hv
       JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
       JOIN Dim_Tiempo t ON hv.fecha = t.fecha
       GROUP BY c.id_cliente, c.primer_nombre, c.segundo_nombre, c.primer_apellido, t.año, t.mes
       ORDER BY t.año, t.mes, total_compras DESC;`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las compras por cliente y mes.', error: error.message });
  }
};

// **4. Análisis de Ventas por Producto**

export const productosMasVendidosPorCantidad = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_producto, SUM(hv.cantidad) AS cantidad_vendida, SUM(hv.total_linea) AS total_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Productos p ON hv.id_producto = p.id_producto
       GROUP BY p.id_producto, p.nombre_producto
       ORDER BY cantidad_vendida DESC;`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener los productos más vendidos por cantidad.', error: error.message });
  }
};

export const productosMasVendidosPorValorTotal = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_producto, SUM(hv.total_linea) AS total_ventas, SUM(hv.cantidad) AS cantidad_vendida
       FROM Hecho_Ventas hv
       JOIN Dim_Productos p ON hv.id_producto = p.id_producto
       GROUP BY p.id_producto, p.nombre_producto
       ORDER BY total_ventas DESC;`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener los productos más vendidos por valor total.', error: error.message });
  }
};

export const ventasDeProductosPorMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_producto, t.año, t.mes, SUM(hv.cantidad) AS cantidad_vendida, SUM(hv.total_linea) AS total_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Productos p ON hv.id_producto = p.id_producto
       JOIN Dim_Tiempo t ON hv.fecha = t.fecha
       GROUP BY p.id_producto, p.nombre_producto, t.año, t.mes
       ORDER BY t.año, t.mes, total_ventas DESC;`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las ventas de productos por mes.', error: error.message });
  }
};

// **5. Análisis de Ventas por Categoría**

export const totalVentasPorCategoria = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_categoria, SUM(hv.total_linea) AS total_ventas, SUM(hv.cantidad) AS cantidad_vendida
       FROM Hecho_Ventas hv
       JOIN Dim_Productos p ON hv.id_producto = p.id_producto
       GROUP BY p.nombre_categoria
       ORDER BY total_ventas DESC;`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las ventas por categoría.', error: error.message });
  }
};

export const totalVentasPorCategoriaYMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_categoria, t.año, t.mes, SUM(hv.total_linea) AS total_ventas, SUM(hv.cantidad) AS cantidad_vendida
       FROM Hecho_Ventas hv
       JOIN Dim_Productos p ON hv.id_producto = p.id_producto
       JOIN Dim_Tiempo t ON hv.fecha = t.fecha
       GROUP BY p.nombre_categoria, t.año, t.mes
       ORDER BY t.año, t.mes, total_ventas DESC;`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener las ventas por categoría y mes.', error: error.message });
  }
};

// **10. Análisis de Stock**

export const productosConBajoStock = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_producto, p.stock
       FROM Dim_Productos p
       WHERE p.stock < 50
       ORDER BY p.stock ASC;`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener productos con bajo stock.', error: error.message });
  }
};

export const stockPorCategoria = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_categoria, SUM(p.stock) AS stock_total
       FROM Dim_Productos p
       GROUP BY p.nombre_categoria
       ORDER BY stock_total DESC;`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener stock por categoría.', error: error.message });
  }
};

// **11. Análisis Combinado de Ventas**

export const ventasPorClienteEmpleadoYMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.primer_nombre AS cliente_nombre, c.primer_apellido AS cliente_apellido,
              e.primer_nombre AS empleado_nombre, e.primer_apellido AS empleado_apellido,
              t.año, t.mes, SUM(hv.total_linea) AS total_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
       JOIN Dim_Empleados e ON hv.id_empleado = e.id_empleado
       JOIN Dim_Tiempo t ON hv.fecha = t.fecha
       GROUP BY c.id_cliente, c.primer_nombre, c.primer_apellido,
                e.id_empleado, e.primer_nombre, e.primer_apellido,
                t.año, t.mes
       ORDER BY t.año, t.mes, total_ventas DESC;`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener ventas por cliente, empleado y mes.', error: error.message });
  }
};

export const ventasPorCategoriaEmpleadoYMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT p.nombre_categoria, e.primer_nombre AS empleado_nombre, e.primer_apellido AS empleado_apellido,
              t.año, t.mes, SUM(hv.total_linea) AS total_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Productos p ON hv.id_producto = p.id_producto
       JOIN Dim_Empleados e ON hv.id_empleado = e.id_empleado
       JOIN Dim_Tiempo t ON hv.fecha = t.fecha
       GROUP BY p.nombre_categoria, e.id_empleado, e.primer_nombre, e.primer_apellido,
                t.año, t.mes
       ORDER BY t.año, t.mes, total_ventas DESC;`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener ventas por categoría, empleado y mes.', error: error.message });
  }
};

export const ventasPorClienteCategoriaYMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.primer_nombre AS cliente_nombre, c.primer_apellido AS cliente_apellido,
              p.nombre_categoria, t.año, t.mes, SUM(hv.total_linea) AS total_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
       JOIN Dim_Productos p ON hv.id_producto = p.id_producto
       JOIN Dim_Tiempo t ON hv.fecha = t.fecha
       GROUP BY c.id_cliente, c.primer_nombre, c.primer_apellido,
                p.nombre_categoria, t.año, t.mes
       ORDER BY t.año, t.mes, total_ventas DESC;`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener ventas por cliente, categoría y mes.', error: error.message });
  }
};

// **13. Análisis de Eficiencia de Empleados**

export const promedioVentasPorEmpleado = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT e.primer_nombre, e.segundo_nombre, e.primer_apellido,
              AVG(hv.total_linea) AS promedio_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Empleados e ON hv.id_empleado = e.id_empleado
       GROUP BY e.id_empleado, e.primer_nombre, e.segundo_nombre, e.primer_apellido
       ORDER BY promedio_ventas DESC;`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener el promedio de ventas por empleado.', error: error.message });
  }
};

export const promedioVentasPorEmpleadoYMes = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT e.primer_nombre, e.segundo_nombre, e.primer_apellido,
              t.año, t.mes, AVG(hv.total_linea) AS promedio_ventas
       FROM Hecho_Ventas hv
       JOIN Dim_Empleados e ON hv.id_empleado = e.id_empleado
       JOIN Dim_Tiempo t ON hv.fecha = t.fecha
       GROUP BY e.id_empleado, e.primer_nombre, e.segundo_nombre, e.primer_apellido,
                t.año, t.mes
       ORDER BY t.año, t.mes, promedio_ventas DESC;`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener el promedio de ventas por empleado y mes.', error: error.message });
  }
};

// **14. Análisis de Clientes Frecuentes**

export const clientesQueCompranMasFrecuentemente = async (req, res) => {
  try {
    const [result] = await pool2.query(
      `SELECT c.primer_nombre, c.segundo_nombre, c.primer_apellido,
              COUNT(DISTINCT hv.id_venta) AS cantidad_compras,
              SUM(hv.total_linea) AS total_compras
       FROM Hecho_Ventas hv
       JOIN Dim_Clientes c ON hv.id_cliente = c.id_cliente
       GROUP BY c.id_cliente, c.primer_nombre, c.segundo_nombre, c.primer_apellido
       HAVING COUNT(DISTINCT hv.id_venta) > 1
       ORDER BY cantidad_compras DESC;`
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener clientes que compran más frecuentemente.', error: error.message });
  }
};


