import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

//Note that need to run node server.js so that the mongoDB is running on system 
//Test API on Postman 
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for your frontend (replace the origin with your frontend URL)
// http://localhost:517
app.use(cors({ origin: 'http://localhost:5173' })); // Frontend URL
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hdb-resale-price');


// Define a schema and model for your data
const resaleSchema = new mongoose.Schema({
  month: String,
  town: String,
  flat_type: String,
  block: Number,
  street_name: String,
  storey_range: String,
  floor_area_sqm: Number,
  flat_model: String,
  lease_commence_date: Number,
  remaining_lease: String,
  resale_price: Number,
});

const Resale = mongoose.model('Resale', resaleSchema, 'hdb-resale-price');

// Define your API routes here
// For example, to retrieve all resale data:
// This route listens for GET requests to /api/resales and sends back all documents from the Resale model.
// GET url: http://localhost:3000/api/resales
app.get('/api/resales', async (req, res) => {
    try {
      // Get the search term from query parameters
      const searchTerm = req.query.search;
      // Modify the find query to search by a specific field, e.g., town
      const resales = searchTerm
        ? await Resale.find({ town: new RegExp(searchTerm, 'i') })
        : await Resale.find();
      res.json(resales);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// If you have other modules to export, use the export statement
// export { Resale, resaleSchema };

