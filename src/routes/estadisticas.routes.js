import { Router } from 'express';
import {
  totalVentasPorDia,
  totalVentasPorMes,
  totalVentasPorAño,
  totalVentasPorEmpleado,
  cantidadVentasPorEmpleado,
  totalVentasPorEmpleadoYMes,
  totalComprasPorCliente,
  cantidadComprasPorCliente,
  totalComprasPorClienteYMes,
  productosMasVendidosPorCantidad,
  productosMasVendidosPorValorTotal,
  ventasDeProductosPorMes,
  totalVentasPorCategoria,
  totalVentasPorCategoriaYMes,
  productosConBajoStock,
  stockPorCategoria,
  ventasPorClienteEmpleadoYMes,
  ventasPorCategoriaEmpleadoYMes,
  ventasPorClienteCategoriaYMes,
  promedioVentasPorEmpleado,
  promedioVentasPorEmpleadoYMes,
  clientesQueCompranMasFrecuentemente
} from '../controllers/estadisticas.controller.js';

const router = Router();

// **1. Análisis de Ventas por Dimensión Tiempo**
router.get('/totalventaspordia', totalVentasPorDia);
router.get('/totalventaspormes', totalVentasPorMes);
router.get('/totalventasporaño', totalVentasPorAño);

// **2. Análisis de Ventas por Empleado**
router.get('/totalventasporemppleado', totalVentasPorEmpleado);
router.get('/cantidadventasporemppleado', cantidadVentasPorEmpleado);
router.get('/totalventasporempresaymes', totalVentasPorEmpleadoYMes);

// **3. Análisis de Ventas por Cliente**
router.get('/totalcomprasporcliente', totalComprasPorCliente);
router.get('/cantidadcomprasporcliente', cantidadComprasPorCliente);
router.get('/totalcomprasporclienteaymes', totalComprasPorClienteYMes);

// **4. Análisis de Ventas por Producto**
router.get('/productosmasvendidosporcantidad', productosMasVendidosPorCantidad);
router.get('/productosmasvendidosporvalortotal', productosMasVendidosPorValorTotal);
router.get('/ventasdeproductospormes', ventasDeProductosPorMes);

// **5. Análisis de Ventas por Categoría**
router.get('/totalventasporcategoria', totalVentasPorCategoria);
router.get('/totalventasporcategoriaaymes', totalVentasPorCategoriaYMes);

// **10. Análisis de Stock**
router.get('/productosconbajostock', productosConBajoStock);
router.get('/stockporcategoria', stockPorCategoria);

// **11. Análisis Combinado de Ventas**
router.get('/ventasporempresaclienteaymes', ventasPorClienteEmpleadoYMes);
router.get('/ventasporempresacategoriaaymes', ventasPorCategoriaEmpleadoYMes);
router.get('/ventasporempresaclientecategoriaaymes', ventasPorClienteCategoriaYMes);

// **13. Análisis de Eficiencia de Empleados**
router.get('/promedioventasporempres', promedioVentasPorEmpleado);
router.get('/promedioventasporempresaymes', promedioVentasPorEmpleadoYMes);

// **14. Análisis de Clientes Frecuentes**
router.get('/clientesquepcompranmasfrecuentemente', clientesQueCompranMasFrecuentemente);

export default router;
