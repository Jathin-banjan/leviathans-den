import React, { useState } from 'react';
import { X, Lock, Mail, ShieldAlert, KeyRound, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginModal({ isOpen, onClose }) {
  const [emailOrName, setEmailOrName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(emailOrName, password);
    setLoading(false);

    if (res.success) {
      onClose();
    } else {
      setError(res.error || 'Authentication failed! Check Name/Password.');
    }
  };

  const handleQuickFill = (name, pass) => {
    setEmailOrName(name);
    setPassword(pass);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md p-8 rounded-3xl bg-stone-950 border border-stone-800 shadow-[0_0_50px_rgba(220,38,38,0.2)]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-white hover:border-crimson-600 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Title */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-crimson-950/80 border border-crimson-700 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_#dc2626]">
            <KeyRound className="w-7 h-7 text-crimson-500" />
          </div>
          <span className="text-[10px] font-bold tracking-[0.3em] text-crimson-500 uppercase block mb-1">
            PORTAL AUTHENTICATION
          </span>
          <h3 className="font-display font-black text-2xl text-white uppercase tracking-wide">
            COMMAND ACCESS
          </h3>
          <p className="text-xs text-stone-400 mt-1 font-light">
            Authenticate as Event Commander or Volunteer.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-crimson-950/80 border border-crimson-700 text-crimson-400 text-xs font-semibold flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[10px] font-bold tracking-widest text-stone-400 uppercase block mb-2">
              COMMANDER / VOLUNTEER NAME
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={emailOrName}
                onChange={(e) => setEmailOrName(e.target.value)}
                placeholder="JATHIN V BANJAN or HASTH R KARKERA"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-crimson-600 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-widest text-stone-400 uppercase block mb-2">
              AUTHENTICATION PASSWORD
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="head123 or event123"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-stone-900 border border-stone-800 text-white text-sm focus:outline-none focus:border-crimson-600 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-crimson-700 via-crimson-600 to-red-600 text-white font-extrabold text-xs uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(220,38,38,0.5)] hover:brightness-110 transition-all"
          >
            {loading ? 'AUTHENTICATING...' : 'ACCESS COMMAND PORTAL'}
          </button>
        </form>

        {/* Demo Quick Fills */}
        <div className="mt-8 pt-6 border-t border-stone-800/80 text-center space-y-3">
          <span className="text-[10px] font-bold tracking-widest text-stone-500 uppercase block">
            QUICK AUTHENTICATION PRESETS
          </span>
          <div className="flex flex-col space-y-2 text-xs">
            <button
              onClick={() => handleQuickFill('JATHIN V BANJAN', 'head123')}
              className="px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 hover:border-crimson-700 text-stone-300 hover:text-white transition-all text-[11px] font-mono text-left flex justify-between items-center"
            >
              <span>JATHIN V BANJAN (HEAD)</span>
              <code className="text-crimson-400">head123</code>
            </button>
            <button
              onClick={() => handleQuickFill('HASTH R KARKERA', 'head123')}
              className="px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 hover:border-crimson-700 text-stone-300 hover:text-white transition-all text-[11px] font-mono text-left flex justify-between items-center"
            >
              <span>HASTH R KARKERA (HEAD)</span>
              <code className="text-crimson-400">head123</code>
            </button>
            <button
              onClick={() => handleQuickFill('Dhanush', 'event123')}
              className="px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 hover:border-crimson-700 text-stone-300 hover:text-white transition-all text-[11px] font-mono text-left flex justify-between items-center"
            >
              <span>VOLUNTEER AUTHENTICATION</span>
              <code className="text-emerald-400">event123</code>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
