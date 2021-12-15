const {Thought, Reaction} = require("../models/Thought")
const ThoughtController = {
    // get all thoughtss
    getAllThought(req, res) {
      Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
  
    // get one thought by id
    getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.id })
        .then(dbThoughtData => {
          // If no thought is found, send 404
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })

        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
 

    // createThought
    createThought({ body }, res) {
    Thought.create(body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(400).json(err));
    }, 

    // update Thought by id
    updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No Thought found with this id!' });
            return;
        }
        res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete thought
    deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },


    //Add reaction
    addReaction({ params, body }, res) {
        console.log(params, body)
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    // remove reaction
    removeReaction({ params }, res) {
        console.log({params})
        Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { _id: params.reactionId } } },
        { new: false }
    )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
}
module.exports = ThoughtController