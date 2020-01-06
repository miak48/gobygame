const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const result = new Schema(
  {
    uuid: {type: String, required: true},
    round: {type: Number, required: true},
    fishOneTime: {type: Number, required: true},
    fishTwoTime: {type: Number, required: true},
  },
  {timestamps: true},
);

module.exports = mongoose.model('result', result);
