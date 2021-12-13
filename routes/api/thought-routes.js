const router = require('express').Router();

const {
    addThought,
    removeThought,
    addReaction,
    removeReaction
  } = require('../../controllers/thought-controller');

  router
  .route('/:userId/:thoughtId')
  .put(addReaction)
  .delete(removeThought)

  router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
  } = require('../../controllers/thought-controller');

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