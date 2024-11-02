const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const { Workbook } = require("exceljs");

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
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

connectToMongoDB();
app.use(cors());
app.use(express.json());

app.get("/get-moderation", async (req, res) => {
  try {
    const database = client.db("project_work_dashboard");
    const collection = database.collection("moderation_table");
    const data = await collection.find({}).toArray();
    return res.status(200).send(data);
  } catch (error) {
    console.error("Error retrieving data", error);
    res.status(500).send("Error retrieving data");
  }
});

app.get("/get-moderation-mark", async (req, res) => {
  try {
    const batch = req.query.batch;
    const database = client.db("project_work_dashboard");
    const collection = database.collection("student_mark_table");
    let data = await collection.find({}).toArray();
    data = data.filter(
      (item) => item.moderation === true && item.batch === batch
    );
    return res.status(200).send(data);
  } catch (error) {
    console.error("Error retrieving data", error);
    res.status(500).send("Error retrieving data");
  }
});

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
  const database = client.db("project_work_dashboard");
  const studentMarkCollection = database.collection("student_mark_table");
  const moderationCollection = database.collection("moderation_table");
  const studentData = req.body;
  const moderationCount = studentData.reduce((count, item) => {
    return count + (item.moderation ? 1 : 0);
  }, 0);
  const now = new Date();
  const moderation = [
    {
      semester: studentData[0].semester,
      batch: studentData[0].batch,
      guide_mark: studentData[0].guide_total_mark,
      pmc_mark: studentData[0].pmc_total_mark,
      date: `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`,
      uploaded_mark: studentData[0].mark_detail,
      uploaded_project_detail: studentData[0].project_detail,
      excel_accepted: "Yes",
      no_of_moderation: moderationCount,
      status: moderationCount > 0 ? "Not completed" : "Completed",
      final_report_generated: moderationCount > 0 ? "No" : "Yes",
    },
  ];
  try {
    await studentMarkCollection
      .insertMany(studentData)
      .then(() => console.log("success"))
      .catch((error) => console.log(error));
    await moderationCollection
      .insertMany(moderation)
      .then(() => console.log("success"))
      .catch((error) => console.log(error));
    return res.status(201).json({
      message: "Data inserted successfully",
    });
  } catch {
    return res.status(500).json({ message: "Data is invalid" });
  }
});

app.post("/averageEntry", async (req, res) => {
  const database = client.db("project_work_dashboard");
  const studentMarkCollection = database.collection("student_mark_table");
  const moderationCollection = database.collection("moderation_table");
  data = req.body;
  batchName = data[0].batch;
  try {
    for (const item of data) {
      const { roll_no, average, guide_total_mark, semester } = item;
      const existingDoc = await studentMarkCollection.findOne({
        roll_no: roll_no,
        semester: semester,
      });
      if (!existingDoc) {
        console.log(`No document found with _id: ${_id}`);
      } else {
        await studentMarkCollection
          .updateOne(
            { roll_no: roll_no, semester: semester },
            { $set: { average: average, total: average + guide_total_mark } }
          )
          .then(() => console.log("done"))
          .catch((error) => console.log("1", error.message));
      }
    }
    await moderationCollection
      .updateMany(
        { batch: batchName },
        { $set: { status: "Completed", final_report_generated: "Yes" } }
      )
      .catch((error) => console.log("1", error));

    return res.status(201).json({
      message: "Data inserted successfully",
    });
  } catch {
    return res.status(500).json({ message: "Data is invalid" });
  }
});

app.get("/get-student-marks", async (req, res) => {
  const database = client.db("project_work_dashboard");
  try {
    const studentMarkCollection = database.collection("student_mark_table");
    let data = await studentMarkCollection.find({}).toArray();
    return res.status(201).send(data);
  } catch {
    return res.status(500).send("Error retrieving data");
  }
});

app.get("/get-batch-marks", async (req, res) => {
  try {
    const batch = req.query.batch;
    const semester = req.query.semester;
    const workbook = new Workbook();
    const worksheetName = `${batch}-${semester}`;
    const worksheet = workbook.addWorksheet(worksheetName);
    const database = client.db("project_work_dashboard");
    const collection = database.collection("student_mark_table");
    let data = await collection.find({}).toArray();
    data = data.filter((item) => {
      return item.semester === parseInt(semester) && item.batch === batch;
    });
    const keys = Object.keys(data[0]).filter((key) => key !== "_id");
    worksheet.columns = keys.map((key) => ({
      header: key.charAt(0).toUpperCase() + key.slice(1),
      key: key,
      width: 20,
    }));

    data.forEach((item) => {
      worksheet.addRow(item);
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=marks.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error retrieving data", error);
    res.status(500).send("Error retrieving data");
  }
});

app.get("/get-marks-sheet", async (req, res) => {
  try {
    const batch = req.query.batch;
    const semester = req.query.semester;
    const workbook = new Workbook();
    const worksheetName = `${batch}-${semester}-mark-sheet`;
    const worksheet = workbook.addWorksheet(worksheetName);
    const database = client.db("project_work_dashboard");
    const collection = database.collection("student_mark_table");

    let data = await collection.find({}).toArray();

    data = data.filter((item) => {
      return item.semester === parseInt(semester) && item.batch === batch;
    });

    const keysToInclude = [
      "roll_no",
      "std_name",
      "guide_mark",
      "PMC1_mark",
      "PMC2_mark",
      "PMC3_mark",
    ];

    worksheet.columns = keysToInclude.map((key) => ({
      header: key.charAt(0).toUpperCase() + key.slice(1),
      key: key,
      width: 20,
    }));

    data.forEach((item) => {
      const filteredItem = keysToInclude.reduce((obj, key) => {
        obj[key] = item[key];
        return obj;
      }, {});
      worksheet.addRow(filteredItem);
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${worksheetName}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error retrieving data", error);
    res.status(500).send("Error retrieving data");
  }
});

app.get("/get-project-details", async (req, res) => {
  try {
    const batch = req.query.batch;
    const semester = req.query.semester;
    const workbook = new Workbook();
    const worksheetName = `${batch}-${semester}-project-details`;
    const worksheet = workbook.addWorksheet(worksheetName);
    const database = client.db("project_work_dashboard");
    const collection = database.collection("student_mark_table");

    let data = await collection.find({}).toArray();

    data = data.filter((item) => {
      return item.semester === parseInt(semester) && item.batch === batch;
    });

    const keysToInclude = [
      "roll_no",
      "std_name",
      "guide_id",
      "dept_name",
      "project_name",
    ];

    worksheet.columns = keysToInclude.map((key) => ({
      header: key.charAt(0).toUpperCase() + key.slice(1),
      key: key,
      width: 20,
    }));

    data.forEach((item) => {
      const filteredItem = keysToInclude.reduce((obj, key) => {
        obj[key] = item[key];
        return obj;
      }, {});
      worksheet.addRow(filteredItem);
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${worksheetName}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error retrieving data", error);
    res.status(500).send("Error retrieving data");
  }
});

app.get("/get-student-details", async (req, res) => {
  try {
    const roll_no = req.query.roll_no;
    const database = client.db("project_work_dashboard");
    const collection = database.collection("student_mark_table");
    let data = await collection.find({}).toArray();
    data = data.filter((item) => {
      return item.roll_no === roll_no;
    });
    res.status(200).send(data);
  } catch (error) {
    console.error("Error retrieving data", error);
    res.status(500).send("Error retrieving data");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
