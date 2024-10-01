//
const mongoose = require('mongoose'),
      AutoIncrement = require('mongoose-sequence')(mongoose),
      express = require('express')
      ;
//
const itemSchema = new mongoose.Schema({
  itemid: {
    type: Number,
    required: true
  },
  regnum: {
    type: String,
    required: true
  },
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  kms: {
    type: Number,
    required: true
  },
  colour: {
    type: String,
    required: false
  },
  vin: {
    type: String,
    required: true
  },
  retail: {
    type: Number,
    required: false
  },
  cost: {
    type: Number,
    required: true
  },
  accessories: {
    name: String,
    description: String,
    _id: false,
  },
  images: {
    name: String,
    blob: String,
    _id: false,
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
});
//
itemSchema.pre('save', function(next) {
  this.updated = Date.now();
  next();
});
//
itemSchema.plugin(AutoIncrement, { inc_field: 'itemid' });
module.exports = mongoose.model('Item', itemSchema);
