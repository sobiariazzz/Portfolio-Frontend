import React, { useState } from 'react';
import API_BASE, { setAuthToken } from '../api';

export default function Register(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST', headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) { setAuthToken(data.token); window.location.href = '/dashboard'; }
      else setMsg(data.message || 'Error');
    } catch (err) { setMsg('Network error'); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100">
      <div className="w-full max-w-4xl h-[500px] bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col md:flex-row overflow-hidden">
        {/* Form Section */}
        <div className="w-full md:w-1/2 h-full p-8 flex flex-col justify-center bg-gradient-to-br from-green-50 to-blue-100">
          <h2 className="text-3xl font-extrabold text-left text-green-700 mb-6 tracking-tight">Create your account</h2>
          {msg && <div className="mb-4 text-center text-red-600 font-medium">{msg}</div>}
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Email</label>
              <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none transition" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Password</label>
              <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none transition" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
            <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow transition">Register</button>
          </form>
        </div>
        {/* Image Section */}
        <div className="hidden md:flex w-1/2 h-full items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="Register Illustration" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
