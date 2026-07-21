import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiPhone, FiEye, FiEyeOff, FiArrowRight, FiLoader } from 'react-icons/fi';
import SocialLogin from './SocialLogin';
import PasswordStrength from './PasswordStrength';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
export default function SignupForm({
  onSwitchMode
}) {
  
const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: false,
    newsletter: false
  });
  const [error, setError] = useState('');
  const {
    register,
    loading
  } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || '/';
  const handleChange = e => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!formData.terms) {
      setError('You must accept the Terms of Service');
      return;
    }
    try {
      await register({
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        newsletter: formData.newsletter
      });
      navigate(redirectTo);
    } catch (err) {
      setError(err.message || 'Failed to create account');
    }
  };
  return <motion.div initial={{
    opacity: 0,
    x: 20
  }} animate={{
    opacity: 1,
    x: 0
  }} exit={{
    opacity: 0,
    x: -20
  }} transition={{
    duration: 0.4
  }} className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif italic text-ink mb-2">Join Luxora</h2>
        <p className="text-subtle">Experience Prem</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="p-3 bg-red-50 text-red-500 rounded-md text-sm text-center border border-red-100">
            {error}
          </div>}
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-subtle">
                <FiUser />
              </div>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-surface border border-line rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all" placeholder="John Doe" required />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-ink">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-subtle">
                <span className="text-lg">@</span>
              </div>
              <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-surface border border-line rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all" placeholder="johndoe" required />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-ink">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-subtle">
              <FiMail />
            </div>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-surface border border-line rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all" placeholder="name@example.com" required />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-ink">Phone Number O</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-subtle">
              <FiPhone />
            </div>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-surface border border-line rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all" placeholder="+1 (555) 000-0000" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-ink">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-subtle">
              <FiLock />
            </div>
            <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className="w-full pl-10 pr-10 py-3 bg-surface border border-line rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all" placeholder={"auto__275"} required />
            <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-subtle hover:text-ink transition-colors" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <PasswordStrength password={formData.password} />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-ink">Confirm Passwor</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-subtle">
              <FiLock />
            </div>
            <input type={showPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full pl-10 pr-10 py-3 bg-surface border border-line rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all" placeholder={"auto__277"} required />
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <label className="flex items-start gap-2 cursor-pointer group text-sm">
            <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} className="rounded border-line text-primary focus:ring-primary w-4 h-4 mt-0.5 cursor-pointer" />
            <span className="text-subtle group-hover:text-ink transition-colors">I Accept The<a href="#" className="text-primary hover:underline">Terms Of Servic</a>And<a href="#" className="text-primary hover:underline">Privacy Policy</a></span>
          </label>
          <label className="flex items-start gap-2 cursor-pointer group text-sm">
            <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} className="rounded border-line text-primary focus:ring-primary w-4 h-4 mt-0.5 cursor-pointer" />
            <span className="text-subtle group-hover:text-ink transition-colors">Sign Me Up For</span>
          </label>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3 mt-4">
          {loading ? <FiLoader className="animate-spin" /> : 'Create Account'}
          {!loading && <FiArrowRight />}
        </button>
      </form>

    </motion.div>;
}