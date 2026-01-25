import express from 'express';
import { 
  getAdminStats, 
  getPendingPrices, 
  verifyPrice, 
  getPriceAnalytics,
  getMonthlyStats,
  getAllUsers,
  deleteUser,
  addAdminPrice,
  getGovSubmissions,
  approveGovPrice
} from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(protect);
router.use(adminOnly);

// Dashboard stats
router.get('/stats', getAdminStats);

// Price management
router.get('/pending-prices', getPendingPrices);
router.put('/verify-price/:id', verifyPrice);
router.post('/prices', addAdminPrice);

// Analytics
router.get('/price-analytics', getPriceAnalytics);
router.get('/monthly-stats', getMonthlyStats);

// User management
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

// Government rate approvals
router.get('/gov-submissions', getGovSubmissions);
router.put('/approve-gov-price/:id', approveGovPrice);

export default router;
