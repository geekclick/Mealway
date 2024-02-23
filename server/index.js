const express = require('express');
const app = express();
const connectionDB = require("./utils/db");
const authRoute = require('./router/auth-router')

app.use(express.json());
app.use("/api",authRoute);

const PORT = 5000;
connectionDB().then(()=>{
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
})