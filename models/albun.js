"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AlbunSchema = Schema({
  title: String,
  description: String,
  year: Number,
  artist: { type: Schema.ObjectId, ref: "Artist" }
});

module.exports = mongoose.model("Albun", AlbunSchema);
