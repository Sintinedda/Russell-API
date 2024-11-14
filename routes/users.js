const express = require('express');
const router = express.Router();

const userService = require('../services/user');
const private = require('../middlewares/private');

/* GET users listing. */
router.post('/', userService.authenticate);
router.get('/:id', private.checkJWT, userService.getById);
router.put('/add', userService.add);
router.patch('/:id', private.checkJWT, userService.update);
router.delete('/:id', private.checkJWT, userService.delete);

module.exports = router;
