import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import { Language } from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  const handleClick = () => {
    console.log('Language toggle clicked! Current language:', language);
    toggleLanguage();
    console.log('Language should now be:', language === 'english' ? 'urdu' : 'english');
  };

  console.log('LanguageToggle rendered. Current language:', language);

  return (
    <Tooltip title={language === 'english' ? 'Switch to Urdu (اردو)' : 'Switch to English'}>
      <Fab
        color="primary"
        aria-label="language toggle"
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          bgcolor: language === 'urdu' ? '#10B981' : '#3B82F6',
          '&:hover': { 
            bgcolor: language === 'urdu' ? '#059669' : '#2563EB',
            transform: 'scale(1.1)'
          },
          width: 70,
          height: 70,
          boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
          transition: 'all 0.3s',
          zIndex: 9999
        }}
      >
        <div style={{ textAlign: 'center', color: 'white' }}>
          <Language sx={{ fontSize: 30 }} />
          <div style={{ fontSize: '12px', fontWeight: 'bold', marginTop: '4px' }}>
            {language === 'english' ? 'اردو' : 'EN'}
          </div>
        </div>
      </Fab>
    </Tooltip>
  );
}
