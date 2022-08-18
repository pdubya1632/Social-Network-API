const router = require('express').Router();

const { UserController } = require('../controllers');

/* CREATE & LIST ALL */
router
  .route('/')
  .post(UserController.userStore)
  .get(UserController.userList);

/* LIST SINGLE, UPDATE SINGLE, DELETE SINGLE */
router
  .route('/:id')
  .get(UserController.userDetail)
  .patch(UserController.userUpdate)
  .delete(UserController.userDelete);

/* CREATE & DELETE FRIEND CONNECTIONS */
router
  .route('/:userId/friends/:friendId')
  .post(UserController.friendStore)
  .delete(UserController.friendDelete);

module.exports = router;
