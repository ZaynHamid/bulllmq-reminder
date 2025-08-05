const express = require('express');
const { createReminder, getReminder } = require('./mongo.js');
const { addReminder } = require("./queue.js")


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/create-reminder', async (req, res) => {
    const { message, trigger_time, recipient } = req.body;
    if (!message || !trigger_time || !recipient) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;
    if (!iso8601Regex.test(trigger_time)) {
        return res.status(400).json({ error: "trigger_time must be in UTC ISO 8601 format (e.g., 2025-07-18T03:43:00.000Z)" });
    }

    const delayInMs = new Date(trigger_time) - new Date();
    if (delayInMs <= 0) {
        return res.status(400).json({ error: "Trigger time must be in the future" });
    }
    const reminderData = {
        to: recipient,
        message: message,
    }
    const reminder = await createReminder(message, trigger_time, recipient);
    if (reminder.error) {
        return res.status(500).json(reminder);
    }
    await addReminder(reminderData, delayInMs);
    res.status(201).json(reminder);
});

app.post("/get-reminder", async (req, res) => {
    const { recipient } = req.body;
    if (!recipient) {
        return res.status(400).json({ error: "Recipient is required" });
    }
    const reminder = await getReminder(recipient);

    if (!reminder || reminder.error) {
        return res.status(404).json({ error: "No reminders found for this recipient" });
    }
    
    res.send(reminder);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});