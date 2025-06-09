import { Router } from 'express';
import {  obtenerClientes, obtenerCliente, registrarCliente,  eliminarCliente, actualizarCliente } from '../controllers/clientes.controller.js';


const router = Router();

// Ruta para obtener todos los clientes
router.get('/clientes', obtenerClientes);

// Ruta para obtener un cliente por su ID
router.get('/cliente/:id', obtenerCliente);

//----------------------------------------------------------------------------------------------------------------------------------------

//Ruta para Registrar un cliente
router.post('/registrarclientes', registrarCliente);


//Ruta para eliminar un cliente
router.delete('/eliminarclientes', eliminarCliente);


//Ruta para actualizar cliente
router.patch('/actualizarCliente', actualizarCliente);


export default router;