const { Router } = require("express");

const routes = Router();

app.get("/", (req, res)=> {
    return res.json({
        "message":"Hello wrlda"
    });
});

app.get("/", (req, res)=> {
    return res.json({
        "message":"Hello wrlda"
    });
});

app.post("/", (req, res)=> {
    return res.json({
        "message":"Hello wrlda"
    });
});

module.exports = routes;