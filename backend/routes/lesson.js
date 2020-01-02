const express = require("express");

const LessonController = require("../controllers/lessons");

const router = express.Router();

router.get("", LessonController.getAllLessons);

router.post("", LessonController.createLesson);

router.get('/:id', LessonController.getALesson);

router.put('/:id', LessonController.updateLesson);

router.delete('/:id', LessonController.deleteLesson);
module.exports = router;

