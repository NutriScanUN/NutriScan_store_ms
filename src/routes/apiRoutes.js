// apiRoutes.js
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Rutas para las operaciones básicas
router.get('/users/:id', apiController.getUser); // Consultar usuario por ID
router.post('/users', apiController.createUser); // Crear un usuario
router.put('/users/:id', apiController.updateUser); // Editar usuario por ID
router.delete('/users/:id', apiController.deleteUser); // Eliminar usuario por ID
router.get('/users/check/:id', apiController.isUserRegistered); // Verificar si el usuario está registrado

module.exports = router;
