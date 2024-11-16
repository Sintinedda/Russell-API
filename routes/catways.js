const express = require('express');
const router = express.Router();

const catwayService = require('../services/catway');
const private = require('../middlewares/private');

router.get('/', private.checkJWT, catwayService.list);
router.get('/:id', private.checkJWT, catwayService.getById);
router.post('/', private.checkJWT, catwayService.add);
router.patch('/:id', private.checkJWT, catwayService.update);
router.put('/:id', private.checkJWT, catwayService.replace);
router.delete('/:id', private.checkJWT, catwayService.delete);

module.exports = router;