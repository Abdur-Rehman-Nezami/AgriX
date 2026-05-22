import express from 'express';
import { getWeather, getAISuggestion } from '../controllers/weatherController.js';

const router = express.Router();

router.get('/', getWeather);
router.post('/ai-suggestion', getAISuggestion);

export default router;
