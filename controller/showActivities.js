const models = require('../models')
var jwt = require('jsonwebtoken')
async function getActivities(req, res, next) {
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
                userId: user.id
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
module.exports = getActivities;