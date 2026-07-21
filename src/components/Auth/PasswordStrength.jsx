import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX } from 'react-icons/fi';
export default function PasswordStrength({
  password
}) {
  
const reqs = [{
    label: 'Minimum 8 characters',
    test: p => p.length >= 8
  }, {
    label: 'Uppercase letter',
    test: p => /[A-Z]/.test(p)
  }, {
    label: 'Lowercase letter',
    test: p => /[a-z]/.test(p)
  }, {
    label: 'Number',
    test: p => /[0-9]/.test(p)
  }, {
    label: 'Special character',
    test: p => /[^A-Za-z0-9]/.test(p)
  }];
  const score = reqs.filter(r => r.test(password)).length;
  const getStrengthLabel = () => {
    if (password.length === 0) return '';
    if (score <= 1) return 'Weak';
    if (score === 2) return 'Fair';
    if (score === 3) return 'Good';
    if (score === 4) return 'Strong';
    return 'Excellent';
  };
  const getStrengthColor = () => {
    if (score <= 1) return 'bg-red-500';
    if (score === 2) return 'bg-orange-400';
    if (score === 3) return 'bg-yellow-400';
    if (score === 4) return 'bg-green-400';
    return 'bg-green-600';
  };
  return <div className="mt-2 space-y-3">
      {password.length > 0 && <div className="flex items-center justify-between text-xs">
          <span className="text-subtle font-medium">Password Streng</span>
          <span className={`font-semibold ${score >= 4 ? 'text-green-500' : 'text-subtle'}`}>
            {getStrengthLabel()}
          </span>
        </div>}
      <div className="h-1.5 w-full bg-line rounded-full overflow-hidden flex gap-1">
        {[1, 2, 3, 4, 5].map(level => <motion.div key={level} className={`h-full flex-1 rounded-full ${score >= level ? getStrengthColor() : 'bg-transparent'}`} initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.3
      }} />)}
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        {reqs.map((req, idx) => {
        const met = req.test(password);
        return <div key={idx} className={`flex items-center gap-1.5 ${met ? 'text-green-500' : 'text-subtle'}`}>
              {met ? <FiCheck size={12} /> : <FiX size={12} />}
              <span>{req.label}</span>
            </div>;
      })}
      </div>
    </div>;
}