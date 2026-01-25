import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import API from '../utils/api';
import { useLanguage } from '../context/LanguageContext';

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ background: 'linear-gradient(135deg, #F0FDF4 0%, #DBEAFE 100%)' }}>
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-4xl font-bold mb-6 text-center text-green" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
          {t('Login', 'لاگ ان')}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField 
            fullWidth 
            label={t('Email', 'ای میل')} 
            type="email" 
            value={form.email} 
            onChange={(e) => setForm({ ...form, email: e.target.value })} 
            required 
          />
          <TextField 
            fullWidth 
            label={t('Password', 'پاس ورڈ')} 
            type="password" 
            value={form.password} 
            onChange={(e) => setForm({ ...form, password: e.target.value })} 
            required 
          />
          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            size="large" 
            sx={{ bgcolor: '#34D399', '&:hover': { bgcolor: '#10B981' }, borderRadius: '12px', py: 2, fontSize: '1.1rem', fontWeight: 'bold' }}
          >
            {t('Login', 'لاگ ان')}
          </Button>
        </form>
        <p className="text-center mt-4" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
          {t("Don't have an account?", 'اکاؤنٹ نہیں ہے؟')} <Link to="/register" className="text-green font-semibold">{t('Register', 'رجسٹر کریں')}</Link>
        </p>
      </div>
    </div>
  );
}
