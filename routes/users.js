const express = require('express');
const router = express.Router();

const userService = require('../services/user');
const private = require('../middlewares/private');

/* GET users listing. */
router.post('/', userService.authenticate);
router.get('/', private.checkJWT,userService.list);
router.get('/:id', private.checkJWT, userService.getById);
router.put('/add', private.checkJWT, userService.add);
router.patch('/:id', private.checkJWT, userService.update);
router.delete('/:id', private.checkJWT, userService.delete);

router.get('/:id/userboard', private.checkJWT, userService.userBoard);

module.exports = router;
