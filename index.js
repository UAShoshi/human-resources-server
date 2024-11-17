const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.BD_USER}:${process.env.BD_PASS}@cluster0.kckbgvo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const hrServicesCollection = client.db("humanResourcesBD").collection('hrServices');
    const reviewsCollection = client.db("humanResourcesBD").collection('reviews');
    const featuresCollection = client.db("humanResourcesBD").collection('features');
    const workEntriesCollection = client.db("humanResourcesBD").collection('workEntries');


    // hrServices releted apis
    app.get('/hrServices', async (req, res) => {
      const result = await hrServicesCollection.find().toArray();
      res.send(result);
    })


    // reviews releted apis
    app.get('/reviews', async (req, res) => {
      const result = await reviewsCollection.find().toArray();
      res.send(result);
    })


    // reviews releted apis
    app.get('/features', async (req, res) => {
      const result = await featuresCollection.find().toArray();
      res.send(result);
    })

    // workEntries releted apis
    app.get('/workEntries', async (req, res) => {
      const result = await workEntriesCollection.find().toArray();
      res.send(result);
    })

    app.post('/workEntries', async (req, res) => {
      const item = req.body;
      const result = await workEntriesCollection.insertOne(item);
      res.send(result);
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('human resources!')
})

app.listen(port, () => {
  console.log(`human resources on port ${port}`)
})