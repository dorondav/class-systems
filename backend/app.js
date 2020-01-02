const express = require('express')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const lessonRoutes = require("./routes/lesson");
const userRoutes = require("./routes/user");

const defaultDBValuesMiddle = require("./Middlewares/createDefaultDbValues");

const app = express();

mongoose
    .connect(
        "mongodb+srv://doron:t0qDfFjZFOi6jG9N@cluster0-mnmxg.mongodb.net/classes?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS Headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

// Create Defulte Lessonse 
// app.use(defaultDBValuesMiddle);


// Set app Routes

app.use("/api/lessons", lessonRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
