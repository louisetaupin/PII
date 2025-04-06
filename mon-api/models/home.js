const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
  date: String,
  title: String,
  description: String,
});
// Schéma des données stockées dans la collection "home"
const Home = new mongoose.Schema({
  photo: {
    type: String,
    required: true,
  },
  cv: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  timeline: [timelineSchema], 
});

module.exports = mongoose.model('Home', Home);
