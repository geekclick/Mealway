const express = require('express');
const app = express();
const authRoute = require('./router/auth-router');
const vandorRoute = require('./router/vendor-route');
const foodRoute = require('./router/food-route');
const cors = require('cors');

const corsoptions = {
    origin: 'http://localhost:5173/',
    methods: "GET,POST,PUT,DELETE,OPTIONS,PATCH",
    Credential: true,
}

app.use(cors(corsoptions))
app.use(express.json());
app.use("/api", authRoute);
app.use("/api", vandorRoute);
app.use("/api", foodRoute);

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Parse JSON request bodies



module.exports = app;