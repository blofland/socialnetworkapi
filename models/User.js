const {Schema, model} = require("mongoose")
const UserSchema = new Schema ({
    username: {
    type: String,
    require: true
},

email: {
    type:String,
},

thoughts: [],

friends: [],
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;

// username
// String
// Unique
// Required
// Trimmed

// email
// String
// Required
// Unique
// Must match a valid email address (look into Mongoose's matching validation)

// thoughts
// Array of _id values referencing the Thought model

// friends
// Array of _id values referencing the User model (self-reference)

// Schema Settings
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.