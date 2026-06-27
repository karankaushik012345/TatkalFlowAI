import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import passengerRoutes from './routes/passengerRoutes';
import templateRoutes from './routes/templateRoutes';
import subscriptionRoutes from './routes/subscriptionRoutes';

dotenv.config();

const app: Application = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/passengers', passengerRoutes);
app.use('/api/v1/templates', templateRoutes);
app.use('/api/v1/subscriptions', subscriptionRoutes);

// Basic health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'TatkalFlow AI Backend running securely.' });
});

export default app;
