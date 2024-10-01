//
const mongoose = require('mongoose'),
      AutoIncrement = require('mongoose-sequence')(mongoose),
      express = require('express')
      ;

const userSchema = new mongoose.Schema({
  userid: {
    Type: Number
  },
  username: {
    type: String,
    required: true
  },
  passhash: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: () => Date.now(),
    immutable: true
  },
  updated: {
    type: Date,
    required: true
  }
},{_id: false});
//
userSchema.pre('save', function(next) {
  this.updated = Date.now();
  next();
});
//
userSchema.plugin(AutoIncrement, { inc_field: 'userid' });
module.exports = mongoose.model('User', userSchema);
