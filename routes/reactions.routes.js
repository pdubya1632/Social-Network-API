const express = require('express');
const ReactionController = require('../controllers/reaction.controller');

var router = express.Router();

router.post('/', ReactionController.reactionStore);
router.delete('/:id', ReactionController.reactionDelete);

module.exports = router;
