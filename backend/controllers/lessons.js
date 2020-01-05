const Lesson = require("../models/lesson");

exports.getAllLessons = (req, res, next) => {
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
}
exports.createLesson = (req, res, next) => {
    const lesson = new Lesson({
        title: req.body.title,
        content: req.body.content,
        program: req.body.program,
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
                    lessonId: createdLesson._id
                }
            })
            console.log(lesson);

        }).catch(error => {
            res.status(500).json({
                message: "Creating a lesson failed!"
            })
        });
};

exports.getALesson = (req, res, next) => {
    Lesson.findById(req.params.id)
        .then(lesson => {
            if (lesson) {
                res.status(200).json(lesson);

            } else {
                res.status(404).json({ message: "Lesson not found!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching lesson failed!"
            });
        });
};

exports.updateLesson = (req, res, next) => {
    const lesson = new Lesson({
        _id: req.body.id,
        title: req.body.title,
        program: req.body.program,
        content: req.body.content,
        location: req.body.location,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        hoursStart: req.body.hoursStart,
        hoursEnd: req.body.hoursEnd,
        price: req.body.price,
        numberOfSessions: req.body.numberOfSessions,
    });
    Lesson.updateOne({ _id: req.params.id }, lesson)
        .then(result => {
            res.status(200).json({ message: 'Update successful!' })

        }).catch(error => {
            res.status(500).json({
                message: "Update lesson failed!"
            });
        });
};

exports.deleteLesson = (req, res, next) => {
    Lesson.deleteOne({ _id: req.params.id })
        .then(result => {
            if (result.n > 0) {
                res.status(200).json({ message: "Deletion successful!" });
            } else {
                res.status(401).json({ message: "Not authorized!" });
            }
        }).catch(error => {
            console.log(error);

            res.status(500).json({
                message: "Deleting Lesson failed!"
            });
        });
};