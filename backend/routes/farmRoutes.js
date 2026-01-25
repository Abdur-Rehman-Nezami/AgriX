import express from 'express';
import {
  getFarmRegions,
  getFarmRegion,
  createFarmRegion,
  updateFarmRegion,
  deleteFarmRegion,
  addIssue,
  addDeficiency,
  getRegionActivities,
  addActivity,
  getFarmStats
} from '../controllers/farmController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Stats
router.get('/stats', getFarmStats);

// Farm regions
router.get('/regions', getFarmRegions);
router.get('/regions/:id', getFarmRegion);
router.post('/regions', createFarmRegion);
router.put('/regions/:id', updateFarmRegion);
router.delete('/regions/:id', deleteFarmRegion);

// Issues and deficiencies
router.post('/regions/:id/issues', addIssue);
router.post('/regions/:id/deficiencies', addDeficiency);

// Activities
router.get('/regions/:id/activities', getRegionActivities);
router.post('/activities', addActivity);

export default router;
