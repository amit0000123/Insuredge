import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "insuredge_super_secure_secret_key_2026";

app.use(cors());
app.use(express.json());

// -------------------------------------------------------------
// DATABASE SCHEMAS & CONNECTOR REFERENCE TEMPLATES (Prisma / Mongoose)
// -------------------------------------------------------------

/*
=== MONGODB MONGOOSE SCHEMA MODEL TEMPLATE ===
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  googleId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const AppointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  topic: { type: String, required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' }
});

export const User = mongoose.model('User', UserSchema);
export const Appointment = mongoose.model('Appointment', AppointmentSchema);
*/

/*
=== POSTGRESQL PRISMA SCHEMA DEFINITION TEMPLATE ===
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           String        @id @default(uuid())
  email        String        @unique
  password     String
  name         String
  googleId     String?
  createdAt    DateTime      @default(now())
  appointments Appointment[]
}

model Appointment {
  id          String   @id @default(uuid())
  userId      String?
  user        User?    @relation(fields: [userId], references: [id])
  name        String
  email       String
  phone       String
  topic       String
  date        DateTime
  timeSlot    String
  description String?
  status      String   @default("scheduled")
}
*/

// -------------------------------------------------------------
// MIDDLEWARES
// -------------------------------------------------------------

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }
      req.user = decoded as { id: string; email: string };
      next();
    });
  } else {
    res.status(401).json({ error: "Authorization token required" });
  }
};

// -------------------------------------------------------------
// API ENDPOINTS
// -------------------------------------------------------------

// Health check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "healthy", timestamp: new Date() });
});

// Authentication endpoints
app.post("/api/auth/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // TODO: Add hash password (bcrypt) and store to database
  const token = jwt.sign({ id: "mock_user_id", email }, JWT_SECRET, { expiresIn: "7d" });
  
  res.status(201).json({
    message: "Registration successful",
    token,
    user: { id: "mock_user_id", name, email }
  });
});

app.post("/api/auth/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // TODO: Validate user credentials from database
  const token = jwt.sign({ id: "mock_user_id", email }, JWT_SECRET, { expiresIn: "7d" });

  res.json({
    message: "Login successful",
    token,
    user: { id: "mock_user_id", name: "John Doe", email }
  });
});

// OAuth Template Placeholder
app.post("/api/auth/google", async (req: Request, res: Response) => {
  const { credential } = req.body; // Google JWT credential token
  if (!credential) {
    return res.status(400).json({ error: "Google credentials required" });
  }

  // TODO: Verify token via google-auth-library
  // const ticket = await client.verifyIdToken({ idToken: credential, audience: CLIENT_ID });
  // const payload = ticket.getPayload();
  
  const token = jwt.sign({ id: "oauth_user_id", email: "oauth@gmail.com" }, JWT_SECRET, { expiresIn: "7d" });
  
  res.json({
    message: "Google OAuth successful",
    token,
    user: { id: "oauth_user_id", name: "Google User", email: "oauth@gmail.com" }
  });
});

// Appointment booking endpoints
app.post("/api/appointments", async (req: Request, res: Response) => {
  const { name, email, phone, topic, date, timeSlot, description } = req.body;

  if (!name || !email || !phone || !topic || !date || !timeSlot) {
    return res.status(400).json({ error: "Missing required booking details" });
  }

  // TODO: Save to database
  res.status(201).json({
    message: "Appointment booked successfully",
    appointment: {
      id: "mock_appt_id_" + Math.random().toString(36).substr(2, 9),
      name,
      email,
      phone,
      topic,
      date,
      timeSlot,
      description,
      status: "scheduled"
    }
  });
});

app.get("/api/appointments", authenticateJWT, async (req: AuthenticatedRequest, res: Response) => {
  // TODO: Query appointments matching req.user.id
  res.json({
    appointments: [
      {
        id: "mock_appt_id_1",
        userId: req.user?.id,
        name: "John Doe",
        topic: "term",
        date: "2026-06-25",
        timeSlot: "10:00 AM – 10:30 AM",
        status: "scheduled"
      }
    ]
  });
});

// Contact message submissions
app.post("/api/contacts", async (req: Request, res: Response) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "Missing required contact details" });
  }

  // TODO: Save to database or dispatch notification email
  res.status(201).json({
    message: "Contact message received successfully",
  });
});

// Newsletter Subscription
app.post("/api/newsletter/subscribe", async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // TODO: Register subscriber email to list
  res.status(201).json({
    message: "Subscribed to InsurEdge newsletter successfully",
  });
});

// -------------------------------------------------------------
// SERVER INITIATION
// -------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`[InsurEdge Server] Running on http://localhost:${PORT}`);
});
