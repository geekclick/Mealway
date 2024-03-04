const express = require('express');
const app = express();
const connectionDB = require("./utils/db");
const authRoute = require('./router/auth-router');
const vandorRoute = require('./router/vendor-route');
const cors = require('cors');

const corsoptions = {
  origin: 'https://mealway-frontend-53rg2b43x-geekclicks-projects.vercel.app',
  methods: "GET,POST,PUT,DELETE,OPTIONS,PATCH",
  Credential: true,
}

app.use(cors(corsoptions))
app.use(express.json());
app.use("/api", authRoute);
app.use("/api", vandorRoute);
