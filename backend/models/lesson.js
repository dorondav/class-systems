const mongoose = require("mongoose");

const lessonSchma = mongoose.Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    program: { type: String, require: true },
    startDate: { type: String, require: true },
    endDate: { type: String, require: true },
    location: { type: String, require: true },
    hoursStart: { type: String, require: true },
    hoursEnd: { type: String, require: true },
    price: { type: Number, require: true },
    numberOfSessions: { type: Number, require: true },
});

// .plugin(uniqueValidator);

module.exports = mongoose.model("Lesson", lessonSchma);
