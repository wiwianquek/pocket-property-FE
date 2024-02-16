import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI; // The connection string should be stored in an environment variable


// Enable CORS for your frontend
const allowedOrigins = [
  'https://hdb-resale-calculator-qpyc-e5ssnasmg-vivians-projects-8085f5fc.vercel.app',
  'http://localhost:5173', // Add other origins as needed
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}));

// Enable CORS for your frontend (replace the origin with your frontend URL)
// http://localhost:5173
app.use(cors({ origin: 'http://localhost:5173' })); // Frontend URL
app.use(express.json());


// Create a new MongoClient
const client = new MongoClient(mongoUri, {
  serverApi: ServerApiVersion.v1
});

let db;

// Connect to MongoDB
client.connect().then(client => {
  db = client.db(); // Assuming you want to use the default database in the connection string
  console.log("Connected correctly to MongoDB Atlas");
}).catch(err => {
  console.error("Connection to MongoDB Atlas failed!", err);
  process.exit(1);
});

// Define a schema and model for your data using the native MongoDB driver
const resaleSchema = {
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
};

// Assume 'Resale' is a collection in your MongoDB Atlas
// Define your API routes here
app.get('/api/resales', async (req, res) => {
    try {
      const searchTerm = req.query.search;
      const collection = db.collection('hdb-resale-price');
      const query = searchTerm ? { town: new RegExp(searchTerm, 'i') } : {};
      const resales = await collection.find(query).toArray();
      res.json(resales);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', details: error });
    }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Close the MongoDB connection when the Node.js process ends
process.on('SIGINT', () => {
  client.close().then(() => {
    console.log('MongoDB disconnected on app termination');
    process.exit(0);
  });
});

