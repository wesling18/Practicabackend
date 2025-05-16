import { Router } from 'express';
import {  totalVentasPorDia } from '../controllers/estadisticas.controller.js';

const router = Router();

// Ruta para obtener todos los empleados
router.get('/totalventaspordia', totalVentasPorDia);


export default router;

