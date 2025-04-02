import { Router } from 'express';
import {  obtenerCategorias, registrarCategoria } from '../controllers/categoria.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/categoria', obtenerCategorias);
router.post('/registrarcategoria', registrarCategoria);



export default router;