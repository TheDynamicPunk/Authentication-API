const router = require('express').Router();
const verified = require('../routes/verifyToken');

router.get('/', verified, (req, res) => {
    res.json({
        title: "Getting my feet with backend services!",
        content: "This is my first attempt at making a fully functional API having authentication with jwt tokens!"
    });
});

module.exports = router;