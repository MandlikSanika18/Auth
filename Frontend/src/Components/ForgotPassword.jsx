import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setEmailError('');
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (Date.now() - lastRequestTime < 30000) {
      setStatus('error');
      setMessage('Please wait 30 seconds before trying again');
      return;
    }

    setIsLoading(true);
    setStatus(null);
    setLastRequestTime(Date.now());
    
    try {
      const response = await api.post('/auth/forgot-password', { email });
      setStatus('success');
      setMessage(response.data?.message || 'Reset password email sent!');
    } catch (err) {
      setStatus('error');
      setMessage(
        err.response?.data?.error || 
        err.response?.data?.message || 
        err.message || 
        'Failed to send reset email'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-14 w-14 sm:h-16 sm:w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Lock className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Forgot Password?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 px-2">
            No worries! Enter your email and we'll send you a reset link.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/70 backdrop-blur-sm shadow-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/20">
          {/* Status Messages */}
          {status && (
            <div className={`flex items-start sm:items-center space-x-3 p-3 sm:p-4 rounded-xl mb-6 ${
              status === 'success' 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {status === 'success' ? (
                <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5 sm:mt-0" />
              ) : (
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5 sm:mt-0" />
              )}
              <p className="text-sm sm:text-base font-medium leading-relaxed">{message}</p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm sm:text-base font-semibold text-gray-700 mb-3">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 sm:py-4 pl-12 sm:pl-14 text-sm sm:text-base border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed hover:border-gray-300"
                />
                <Mail className="absolute left-4 top-3.5 sm:top-4 h-5 w-5 text-gray-400" />
              </div>
              {emailError && (
                <p className="mt-1 text-sm text-red-600">{emailError}</p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading || !email.trim()}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-300 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:shadow-none shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>
          </div>

          {/* Back to Login Link */}
          <div className="text-center pt-6 sm:pt-8 border-t border-gray-200/60 mt-6 sm:mt-8">
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-semibold text-sm sm:text-base transition-all duration-200 hover:underline decoration-2 underline-offset-4"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Back to Login</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs sm:text-sm text-gray-500 mt-6 sm:mt-8 px-2">
          <p className="mb-2">Didn't receive the email? Check your spam folder or</p>
          <button 
            onClick={() => email && handleSubmit({ preventDefault: () => {} })}
            disabled={!email.trim() || isLoading || Date.now() - lastRequestTime < 30000}
            className="text-indigo-600 hover:text-indigo-700 font-semibold disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200 hover:underline decoration-2 underline-offset-4"
          >
            try again
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;