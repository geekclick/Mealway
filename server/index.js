const express = require('express');
const app = express();
const connectionDB = require("./utils/db");
const authRoute = require('./router/auth-router');
const cors = require('cors');

const corsoptions = {
  origin:'http://localhost:5173',
  methods:"GET,POST,PUT,DELETE,OPTIONS,PATCH",
  Credential:true,
}

app.use(cors(corsoptions))
app.use(express.json());
app.use("/api",authRoute);

const PORT = 5000;
connectionDB().then(()=>{
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
})