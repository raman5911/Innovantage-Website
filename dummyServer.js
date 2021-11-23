const express = require("express");
const app = express();

const file = require("./dummyData");

app.get("/", (req, res)=> {
    console.log("Home");
    res.json(file.dummyData);
});

app.get("/:page", (req, res) => {

    var page = req.params.page;

    var startIndex = (page-1) * 10;
    var endIndex = page * 10;

    var result = file.dummyData.slice(startIndex, endIndex);

    console.log(result);

    res.send(result);

});

app.listen(1000, ()=> console.log("Running Dummy Server on 1000"));