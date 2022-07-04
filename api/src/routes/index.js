const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogs = require('./dogs.js');
const temperaments = require('./temperaments')
const router = Router();
// Configurar los routers

router.use('/', dogs);
router.use('/', temperaments);

module.exports = router;
