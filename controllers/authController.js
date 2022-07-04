const User = require("../models/userModel")

const bcript = require("bcryptjs")


exports.signup = async (req, res) => {
    const {username, password} = req.body
    const hashpassword = await bcript.hash(password, 12)

    try {
        const newUser = await User.create({
            username,
            password: hashpassword
        });
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
    } catch (e) {
        res.status(400).json({
            status: "fail"
        })
    }
};

exports.login = async (req, res) => {
    const {username, password} = req.body
    try {
        const user = await User.findOne({username})

        if(!user) {
            return res.status(404).json({
                status: "fail",
                message: "user not found"
            })
        }
        const isCorrect = await bcript.compare(password, user.password)

        if(isCorrect) {
            res.status(200).json({
                status: 'success'
            })
        } else {
            res.status(400).json({
                status: "fail",
                message: "wrong username or password"
            })
        }
    } catch (e) {
        res.status(400).json({
            status: "fail"
        })
    }    
}