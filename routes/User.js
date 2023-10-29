// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
    login,
    signup,
    getMe,
} = require("../controllers/Auth")

const { auth } = require("../middlewares/auth")

// Routes for Login, Signup, and Getting Current User Info

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/signin", login)

// Route for user signup
router.post("/signup", signup)

router.get("/me", auth, getMe)



// Export the router for use in the main application
module.exports = router