const express = require('express');
const userRouter = require('./user.routes');
const thoughtRouter = require('./thoughts.routes');
const reactionRouter = require('./reactions.routes');

const app = express();

app.use('/users/', userRouter);
app.use('/thoughts/', thoughtRouter);
app.use('/reaction/', reactionRouter);

module.exports = app;
