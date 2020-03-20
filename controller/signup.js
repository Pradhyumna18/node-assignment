const models = require('../models')
let passwordHash = require('password-hash')
async function SignUp(req, res, next) {
    try {
        const p = req.body.password;
        let hashedPassword = passwordHash.generate(p);
        req.body.password = hashedPassword;
        const user = await models.Users.create(req.body);
        res.status(200).send(
            user
        );
    }
    catch (err) {
        next(err)
    }
}
module.exports = SignUp;