const models = require('../models')
var jwt = require('jsonwebtoken')
async function show(req, res, next) {
    try {
        const token = req.headers['access-token']
        const payload = jwt.decode(token)
        const user = await models.Users.findOne({
            where: {
                userName: payload.userName
            }
        })
        const data = await models.Activities.findAll({
            where: {
                userId: user.id,
                date: req.params.date
            }
        })
        res.status(200).json({
            data
        })
    }
    catch (err) {
        next(err)
    }

}
module.exports = show;