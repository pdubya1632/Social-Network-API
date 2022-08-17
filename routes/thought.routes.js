const express = require('express');
const ThoughtController = require('../controllers/thought.controller');
const ReactionController = require('../controllers/reaction.controller');

var router = express.Router();

router.get('/', ThoughtController.thoughtStore);
router.get('/', ThoughtController.thoughtList);
router.get('/:id', ThoughtController.thoughtDetail);
router.put('/:id', ThoughtController.thoughtUpdate);
router.delete('/:id', ThoughtController.thoughtDelete);

router.post(
  '/:thoughtId/reactions',
  ReactionController.reactionStore
);
router.delete(
  '/:thoughtId/reactions/:reactionId',
  ReactionController.reactionDelete
);

module.exports = router;
