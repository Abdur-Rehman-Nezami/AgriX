export const pakistanRegions = [
  // Punjab Cities
  { name: 'Lahore', lat: 31.5204, lng: 74.3587, temp: 29, crops: ['Wheat', 'Rice', 'Sugarcane'], avgPrice: 88 },
  { name: 'Faisalabad', lat: 31.4504, lng: 73.1350, temp: 30, crops: ['Cotton', 'Wheat', 'Rice'], avgPrice: 85 },
  { name: 'Multan', lat: 30.1575, lng: 71.5249, temp: 32, crops: ['Cotton', 'Mango', 'Wheat'], avgPrice: 82 },
  { name: 'Rawalpindi', lat: 33.5651, lng: 73.0169, temp: 26, crops: ['Wheat', 'Maize', 'Vegetables'], avgPrice: 90 },
  { name: 'Gujranwala', lat: 32.1877, lng: 74.1945, temp: 28, crops: ['Wheat', 'Rice', 'Sugarcane'], avgPrice: 86 },
  { name: 'Sialkot', lat: 32.4945, lng: 74.5229, temp: 27, crops: ['Wheat', 'Rice', 'Vegetables'], avgPrice: 89 },
  { name: 'Bahawalpur', lat: 29.3956, lng: 71.6836, temp: 31, crops: ['Cotton', 'Wheat', 'Dates'], avgPrice: 83 },
  { name: 'Sargodha', lat: 32.0836, lng: 72.6711, temp: 29, crops: ['Citrus', 'Wheat', 'Rice'], avgPrice: 87 },
  
  // Sindh Cities
  { name: 'Karachi', lat: 24.8607, lng: 67.0011, temp: 30, crops: ['Vegetables', 'Fruits', 'Flowers'], avgPrice: 95 },
  { name: 'Hyderabad', lat: 25.3960, lng: 68.3578, temp: 31, crops: ['Rice', 'Sugarcane', 'Banana'], avgPrice: 78 },
  { name: 'Sukkur', lat: 27.7052, lng: 68.8574, temp: 33, crops: ['Rice', 'Wheat', 'Cotton'], avgPrice: 75 },
  { name: 'Larkana', lat: 27.5590, lng: 68.2120, temp: 32, crops: ['Rice', 'Wheat', 'Sugarcane'], avgPrice: 76 },
  { name: 'Mirpur Khas', lat: 25.5276, lng: 69.0111, temp: 32, crops: ['Banana', 'Mango', 'Rice'], avgPrice: 77 },
  
  // KPK Cities
  { name: 'Peshawar', lat: 34.0151, lng: 71.5249, temp: 25, crops: ['Wheat', 'Maize', 'Sugarcane'], avgPrice: 92 },
  { name: 'Mardan', lat: 34.1958, lng: 72.0447, temp: 26, crops: ['Wheat', 'Sugarcane', 'Tobacco'], avgPrice: 90 },
  { name: 'Abbottabad', lat: 34.1495, lng: 73.1995, temp: 22, crops: ['Maize', 'Potato', 'Apple'], avgPrice: 94 },
  { name: 'Swat', lat: 35.2227, lng: 72.4258, temp: 20, crops: ['Apple', 'Peach', 'Walnut'], avgPrice: 98 },
  { name: 'Mansehra', lat: 34.3300, lng: 73.1967, temp: 23, crops: ['Maize', 'Wheat', 'Vegetables'], avgPrice: 93 },
  
  // Balochistan Cities
  { name: 'Quetta', lat: 30.1798, lng: 66.9750, temp: 24, crops: ['Apple', 'Apricot', 'Almond'], avgPrice: 96 },
  { name: 'Gwadar', lat: 25.1264, lng: 62.3250, temp: 28, crops: ['Dates', 'Fish', 'Vegetables'], avgPrice: 85 },
  { name: 'Turbat', lat: 26.0061, lng: 63.0486, temp: 31, crops: ['Dates', 'Banana', 'Mango'], avgPrice: 80 },
  { name: 'Khuzdar', lat: 27.8117, lng: 66.6179, temp: 29, crops: ['Dates', 'Wheat', 'Vegetables'], avgPrice: 82 },
  
  // Gilgit-Baltistan
  { name: 'Gilgit', lat: 35.9208, lng: 74.3080, temp: 18, crops: ['Apple', 'Apricot', 'Cherry'], avgPrice: 100 },
  { name: 'Skardu', lat: 35.2977, lng: 75.6339, temp: 16, crops: ['Apple', 'Apricot', 'Walnut'], avgPrice: 102 },
  
  // Azad Kashmir
  { name: 'Muzaffarabad', lat: 34.3700, lng: 73.4711, temp: 21, crops: ['Maize', 'Wheat', 'Vegetables'], avgPrice: 95 },
  
  // Islamabad
  { name: 'Islamabad', lat: 33.6844, lng: 73.0479, temp: 25, crops: ['Vegetables', 'Fruits', 'Flowers'], avgPrice: 97 }
];

export const getColorByTemp = (temp) => {
  if (temp < 20) return '#60A5FA';
  if (temp < 28) return '#34D399';
  return '#FCD34D';
};
