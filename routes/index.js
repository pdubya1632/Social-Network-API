const express = require('express');
const userRouter = require('./user.routes');
const thoughtRouter = require('./thought.routes');

const app = express();

app.use('/users/', userRouter);
app.use('/thoughts/', thoughtRouter);

module.exports = app;
