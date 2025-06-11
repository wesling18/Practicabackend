import { Router } from 'express';
import { actualizarEmpleados, eliminarEmpleados, obtenerEmpleados, registrarEmpleados, obtenerEmpleado } from '../controllers/empleados.controller.js';

const router = Router();

// Ruta para obtener todos los empleados
router.get('/empleados', obtenerEmpleados);

// Ruta para obtener un empleado por su ID
router.get('/empleados/:id', obtenerEmpleado); // Corregido de '/empleado/:id' a '/empleados/:id'

router.post('/registrarEmpleados', registrarEmpleados);

router.delete('/eliminarempleados/:id', eliminarEmpleados);

router.patch('/actualizarempleados/:id', actualizarEmpleados);

export default router;