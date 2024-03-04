const http = require('http');
const app = require('./app');
const PORT = 3000;

connectionDB().then(() => {
    const server = http.createServer(app);
    server.listen(PORT, () => {
        console.log('listening on port', PORT);
    });
})