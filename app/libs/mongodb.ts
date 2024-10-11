import mongoose from "mongoose";

function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    return mongoose.connect("mongodb://localhost:27017");
  }
}
export default connectToDatabase;
