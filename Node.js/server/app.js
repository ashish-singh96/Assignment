
const http = require('http');
const { handleRequest } = require('./routes');
const  connectToDatabase  = require('./connectDB');
const fileUpload=require('express-fileupload')

const PORT = 3000;
connectToDatabase()
const server = http.createServer(handleRequest);



// server.use(handleRequest)
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
