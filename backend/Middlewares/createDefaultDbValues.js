const Lesson = require("../models/lesson");
const User = require("../models/user");


// Create Deault Admin User
module.exports = (res, req, next) => {
    User.countDocuments(function (err, count) {
        if (!err && count === 0) {
            const admin = new User({
                name: 'Testy McTest',
                password: '12345',
                permission: 'Admin',
                email: 'test@test.com',
                phone: '052-5555555'
            });
            console.log(admin);

            admin.save()
                .then(result => {
                    console.log('Default Administrator Value was created');
                }).catch(err => {
                    console.error(err);
                });
        }
    });
    next();
}

// Create Deault Lessons 
module.exports = (res, req, next) => {
    Lesson.countDocuments(function (err, count) {
        if (!err && count === 0) {
            const lessonOne = new Lesson({
                title: 'lessonOne',
                content: 'this is just a filler',
                program: '.NET',
                startDate: '2.3.2021',
                endDate: '2.3.2022',
                location: 'Tel Aviv',
                hoursStart: '15:20',
                hoursEnd: '16:00',
                price: 1500,
                numberOfSessions: 20
            });
            lessonOne.save()
                .then(result => {
                    console.log('Default Lesson Value was created');
                }).catch(err => {
                    console.error(err);
                });

            const lessoneTwo = new Lesson({
                title: 'lessoneTwo',
                content: 'this is just a filler for Lesson Two',
                program: 'Javascript',
                startDate: '2.3.2021',
                endDate: '2.3.2022',
                location: 'Tel Aviv',
                hoursStart: '15:20',
                hoursEnd: '16:00',
                price: 2500,
                numberOfSessions: 13
            })
            lessoneTwo.save()
                .then(result => {
                    console.log('Default Lesson Value was created');
                }).catch(err => {
                    console.error(err);
                });

        }
    });

    next();
};
