# PRODIGY_BW_03: JWT Authentication & Role-Based Access

This is Task 3 of my backend web development internship with Prodigy Infotech.

In this project, I implemented user authentication and authorization using **JSON Web Tokens (JWT)**. Users can register, log in, and access protected routes. Admin users have access to restricted endpoints.

## What This API Can Do

- Register users and hash their passwords securely using **bcrypt**
- Log users in and return a signed **JWT token**
- Protect routes using a **middleware**
- Support **role-based access** (admin/user) to control what each user can do

## User Schema

```json
{
  "name": "String (required)",
  "email": "String (required, unique)",
  "password": "String (required)",
  "role": "String (default: 'user')"
}
