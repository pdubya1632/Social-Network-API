const router = require('express').Router();

const {
  ThoughtController,
  ReactionController,
} = require('../controllers');

/* CREATE & LIST ALL */
router
  .route('/')
  .post(ThoughtController.thoughtStore)
  .get(ThoughtController.thoughtList);

/* LIST SINGLE, UPDATE SINGLE, DELETE SINGLE */
router
  .route('/:id')
  .get(ThoughtController.thoughtDetail)
  .patch(ThoughtController.thoughtUpdate)
  .delete(ThoughtController.thoughtDelete);

/* CREATE & DELETE THOUGHT REACTIONS */
router.post(
  '/:thoughtId/reactions',
  ReactionController.reactionStore
);

router.delete(
  '/:thoughtId/reactions/:reactionId',
  ReactionController.reactionDelete
);

module.exports = router;
