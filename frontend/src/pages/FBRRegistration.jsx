import React, { useState } from 'react';
import { Card, CardContent, Button, TextField, Grid, Stepper, Step, StepLabel, Alert, Chip } from '@mui/material';
import { AccountBalance, CheckCircle, Description, Person } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../context/LanguageContext';

export default function FBRRegistration({ user }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const { t, language } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    // Personal Information
    fullName: user?.name || '',
    cnic: '',
    fatherName: '',
    dateOfBirth: '',
    mobileNumber: '',
    email: user?.email || '',
    
    // Business Information
    businessName: '',
    businessType: 'agriculture',
    businessAddress: '',
    city: '',
    province: user?.region || '',
    
    // Tax Information
    annualIncome: '',
    farmSize: '',
    crops: '',
    bankName: '',
    accountNumber: ''
  });

  const steps = [
    t('Personal Information', 'ذاتی معلومات'),
    t('Business Details', 'کاروباری تفصیلات'),
    t('Tax Information', 'ٹیکس کی معلومات')
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send data to backend
    console.log('FBR Registration Data:', formData);
    setSubmitted(true);
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
        <Sidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
        
        <div 
          className="transition-all duration-300 min-h-screen p-8"
          style={{ 
            marginLeft: sidebarExpanded ? '280px' : '70px',
            width: sidebarExpanded ? 'calc(100% - 280px)' : 'calc(100% - 70px)'
          }}
        >
          <div className="max-w-4xl mx-auto">
            <Card sx={{ borderRadius: '24px', boxShadow: 3, textAlign: 'center', p: 6 }}>
              <CheckCircle sx={{ fontSize: 100, color: '#10B981', mb: 3 }} />
              <h1 className="text-4xl font-bold mb-4 text-green-600" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                {t('Registration Submitted Successfully!', 'رجسٹریشن کامیابی سے جمع ہو گئی!')}
              </h1>
              <p className="text-xl text-gray-700 mb-6" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                {t('Your FBR registration application has been submitted. You will receive a confirmation email within 3-5 business days.', 
                   'آپ کی FBR رجسٹریشن درخواست جمع ہو گئی ہے۔ آپ کو 3-5 کاروباری دنوں میں تصدیقی ای میل موصول ہوگی۔')}
              </p>
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <p className="text-gray-700" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                  <strong>{t('Reference Number:', 'حوالہ نمبر:')}</strong> FBR-{Date.now().toString().slice(-8)}
                </p>
              </div>
              <Button
                variant="contained"
                size="large"
                onClick={() => setSubmitted(false)}
                sx={{
                  bgcolor: '#10B981',
                  '&:hover': { bgcolor: '#059669' },
                  borderRadius: '12px',
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}
              >
                {t('Submit Another Application', 'ایک اور درخواست جمع کریں')}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <Sidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
      
      <div 
        className="transition-all duration-300 min-h-screen p-8"
        style={{ 
          marginLeft: sidebarExpanded ? '280px' : '70px',
          width: sidebarExpanded ? 'calc(100% - 280px)' : 'calc(100% - 70px)'
        }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="rounded-3xl shadow-2xl p-8 mb-8 relative overflow-hidden" 
               style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}>
            <div className="relative z-10">
              <h1 className="text-5xl font-bold mb-2 text-white" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                🏛️ {t('FBR Tax Registration', 'FBR ٹیکس رجسٹریشن')}
              </h1>
              <p className="text-white/90 text-lg" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                {t('Register with Federal Board of Revenue for tax compliance', 'ٹیکس کی تعمیل کے لیے فیڈرل بورڈ آف ریونیو کے ساتھ رجسٹر کریں')}
              </p>
            </div>
          </div>

          {/* Info Alert */}
          <Alert severity="info" sx={{ mb: 4, borderRadius: '16px' }}>
            <p style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
              {t('All farmers with annual income above PKR 400,000 must register with FBR for tax purposes.', 
                 'سالانہ آمدنی 400,000 روپے سے زیادہ والے تمام کسانوں کو ٹیکس کے مقاصد کے لیے FBR کے ساتھ رجسٹر ہونا ضروری ہے۔')}
            </p>
          </Alert>

          {/* Stepper */}
          <Card sx={{ borderRadius: '24px', boxShadow: 3, mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>

          {/* Form */}
          <Card sx={{ borderRadius: '24px', boxShadow: 3 }}>
            <CardContent sx={{ p: 6 }}>
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {activeStep === 0 && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                      <Person /> {t('Personal Information', 'ذاتی معلومات')}
                    </h2>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label={t('Full Name', 'پورا نام')}
                          value={formData.fullName}
                          onChange={handleChange('fullName')}
                          required
                          sx={{ bgcolor: 'white', borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label={t('CNIC Number', 'شناختی کارڈ نمبر')}
                          value={formData.cnic}
                          onChange={handleChange('cnic')}
                          placeholder="12345-1234567-1"
                          required
                          sx={{ bgcolor: 'white', borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label={t("Father's Name", 'والد کا نام')}
                          value={formData.fatherName}
                          onChange={handleChange('fatherName')}
                          required
                          sx={{ bgcolor: 'white', borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label={t('Date of Birth', 'تاریخ پیدائش')}
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={handleChange('dateOfBirth')}
                          InputLabelProps={{ shrink: true }}
                          required
                          sx={{ bgcolor: 'white', borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label={t('Mobile Number', 'موبائل نمبر')}
                          value={formData.mobileNumber}
                          onChange={handleChange('mobileNumber')}
                          placeholder="03XX-XXXXXXX"
                          required
                          sx={{ bgcolor: 'white', borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label={t('Email Address', 'ای میل ایڈریس')}
                          type="email"
                          value={formData.email}
                          onChange={handleChange('email')}
                          required
                          sx={{ bgcolor: 'white', borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                )}

                {/* Step 2: Business Details */}
                {activeStep === 1 && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                      <Description /> {t('Business Details', 'کاروباری تفصیلات')}
                    </h2>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label={t('Business/Farm Name', 'کاروبار/فارم کا نام')}
                          value={formData.businessName}
                          onChange={handleChange('businessName')}
                          required
                          sx={{ bgcolor: 'white', borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          select
                          fullWidth
                          label={t('Business Type', 'کاروبار کی قسم')}
                          value={formData.businessType}
                          onChange={handleChange('businessType')}
                          SelectProps={{ native: true }}
                          sx={{ bgcolor: 'white', borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        >
                          <option value="agriculture">{t('Agriculture', 'زراعت')}</option>
                          <option value="livestock">{t('Livestock', 'مویشی پالنا')}</option>
                          <option value="poultry">{t('Poultry', 'مرغی پالنا')}</option>
                          <option value="dairy">{t('Dairy', 'ڈیری')}</option>
                          <option value="mixed">{t('Mixed Farming', 'مخلوط کاشتکاری')}</option>
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label={t('Business Address', 'کاروبار کا پتہ')}
                          value={formData.businessAddress}
                          onChange={handleChange('businessAddress')}
                          multiline
                          rows={2}
                          required
                          sx={{ bgcolor: 'white', borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label={t('City', 'شہر')}
                          value={formData.city}
                          onChange={handleChange('city')}
                          required
                          sx={{ bgcolor: 'white', borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label={t('Province', 'صوبہ')}
                          value={formData.province}
                          onChange={handleChange('province')}
                          required
                          sx={{ bgcolor: 'white', borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                )}

                {/* Step 3: Tax Information */}
                {activeStep === 2 && (
                  <div>
                    <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                      <AccountBalance /> {t('Tax Information', 'ٹیکس کی معلومات')}
                    </h2>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label={t('Annual Income (PKR)', 'سالانہ آمدنی (روپے)')}
                          type="number"
                          value={formData.annualIncome}
                          onChange={handleChange('annualIncome')}
                          required
                          sx={{ bgcolor: 'white', borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label={t('Farm Size (Acres)', 'فارم کا رقبہ (ایکڑ)')}
                          type="number"
                          value={formData.farmSize}
                          onChange={handleChange('farmSize')}
                          required
                          sx={{ bgcolor: 'white', borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label={t('Main Crops/Products', 'اہم فصلیں/مصنوعات')}
                          value={formData.crops}
                          onChange={handleChange('crops')}
                          placeholder={t('e.g., Wheat, Rice, Cotton', 'مثال: گندم، چاول، کپاس')}
                          required
                          sx={{ bgcolor: 'white', borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label={t('Bank Name', 'بینک کا نام')}
                          value={formData.bankName}
                          onChange={handleChange('bankName')}
                          required
                          sx={{ bgcolor: 'white', borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label={t('Account Number', 'اکاؤنٹ نمبر')}
                          value={formData.accountNumber}
                          onChange={handleChange('accountNumber')}
                          required
                          sx={{ bgcolor: 'white', borderRadius: '12px', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                        />
                      </Grid>
                    </Grid>

                    <Alert severity="warning" sx={{ mt: 4, borderRadius: '12px' }}>
                      <p style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                        {t('Please ensure all information is accurate. False information may result in penalties.', 
                           'براہ کرم یقینی بنائیں کہ تمام معلومات درست ہیں۔ غلط معلومات کے نتیجے میں جرمانہ ہو سکتا ہے۔')}
                      </p>
                    </Alert>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: '#10B981',
                      color: '#10B981',
                      borderWidth: 2,
                      '&:hover': {
                        borderColor: '#059669',
                        bgcolor: 'rgba(16, 185, 129, 0.1)',
                        borderWidth: 2
                      },
                      borderRadius: '12px',
                      px: 4,
                      py: 1.5,
                      fontWeight: 'bold'
                    }}
                  >
                    {t('Back', 'پیچھے')}
                  </Button>

                  {activeStep === steps.length - 1 ? (
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{
                        bgcolor: '#10B981',
                        '&:hover': { bgcolor: '#059669' },
                        borderRadius: '12px',
                        px: 6,
                        py: 1.5,
                        fontWeight: 'bold'
                      }}
                    >
                      {t('Submit Registration', 'رجسٹریشن جمع کریں')}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      variant="contained"
                      size="large"
                      sx={{
                        bgcolor: '#10B981',
                        '&:hover': { bgcolor: '#059669' },
                        borderRadius: '12px',
                        px: 6,
                        py: 1.5,
                        fontWeight: 'bold'
                      }}
                    >
                      {t('Next', 'اگلا')}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Help Section */}
          <Card sx={{ borderRadius: '24px', boxShadow: 3, mt: 4, bgcolor: '#FEF3C7' }}>
            <CardContent sx={{ p: 4 }}>
              <h3 className="text-2xl font-bold mb-4 text-gray-900" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                ℹ️ {t('Need Help?', 'مدد چاہیے؟')}
              </h3>
              <p className="text-gray-700 mb-3" style={{ direction: language === 'urdu' ? 'rtl' : 'ltr' }}>
                {t('For assistance with FBR registration, contact:', 'FBR رجسٹریشن میں مدد کے لیے رابطہ کریں:')}
              </p>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>{t('Helpline:', 'ہیلپ لائن:')}</strong> 051-111-772-772
                </p>
                <p className="text-gray-700">
                  <strong>{t('Email:', 'ای میل:')}</strong> helpdesk@fbr.gov.pk
                </p>
                <p className="text-gray-700">
                  <strong>{t('Website:', 'ویب سائٹ:')}</strong> www.fbr.gov.pk
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
