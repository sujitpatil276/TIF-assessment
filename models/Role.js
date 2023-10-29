// Import the Mongoose library
const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema constructor
const roleSchema = new mongoose.Schema(
    {
        // Define the name field with type String, required, and trimmed
        name: {
            type: String,
            required: true,
            trim: true,
            unique : true,
            enum: ["Community Admin", "Community Member"],
        },
        // Add timestamps for when the document is created and last modified
    },
    { timestamps: true }
);

// Export the Mongoose model for the role schema, using the name "user"
module.exports = mongoose.model("role", roleSchema);