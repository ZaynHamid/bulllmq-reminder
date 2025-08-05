const { Queue } = require('bullmq');
const { Redis } = require('ioredis');

const connection = new Redis(process.env.REDIS_URL);

const reminderQueue = new Queue('reminders', { connection });

async function addReminder(reminderData, delayInMs) {
  await reminderQueue.add('send-reminder', reminderData, {
    delay: delayInMs, 
    attempts: 3,      
  });

  console.log('Reminder scheduled:', reminderData);
}

module.exports = {
  addReminder,
};