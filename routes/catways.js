const express = require('express');
const router = express.Router();

const catwayService = require('../services/catway');
const reservationService = require('../services/reservation');
const private = require('../middlewares/private');

const reservationRoute = require('../routes/reservations');

router.get('/', private.checkJWT, catwayService.list);
router.get('/:id', private.checkJWT, catwayService.getById);
router.post('/', private.checkJWT, catwayService.add);
router.patch('/:id', private.checkJWT, catwayService.update);
router.put('/:id', private.checkJWT, catwayService.replace);
router.delete('/:id', private.checkJWT, catwayService.delete);

router.get('/board/:idReservation', private.checkJWT, reservationService.getReservationById);
router.delete('/board/:idReservation', private.checkJWT, reservationService.deleteReservationById);
router.use('/:id/reservations', reservationRoute);

module.exports = router;