import React, { useEffect, useState } from 'react';
import API_BASE, { getAuthToken, setAuthToken } from '../api';
import { Link } from 'react-router-dom';

export default function Dashboard(){
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const load = async () => {
      const token = getAuthToken();
      try {
        const res = await fetch(`${API_BASE}/profiles/me`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        } else if (res.status === 401) { setAuthToken(null); window.location.href = '/login'; }
      } catch (err) { console.error(err); }
      setLoading(false);
    }
    load();
  },[]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500 text-lg">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-8 tracking-tight">Dashboard</h2>
        {profile ? (
          <div className="space-y-6">
            <div className="bg-indigo-50 p-6 rounded-2xl shadow flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-2xl font-bold text-indigo-800">{profile.name || 'No name set'}</h3>
                <p className="text-gray-600">{profile.email}</p>
                <p className="text-gray-500 mt-1">Skills: <span className="font-medium text-indigo-700">{(profile.skills||[]).join(', ')}</span></p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-3">
                <Link to="/profile/edit" className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold rounded-lg shadow transition">Edit</Link>
                <Link to="/profile/preview" className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow transition">Preview</Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-indigo-50 p-6 rounded-2xl shadow text-center">
            <p className="text-gray-700">You don't have a profile yet.</p>
            <Link to="/profile/edit" className="inline-block mt-4 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition">Create Profile</Link>
          </div>
        )}
      </div>
    </div>
  );
}
