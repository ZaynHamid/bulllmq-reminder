const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.error("MongoDB connection error:", err));

const reminderSchema = new mongoose.Schema({
    message: String,
    trigger_time: Date,
    recipient: String
});

const Reminder = mongoose.model("Reminder", reminderSchema, "reminders"); 

module.exports = { Reminder };
