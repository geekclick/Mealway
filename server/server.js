const http = require('http');
const app = require('./app');
const PORT = 5000;
const connectionDB = require("./utils/db");

connectionDB().then(() => {
    const server = http.createServer(app);
    server.listen(PORT, () => {
        console.log('listening on port', PORT);
    });
})