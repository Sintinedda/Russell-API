const Catway = require('../models/catways');

exports.list = async (req, res, next) => {
    const catways = await Catway.find();
    try {
        return res.render('catway/list.ejs', {
            catways: catways,
            title: 'Liste des catways'
        });
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.getById = async (req, res, next) => {
    const id = req.params.id;

    try {
        let catway = await Catway.findById(id);

        if (catway) {
            return res.render('catway/card.ejs', {
                catway: catway,
                title: 'Fiche catway'
            });
        }
        return res.status(404).json('catway_introuvable');
    } catch (error) {
        return res.status(501).json(error)
    }
}

exports.add = async (req, res, next) => {
    const temp = ({
        catwayNumber: req.body.catwayNumber,
        type: req.body.type,
        catwayState: req.body.catwayState
    });

    try {
        let catway = await Catway.create(temp);

        return res.render('catway/afteradd.ejs', {
            catway: catway
        });
    } catch (error) {
        return res.status(501).json(error)
    }
}

exports.update = async (req, res, next) => {
    const id = req.params.id;
    const temp = ({
        catwayState: req.body.catwayState
    });

    try {
        let catway = await Catway.findOne({_id: id});

        if (catway) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    catway[key] = temp[key];
                }
            });

            await catway.save();
            let temp2 = "été modifié";
            return res.render('catway/afterupdate.ejs', {
                catway: catway,
                temp: temp2
            });
        }
        return res.status(404).json('catway_introuvable');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.replace = async (req, res, next) => {
    const id = req.params.id;
    const temp = ({
        catwayNumber: req.body.catwayNumber,
        type: req.body.type,
        catwayState: req.body.catwayState
    });

    try {
        let catway = await Catway.findOne({_id: id});
        let catwayNumb = catway.catwayNumber;

        if (catway) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    catway[key] = temp[key];
                }
            });

            await catway.save();
            let temp2 = "remplacé le catway numéro " + catwayNumb;
            return res.render('catway/afterupdate.ejs', {
                catway: catway,
                temp: temp2
            }
            );
        }
        return res.status(404).json('catway_introuvable');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.delete = async (req, res, next) => {
    const id = req.params.id;

    try {
         await Catway.deleteOne({_id: id});

         return res.render('catway/afterdelete.ejs');
    } catch (error) {
        return res.status(501).json(error);
    }
}

exports.searchReservationsByCatway = async (req, res, next) => {
    const catwayNumber = req.body.catwayNumber;
    try {
        let catway = await Catway.findOne({catwayNumber: catwayNumber});

        if (catway) {
            return res.redirect('/catways/' + catway._id + '/reservations');
        }

        return res.status(404).json('catway_introuvable');
    } catch (error) {
        return res.status(501).json(error);
    }
}