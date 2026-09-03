import React, { useState } from 'react';
import { ShieldAlert, Database, Users, Calendar, Plus, CheckCircle2, Edit3, Save, Lock, Bell, Activity, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { OFFICIAL_VOLUNTEERS } from '../api/client';

export default function AdminPanel() {
  const { user } = useAuth();
  const [volunteersList, setVolunteersList] = useState(OFFICIAL_VOLUNTEERS);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ round: '', venue: '', time: '', duty: '' });
  const [announcementText, setAnnouncementText] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  // Strictly render ONLY for Event Heads (Jathin V Banjan / Hasth R Karkera)
  if (user?.role !== 'ROLE_EVENT_HEAD') {
    return null;
  }

  const handleEditClick = (vol) => {
    setEditingId(vol.id);
    setEditForm({
      round: vol.assignedRound || 'ROUND 1 (AWAKENING)',
      venue: vol.assignedVenue || 'Nethravathi Seminar Hall (4th Floor)',
      time: vol.timeSlot || '09:30 AM - 12:00 PM',
      duty: vol.duty || 'Trial Supervision & Technical Assistance'
    });
  };

  const handleSaveClick = (id) => {
    setVolunteersList(prev => prev.map(v => {
      if (v.id === id) {
        return {
          ...v,
          assignedRound: editForm.round,
          assignedVenue: editForm.venue,
          timeSlot: editForm.time,
          duty: editForm.duty
        };
      }
      return v;
    }));
    setEditingId(null);
    setStatusMsg(`Updated assignment for Volunteer #${id} successfully!`);
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const handleBroadcastUrgent = (e) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    localStorage.setItem("leviathan_urgent_command", announcementText.trim());
    setStatusMsg("URGENT COMMAND BROADCASTED TO ALL VOLUNTEERS!");
    setAnnouncementText('');
    setTimeout(() => setStatusMsg(''), 5000);
  };

  return (
    <section id="admin-panel" className="py-24 relative border-t border-stone-800/40 bg-stone-950/95 bg-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.3em] text-crimson-500 uppercase block mb-2">
            ADMINISTRATIVE COMMAND CENTER
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-wide uppercase mb-4">
            EVENT HEAD ADMIN PANEL
          </h2>
          <p className="text-xs text-stone-400 font-mono">
            COMMANDER: <strong className="text-crimson-400">{user.name}</strong> • REAL-TIME OPERATIONAL ACCESS
          </p>
          <div className="w-16 h-1 bg-crimson-600 mx-auto rounded-full mt-4" />
        </div>

        {statusMsg && (
          <div className="max-w-4xl mx-auto mb-8 p-4 rounded-xl bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-bold flex items-center space-x-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Live Operational Portal Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur">
            <Users className="w-5 h-5 text-crimson-500 mb-2" />
            <span className="text-[10px] text-stone-500 block uppercase font-mono">TOTAL VOLUNTEERS</span>
            <span className="text-xl font-bold text-white uppercase font-mono">20 VOLUNTEERS</span>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur">
            <Activity className="w-5 h-5 text-emerald-400 mb-2" />
            <span className="text-[10px] text-stone-500 block uppercase font-mono">ACTIVE IT MANAGER TEAM</span>
            <span className="text-xl font-bold text-emerald-400 uppercase font-mono">15 ACTIVE</span>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur">
            <MapPin className="w-5 h-5 text-crimson-500 mb-2" />
            <span className="text-[10px] text-stone-500 block uppercase font-mono">OPERATIONAL VENUES</span>
            <span className="text-xl font-bold text-white uppercase font-mono">3 VENUES</span>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur">
            <Database className="w-5 h-5 text-crimson-500 mb-2" />
            <span className="text-[10px] text-stone-500 block uppercase font-mono">DATABASE SYSTEM</span>
            <span className="text-xl font-bold text-white uppercase font-mono">POSTGRESQL READY</span>
          </div>
        </div>

        {/* Broadcast Urgent Command to Volunteer Screens */}
        <div className="max-w-4xl mx-auto mb-16 p-8 rounded-3xl bg-stone-900/80 border border-crimson-900/60 space-y-4 shadow-[0_0_40px_rgba(220,38,38,0.2)]">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-crimson-500 animate-pulse" />
            <h3 className="font-display font-bold text-lg text-white uppercase">
              BROADCAST URGENT COMMAND TO VOLUNTEER SCREENS
            </h3>
          </div>

          <form onSubmit={handleBroadcastUrgent} className="space-y-4">
            <textarea
              rows={3}
              required
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              placeholder="Type urgent command instruction (e.g., All volunteers report to Nethravathi 4th Floor immediately)..."
              className="w-full p-4 rounded-xl bg-stone-950 border border-stone-800 text-white text-sm focus:outline-none focus:border-crimson-600 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-crimson-700 via-crimson-600 to-red-600 text-white font-extrabold text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center space-x-2 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
            >
              <Plus className="w-4 h-4" />
              <span>BROADCAST TO VOLUNTEERS</span>
            </button>
          </form>
        </div>

        {/* Volunteer Duty Assignment Manager */}
        <div className="p-8 rounded-3xl bg-stone-900/80 border border-stone-800/90 backdrop-blur space-y-6">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-crimson-500" />
              <h3 className="font-display font-bold text-lg text-white uppercase">
                VOLUNTEER DUTY ASSIGNMENT EDITOR (20 RECS)
              </h3>
            </div>
            <span className="text-xs font-mono text-stone-400">
              COMMANDERS: <strong className="text-white">JATHIN & HASTH</strong>
            </span>
          </div>

          {/* Volunteer Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-stone-800 text-stone-400 uppercase text-[10px]">
                  <th className="py-3 px-2">ID</th>
                  <th className="py-3 px-2">NAME</th>
                  <th className="py-3 px-2">USN</th>
                  <th className="py-3 px-2">ASSIGNED ROUND</th>
                  <th className="py-3 px-2">VENUE</th>
                  <th className="py-3 px-2">DUTY RESPONSIBILITY</th>
                  <th className="py-3 px-2 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60">
                {volunteersList.map((vol) => (
                  <tr key={vol.id} className="hover:bg-stone-950/60 transition-colors">
                    <td className="py-3 px-2 font-bold text-stone-500">#{vol.id}</td>
                    <td className="py-3 px-2 font-bold text-white uppercase">{vol.name}</td>
                    <td className="py-3 px-2 text-stone-400">{vol.usn}</td>

                    {editingId === vol.id ? (
                      <>
                        <td className="py-2 px-1">
                          <input
                            type="text"
                            value={editForm.round}
                            onChange={(e) => setEditForm({ ...editForm, round: e.target.value })}
                            className="w-full p-1.5 rounded bg-stone-950 border border-crimson-600 text-white text-xs"
                          />
                        </td>
                        <td className="py-2 px-1">
                          <input
                            type="text"
                            value={editForm.venue}
                            onChange={(e) => setEditForm({ ...editForm, venue: e.target.value })}
                            className="w-full p-1.5 rounded bg-stone-950 border border-crimson-600 text-white text-xs"
                          />
                        </td>
                        <td className="py-2 px-1">
                          <input
                            type="text"
                            value={editForm.duty}
                            onChange={(e) => setEditForm({ ...editForm, duty: e.target.value })}
                            className="w-full p-1.5 rounded bg-stone-950 border border-crimson-600 text-white text-xs"
                          />
                        </td>
                        <td className="py-2 px-1 text-right">
                          <button
                            onClick={() => handleSaveClick(vol.id)}
                            className="px-3 py-1 rounded bg-emerald-600 text-white font-bold text-[10px] uppercase flex items-center space-x-1 ml-auto"
                          >
                            <Save className="w-3 h-3" />
                            <span>SAVE</span>
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-3 px-2 text-crimson-400 font-bold">{vol.assignedRound}</td>
                        <td className="py-3 px-2 text-stone-300">{vol.assignedVenue}</td>
                        <td className="py-3 px-2 text-stone-400">{vol.duty}</td>
                        <td className="py-3 px-2 text-right">
                          <button
                            onClick={() => handleEditClick(vol)}
                            className="px-2.5 py-1 rounded bg-stone-800 hover:bg-crimson-950 hover:text-crimson-400 text-stone-300 transition-colors text-[10px] font-bold uppercase inline-flex items-center space-x-1"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>EDIT</span>
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
