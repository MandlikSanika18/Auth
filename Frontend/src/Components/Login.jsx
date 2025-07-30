import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, User } from 'lucide-react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const Navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Attempting login with:', { email, password });
      
      const res = await api.post('/auth/login', { email, password });
      
      console.log('Full response:', res);
      console.log('Response data:', res.data);
      
      if (res.data.token) {
        localStorage.setItem('token', res.data.token); // Store token
        alert('Login successful!');
        // Redirect or update app state here
      } else {
        throw new Error('No token received');
      }
    } catch (err) {
      console.error('Login error:', err);
      console.error('Error details:', {
        message: err.message,
        response: err.response,
        request: err.request
      });
      
      alert(`Login failed: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 sm:h-20 sm:w-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl">
            <User className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            Welcome Back
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Sign in to your account
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl sm:rounded-[2rem] p-8 sm:p-10 lg:p-12 border border-white/30">
          <div className="space-y-6 sm:space-y-8">
            {/* Email Field */}
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
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-4 sm:py-5 pl-12 sm:pl-14 text-base sm:text-lg border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed hover:border-gray-300 bg-white/90"
                />
                <Mail className="absolute left-4 top-4 sm:top-5 h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm sm:text-base font-semibold text-gray-700 mb-3">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-4 sm:py-5 pl-12 sm:pl-14 pr-12 sm:pr-14 text-base sm:text-lg border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed hover:border-gray-300 bg-white/90"
                />
                <Lock className="absolute left-4 top-4 sm:top-5 h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-4 sm:top-5 h-5 w-5 sm:h-6 sm:w-6 text-gray-400 hover:text-gray-600 transition-colors duration-200 disabled:cursor-not-allowed"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

             <div className="text-right">
      <button
        type="button"
        onClick={() => Navigate('/forgot-password')}
        className="text-sm sm:text-base text-indigo-600 hover:text-indigo-700 font-semibold transition-colors duration-200 hover:underline decoration-2 underline-offset-4"
      >
        Forgot Password?
      </button>
    </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading || !email.trim() || !password.trim()}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 sm:py-5 px-6 rounded-2xl font-bold text-base sm:text-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-300 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:shadow-none shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center space-x-3"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-3 border-white border-t-transparent"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="my-8 sm:my-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm sm:text-base">
                <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>
          </div>

          {/* Social Login Options */}
          <div className="grid grid-cols-2 gap-4">
            <button
  type="button"
  onClick={() => {
    window.open("https://auth-mp35.onrender.com/auth/google", "_self");
  }}
  className="flex items-center justify-center px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group"
>
  <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
  <span className="ml-2 text-sm sm:text-base font-medium text-gray-700 group-hover:text-gray-900">Google</span>
</button>

          <button
  onClick={() => window.open("https://auth-mp35.onrender.com/auth/github", "_self")}

  className="flex items-center justify-center px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group"
>
  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="black" viewBox="0 0 24 24">
    <path d="M12 .297a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.61-4.04-1.61a3.18 3.18 0 00-1.34-1.76c-1.1-.75.09-.73.09-.73a2.5 2.5 0 011.82 1.22 2.54 2.54 0 003.48 1 2.56 2.56 0 01.76-1.6c-2.66-.3-5.46-1.33-5.46-5.9a4.6 4.6 0 011.22-3.18 4.3 4.3 0 01.12-3.14s1-.32 3.3 1.21a11.4 11.4 0 016 0C17 5.8 18 6.13 18 6.13a4.3 4.3 0 01.12 3.14 4.6 4.6 0 011.22 3.18c0 4.59-2.8 5.59-5.47 5.88a2.86 2.86 0 01.82 2.22v3.29c0 .32.22.69.83.57A12 12 0 0012 .297z" />
  </svg>
  <span className="ml-2 text-sm sm:text-base font-medium text-gray-700 group-hover:text-gray-900">GitHub</span>
</button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-8 sm:mt-10 pt-6 border-t border-gray-200/60">
            <p className="text-sm sm:text-base text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => Navigate('/register')}
                className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors duration-200 hover:underline decoration-2 underline-offset-4"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;