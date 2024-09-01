const { getAllDocuments, insertDocument, getDocumentbyId } =require('./Controller')

// Handle incoming HTTP requests
function handleRequest(req, res ,id) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
 
    if (req.method === 'GET' && req.url === '/') {
        getAllDocuments(req, res);
    } else if (req.method === 'POST' && req.url === '/add') {
        insertDocument(req, res);
    }else if(method === 'POST' && req.url==='/update/:id'){
     console.log("oioi")
        getDocumentbyId(req, res );
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
}

module.exports = { handleRequest };
