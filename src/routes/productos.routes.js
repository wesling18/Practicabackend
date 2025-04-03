import { Router } from 'express';
import {  obtenerProductos, obtenerProducto, registrarProducto } from '../controllers/productos.controller.js';

const router = Router();

// Ruta para obtener todos los productos
router.get('/productos', obtenerProductos);

// Ruta para obtener un produto por su ID
router.get('/producto/:id', obtenerProducto);

// Ruta para registrar nuevo producto
router.post('/registrarproducto', registrarProducto);

export default router;