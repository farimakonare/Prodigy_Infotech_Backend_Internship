# PRODIGY_BW_02: User Management API with MongoDB

This is Task 2 of my backend web development internship with Prodigy Infotech.

In this project, I took the basic REST API I built in Task 1 and improved it by connecting it to a real database (MongoDB). That means the user data is now stored permanently instead of just in memory.

## What This Project Does

- Lets you **create**, **view**, **update**, and **delete** users
- Stores all user data in a **MongoDB database**
- Validates inputs like email format and required fields
- Uses **Express.js** for the API and **Mongoose** to interact with the database

## Tech Stack

- Node.js
- Express
- MongoDB (via Mongoose)
- dotenv for secure environment variable management

## User Format (Schema)

Each user entry includes:

```json
{
  "name": "string",
  "email": "string (must be a valid email)",
  "age": "number"
}
