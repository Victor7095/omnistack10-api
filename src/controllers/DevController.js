const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");

module.exports = {
    async index(req,res) {
        const devs = await Dev.find();
        return res.json(devs);
    },
    async show(req,res) {
        const devs = await Dev.find();
        return res.json(devs);
    },
    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if(dev) return res.json({message:"Dev já cadastrado!"});

        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

        const { name = login, avatar_url, bio } = apiResponse.data;

        const techsArray = parseStringAsArray(techs);

        const location = { 
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
        });
        
        const coordinates = { latitude, longitude };
        const sendSocketMessageTo = findConnections(coordinates, techsArray);
        sendMessage(sendSocketMessageTo, "new-dev", dev);

        return res.json(dev);
    },
    async update(req,res) {
        const { _id, name, techs } = req.body;
        
        const conditions = { _id };
        const techsArray = parseStringAsArray(techs);
        const update = { name, techs: techsArray };

        const dev = await Dev.findOneAndUpdate( conditions, update, {
            new: true
        });
        
        return res.json(dev);
    },
    async destroy(req,res) {
        const { _id } = req.body;
        const count = await Dev.deleteOne({_id});
        return res.json(count);
    }
};