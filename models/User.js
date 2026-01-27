/** -------------------
 * User.js
 * 
 * defines the Mongoose schema for user objects in the users collection
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        userName: {type: String,
                required: true,
                unique: true
        },
        email: {type: String,
                required: true,
                unique: true
        },
        passwordHash: {type: String,
                   required: true     
        },
    },
        {
        timestamps: true    //auto adds a createdAt and updatedAt fields
    }
);

module.exports = mongoose.model("User", userSchema);