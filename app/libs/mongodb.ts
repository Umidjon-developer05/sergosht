import mongoose from "mongoose";

function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    return mongoose.connect(
      "mongodb+srv://Umidjon:Umidjon2005@cluster0.ddjwi.mongodb.net/sergosht-bot"
    );
  }
}
export default connectToDatabase;
