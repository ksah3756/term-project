const mongoose = require('mongoose');
const moment = require('moment')
const { Schema } = mongoose;

const chartSchema = new Schema({
  pri1: String,
  pri2: String,
  pri3: String,
  chart: [],
  date: {
    type: String,
    default: ()=>moment().format("YYYY-MM-DD HH:mm:ss") 
  }
});

module.exports = mongoose.model('Chart', chartSchema);