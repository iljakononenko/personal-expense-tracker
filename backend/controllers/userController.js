const UserSchema = require('../models/User')

class UserController {
    async get(req, res, next) {
        try {
            const user = await UserSchema.find()
            res.status(200).json(user[0]);
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Server Error'})
        }
    }

    async edit (req, res, next) {
        try {
            const user_data = req.body;

            console.log(user_data)

            const user = await UserSchema.findOneAndUpdate({'_id': user_data._id}, user_data )

            res.status(200).json(user)
        } catch (err) {
            console.error(err)
            res.status(500).json({message: 'Server Error'})
        }
    }
}

module.exports = new UserController();
