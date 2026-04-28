import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { validateEmail, validateRequired } from '../../lib/validators';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<'staff' | 'patient'>('patient');
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '' });

  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  const validateField = (field: string, value: string) => {
    let error = '';
    if (field === 'email') {
      error = validateRequired(value, 'Email') || validateEmail(value) || '';
    } else if (field === 'password') {
      error = validateRequired(value, 'Password') || '';
    }
    setFieldErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emailError = validateRequired(email, 'Email') || validateEmail(email);
    const passwordError = validateRequired(password, 'Password');
    
    if (emailError || passwordError) {
      setError(emailError || passwordError || '');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      // Redirect based on user role
      if (result.user?.role === 'patient') {
        navigate('/portal');
      } else {
        navigate('/staff');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 to-teal-700 p-12 flex-col justify-between text-white">
        <div>
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <p className="text-sm font-medium">Trusted Healthcare</p>
          </div>
          <h1 className="text-5xl font-bold mb-4">Welcome to Green Valley</h1>
          <p className="text-xl text-emerald-50 max-w-md">
            Your trusted partner in health and wellness. Secure access to your medical records and appointments.
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="text-2xl">🏥</div>
            <div>
              <h3 className="font-semibold mb-1">Comprehensive Care</h3>
              <p className="text-sm text-emerald-100">Access all your health information in one place</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="text-2xl">🔒</div>
            <div>
              <h3 className="font-semibold mb-1">Secure & Private</h3>
              <p className="text-sm text-emerald-100">Your data is encrypted and protected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-md">
          {/* Logo/Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600">Access your account to manage appointments and health records</p>
          </div>

          {/* User Type Toggle */}
          <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setUserType('patient')}
              className={`flex-1 py-2.5 px-4 rounded-md text-sm font-semibold transition-all duration-200 ${
                userType === 'patient'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Patient
            </button>
            <button
              onClick={() => setUserType('staff')}
              className={`flex-1 py-2.5 px-4 rounded-md text-sm font-semibold transition-all duration-200 ${
                userType === 'staff'
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Staff
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg flex gap-3 animate-in">
                <span className="text-xl">⚠️</span>
                <div>
                  <p className="font-semibold">Login failed</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

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
                placeholder="name@example.com"
              />
              {fieldErrors.email && (
                <p className="text-sm text-red-600 mt-1">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-900">Password</label>
                <Link to="#" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">
                  Forgot password?
                </Link>
              </div>
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
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3 rounded-lg hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block animate-spin">⟳</span>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            {userType === 'patient' ? (
              <>
                Don&apos;t have an account?{' '}
                <Link to="/register" className="font-semibold text-emerald-600 hover:text-emerald-700">
                  Create one
                </Link>
              </>
            ) : (
              <>
                Patient? Go to{' '}
                <Link to="/portal" className="font-semibold text-emerald-600 hover:text-emerald-700">
                  Patient Portal
                </Link>
              </>
            )}
          </p>

          {/* Test Credentials */}
          <div className="mt-8 p-4 bg-slate-100 rounded-lg border border-slate-200">
            <p className="text-xs font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span>📋</span> Demo Credentials
            </p>
            <div className="space-y-2">
              {userType === 'patient' ? (
                <div className="text-xs text-slate-700 space-y-1">
                  <p><span className="font-semibold">Patient 1:</span> jane.smith@email.com / patient123</p>
                  <p><span className="font-semibold">Patient 2:</span> john.doe@email.com / patient123</p>
                  <p><span className="font-semibold">Patient 3:</span> emily.davis@email.com / patient123</p>
                </div>
              ) : (
                <div className="text-xs text-slate-700 space-y-1">
                  <p><span className="font-semibold">Admin:</span> admin@greenvalleyclinic.com / admin123</p>
                  <p><span className="font-semibold">Receptionist:</span> receptionist@greenvalleyclinic.com / recep123</p>
                  <p><span className="font-semibold">Doctor:</span> drsarahjohnson@greenvalleyclinic.com / doctor123</p>
                </div>
              )}
            </div>
            <button
              onClick={handleReset}
              className="mt-3 w-full bg-slate-300 hover:bg-slate-400 text-slate-900 text-xs font-semibold py-2 rounded transition-colors"
            >
              Reset Data & Reload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
