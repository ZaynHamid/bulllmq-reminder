📬 Reminder Scheduler API
A Node.js/Express-based REST API that allows users to schedule email reminders to be sent at a future time using BullMQ and Redis. This project uses MongoDB to persist reminders and integrates Nodemailer for email delivery.

🚀 Features
Schedule email reminders for future delivery

Validates ISO 8601 UTC datetime input

Persists reminder data in MongoDB

Uses BullMQ for background job processing

Sends reminder emails via SMTP (Nodemailer)

Built-in delay mechanism using Redis queues

📦 Tech Stack
Backend: Node.js, Express.js

Database: MongoDB (Mongoose)

Queue: BullMQ, Redis

Email: Nodemailer

Job Worker: BullMQ Worker
