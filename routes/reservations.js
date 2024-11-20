const express = require('express');
const router = express.Router({ mergeParams: true });

const reservationService = require('../services/reservation');
const private = require('../middlewares/private');

router.get('/', private.checkJWT, reservationService.list);
router.get('/:idReservation', private.checkJWT, reservationService.getById);
router.post('/', private.checkJWT, reservationService.add);
router.delete('/:idReservation', private.checkJWT, reservationService.delete);

module.exports = router;