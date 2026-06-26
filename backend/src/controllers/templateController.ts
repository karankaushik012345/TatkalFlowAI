import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import JourneyTemplate from '../models/JourneyTemplate';

export const getTemplates = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const templates = await JourneyTemplate.find({ userId: req.user?.id }).populate('passengerIds');
    res.json(templates);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createTemplate = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { source, destination, travelClass, quota, passengerIds, trainNumber } = req.body;
    
    if (!source || !destination || !travelClass) {
      res.status(400).json({ message: 'Please provide all required fields' });
      return;
    }

    const template = await JourneyTemplate.create({
      userId: req.user?.id,
      source,
      destination,
      travelClass,
      quota,
      passengerIds,
      trainNumber
    });

    res.status(201).json(template);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTemplate = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const template = await JourneyTemplate.findById(req.params.id);

    if (!template) {
      res.status(404).json({ message: 'Template not found' });
      return;
    }

    if (template.userId.toString() !== req.user?.id) {
      res.status(401).json({ message: 'User not authorized' });
      return;
    }

    const updatedTemplate = await JourneyTemplate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedTemplate);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTemplate = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const template = await JourneyTemplate.findById(req.params.id);

    if (!template) {
      res.status(404).json({ message: 'Template not found' });
      return;
    }

    if (template.userId.toString() !== req.user?.id) {
      res.status(401).json({ message: 'User not authorized' });
      return;
    }

    await template.deleteOne();
    res.json({ message: 'Template removed' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
