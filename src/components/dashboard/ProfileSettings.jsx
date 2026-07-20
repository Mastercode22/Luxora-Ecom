import { useState, useRef } from "react";
import { useUser } from "../../context/UserContext";
import { FiCamera, FiUpload, FiTrash2, FiSave, FiX, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfileSettings() {
  const { user, updateProfile } = useUser();
  const [formData, setFormData] = useState({ ...user.profile });
  const [previewAvatar, setPreviewAvatar] = useState(user.profile.avatar);
  const [toast, setToast] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewAvatar(url);
      setFormData(prev => ({ ...prev, avatar: url }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const handleReset = () => {
    setFormData({ ...user.profile });
    setPreviewAvatar(user.profile.avatar);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif italic text-3xl text-white">My Profile</h1>
          <p className="text-white/60 mt-1">Manage your personal information and avatar.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-surface/50 backdrop-blur-md border border-line/60 rounded-3xl p-6 md:p-8 space-y-10">
        
        {/* Avatar Section */}
        <div>
          <h2 className="text-lg font-medium text-white mb-6">Profile Picture</h2>
          <div className="flex items-center gap-6">
            <div className="relative group w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-line/60 shrink-0 bg-secondary/50">
              <img src={previewAvatar} alt="Profile" className="w-full h-full object-cover" />
              <div 
                className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <FiCamera className="text-white" size={24} />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary/20 hover:bg-primary/30 text-primary rounded-xl font-medium transition-colors"
              >
                <FiUpload /> Upload New
              </button>
              <button
                type="button"
                onClick={() => {
                  setPreviewAvatar("https://via.placeholder.com/256");
                  setFormData(prev => ({ ...prev, avatar: "https://via.placeholder.com/256" }));
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl font-medium transition-colors"
              >
                <FiTrash2 /> Remove
              </button>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/png, image/jpeg, image/webp" 
              className="hidden" 
            />
          </div>
          <p className="text-white/40 text-sm mt-4">Supported formats: JPEG, PNG, WEBP. Max size: 2MB.</p>
        </div>

        {/* Personal Info Grid */}
        <div>
          <h2 className="text-lg font-medium text-white mb-6">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-white/70 text-sm font-medium">Full Name</label>
              <input 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-white/70 text-sm font-medium">Username</label>
              <input 
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-white/70 text-sm font-medium">Email Address</label>
              <input 
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-white/70 text-sm font-medium">Phone Number</label>
              <input 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-white/70 text-sm font-medium">Date of Birth</label>
              <input 
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-white/70 text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-white/70 text-sm font-medium">Biography</label>
              <textarea 
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className="w-full bg-secondary/30 border border-line/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-line/60">
          <button type="submit" className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-all shadow-[0_4px_20px_-4px_rgba(233,30,99,0.3)]">
            Save Changes
          </button>
          <button type="button" onClick={handleReset} className="px-8 py-3 bg-secondary/50 hover:bg-secondary text-white font-medium rounded-xl transition-all">
            Cancel
          </button>
        </div>
      </form>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-[9999] bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 font-medium"
          >
            <FiCheck size={20} />
            Profile updated successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
