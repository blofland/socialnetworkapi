const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({

thoughtText: {
    type: String,
},
// thoughtText
// String
// Required
// Must be between 1 and 280 characters

createdAt: {
    type: Date,
    default: Date.now
  },

  username: {
      type: String,
      ref: 'User',

  },

  reactions: [{ 
      type: Schema.Types.ObjectId,
        ref: 'Reaction'}]
});
  
  const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
// username (The user that created this thought)
// String
// Required

// reactions (These are like replies)
// Array of nested documents created with the reactionSchema

// Schema Settings
// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.