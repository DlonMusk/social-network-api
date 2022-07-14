const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createNewThought,
    updateThought,
    deleteThought,
    addNewReaction,
    removeReaction
} = require('../../controllers/thoughtController');

router.route('/')
      .get(getThoughts)
      .post(createNewThought);

router.route('/:thoughtId')
      .get(getSingleThought)
      .put(updateThought)
      .delete(deleteThought);

router.route('/:thoughtId/reactions')
      .post(addNewReaction)
      
router.route('/:thoughtId/reactions/:reactionId')
      .delete(removeReaction);


module.exports = router;