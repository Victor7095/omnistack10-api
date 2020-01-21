const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes.js");

const app = express();

mongoose.connect("mongodb://localhost:27017/omni",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);