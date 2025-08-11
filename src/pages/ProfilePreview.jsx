import React, { useEffect, useState } from 'react';
import API_BASE, { getAuthToken } from '../api';

export default function ProfilePreview(){
  const [profile, setProfile] = useState(null);
  useEffect(()=>{
    const load = async () => {
      const token = getAuthToken();
      const res = await fetch(`${API_BASE}/profiles/me`, { headers:{ Authorization:`Bearer ${token}` } });
      if (res.ok) setProfile(await res.json());
    }
    load();
  },[]);

  if (!profile) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500 text-lg">No profile to preview</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 py-8">
      <div className="w-full max-w-3xl bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">{profile.name}</h1>
          <p className="text-gray-500 mb-1">{profile.email}</p>
          <a href={profile.github} className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">{profile.github}</a>
        </header>
        <section className="mb-8">
          <h2 className="font-semibold text-lg mb-2 text-indigo-700">Skills</h2>
          <div className="flex gap-2 flex-wrap">{(profile.skills||[]).map((s,i)=>(<span key={i} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">{s}</span>))}</div>
        </section>
        <section>
          <h2 className="font-semibold text-lg mb-2 text-indigo-700">Projects</h2>
          {(profile.projects||[]).map((p,i)=>(
            <div key={i} className="border border-indigo-100 p-4 rounded-xl mb-4 bg-indigo-50">
              <h3 className="text-xl font-bold text-indigo-800 mb-1">{p.title}</h3>
              <p className="text-gray-700 mb-1">{p.description}</p>
              <a href={p.link} className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">{p.link}</a>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
