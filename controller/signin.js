const models = require('../models')
let jwt = require('jsonwebtoken')
const passwordHash = require('password-hash')

async function SignIn(req, res, next) {
    try {
        const user = await models.Users.findOne({
            where: {
                userName: req.body.userName
            }
        })
        const bool = passwordHash.verify(req.body.password, user.password);
        if (!bool) {
            res.status(400).json({
                message: "username or password incorrect"
            })
        }
        else {
            var token = jwt.sign({ userName: req.body.userName }, "abcd")
            res.status(200).json({
                token: token
            })
        }
    }
    catch (err) {
        next(err)
    }
}
module.exports = SignIn;