const SignUpRouter = require('express').Router();
const userModel = require('../models/Users.models');
const bcrypt = require("bcrypt");
const saltRounds = 10;


SignUpRouter.post('/createUser', (req, res, next) => {
    const data = req.body;
    bcrypt.hash(req.body.password, saltRounds)
        .then(function (hash) {
            if (hash) {
                const NewUser = new userModel({ ...data, password: hash });
                NewUser.save()
                    .then(response => {
                        return res.status(200).json({
                            result: response,
                            success: true,
                            message: "New user Added Successfully"
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        return res.status(401).json({
                            success: false,
                            message: "data Added failed",
                            Error: err
                        })
                    })
            }
            else {
                return res.status(400).json({
                    message: "Password is not in required format",
                });
            }
        })

})


module.exports = SignUpRouter;