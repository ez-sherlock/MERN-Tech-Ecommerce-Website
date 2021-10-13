import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// @desc    Auth user
// @route   GET /api/users/login
// @access  PUBLIC

const authUser = asyncHandler(async (req, res) => {
    // In order to use res.body data we would have to add 
    const { email, password } = req.body

    const user = await User.findOne(email)

    // Have created a method of match passwords in User model so that we can access it
    if (user && await User.matchPasswords(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }

})

export {
    authUser
}