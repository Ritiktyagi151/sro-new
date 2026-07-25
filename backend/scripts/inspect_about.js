const mongoose = require("mongoose");
const AboutUs = require("../models/AboutUs");
require("dotenv").config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    const about = await AboutUs.findOne();
    console.log("About document inside DB:");
    console.log(JSON.stringify(about, null, 2));
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
