Reminder Service
================

Schedules and delivers email reminders at precise times using Node.js.\
Combines Express, MongoDB, Redis (BullMQ), and Nodemailer for reliable scheduling and delivery.

* * * * *

Features
--------

-   Schedule future-dated reminders via API

-   Automatic email delivery at scheduled times

-   MongoDB storage + Redis queue management

-   Input validation for timestamps and emails

-   Retry mechanism (3 email attempts)

* * * * *

API Endpoints
-------------

### Create Reminder

**POST** `/create-reminder`

**Body Parameters (JSON):**

-   `message` *(string)* -- Reminder content

-   `trigger_time` *(string, ISO 8601 UTC)* -- Time to send the email

-   `recipient` *(string, valid email)* -- Recipient's email address

**Validation Rules:**

-   `trigger_time` must be in the future

-   `recipient` must be a valid email address

* * * * *

### Get Reminders

**POST** `/get-reminder`

**Body Parameters (JSON):**

-   `recipient` *(string)* -- Email address

**Returns:**\
A list of scheduled reminders for the provided recipient

* * * * *

Setup
-----

1.  **Install Dependencies**
    `npm install express mongoose bullmq nodemailer dotenv`

2.  **Create `.env` File**

    `HOST=smtp.yourprovider.com
    PORT=465
    SMTP_USER=your_username
    SMTP_PASSWORD=your_password
    SMTP_FROM=no-reply@yourdomain.com
    MONGODB_URI=your_mongodb_connection_string
    REDIS_URL=your_redis_connection_url`

4.  **Run Services**

    -   Start the API server:

        `npm start`

    -   Start the reminder worker:

        `node worker.js`

* * * * *

System Flow
-----------

1.  API receives reminder‐creation request

2.  Validates input and stores data in MongoDB

3.  Queues job in Redis using BullMQ with a delay

4.  Worker picks up the job at `trigger_time`

5.  Sends email via Nodemailer

6.  Retries up to 3 times if sending fails

* * * * *

Tech Stack
----------

-   **Express** -- REST API

-   **Mongoose** -- MongoDB ODM

-   **BullMQ** -- Redis-based job queues

-   **Nodemailer** -- Email delivery

-   **Dotenv** -- Environment configuration
