import mongoose from "mongoose";

async function connectDB() {
    await mongoose.connect("mongodb+srv://raktimabho112000:LcLPX6lmP9Y9chzj@cluster0.dhuaz.mongodb.net/devTinder?retryWrites=true&w=majority&appName=Cluster0")
}

export default connectDB;