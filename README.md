# 🌾 AgroSmart - Farmer Marketplace & Analytics Platform

A complete full-stack MERN application for farmers, admins, and government officials to track crop prices, compare trends, view weather forecasts, get AI farming suggestions, and explore loan schemes.

## 🚀 Features

- **Price Tracking Center**: Upload, view, and compare historical crop prices
- **Interactive Pakistan Map**: Regional temperature-based visualization with crop data
- **Weather & AI Insights**: Real-time weather + GPT-4 powered farming suggestions
- **Loan Schemes**: Browse government and bank programs
- **Role-based Authentication**: Farmer, Admin, Government Official roles
- **Data Analytics**: Charts, tables, and comparison tools

## 🛠️ Tech Stack

**Frontend**: React + Vite, Tailwind CSS, Material UI, Recharts, React Leaflet
**Backend**: Node.js, Express, MongoDB, JWT, Multer
**APIs**: OpenWeather, OpenRouter (GPT-4)

## 📦 Installation

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🔑 Environment Variables

Backend `.env` file is already configured with:
- MongoDB Atlas connection
- JWT secret
- OpenWeather API key
- OpenRouter API key

## 🎨 Theme

- **Primary**: Light Yellow (warmth, optimism)
- **Secondary**: Light Green (freshness, growth)
- **Accent**: Light Blue (clarity, calmness)

Clean, nature-inspired design with smooth gradients and rounded corners.

## 📱 Pages

- **Home**: Landing page with CTA
- **Login/Register**: Authentication
- **Dashboard**: Weather, AI box, map, quick actions
- **Price Tracking**: Data tables, charts, CSV upload, comparison
- **Loan Schemes**: Government/bank programs

## 🗄️ Database Models

- **User**: name, email, password, role, region
- **Price**: crop, price, unit, region, date, source, verified

## 🔐 API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Prices
- `POST /api/prices` - Add price (authenticated)
- `GET /api/prices` - Get prices with filters
- `GET /api/prices/comparison` - Compare crop prices

### Weather
- `GET /api/weather` - Get weather data
- `POST /api/weather/ai-suggestion` - Get AI farming suggestion

## 🌍 Default Ports

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## 👥 Default Roles

- **farmer**: Upload prices, view data, get AI suggestions
- **admin**: Verify data, upload official rates
- **gov**: Upload government-fixed prices, view analytics

## 📊 Sample Data

The app includes dummy data for Pakistan regions (Punjab, Sindh, KPK, Balochistan) with temperature, crops, and average prices.

## 🚀 Deployment

- **Frontend**: Vercel / Netlify
- **Backend**: Render / Railway
- **Database**: MongoDB Atlas (already configured)

## 📝 License

MIT
