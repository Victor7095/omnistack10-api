const { Router } = require("express");
const axios = require("axios");
const Dev = require("./models/Dev");

const routes = Router();

routes.get("/", (req, res)=> {
    return res.json({
        "message":"Hello wrlda"
    });
});

routes.get("/s", (req, res)=> {
    return res.json({
        "message":"Hello wrlda"
    });
});

routes.post("/devs", async (req, res)=> {
    const { github_username, techs, latitude, longitude } = req.body;

    const apiResponse = await axios.get(`https://api.github/users/${github_username}`);

    const { name = login, avatar_url, bio } = apiResponse.data;

    const techsArray = techs.split(",").map(tech => tech.trim());

    const location = { 
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    const dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
    });

    return res.json(dev);
});

module.exports = routes;