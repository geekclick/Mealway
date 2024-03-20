const express = require('express');
const app = express();
const authRoute = require('./router/auth-router');
const vandorRoute = require('./router/vendor-route');
const foodRoute = require('./router/food-route');
const adminRoute = require('./router/admin-route');
const cors = require('cors');
const performBothActions = require('./middleware/performBothAction');

const corsoptions = {
    origin: 'http://localhost:5173/',
    methods: "GET,POST,PUT,DELETE,OPTIONS,PATCH",
    Credential: true,
}

app.use(cors(corsoptions))
app.use(express.json());
app.use('/addMenu',performBothActions);
app.use("/api", authRoute);
app.use("/api", vandorRoute);
app.use("/api", foodRoute);
app.use("/api/admin", adminRoute);

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // Parse JSON request bodies


module.exports = app;