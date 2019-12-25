const express = require("express");
const Lesson = require("../models/lesson");

const router = express.Router();

router.get("", (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const lessonQuery = Lesson.find();
    let fetchedLessons;
    if (pageSize && currentPage) {
        lessonQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    lessonQuery
        .then(documents => {
            fetchedLessons = documents;
            return Lesson.countDocuments();
        })
        .then(count => {
            res.status(200).json({
                message: "Lessons fetched successfully!",
                lessons: fetchedLessons,
                maxLessons: count
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching Lessons failed!"
            });
        });
});



router.post("", (req, res, next) => {
    const lesson = new Lesson({
        title: req.body.title,
        content: req.body.content,
        location: req.body.location,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        hoursStart: req.body.hoursStart,
        hoursEnd: req.body.hoursEnd,
        price: req.body.price,
        numberOfSessions: req.body.numberOfSessions,
    });

    lesson.save()
        .then(createdLesson => {
            res.status(201).json({
                message: 'Lesson added successfully',
                lesson: {
                    ...createdLesson,
                    id: createdLesson._id
                }
            })

        }).catch(error => {
            res.status(500).json({
                message: "Creating a lesson failed!"
            })
        });
});


module.exports = router;

