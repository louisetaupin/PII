const mongoose = require('mongoose');

// Schéma des données stockées dans la collection "home"
const Timeline = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Timeline', Timeline);
