const User = require('../models/User')


class UserController {
    async userCreate(req, res) {
        try {

            const { name, username, address, email, phone, website, company } = req.body;

            const user = new User({
                name,
                username,
                email,
                phone,
                address,
                website,
                company
            })

            const result = await user.save();
            return res.status(201).json({
                status: true,
                message: "User created successfully",
                data: result,
            })

        } catch (error) {
            console.log(error)
        }
    }
}


module.exports = new UserController()