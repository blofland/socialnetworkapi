const router = require('express').Router();



const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
  } = require('../../controllers/thought-controller');

router
  .route('/:thoughtId/:reactions')
  .post(addReaction)

  router
  .route('/:thoughtId/:reactionId')
  .delete(removeReaction)

// Set up GET all and POST at /api/Thoughts
// /api/Thoughts
router
  .route('/')
  .get(getAllThought)
  .post(createThought);


// Set up GET one, PUT, and DELETE at /api/Thoughts/:id
// /api/Thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);


module.exports = router;