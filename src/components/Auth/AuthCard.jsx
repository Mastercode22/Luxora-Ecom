import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
export default function AuthCard() {
  
const [isLogin, setIsLogin] = useState(true);
  return <div className="w-full max-w-md mx-auto">
      <div className="bg-section/80 backdrop-blur-xl border border-line rounded-[2rem] p-8 md:p-10 shadow-card relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center">
          
          {/* Segment Control Toggle */}
          <div className="flex bg-secondary/50 p-1 rounded-full mb-8 w-full max-w-xs relative border border-line/50">
            <motion.div layoutId="activeTab" className="absolute top-1 bottom-1 left-1 bg-surface rounded-full shadow-sm" style={{
            width: 'calc(50% - 4px)',
            x: isLogin ? 0 : '100%'
          }} transition={{
            type: 'spring',
            bounce: 0.2,
            duration: 0.6
          }} />
            <button onClick={() => setIsLogin(true)} className={`relative z-10 w-1/2 py-2 text-sm font-medium transition-colors ${isLogin ? 'text-ink' : 'text-subtle hover:text-ink'}`}>Sign In</button>
            <button onClick={() => setIsLogin(false)} className={`relative z-10 w-1/2 py-2 text-sm font-medium transition-colors ${!isLogin ? 'text-ink' : 'text-subtle hover:text-ink'}`}>Sign Up</button>
          </div>

          <div className="w-full">
            <AnimatePresence mode="wait">
              {isLogin ? <LoginForm key="login" onSwitchMode={() => setIsLogin(false)} /> : <SignupForm key="signup" onSwitchMode={() => setIsLogin(true)} />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>;
}