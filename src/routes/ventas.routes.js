import { Router } from 'express';
import { obtenerVentasConDetalles } from '../controllers/venta.controller.js';

const router = Router();

// Ruta para obtener todos los ventas
router.get('/ventas', obtenerVentasConDetalles);



export default router;