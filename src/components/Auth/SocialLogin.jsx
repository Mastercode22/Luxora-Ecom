import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebook } from 'react-icons/fa';
export default function SocialLogin() {
  
return <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-line"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-section text-subtle">Or Continue Wit</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <button type="button" className="flex justify-center items-center py-2 px-4 border border-line rounded-card hover:bg-surface transition-colors">
          <FcGoogle size={20} />
        </button>
        <button type="button" className="flex justify-center items-center py-2 px-4 border border-line rounded-card hover:bg-surface transition-colors text-ink">
          <FaApple size={20} />
        </button>
        <button type="button" className="flex justify-center items-center py-2 px-4 border border-line rounded-card hover:bg-surface transition-colors text-blue-600">
          <FaFacebook size={20} />
        </button>
      </div>
    </div>;
}