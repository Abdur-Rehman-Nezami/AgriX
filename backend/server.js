import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import priceRoutes from './routes/priceRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import govRoutes from './routes/govRoutes.js';
import farmRoutes from './routes/farmRoutes.js';
import forumRoutes from './routes/forumRoutes.js';
import voiceAssistantRoutes from './routes/voiceAssistantRoutes.js';
import remoteSensingRoutes from './routes/remoteSensingRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/prices', priceRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/gov', govRoutes);
app.use('/api/farm', farmRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/voice', voiceAssistantRoutes);
app.use('/api/remote-sensing', remoteSensingRoutes);

app.get('/', (req, res) => res.json({ message: 'AgroSmart API Running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
