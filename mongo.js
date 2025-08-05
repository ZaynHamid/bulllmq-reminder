const {Reminder} = require('./schema.js');


async function getReminder(email) {
  try {
    const result = await Reminder.find({ recipient: email }); 
    return result;
  } catch (err) {
    return { error: "Error fetching reminders", status: 500};
  }
}

async function createReminder(message, triggerTime, email) {
  try {
    const newReminder = new Reminder({
      message: message,
      trigger_time: triggerTime,
      recipient: email

    });
    const savedReminder = await newReminder.save();
    return { message: "Reminder created successfully", status: 201, data: savedReminder };
  } catch (err) {
    return { error: "Error creating reminder", status: 500}
  }
}

module.exports = { createReminder, getReminder };  