// Importing required modules
import mongoose from "mongoose";

// Defining a function to connect to the database
const connect = async () => {
  try {
    // Using async/await to connect to MongoDB
    const connection = await mongoose.connect(
      "mongodb+srv://samia:88P5qIczuHiN0rII@cluster0.1ca8qgr.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    // Logging a success message if the connection is successful
    console.log("Connected to MongoDB");

    // Returning the MongoDB connection object
    return connection;
  } catch (error) {
    // Logging an error message if the connection fails
    console.error("Failed to connect to MongoDB:", error);

    // Throwing the error to be handled elsewhere in the application
    throw error;
  }
};

// Exporting the connect function to be used in other parts of the application
export default connect;
