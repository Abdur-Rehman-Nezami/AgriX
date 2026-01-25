import express from 'express';
import { analyzeRemoteSensingData, getAnalysisHistory } from '../controllers/remoteSensingController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.post('/analyze', analyzeRemoteSensingData);
router.get('/history', getAnalysisHistory);

export default router;
