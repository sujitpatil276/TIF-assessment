// Import the Mongoose library
const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema constructor
const memberSchema = new mongoose.Schema(
    {
        community: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "community",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "role",
        }
        // Add timestamps for when the document is created and last modified
    },
    { timestamps: true }
);

// Export the Mongoose model for the role schema, using the name "user"
module.exports = mongoose.model("member", memberSchema);