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
        return escapeRegExp.status(404).json('catway_introuvable');
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
        console.log(catway);

        return res.redirect('/catways');
    } catch (error) {
        return res.status(501).json(error)
    }
}

exports.update = async (req, res, next) => {
    const id = req.params.id;
    const temp = ({
        type: req.body.type,
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
            return res.redirect('/catways/' + id);
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

        if (catway) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    catway[key] = temp[key];
                }
            });

            await catway.save();
            return res.redirect('/catways/' + id);
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

         return res.redirect('/catways');
    } catch (error) {
        return res.status(501).json(error)
    }
}