import React, { useEffect, useState } from 'react';
import API_BASE, { getAuthToken } from '../api';
import { useNavigate } from 'react-router-dom';

export default function ProfileForm(){
  const [form, setForm] = useState({ name:'', email:'', skills:[], projects:[], github:'' });
  const [skillInput, setSkillInput] = useState('');
  const [proj, setProj] = useState({ title:'', description:'', link:'' });
  const token = getAuthToken();
  const navigate = useNavigate();

  useEffect(()=>{
    const load = async () => {
      const res = await fetch(`${API_BASE}/profiles/me`, { headers:{ Authorization:`Bearer ${token}` } });
      if (res.ok){ const data = await res.json(); setForm({
        name: data.name || '', email: data.email || '', skills: data.skills || [], projects: data.projects || [], github: data.github || ''
      })}
    }
    load();
  },[]);

  const addSkill = () => { if (skillInput.trim()){ setForm(f=>({...f, skills:[...f.skills, skillInput.trim()]})); setSkillInput(''); } }
  const removeSkill = idx => setForm(f=>({...f, skills: f.skills.filter((_,i)=>i!==idx)}));

  const addProject = () => { if (proj.title.trim()){ setForm(f=>({...f, projects:[...f.projects, proj]})); setProj({title:'',description:'',link:''}); } }
  const removeProject = idx => setForm(f=>({...f, projects: f.projects.filter((_,i)=>i!==idx)}));

  const submit = async () => {
    const res = await fetch(`${API_BASE}/profiles`, {
      method: 'POST', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
      body: JSON.stringify(form)
    });
    if (res.ok) navigate('/dashboard');
    else alert('Failed to save');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 py-8">
      <div className="w-full max-w-5xl h-[600px] bg-white p-0 rounded-3xl shadow-2xl border border-gray-100 flex flex-col md:flex-row overflow-hidden">
        {/* Form Section */}
        <div className="w-full md:w-1/2 h-full p-10 flex flex-col justify-center bg-gradient-to-br from-indigo-50 to-blue-100">
          <h2 className="text-3xl font-extrabold text-left text-indigo-700 mb-8 tracking-tight">Create / Edit Profile</h2>
          <div className="space-y-6">
            <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition" placeholder="Name" />
            <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition" placeholder="Email" />
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Skills</label>
              <div className="flex gap-2">
                <input value={skillInput} onChange={e=>setSkillInput(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg flex-1 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition" placeholder="Add skill" />
                <button type="button" onClick={addSkill} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition">Add</button>
              </div>
              <div className="mt-3 flex gap-2 flex-wrap">
                {form.skills.map((s,i)=> (
                  <span key={i} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full flex items-center">
                    {s} <button type="button" onClick={()=>removeSkill(i)} className="ml-2 text-red-500 hover:text-red-700 font-bold">×</button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Projects</h3>
              <input placeholder="Title" value={proj.title} onChange={e=>setProj({...proj, title:e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg my-1 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition" />
              <input placeholder="Link" value={proj.link} onChange={e=>setProj({...proj, link:e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg my-1 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition" />
              <textarea placeholder="Description" value={proj.description} onChange={e=>setProj({...proj, description:e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg my-1 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition" />
              <button type="button" onClick={addProject} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition mt-2">Add project</button>
              <div className="mt-3">
                {form.projects.map((p,i)=>(
                  <div key={i} className="border border-green-100 p-4 rounded-xl mb-4 bg-green-50">
                    <div className="flex justify-between items-center mb-1"><strong className="text-green-800">{p.title}</strong><button type="button" onClick={()=>removeProject(i)} className="text-red-500 hover:text-red-700 font-bold">remove</button></div>
                    <div className="text-gray-700 mb-1">{p.description}</div>
                    <a href={p.link} className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">{p.link}</a>
                  </div>
                ))}
              </div>
            </div>
            <input value={form.github} onChange={e=>setForm({...form, github:e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition" placeholder="GitHub link" />
            <div className="flex gap-3 mt-6">
              <button type="button" onClick={submit} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition">Save</button>
              <button type="button" onClick={()=>window.location.href='/profile/preview'} className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg shadow transition">Preview</button>
            </div>
          </div>
        </div>
        {/* Image/Illustration Section */}
        <div className="hidden md:flex w-1/2 h-full items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
          <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80" alt="Profile Illustration" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
