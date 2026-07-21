import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiLoader } from 'react-icons/fi';
import SocialLogin from './SocialLogin';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
export default function LoginForm({
  onSwitchMode
}) {
  
const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {
    login,
    loading
  } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || '/';
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    try {
      await login(email, password);
      navigate(redirectTo);
    } catch (err) {
      setError(err.message || 'Failed to login');
    }
  };
  return <motion.div initial={{
    opacity: 0,
    x: -20
  }} animate={{
    opacity: 1,
    x: 0
  }} exit={{
    opacity: 0,
    x: 20
  }} transition={{
    duration: 0.4
  }} className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif italic text-ink mb-2">Welcome Back</h2>
        <p className="text-subtle">Enter Your Cred</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <div className="p-3 bg-red-50 text-red-500 rounded-md text-sm text-center border border-red-100">
            {error}
          </div>}
        
        <div className="space-y-1">
          <label className="text-sm font-medium text-ink">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-subtle">
              <FiMail />
            </div>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-surface border border-line rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all" placeholder="name@example.com" required />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-ink">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-subtle">
              <FiLock />
            </div>
            <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 pr-10 py-3 bg-surface border border-line rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all" placeholder={"auto__260"} required />
            <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-subtle hover:text-ink transition-colors" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="rounded border-line text-primary focus:ring-primary w-4 h-4 cursor-pointer" />
            <span className="text-subtle group-hover:text-ink transition-colors">Remember Me</span>
          </label>
          <a href="#" className="font-medium text-primary hover:underline">Forgot Password</a>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3">
          {loading ? <FiLoader className="animate-spin" /> : 'Sign In'}
          {!loading && <FiArrowRight />}
        </button>
      </form>

      <SocialLogin />

    </motion.div>;
}