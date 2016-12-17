const mongoose = require('mongoose')

var Greightful = mongoose.model('Greightful', {
  greightfulContent: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  date: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  }
})

module.exports = { Greightful }
