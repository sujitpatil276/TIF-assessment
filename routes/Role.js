// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
    createRoll, getAllRoles
} = require("../controllers/Role");

const { auth } = require("../middlewares/auth")



// Route for user login
router.post("/", createRoll);

// Route for user signup
router.get("/", getAllRoles)




// Export the router for use in the main application
module.exports = router