
const User = require("../models/User")
const UserController = {
    // get all users
    getAllUser(req, res) {
      User.find({})
      // .populate({
      //   path: 'thoughts',
      //   select: '-__v'
      // })
      // .select('-__v')
      .sort({ _id: -1})
        .then(user => res.json(user))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
    
      
  
    // get one User by id
    getUserById({ params }, res) {
      User.findOne({ _id: params.id })
      // .populate({
      //   path: 'thoughts',
      //   select: '-__v'
      // })
      .select('-__v')
      .sort({ _id: -1})
        .then(user => {
          // If no User is found, send 404
          if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
          }
          res.json(user);
        })

        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
 

// createUser
async createUser({ body }, res) {
  try{
    const user = await User.create(body)
    if(!user._id) {res.status(400).json({message: "Bad Request"})}
    else {res.json(user)}
  } catch ({message}){
    res.status(400).json(message);
  }
}, 

// update User by id
updateUser({ params, body }, res) {
  User.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'No User found with this id!' });
        return;
      }
      res.json(user);
    })
    .catch(err => res.status(400).json(err));
},

  // delete User
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(user => {
        if (!user) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(user);
      })
      .catch(err => res.status(400).json(err));
    },
  addFriend({params}, res) {
    User.findOneAndUpdate(
      {_id: params.userId},
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true}
  )
    .then(user => {
        if (!user) {
            res.status(404).json({ message: 'Could not find user with id of ' + params.userId });
            return;
        }
        res.json(user);
    })
    .catch(err => res.json(err));
  },
  
  removeFriend( { params }, res) {
    User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId }},
        { new: true}
    )
    .then(user => res.json(user))
    .catch(err => res.json(err));
}
}
module.exports = UserController