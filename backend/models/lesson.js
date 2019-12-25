const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const lessonSchma = new Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    startDate: { type: String, require: true },
    endDate: { type: String, require: true },
    location: { type: String, require: true },
    hoursStart: { type: String, require: true },
    hoursEnd: { type: String, require: true },
    price: { type: Number, require: true },
    numberOfSessions: { type: Number, require: true },
});

lessonSchma.plugin(uniqueValidator);

module.exports = mongoose.model("Lesson", lessonSchma);
