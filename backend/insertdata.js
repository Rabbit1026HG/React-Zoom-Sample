const { default: mongoose } = require("mongoose");
const dbconnect = require("./config/db/dbconnect");
const Task = require("./models/TaskModel");
const Cannafield = require("./models/CannafieldModel");

async function main() {
  try {
    // Connect to the MongoDB cluster
    dbconnect();

    // Sample data to be inserted
    const initialData = [];
    for (let i = 0; i < 5000; i++) {
      const pieces = [];
      for (let j = 0; j < 9; j++) {
        pieces.push({
          id: j,
          isSelected: Math.random() > 0.8, // Rnadomly mark some blocks as solid
        });
      }
      initialData.push({
        num: i,
        pieces: pieces,
        isShow: false,
      });
    }

    // Insert the data
    const result = await Cannafield.insertMany(initialData);
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    // Close the connection
    await mongoose.connection.close();
  }
}

main().catch(console.error);
