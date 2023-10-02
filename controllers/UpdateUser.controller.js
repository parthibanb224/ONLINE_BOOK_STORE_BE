const updateUserRouter = require('express').Router();
const userModel = require('../models/Users.models');

updateUserRouter.patch('/:id', async (req, res, next) => {
    try {
        const fullName = req.params.id;
        const details = req.body;
        const matchedUser = await userModel.findOne({ fullName });
        if (!matchedUser) {
            res.status(400).json({ Err: "user not found exists" });
            return;
        }
        else {
            matchedUser.about = details.about;
            matchedUser.lastName = details.lastName;
            matchedUser.streetAddress = details.streetAddress;
            matchedUser.city = details.city;
            matchedUser.state = details.state;
            matchedUser.pinCode = details.pinCode;
            matchedUser.country = details.country;
            await userModel.findByIdAndUpdate(matchedUser.id, matchedUser);
            res.status(201).json({
                success: true,
                message: `${matchedUser.fullName} details has beed changed sucessfully`,
            });
        }
    }
    catch (error) {
        return res.status(500).json(error);
    }
})

module.exports = updateUserRouter;