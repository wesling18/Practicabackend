import { Router } from 'express';
import { obtenerClientes, obtenerCliente, registrarCliente, eliminarCliente, actualizarCliente } from '../controllers/clientes.controller.js';

const router = Router();

// Ruta para obtener todos los clientes
router.get('/clientes', obtenerClientes);

// Ruta para obtener un cliente por su ID
router.get('/cliente/:id', obtenerCliente);

// Ruta para registrar un cliente
router.post('/registrarclientes', registrarCliente);

// Ruta para eliminar un cliente
router.delete('/eliminarclientes/:id', eliminarCliente);

// Ruta para actualizar cliente (corrigiendo el parámetro)
router.patch('/actualizarcliente/:id_cliente', actualizarCliente);

export default router;