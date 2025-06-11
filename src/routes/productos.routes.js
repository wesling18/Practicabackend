import { Router } from 'express';
import {  obtenerProductos, obtenerProducto, registrarProducto, eliminarProductos, actualizarProducto } from '../controllers/productos.controller.js';

const router = Router();

// Ruta para obtener todos los productos
router.get('/productos', obtenerProductos);

// Ruta para obtener un produto por su ID
router.get('/producto/:id', obtenerProducto);

// Ruta para registrar un producto
router.post('/registrarproducto', registrarProducto);

router.delete('/eliminarproductos/:id', eliminarProductos);

router.patch('/actualizarproductos/:id', actualizarProducto)

export default router;