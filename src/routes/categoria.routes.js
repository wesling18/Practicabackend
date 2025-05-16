import { Router } from 'express';
import {  obtenerCategorias, 
    registrarCategoria, 
    eliminarCategoria, 
    actualizarCategoria } from '../controllers/categoria.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/categoria', obtenerCategorias);
router.post('/registrarcategoria', registrarCategoria);
router.delete('/eliminarCategoria/:id', eliminarCategoria);
router.delete('/actualizarcategoria/:id', actualizarCategoria);



export default router;