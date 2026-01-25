import express from 'express';
import { processVoiceQuery, getConversationHistory } from '../controllers/voiceAssistantController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.post('/query', processVoiceQuery);
router.get('/history', getConversationHistory);

export default router;
