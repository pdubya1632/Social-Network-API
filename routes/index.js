const router = require('express').Router();

const userRouter = require('./user.routes');
const thoughtRouter = require('./thought.routes');

router.use('/users/', userRouter);
router.use('/thoughts/', thoughtRouter);

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
