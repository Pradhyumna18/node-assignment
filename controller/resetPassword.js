const models = require('../models')
let jwt = require('jsonwebtoken')
const passwordHash = require('password-hash')
async function resetPassword(req, res, next) {
    try {
        const token = req.headers['access-token']
        const payload = jwt.decode(token)
        const user = await models.Users.findOne({
            where: {
                userName: payload.userName
            }
        })
        const bool = passwordHash.verify(req.body.oldPassword, user.password);
        if (bool) {
            const p = req.body.newPassword;
            let hashedPassword = passwordHash.generate(p);
            user.update({ password: hashedPassword })
            res.status(200).json({
                message: "password changed successfully"
            })
        }
        else {
            res.status(200).json({
                message: "old password incorrect"
            })
        }
    }
    catch (err) {
        next(err)
    }
}
module.exports = resetPassword;