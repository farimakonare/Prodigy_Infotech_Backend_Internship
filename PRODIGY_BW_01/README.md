# PRODIGY_BW_01: Basic REST API with CRUD Operations

This is Task 1 of my backend web development internship with Prodigy Infotech.

In this task, I created a simple REST API using **Node.js** and **Express** that supports full CRUD operations on a user resource. Each user has a unique ID, name, email, and age.

## What This Project Does

- Adds a new user with POST `/users`
- Fetches all users with GET `/users`
- Fetches a specific user with GET `/users/:id`
- Updates a user with PUT `/users/:id`
- Deletes a user with DELETE `/users/:id`
- Performs email validation before adding or updating users
- Stores all user data in memory (using a JavaScript object)

## Technologies Used

- Node.js
- Express.js
- uuid (for unique IDs)
- validator (to check valid emails)

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install express uuid validator
