const express = require("express");
const router = express();

const path = require("path");

// router.use(express.static(__dirname + '/client/build'));
// router.use(express.static(__dirname + '/client/build/static'));

// router.use("../client/build", express.static(path.join(__dirname, '../client/build')));
// router.use("../client/build/static", express.static(path.join(__dirname, '../client/build/static')));

router.get("/", function(req, res) {
    res.sendFile((path.join(__dirname, '../client/build') + '/index.html'));
});

module.exports = router;