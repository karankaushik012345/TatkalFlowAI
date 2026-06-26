import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import PassengerProfile from '../models/PassengerProfile';

export const getPassengers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const passengers = await PassengerProfile.find({ userId: req.user?.id });
    res.json(passengers);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createPassenger = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, age, gender, berthPreference, idProofType, isSeniorCitizen } = req.body;
    
    if (!name || !age || !gender) {
      res.status(400).json({ message: 'Please provide all required fields' });
      return;
    }

    const passenger = await PassengerProfile.create({
      userId: req.user?.id,
      name,
      age,
      gender,
      berthPreference,
      idProofType,
      isSeniorCitizen
    });

    res.status(201).json(passenger);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePassenger = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const passenger = await PassengerProfile.findById(req.params.id);

    if (!passenger) {
      res.status(404).json({ message: 'Passenger not found' });
      return;
    }

    if (passenger.userId.toString() !== req.user?.id) {
      res.status(401).json({ message: 'User not authorized' });
      return;
    }

    const updatedPassenger = await PassengerProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedPassenger);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePassenger = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const passenger = await PassengerProfile.findById(req.params.id);

    if (!passenger) {
      res.status(404).json({ message: 'Passenger not found' });
      return;
    }

    if (passenger.userId.toString() !== req.user?.id) {
      res.status(401).json({ message: 'User not authorized' });
      return;
    }

    await passenger.deleteOne();
    res.json({ message: 'Passenger removed' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
