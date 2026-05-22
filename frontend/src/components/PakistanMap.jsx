import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import { Card, CardContent } from '@mui/material';
import { pakistanRegions, getColorByTemp } from '../utils/mapData';
import 'leaflet/dist/leaflet.css';

export default function PakistanMap() {
  return (
    <Card sx={{ borderRadius: '24px', boxShadow: 3, p: 2 }}>
      <CardContent>
        <h3 className="text-3xl font-bold mb-4 text-green">🗺️ Pakistan Regional Overview</h3>
        <p className="text-gray-600 mb-4">
          Showing temperature and crop data for {pakistanRegions.length} regions across Pakistan
        </p>
        <div className="h-[500px] rounded-xl overflow-hidden border-2 border-gray-200">
          <MapContainer center={[30.3753, 69.3451]} zoom={6} style={{ height: '100%', width: '100%' }}>
            <TileLayer 
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {pakistanRegions.map((region) => (
              <CircleMarker
                key={region.name}
                center={[region.lat, region.lng]}
                radius={15}
                fillColor={getColorByTemp(region.temp)}
                color="#fff"
                weight={2}
                opacity={1}
                fillOpacity={0.8}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
                  <div className="p-2">
                    <h4 className="font-bold text-lg mb-1">{region.name}</h4>
                    <p className="text-sm"><strong>🌡️ Temperature:</strong> {region.temp}°C</p>
                    <p className="text-sm"><strong>🌾 Top Crops:</strong> {region.crops.join(', ')}</p>
                    <p className="text-sm"><strong>💰 Avg Price:</strong> PKR {region.avgPrice}/kg</p>
                  </div>
                </Tooltip>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
        <div className="flex gap-4 mt-4 justify-center flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-white shadow-md" style={{ backgroundColor: '#60A5FA' }}></div>
            <span className="text-sm font-semibold">Cool (&lt;20°C)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-white shadow-md" style={{ backgroundColor: '#34D399' }}></div>
            <span className="text-sm font-semibold">Moderate (20-28°C)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-white shadow-md" style={{ backgroundColor: '#FCD34D' }}></div>
            <span className="text-sm font-semibold">Warm (&gt;28°C)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
