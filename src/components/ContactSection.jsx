import React, { useState } from 'react';
import { Send, Mail, Download, MapPin, CheckCircle, AlertCircle, Radio, Sparkles } from 'lucide-react';
import { IconGithub, IconLinkedin } from './common/Icons';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';

export default function ContactSection({ onOpenResume }) {
  const { contact } = PORTFOLIO_DATA;

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [transmissionStatus, setTransmissionStatus] = useState('idle'); // 'idle' | 'transmitting' | 'sent'

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Commander/Visitor name is required';
    if (!formData.email.trim()) {
      errors.email = 'Comms link (Email) is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Valid email frequency required (e.g., name@domain.com)';
    }
    if (!formData.message.trim()) {
      errors.message = 'Transmission packet message cannot be empty';
    } else if (formData.message.trim().length < 8) {
      errors.message = 'Please provide at least 8 characters';
    }
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      sounds.playCrash();
      return;
    }

    sounds.playBeep(800, 0.1);
    setTransmissionStatus('transmitting');

    setTimeout(() => {
      sounds.playAchievement();
      setTransmissionStatus('sent');
    }, 1200);
  };

  const mailtoHref = `mailto:${contact.email}?subject=${encodeURIComponent(
    `Portfolio Inbound: ${formData.name || 'Collaboration'}`
  )}&body=${encodeURIComponent(
    `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-3">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>SUBLIGHT TRANSMISSION FREQUENCY</span>
        </div>
        <h2 className="font-cyber text-3xl sm:text-5xl font-black text-white tracking-wide">
          MISSION <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">CONTROL</span>
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base font-mono">
          “{contact.tagline}”
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Mission Control Terminals & Direct Links */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl p-6 bg-[#080d21] border border-cyan-500/20 backdrop-blur-xl space-y-6">
            
            <div>
              <h3 className="font-cyber text-lg font-bold text-white mb-1 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                TRANSMISSION CHANNELS
              </h3>
              <p className="text-xs font-mono text-slate-400">{contact.availability}</p>
            </div>

            {/* Direct Connect Grid */}
            <div className="space-y-3 font-mono text-xs">
              
              {/* Email */}
              <a
                href={`mailto:${contact.email}`}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 flex items-center justify-between group transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">PRIMARY FREQUENCY</div>
                    <div className="text-white group-hover:text-cyan-300 font-semibold">{contact.email}</div>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 group-hover:text-cyan-400">
                  OPEN
                </span>
              </a>

              {/* GitHub */}
              <a
                href={contact.socials[0].url}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-900 flex items-center justify-between group transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-950 text-purple-400">
                    <IconGithub className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">CODE REPOSITORIES</div>
                    <div className="text-white group-hover:text-purple-300 font-semibold">{contact.socials[0].username}</div>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 group-hover:text-purple-400">
                  VISIT
                </span>
              </a>

              {/* LinkedIn */}
              <a
                href={contact.socials[1].url}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 flex items-center justify-between group transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-950 text-blue-400">
                    <IconLinkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">PROFESSIONAL NETWORK</div>
                    <div className="text-white group-hover:text-blue-300 font-semibold">{contact.socials[1].username}</div>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 group-hover:text-blue-400">
                  CONNECT
                </span>
              </a>

              {/* Location Node */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">PHYSICAL RADAR NODE</div>
                  <div className="text-white font-medium">{contact.location}</div>
                </div>
              </div>

            </div>

            {/* Resume Callout Card */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 to-cyan-950/40 border border-cyan-500/30 flex items-center justify-between">
              <div>
                <h4 className="font-cyber text-xs font-bold text-white">CURRICULUM VITAE</h4>
                <p className="text-[10px] font-mono text-slate-400">{contact.resume.filename}</p>
              </div>
              <button
                onClick={() => {
                  sounds.playBeep(700, 0.05);
                  onOpenResume();
                }}
                className="px-3.5 py-2 rounded-lg font-cyber text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> DOSSIER
              </button>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Terminal Contact Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl p-6 sm:p-8 bg-[#080d21] border border-cyan-500/20 backdrop-blur-xl relative">
            
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-cyber text-lg font-bold text-white">ENCRYPTED MESSAGE DISPATCH</h3>
                <p className="text-xs font-mono text-slate-400">Fill parameters below to initiate direct handshake</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                SSL 256-BIT SECURE
              </span>
            </div>

            {transmissionStatus === 'sent' ? (
              <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="font-cyber text-xl font-bold text-white">TRANSMISSION ENCRYPTED & PREPARED!</h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto font-sans leading-relaxed">
                  Thank you for reaching out, <strong>{formData.name}</strong>. Because this is a static client build, you can instantly dispatch this prepared message via your default email client:
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <a
                    href={mailtoHref}
                    className="px-6 py-2.5 rounded-xl font-cyber text-xs font-bold bg-emerald-400 text-slate-950 hover:bg-emerald-300 transition flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" /> DISPATCH VIA EMAIL NOW
                  </a>
                  <button
                    onClick={() => {
                      setFormData({ name: '', email: '', message: '' });
                      setTransmissionStatus('idle');
                    }}
                    className="px-5 py-2.5 rounded-xl font-cyber text-xs bg-slate-800 text-slate-300 hover:text-white transition"
                  >
                    SEND ANOTHER PACKET
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                {/* Name */}
                <div>
                  <label className="block text-slate-300 mb-1.5 font-cyber text-[11px] uppercase tracking-wider">
                    Sender Identifier (Your Name) *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Alex Rivers / Recruiter Node"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900 border ${
                      formErrors.name ? 'border-red-500' : 'border-slate-800 focus:border-cyan-400'
                    } text-white focus:outline-none transition`}
                  />
                  {formErrors.name && (
                    <p className="text-red-400 text-[10px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-slate-300 mb-1.5 font-cyber text-[11px] uppercase tracking-wider">
                    Frequency Return Address (Your Email) *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g., alex@company.com"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900 border ${
                      formErrors.email ? 'border-red-500' : 'border-slate-800 focus:border-cyan-400'
                    } text-white focus:outline-none transition`}
                  />
                  {formErrors.email && (
                    <p className="text-red-400 text-[10px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-slate-300 mb-1.5 font-cyber text-[11px] uppercase tracking-wider">
                    Transmission Content (Message / Opportunity) *
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your project, internship opportunity, or hackathon collaboration..."
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900 border ${
                      formErrors.message ? 'border-red-500' : 'border-slate-800 focus:border-cyan-400'
                    } text-white focus:outline-none transition resize-none`}
                  ></textarea>
                  {formErrors.message && (
                    <p className="text-red-400 text-[10px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {formErrors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="submit"
                    disabled={transmissionStatus === 'transmitting'}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-cyber text-xs font-bold bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 hover:text-white shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{transmissionStatus === 'transmitting' ? 'ENCRYPTING PACKET...' : 'SEND TRANSMISSION'}</span>
                  </button>

                  <span className="text-[10px] text-slate-500 text-center sm:text-right font-mono">
                    Zero spam guaranteed. Verified response within 24 hours.
                  </span>
                </div>
              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}

