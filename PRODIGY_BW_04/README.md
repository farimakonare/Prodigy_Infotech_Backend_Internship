# PRODIGY_BW_04: Caching with Redis

This is Task 4 of my backend web development internship with Prodigy Infotech.

In this task, I improved the performance of my REST API by integrating **Redis** caching. I focused on caching the response from frequently accessed endpoints like `GET /users` and implemented cache invalidation strategies to keep the data fresh.

## What This Project Does

- Speeds up API responses by caching user data using Redis
- Automatically clears (invalidates) the cache when users are created, updated, or deleted
- Sets a time limit on how long the cache should last
- Logs how long each request takes so performance improvements can be measured

## Why Use Caching?

Without caching:  
Every request goes directly to the database (slower, more expensive).

With caching:  
Redis stores the response temporarily, so repeated requests can be served instantly, no DB is needed.

## Technologies Used

- Node.js + Express
- MongoDB + Mongoose
- Redis
- dotenv (for environment config)

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
