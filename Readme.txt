# Express.js Authentication with MongoDB, Sessions, Access/Refresh Tokens

A Build a secure authentication system using **Express.js**, **MongoDB**, **JWT**, **Access & Refresh Tokens**, and **Session Management**.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Access Token & Refresh Token)
- bcryptjs
- express-session
- cookie-parser
- dotenv

---

# Setup Instructions

## 1. Clone the Repository

```bash
git clone <repository-url>
cd project-name
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Create a `.env` File

```env
PORT=3009

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_access_token_secret

JWT_REFRESH_SECRET=your_refresh_token_secret

SESSION_SECRET=your_session_secret
```

## 4. Start the Server

Development Mode

```bash
npm run dev
```

Production Mode

```bash
npm start
```

Server will run on

```
http://localhost:3009
```

---

# Authentication Flow

## Registration

1. User sends registration details.
2. Password is hashed using **bcrypt**.
3. User is stored in MongoDB.

---

## Login

1. User submits email and password.
2. Password is verified.
3. Server generates:
   - Access Token
   - Refresh Token
4. Access Token is returned to the client.
5. Refresh Token is stored securely.

---

## Protected Routes

1. Client sends Access Token in the Authorization header.

```
Authorization: Bearer <access_token>
```

2. Authentication middleware verifies the token.

3. If valid, the request proceeds.

4. If expired, a Refresh Token can be used to generate a new Access Token.

---

## Role-Based Authorization

### Admin

- Create Product
- View Products
- Update Product
- Delete Product
- Assign roles

### User

- Create Product
- View Products

Users cannot update or delete products.

---

# API Routes

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/register` | Register User |
| POST | `/api/login` | Login User |
| GET | `/api/dashboard` | Protected Dashboard |
| POST | `/api/refresh-token` | Generate New Access Token |
| POST | `/api/logout` | Logout User |
| POST | `/assign-role` | Assign User Role (Admin Only) |

---

## Products

| Method | Endpoint | Access |
|---------|----------|--------|
| POST | `/api/product` | Admin, User |
| GET | `/api/products` | Admin, User |
| PUT | `/api/product/:id` | Admin Only |
| DELETE | `/api/product/:id` | Admin Only |

---

# User Roles

| Feature | Admin | User |
|----------|:-----:|:----:|
| Create Product | ✅ | ✅ |
| View Products | ✅ | ✅ |
| Update Product | ✅ | ❌ |
| Delete Product | ✅ | ❌ |
| Assign Roles | ✅ | ❌ |

---

# Required Packages

```bash
npm install express mongoose bcryptjs jsonwebtoken dotenv express-session cookie-parser cors connect-flash
```

For development:

```bash
npm install --save-dev nodemon
```

---

# Author

**MD MOIN REHAN**

Node.js | Express.js | MongoDB | JWT Authentication