// Import the Express module
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();

const PORT = 3001;
uri = "mongodb://localhost:27017/project_work_portal";
let client;

async function connectToMongoDB() {
  try {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

connectToMongoDB();
app.use(cors());
app.use(express.json());

// app.get('/', async(req, res) => {
//     try {

//       } catch (error) {
//         console.error('Error retrieving data', error);
//         res.status(500).send('Error retrieving data');
//       }
// });

app.post("/login", async (req, res) => {
  const database = client.db("project_work_dashboard"); // Replace with your database name
  const collection = database.collection("user_table"); // Replace with your collection name
  const data = await collection.find({}).toArray();
  const doesMatchExist = (input, array) => {
    return array.some(
      (obj) =>
        obj.role === input.role &&
        obj.username === input.username &&
        obj.password === input.password
    );
  };
  const matchFound = doesMatchExist(req.body, data);
  if (matchFound) return res.status(200).send("Success");

  return res.status(500).send("Incorrect details");
});

app.post("/formEntry", async (req, res) => {
  const database = client.db("project_work_dashboard"); // Replace with your database name
  const collection = database.collection("student_mark_table");
  const studentData = req.body;
  try {
    const result = await collection.insertMany(studentData);
    return res.status(201).json({
      message: "Data inserted successfully",
      insertedCount: result.insertedCount,
    });
  } catch {
    return res.status(500).json({ message: "Data is invalid" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
