const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

exports.checkJWT = async (req, res, next) => {
    let token = req.cookies['token'];

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.redirect('/');
            } else {

            next();
            }
        });
    } else {
        return res.redirect('/');
    }
}