// Import the Mongoose library
const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema constructor
const communitySchema = new mongoose.Schema(
    {
        // Define the name field with type String, required, and trimmed
        name: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            // required: true,
            ref: "user",
        },
        // Add timestamps for when the document is created and last modified
    },
    { timestamps: true }
);

// Export the Mongoose model for the community schema, using the name "user"
module.exports = mongoose.model("community", communitySchema);