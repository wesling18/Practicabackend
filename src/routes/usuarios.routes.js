import { Router } from 'express';
import { obtenerUsuarios, obtenerUsuario, verificarUsuario, registrarUsuarios, eliminarUsuarios, actualizarUsuarios } from '../controllers/usuarios.controller.js';

const router = Router();

// Ruta para obtener todos los usuarios.
router.get('/usuarios', obtenerUsuarios);

// Ruta para obtener un usuario por su ID.
router.get('/usuario/:user', obtenerUsuario);

// Ruta para verificar un usuario y contraseña.
router.post('/verificar', verificarUsuario);


router.post('/registrarusuarios', registrarUsuarios);

router.delete('eliminarusuarios/:id', eliminarUsuarios)

router.patch('/actualizarusuarios/:id', actualizarUsuarios)

export default router;