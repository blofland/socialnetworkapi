const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ReactionSchema = new Schema({

    reactionId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId()
        },

    reactionBody: {
      type: String
    },

    username: {
        type: String,
        default: Date.now
    },

    date: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
     
});

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
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },

  username: {
      type: String,
      ref: 'User',

  },

  reactions: [ReactionSchema]
});
  
  const Thought = model('Thought', ThoughtSchema);
const Reaction = model('Reaction', ReactionSchema);

module.exports = {Reaction, Thought};
// username (The user that created this thought)
// String
// Required

// reactions (These are like replies)
// Array of nested documents created with the reactionSchema

// Schema Settings
// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.






