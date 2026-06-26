import express from 'express';
import { getTemplates, createTemplate, updateTemplate, deleteTemplate } from '../controllers/templateController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .get(protect, getTemplates)
  .post(protect, createTemplate);

router.route('/:id')
  .put(protect, updateTemplate)
  .delete(protect, deleteTemplate);

export default router;
