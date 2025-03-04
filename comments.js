// Create web server
// npm install express
// npm install body-parser
// npm install mongoose
// npm install morgan
// npm install nodemon
// npm install cors
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/comments', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create schema for comments
const Comment = mongoose.model('Comment', {
  username: String,
  body: String,
  timestamp: Date
});

// Get all comments
app.get('/comments', async (req, res) => {
  const comments = await Comment.find();
  res.send(comments);
});

// Create new comment
app.post('/comments', async (req, res) => {
  const comment = new Comment(req.body);
  await comment.save();
  res.status(201).send(comment);
});

// Start web server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});