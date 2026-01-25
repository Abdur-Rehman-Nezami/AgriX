// Mock price data for demonstration purposes

export const mockPrices = {
  farmer: [
    { _id: '1', crop: 'Wheat', price: 3800, unit: 'per 40kg', region: 'Punjab', date: '2024-11-01', source: 'farmer', verified: false },
    { _id: '2', crop: 'Rice', price: 4600, unit: 'per 40kg', region: 'Sindh', date: '2024-11-01', source: 'farmer', verified: false },
    { _id: '3', crop: 'Cotton', price: 6250, unit: 'per 40kg', region: 'Punjab', date: '2024-11-02', source: 'farmer', verified: false },
    { _id: '4', crop: 'Sugarcane', price: 3200, unit: 'per 40kg', region: 'KPK', date: '2024-11-02', source: 'farmer', verified: false },
    { _id: '5', crop: 'Maize', price: 2800, unit: 'per 40kg', region: 'Punjab', date: '2024-11-03', source: 'farmer', verified: false },
    { _id: '6', crop: 'Wheat', price: 3850, unit: 'per 40kg', region: 'Sindh', date: '2024-11-03', source: 'farmer', verified: false },
    { _id: '7', crop: 'Rice', price: 4550, unit: 'per 40kg', region: 'Punjab', date: '2024-11-03', source: 'farmer', verified: false },
    { _id: '8', crop: 'Potato', price: 1500, unit: 'per 40kg', region: 'Balochistan', date: '2024-11-04', source: 'farmer', verified: false },
    { _id: '9', crop: 'Onion', price: 2200, unit: 'per 40kg', region: 'Sindh', date: '2024-11-04', source: 'farmer', verified: false },
    { _id: '10', crop: 'Tomato', price: 1800, unit: 'per 40kg', region: 'Punjab', date: '2024-11-04', source: 'farmer', verified: false },
  ],
  admin: [
    { _id: '11', crop: 'Wheat', price: 3750, unit: 'per 40kg', region: 'Punjab', date: '2024-11-01', source: 'admin', verified: true },
    { _id: '12', crop: 'Rice', price: 4500, unit: 'per 40kg', region: 'Sindh', date: '2024-11-01', source: 'admin', verified: true },
    { _id: '13', crop: 'Cotton', price: 6200, unit: 'per 40kg', region: 'Punjab', date: '2024-11-02', source: 'admin', verified: true },
    { _id: '14', crop: 'Sugarcane', price: 3150, unit: 'per 40kg', region: 'KPK', date: '2024-11-02', source: 'admin', verified: true },
    { _id: '15', crop: 'Maize', price: 2750, unit: 'per 40kg', region: 'Punjab', date: '2024-11-03', source: 'admin', verified: true },
    { _id: '16', crop: 'Wheat', price: 3800, unit: 'per 40kg', region: 'Sindh', date: '2024-11-03', source: 'admin', verified: true },
    { _id: '17', crop: 'Rice', price: 4450, unit: 'per 40kg', region: 'Punjab', date: '2024-11-03', source: 'admin', verified: true },
    { _id: '18', crop: 'Potato', price: 1450, unit: 'per 40kg', region: 'Balochistan', date: '2024-11-04', source: 'admin', verified: true },
    { _id: '19', crop: 'Onion', price: 2150, unit: 'per 40kg', region: 'Sindh', date: '2024-11-04', source: 'admin', verified: true },
    { _id: '20', crop: 'Tomato', price: 1750, unit: 'per 40kg', region: 'Punjab', date: '2024-11-04', source: 'admin', verified: true },
  ],
  gov: [
    { _id: '21', crop: 'Wheat', price: 3700, unit: 'per 40kg', region: 'Punjab', date: '2024-11-01', source: 'gov', verified: true },
    { _id: '22', crop: 'Rice', price: 4400, unit: 'per 40kg', region: 'Sindh', date: '2024-11-01', source: 'gov', verified: true },
    { _id: '23', crop: 'Cotton', price: 6100, unit: 'per 40kg', region: 'Punjab', date: '2024-11-02', source: 'gov', verified: true },
    { _id: '24', crop: 'Sugarcane', price: 3100, unit: 'per 40kg', region: 'KPK', date: '2024-11-02', source: 'gov', verified: true },
    { _id: '25', crop: 'Maize', price: 2700, unit: 'per 40kg', region: 'Punjab', date: '2024-11-03', source: 'gov', verified: true },
    { _id: '26', crop: 'Wheat', price: 3750, unit: 'per 40kg', region: 'Sindh', date: '2024-11-03', source: 'gov', verified: true },
    { _id: '27', crop: 'Rice', price: 4350, unit: 'per 40kg', region: 'Punjab', date: '2024-11-03', source: 'gov', verified: true },
    { _id: '28', crop: 'Potato', price: 1400, unit: 'per 40kg', region: 'Balochistan', date: '2024-11-04', source: 'gov', verified: true },
    { _id: '29', crop: 'Onion', price: 2100, unit: 'per 40kg', region: 'Sindh', date: '2024-11-04', source: 'gov', verified: true },
    { _id: '30', crop: 'Tomato', price: 1700, unit: 'per 40kg', region: 'Punjab', date: '2024-11-04', source: 'gov', verified: true },
  ]
};

export const mockComparisonData = [
  { date: '2024-10-01', Wheat: 3500, Rice: 4200, Cotton: 5800, Maize: 2600, Sugarcane: 3000 },
  { date: '2024-10-05', Wheat: 3600, Rice: 4300, Cotton: 5900, Maize: 2650, Sugarcane: 3050 },
  { date: '2024-10-10', Wheat: 3550, Rice: 4250, Cotton: 6000, Maize: 2700, Sugarcane: 3100 },
  { date: '2024-10-15', Wheat: 3700, Rice: 4400, Cotton: 6100, Maize: 2750, Sugarcane: 3150 },
  { date: '2024-10-20', Wheat: 3650, Rice: 4350, Cotton: 5950, Maize: 2700, Sugarcane: 3100 },
  { date: '2024-10-25', Wheat: 3750, Rice: 4500, Cotton: 6200, Maize: 2800, Sugarcane: 3200 },
  { date: '2024-10-30', Wheat: 3800, Rice: 4550, Cotton: 6300, Maize: 2850, Sugarcane: 3250 },
  { date: '2024-11-01', Wheat: 3850, Rice: 4600, Cotton: 6250, Maize: 2900, Sugarcane: 3300 },
  { date: '2024-11-04', Wheat: 3900, Rice: 4650, Cotton: 6400, Maize: 2950, Sugarcane: 3350 },
];

export const mockVegetableData = [
  { date: '2024-10-01', Potato: 1200, Onion: 1900, Tomato: 1500, Carrot: 1100 },
  { date: '2024-10-05', Potato: 1250, Onion: 2000, Tomato: 1600, Carrot: 1150 },
  { date: '2024-10-10', Potato: 1300, Onion: 2100, Tomato: 1650, Carrot: 1200 },
  { date: '2024-10-15', Potato: 1350, Onion: 2150, Tomato: 1700, Carrot: 1250 },
  { date: '2024-10-20', Potato: 1400, Onion: 2200, Tomato: 1750, Carrot: 1300 },
  { date: '2024-10-25', Potato: 1450, Onion: 2250, Tomato: 1800, Carrot: 1350 },
  { date: '2024-10-30', Potato: 1500, Onion: 2300, Tomato: 1850, Carrot: 1400 },
  { date: '2024-11-01', Potato: 1550, Onion: 2350, Tomato: 1900, Carrot: 1450 },
  { date: '2024-11-04', Potato: 1600, Onion: 2400, Tomato: 1950, Carrot: 1500 },
];

// Helper function to filter mock data
export const filterMockPrices = (prices, filters) => {
  return prices.filter(price => {
    if (filters.crop && !price.crop.toLowerCase().includes(filters.crop.toLowerCase())) {
      return false;
    }
    if (filters.region && !price.region.toLowerCase().includes(filters.region.toLowerCase())) {
      return false;
    }
    return true;
  });
};
