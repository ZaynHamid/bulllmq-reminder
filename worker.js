const { Worker } = require('bullmq');
const { Redis } = require('ioredis');
const {sendEmail} = require('./email');

const connection = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null
});

const reminderWorker = new Worker(
  'reminders',
  async job => {
    const { to, message } = job.data;
    console.log(`Processing reminder for ${to}: ${message}`);
    try {
        await sendEmail({
      from: "",
      to,
      subject: 'Reminder',
      text: message,
      html: `<p>${message}</p>`
    });
    console.log(`Email sent to ${to} successfully.`);

    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send reminder email');
    }
  
},
  { connection }
);