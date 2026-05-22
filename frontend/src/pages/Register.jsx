import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, MenuItem } from '@mui/material';
import API from '../utils/api';
import { useLanguage } from '../context/LanguageContext';

export default function Register({ setUser }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'farmer', region: '' });
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/register', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      navigate('/dashboard');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ background: 'linear-gradient(135deg, #F0FDF4 0%, #DBEAFE 100%)' }}>
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-4xl font-bold mb-6 text-center text-green" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
          {t('Register', 'رجسٹر کریں')}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField 
            fullWidth 
            label={t('Name', 'نام')} 
            value={form.name} 
            onChange={(e) => setForm({ ...form, name: e.target.value })} 
            required 
          />
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
          <TextField 
            select 
            fullWidth 
            label={t('Role', 'کردار')} 
            value={form.role} 
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <MenuItem value="farmer">{t('Farmer', 'کسان')}</MenuItem>
            <MenuItem value="admin">{t('Admin', 'ایڈمن')}</MenuItem>
            <MenuItem value="gov">{t('Government Official', 'سرکاری اہلکار')}</MenuItem>
          </TextField>
          <TextField 
            fullWidth 
            label={t('Region', 'علاقہ')} 
            value={form.region} 
            onChange={(e) => setForm({ ...form, region: e.target.value })} 
          />
          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            size="large" 
            sx={{ bgcolor: '#34D399', '&:hover': { bgcolor: '#10B981' }, borderRadius: '12px', py: 2, fontSize: '1.1rem', fontWeight: 'bold' }}
          >
            {t('Register', 'رجسٹر کریں')}
          </Button>
        </form>
        <p className="text-center mt-4" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
          {t('Already have an account?', 'پہلے سے اکاؤنٹ ہے؟')} <Link to="/login" className="text-green font-semibold">{t('Login', 'لاگ ان')}</Link>
        </p>
      </div>
    </div>
  );
}
