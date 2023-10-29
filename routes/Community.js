// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
    createCommunity, getAllCommunities, getAllMembers, getMyOwnedCommunity, getMyJoinedCommunity
} = require("../controllers/Community");

const { auth } = require("../middlewares/auth")





router.post("/", createCommunity);

router.get("/", getAllCommunities);

router.get("/me/owner", getMyOwnedCommunity);

router.get("/me/member", getMyJoinedCommunity);

router.get("/:id/members", getAllMembers);




// Export the router for use in the main application
module.exports = router