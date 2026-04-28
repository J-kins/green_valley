import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { validateEmail, validatePassword, validateRequired } from '../../lib/validators';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('female');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ name: '', email: '', password: '', dateOfBirth: '', phone: '' });

  const validateField = (field: string, value: string) => {
    let error = '';
    if (field === 'name') {
      error = validateRequired(value, 'Full name') || '';
    } else if (field === 'email') {
      error = validateRequired(value, 'Email') || validateEmail(value) || '';
    } else if (field === 'password') {
      error = validateRequired(value, 'Password') || validatePassword(value) || '';
    } else if (field === 'dateOfBirth') {
      error = validateRequired(value, 'Date of birth') || '';
    } else if (field === 'phone') {
      error = validateRequired(value, 'Phone number') || '';
    }
    setFieldErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const nameError = validateRequired(name, 'Full name');
    const emailError = validateRequired(email, 'Email') || validateEmail(email);
    const passwordError = validateRequired(password, 'Password') || validatePassword(password);
    const dobError = validateRequired(dateOfBirth, 'Date of birth');
    const phoneError = validateRequired(phone, 'Phone number');

    const firstError = nameError || emailError || passwordError || dobError || phoneError;
    if (firstError) {
      setError(firstError);
      return;
    }

    setLoading(true);
    const result = await register({ name, email, password, dateOfBirth, phone, gender });
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      navigate('/portal');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 to-teal-700 p-12 flex-col justify-between text-white">
        <div>
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <p className="text-sm font-medium">Get Started Today</p>
          </div>
          <h1 className="text-5xl font-bold mb-4">Your Health,<br />Your Priority</h1>
          <p className="text-xl text-emerald-50 max-w-md">
            Join thousands of patients managing their health with Green Valley Clinic.
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="text-2xl">✓</div>
            <div>
              <h3 className="font-semibold mb-1">Easy Registration</h3>
              <p className="text-sm text-emerald-100">Complete your profile in just a few minutes</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="text-2xl">📅</div>
            <div>
              <h3 className="font-semibold mb-1">Book Appointments</h3>
              <p className="text-sm text-emerald-100">Schedule with our doctors instantly</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="text-2xl">📋</div>
            <div>
              <h3 className="font-semibold mb-1">Health Records</h3>
              <p className="text-sm text-emerald-100">Access your medical history anytime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
            <p className="text-gray-600">Join us to access your health information</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg flex gap-3">
                <span className="text-xl">⚠️</span>
                <div>
                  <p className="font-semibold">Registration failed</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (fieldErrors.name) validateField('name', e.target.value);
                }}
                onBlur={(e) => validateField('name', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg transition-colors focus:outline-none ${
                  fieldErrors.name
                    ? 'border-red-300 bg-red-50 focus:border-red-500'
                    : 'border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
                }`}
                placeholder="Jane Smith"
              />
              {fieldErrors.name && (
                <p className="text-sm text-red-600 mt-1">{fieldErrors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) validateField('email', e.target.value);
                }}
                onBlur={(e) => validateField('email', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg transition-colors focus:outline-none ${
                  fieldErrors.email
                    ? 'border-red-300 bg-red-50 focus:border-red-500'
                    : 'border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
                }`}
                placeholder="you@example.com"
              />
              {fieldErrors.email && (
                <p className="text-sm text-red-600 mt-1">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) validateField('password', e.target.value);
                }}
                onBlur={(e) => validateField('password', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg transition-colors focus:outline-none ${
                  fieldErrors.password
                    ? 'border-red-300 bg-red-50 focus:border-red-500'
                    : 'border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
                }`}
                placeholder="••••••••"
              />
              {fieldErrors.password && (
                <p className="text-sm text-red-600 mt-1">{fieldErrors.password}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">Minimum 8 characters required</p>
            </div>

            {/* Two Column Fields */}
            <div className="grid grid-cols-2 gap-4">
              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => {
                    setDateOfBirth(e.target.value);
                    if (fieldErrors.dateOfBirth) validateField('dateOfBirth', e.target.value);
                  }}
                  onBlur={(e) => validateField('dateOfBirth', e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className={`w-full px-3 py-3 border-2 rounded-lg transition-colors focus:outline-none text-sm ${
                    fieldErrors.dateOfBirth
                      ? 'border-red-300 bg-red-50 focus:border-red-500'
                      : 'border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
                  }`}
                />
                {fieldErrors.dateOfBirth && (
                  <p className="text-xs text-red-600 mt-1">{fieldErrors.dateOfBirth}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'male' | 'female' | 'other')}
                  className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 focus:outline-none text-sm bg-white"
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (fieldErrors.phone) validateField('phone', e.target.value);
                }}
                onBlur={(e) => validateField('phone', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-lg transition-colors focus:outline-none ${
                  fieldErrors.phone
                    ? 'border-red-300 bg-red-50 focus:border-red-500'
                    : 'border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
                }`}
                placeholder="+1 (555) 000-0000"
              />
              {fieldErrors.phone && (
                <p className="text-sm text-red-600 mt-1">{fieldErrors.phone}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3 rounded-lg hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block animate-spin">⟳</span>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-700">
              Sign in here
            </Link>
          </p>

          {/* Terms & Privacy */}
          <p className="mt-4 text-xs text-center text-gray-500">
            By creating an account, you agree to our{' '}
            <Link to="#" className="text-emerald-600 hover:text-emerald-700">
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link to="#" className="text-emerald-600 hover:text-emerald-700">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
