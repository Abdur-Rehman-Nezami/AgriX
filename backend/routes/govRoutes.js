import express from 'express';
import { 
  getGovStats, 
  submitGovPrice,
  getMySubmissions
} from '../controllers/govController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication and gov role
router.use(protect);
router.use(authorize('gov'));

// Dashboard stats
router.get('/stats', getGovStats);

// Price submissions
router.post('/prices', submitGovPrice);
router.get('/my-submissions', getMySubmissions);

export default router;
