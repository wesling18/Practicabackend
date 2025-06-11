import { Router } from 'express';
import { obtenerVentas, eliminarVenta, registrarVenta, actualizarVenta, obtenerVentaPorId } from '../controllers/venta.controller.js';

const router = Router();

// Ruta para obtener todos los ventas
router.get('/obtenerventas', obtenerVentas);


// Ruta para eliminar una venta
router.delete('/eliminarventa/:id_venta', eliminarVenta);

// Ruta para registrar una nueva venta
router.post('/registrarventa', registrarVenta);


// Ruta para actualizar una venta
router.patch('/actualizarventa/:id_venta', actualizarVenta);

router.get('/obternerventaporid/:id_venta',obtenerVentaPorId)

export default router;