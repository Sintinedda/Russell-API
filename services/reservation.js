const Reservation = require('../models/reservations');
const Catway = require('../models/catways');

exports.list = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    const catway = await Catway.findById(id)
    console.log(catway);
    const reservations = await Reservation.find({catway: catway});
    try {
        return res.render('reservation/list.ejs', {
            catway: catway,
            reservations: reservations,
            title: 'Liste des réservations par catway' 
        });
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.getById = async (req, res, next) => {
    const id = req.params.id;
    const catway = await Catway.findById(id);
    const idReservation = req.params.idReservation;

    try {
        let reservation = await Reservation.findById(idReservation);

        if (reservation) {
            return res.render('reservation/card.ejs', {
                reservation: reservation,
                catway: catway,
                title: 'Fiche réservation'
            });
        }
        return res.status(404).json('reservation_introuvable');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.getReservationById = async (req, res, next) => {
    const reservationId = req.params.idReservation;
    
    try {
        let reservation = await Reservation.findById(reservationId);
        let catwayId = reservation.catway._id;

        if (reservation) {
            return res.redirect('/catways/' + catwayId + '/reservations/' + reservationId);
        }
        return res.status(404).json(reservation_introuvable);
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.add = async (req, res, next) => {
    const id = req.params.id;
    const catway = await Catway.findById(id);
    const temp = ({
        catway: catway,
        clientName: req.body.clientName,
        boatName: req.body.boatName,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut
    });

    try {
        let reservation = await Reservation.create(temp);

        return res.render('reservation/afteradd.ejs', {
            reservation: reservation
        });
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.delete = async (req, res, next) => {
    const idReservation = req.params.idReservation;

    try {
        await Reservation.deleteOne({_id: idReservation});

        return res.render('reservation/afterdelete.ejs');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.deleteReservationById = async (req, res, next) => {
    const reservationId = req.params.idReservation;
    
    try {
        let reservation = await Reservation.findById(reservationId);

        if (reservation) {
            return res.render('reservation/delete.ejs', {
                reservation: reservation
            });
        }
        return res.status(404).json(reservation_introuvable);
    } catch (error) {
        return res.status(501).json(error);
    }
}