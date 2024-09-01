const  connectToDatabase = require('./connectDB');
const Product=require('./schema')

// Controller to handle fetching all documents
async function getAllDocuments(req, res) {
    try {
        // const db = await connectToDatabase();
        // const collection = db.Product('productCollection');
        const documents = await Product.find();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(documents));
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}

// Controller to handle inserting a new document
async function insertDocument(req, res) {
    try {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString(); // Append chunk to body
        });

        req.on('end', async () => {
            try {
            
                const newDocument = JSON.parse(body); // Parse the body as JSON
                console.log(newDocument,";v")
                // Optional: Validate the newDocument before saving
                if (!newDocument.name || !newDocument.description) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Bad Request: Missing required fields');
                    return;
                }

                const product = new Product(newDocument); // Create a new Product instance
                console.log(product,"jk")
                      await product.save(); // Save the product to the database
                console.log(product,"save")
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify( product )); // Send the inserted ID as response
            } catch (parseError) {
                console.error('Error parsing JSON:', parseError);
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Bad Request: Invalid JSON');
            }
        });
    } catch (error) {
        console.error('Error inserting document:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}


// Controller to handle update
async function getDocumentbyId(req, res,id) {
    try {
const id=req.params.id
console.log(id,"id")
        const documents = await Product.find();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(documents));
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}
module.exports = { getAllDocuments, insertDocument ,getDocumentbyId};
