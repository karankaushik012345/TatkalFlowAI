import express from 'express';
import { getPassengers, createPassenger, updatePassenger, deletePassenger } from '../controllers/passengerController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .get(protect, getPassengers)
  .post(protect, createPassenger);

router.route('/:id')
  .put(protect, updatePassenger)
  .delete(protect, deletePassenger);

export default router;
