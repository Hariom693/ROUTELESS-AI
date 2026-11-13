import { Users, Search, MapPin } from 'lucide-react'
import { useState } from 'react'
import { VILLAGES } from '../../lib/constants'

const SAMPLE_STUDENTS = [
  { id: 'stu-1', name: 'Priya Sundaram', email: 'priya.s@college.edu', village: 'Kovilpatti', phone: '+91 98765 43210', registered: '01 Nov 2026', lastLogin: '13 Nov 07:15 AM' },
  { id: 'stu-2', name: 'Karthik Murugan', email: 'karthik.m@college.edu', village: 'Sivakasi', phone: '+91 97865 12345', registered: '02 Nov 2026', lastLogin: '13 Nov 07:00 AM' },
  { id: 'stu-3', name: 'Lakshmi Ranganathan', email: 'lakshmi.r@college.edu', village: 'Sankarankovil', phone: '+91 94431 56789', registered: '01 Nov 2026', lastLogin: '13 Nov 06:45 AM' },
  { id: 'stu-4', name: 'Venkatesh Subramanian', email: 'venkat.s@college.edu', village: 'Rajapalayam', phone: '+91 96772 98765', registered: '03 Nov 2026', lastLogin: '12 Nov 05:30 PM' },
  { id: 'stu-5', name: 'Divya Prabhakar', email: 'divya.p@college.edu', village: 'Virudhunagar', phone: '+91 94872 34567', registered: '04 Nov 2026', lastLogin: '13 Nov 07:30 AM' },
  { id: 'stu-6', name: 'Aravind Kumar', email: 'aravind.k@college.edu', village: 'Kovilpatti', phone: '+91 99876 11111', registered: '05 Nov 2026', lastLogin: '13 Nov 06:58 AM' },
  { id: 'stu-7', name: 'Meenakshi Selvam', email: 'meenakshi.s@college.edu', village: 'Sivakasi', phone: '+91 97654 22222', registered: '06 Nov 2026', lastLogin: '12 Nov 04:10 PM' },
  { id: 'stu-8', name: 'Ramesh Pandian', email: 'ramesh.p@college.edu', village: 'Rajapalayam', phone: '+91 96543 33333', registered: '07 Nov 2026', lastLogin: '13 Nov 07:10 AM' },
  { id: 'stu-9', name: 'Suganya Natarajan', email: 'suganya.n@college.edu', village: 'Sankarankovil', phone: '+91 95432 44444', registered: '08 Nov 2026', lastLogin: '13 Nov 07:20 AM' },
  { id: 'stu-10', name: 'Balaji Krishnan', email: 'balaji.k@college.edu', village: 'Virudhunagar', phone: '+91 94321 55555', registered: '09 Nov 2026', lastLogin: '11 Nov 08:00 AM' },
]

export default function Students() {
  const [search, setSearch] = useState('')
  const [villageFilter, setVillageFilter] = useState('all')

  const filtered = SAMPLE_STUDENTS.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase())
    const matchesVillage = villageFilter === 'all' || s.village === villageFilter
    return matchesSearch && matchesVillage
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-7 h-7 text-blue-600" />
            <span>Registered Student Directory</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Total: 487 registered • Active today: 234 • New this week: 12</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 pr-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:border-emerald-500 outline-none w-60 bg-white" />
        </div>
        <select value={villageFilter} onChange={(e) => setVillageFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-emerald-500 outline-none bg-white">
          <option value="all">All Villages</option>
          {VILLAGES.map((v) => <option key={v.id} value={v.name}>{v.name}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/60 text-slate-400 uppercase tracking-wider font-semibold">
              <th className="px-5 py-3">Student Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Village</th>
              <th className="px-5 py-3">Phone</th>
              <th className="px-5 py-3">Registered</th>
              <th className="px-5 py-3">Last Login</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/60">
                <td className="px-5 py-3 font-bold text-slate-900">{s.name}</td>
                <td className="px-5 py-3 text-slate-500">{s.email}</td>
                <td className="px-5 py-3 flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" />{s.village}</td>
                <td className="px-5 py-3">{s.phone}</td>
                <td className="px-5 py-3">{s.registered}</td>
                <td className="px-5 py-3 text-emerald-700 font-semibold">{s.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
