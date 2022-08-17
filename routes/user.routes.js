// const express = require('express');
// const Model = require('../model/user.model');
// const router = express.Router();

// router.post('/post', async (req, res) => {
//   const data = new Model({
//     name: req.body.name,
//     age: req.body.age,
//   });

//   try {
//     const dataToSave = await data.save();
//     res.status(200).json(dataToSave);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// router.get('/getAll', async (req, res) => {
//   try {
//     const data = await Model.find();
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get('/getOne/:id', async (req, res) => {
//   try {
//     const data = await Model.findById(req.params.id);
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.patch('/update/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     const updatedData = req.body;
//     const options = { new: true };

//     const result = await Model.findByIdAndUpdate(
//       id,
//       updatedData,
//       options
//     );

//     res.send(result);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// router.delete('/delete/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     const data = await Model.findByIdAndDelete(id);
//     res.send(`Document with ${data.name} has been deleted..`);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// module.exports = router;

const express = require('express');
const UserController = require('../controllers/user.controller');

const router = express.Router();

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
