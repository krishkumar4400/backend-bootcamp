import mongoose from "mongoose";

const connectToDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo DB is connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectToDB;
