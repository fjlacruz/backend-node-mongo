"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SongSchema = Schema({
  number: Number,
  name: String,
  duration: String,
  file: String,
  albun: { type: Schema.ObjectId, ref: "Albun" }
});

module.exports = mongoose.model("Song", SongSchema);
