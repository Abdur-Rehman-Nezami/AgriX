import express from 'express';
import { addPrice, getPrices, getComparison } from '../controllers/priceController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, addPrice);
router.get('/', getPrices);
router.get('/comparison', getComparison);

export default router;
