import express from 'express';
import { createOrder, verifyPayment } from '../controllers/subscriptionController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/create-order', protect, createOrder);
router.post('/verify', protect, verifyPayment);

export default router;
