import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { 
  MdOutlineDashboard, 
  MdBookmarkAdded, 
  MdLogout,
  MdRefresh,
  MdDeleteOutline
} from "react-icons/md";
import { FaRegUser, FaRegComment, FaUsers, FaCalendarAlt, FaClock } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";

// ─────────────────────────────────────────────────────────────
//  Admin Page – Only accessible to users with role='admin'
// ─────────────────────────────────────────────────────────────

const Admin = () => {
  const { user, token, logout } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('dashboard')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalComments: 0,
    totalMenu: 0,
    totalBlog: 0
  })
  const [recentBookings, setRecentBookings] = useState([])
  const [recentComments, setRecentComments] = useState([])
  
  // Tab-specific detailed lists
  const [usersList, setUsersList] = useState([])
  const [bookingsList, setBookingsList] = useState([])
  const [commentsList, setCommentsList] = useState([])

  // Fetch Dashboard Stats
  async function fetchDashboardStats() {
    setLoading(true)
    try {
      const config = {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        withCredentials: true
      }

      // Try dedicated admin stats endpoint first
      try {
        const res = await axios.get('http://localhost:1000/admin/stats', config)
        if (res.data?.stats) {
          setStats(res.data.stats)
          setRecentBookings(res.data.recentBookings || [])
          setRecentComments(res.data.recentComments || [])
          setLoading(false)
          return
        }
      } catch (err) {
        console.warn('Dedicated stats endpoint fallback:', err.message)
      }

      // Fallback: Fetch directly from existing routes in parallel
      const [bookRes, commRes] = await Promise.all([
        axios.get('http://localhost:1000/booking/read', config).catch(() => ({ data: { readBooking: [] } })),
        axios.get('http://localhost:1000/comment/read', config).catch(() => ({ data: { readComment: [] } }))
      ])

      const bookings = bookRes.data.readBooking || []
      const comments = commRes.data.readComment || []

      setStats({
        totalUsers: 0,
        totalBookings: bookings.length,
        totalComments: comments.length,
        totalMenu: 0,
        totalBlog: 0
      })
      setRecentBookings(bookings.slice(0, 5))
      setRecentComments(comments.slice(0, 5))
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch Tab Specific Data on Tab Switch
  async function fetchTabData(tab) {
    const config = {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      withCredentials: true
    }
    try {
      if (tab === 'users') {
        const res = await axios.get('http://localhost:1000/admin/users', config)
        setUsersList(res.data.users || [])
      } else if (tab === 'bookings') {
        const res = await axios.get('http://localhost:1000/booking/read', config)
        setBookingsList(res.data.readBooking || [])
      } else if (tab === 'comments') {
        const res = await axios.get('http://localhost:1000/comment/read', config)
        setCommentsList(res.data.readComment || [])
      }
    } catch (err) {
      console.error(`Error loading ${tab} data:`, err)
    }
  }

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  useEffect(() => {
    if (activeTab !== 'dashboard') {
      fetchTabData(activeTab)
    }
  }, [activeTab])

  // Delete Handlers
  async function handleDeleteBooking(id) {
    if (!window.confirm("Are you sure you want to delete this booking?")) return
    try {
      await axios.delete(`http://localhost:1000/booking/delete/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        withCredentials: true
      })
      fetchTabData('bookings')
      fetchDashboardStats()
    } catch (err) {
      alert("Failed to delete booking: " + (err.response?.data?.msg || err.message))
    }
  }

  async function handleDeleteComment(id) {
    if (!window.confirm("Are you sure you want to delete this comment?")) return
    try {
      await axios.delete(`http://localhost:1000/comment/delete/${id}`, {
        withCredentials: true
      })
      fetchTabData('comments')
      fetchDashboardStats()
    } catch (err) {
      alert("Failed to delete comment: " + (err.response?.data?.msg || err.message))
    }
  }

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] font-sans">
      {/* Top Banner Header */}
      <div className="w-full bg-[#121d27] border-b border-[#22313f] px-8 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#c5a572]/20 border border-[#c5a572] flex items-center justify-center text-[#c5a572] font-serif font-bold text-xl">
            C
          </div>
          <div>
            <h1 className="text-2xl text-[#c5a572] font-serif font-semibold tracking-wide">
              Admin Dashboard
            </h1>
            <p className="text-xs text-gray-400">Coffee House Control Center</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={fetchDashboardStats}
            title="Refresh Data"
            className="flex items-center gap-1.5 text-xs text-[#c5a572] hover:text-white bg-[#1a2836] border border-[#c5a572]/30 px-3 py-1.5 rounded-lg transition cursor-pointer"
          >
            <MdRefresh className="text-base" /> Refresh
          </button>
          <div className="text-right">
            <p className="text-sm text-white font-medium">{user?.name || 'Administrator'}</p>
            <p className="text-xs text-[#c5a572] uppercase tracking-wider">{user?.role || 'admin'}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs bg-red-500/15 text-red-400 border border-red-500/30 px-3.5 py-2 rounded-lg hover:bg-red-500 hover:text-white transition cursor-pointer"
          >
            <MdLogout className="text-base" /> Logout
          </button>
        </div>
      </div>

      {/* Main Layout: Left Sidebar + Right Content Area */}
      <div className="flex flex-1">
        
        {/* Sidebar */}
        <aside className="w-64 bg-[#F4EEE4] border-r border-[#e3d7c5] flex flex-col justify-between py-6 px-4 shadow-inner">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-[#8a7a6c] uppercase tracking-wider px-3 mb-1">
              Menu Navigation
            </span>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-[#121d27] text-[#c5a572] shadow-md font-semibold'
                  : 'text-[#443831] hover:bg-[#e7dcce] hover:text-black'
              }`}
            >
              <MdOutlineDashboard className="text-lg" /> Dashboard Overview
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-[#121d27] text-[#c5a572] shadow-md font-semibold'
                  : 'text-[#443831] hover:bg-[#e7dcce] hover:text-black'
              }`}
            >
              <div className="flex items-center gap-3">
                <FaRegUser className="text-lg" /> Users
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/70 text-gray-700 font-bold">
                {stats.totalUsers}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-[#121d27] text-[#c5a572] shadow-md font-semibold'
                  : 'text-[#443831] hover:bg-[#e7dcce] hover:text-black'
              }`}
            >
              <div className="flex items-center gap-3">
                <MdBookmarkAdded className="text-lg" /> Table Bookings
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/70 text-gray-700 font-bold">
                {stats.totalBookings}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('comments')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
                activeTab === 'comments'
                  ? 'bg-[#121d27] text-[#c5a572] shadow-md font-semibold'
                  : 'text-[#443831] hover:bg-[#e7dcce] hover:text-black'
              }`}
            >
              <div className="flex items-center gap-3">
                <FaRegComment className="text-lg" /> Comments
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/70 text-gray-700 font-bold">
                {stats.totalComments}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('menu')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
                activeTab === 'menu'
                  ? 'bg-[#121d27] text-[#c5a572] shadow-md font-semibold'
                  : 'text-[#443831] hover:bg-[#e7dcce] hover:text-black'
              }`}
            >
              <BiFoodMenu className="text-lg" /> Menu Items
            </button>

            <button
              onClick={() => setActiveTab('blog')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
                activeTab === 'blog'
                  ? 'bg-[#121d27] text-[#c5a572] shadow-md font-semibold'
                  : 'text-[#443831] hover:bg-[#e7dcce] hover:text-black'
              }`}
            >
              <GrBlog className="text-lg" /> Blogs
            </button>
          </div>

          <div className="mt-8 p-3 rounded-xl bg-white/50 border border-[#e3d7c5] text-center text-xs text-[#705e4f]">
            Logged in as <strong className="text-[#121d27]">{user?.email}</strong>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          
          {/* ══════════════════════════════════════════════════════
              TAB 1: DASHBOARD (TOTAL STATS ON ONE PAGE)
             ══════════════════════════════════════════════════════ */}
          {activeTab === 'dashboard' && (
            <div>
              {/* Header Title */}
              <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-serif text-[#121d27] font-bold">
                    System Overview
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Live metrics for registered users, customer bookings, and community feedback.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-xs font-semibold bg-[#121d27] text-[#c5a572] px-4 py-2 rounded-lg hover:bg-black transition cursor-pointer"
                  >
                    View All Bookings
                  </button>
                  <button
                    onClick={() => setActiveTab('comments')}
                    className="text-xs font-semibold bg-[#c5a572] text-[#121d27] px-4 py-2 rounded-lg hover:bg-[#b59560] transition cursor-pointer"
                  >
                    View Comments
                  </button>
                </div>
              </div>

              {/* 3 STATS CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                
                {/* 1. Total Users */}
                <div 
                  onClick={() => setActiveTab('users')}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8dfd3] hover:shadow-md hover:border-[#c5a572] transition cursor-pointer flex justify-between items-center group"
                >
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Total Users
                    </span>
                    <h3 className="text-4xl font-extrabold text-[#121d27] mt-2 group-hover:text-[#c5a572] transition">
                      {loading ? (
                        <span className="inline-block animate-pulse">...</span>
                      ) : (
                        stats.totalUsers
                      )}
                    </h3>
                    <p className="text-xs text-emerald-600 font-medium mt-1">
                      Active accounts
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-[#F4EEE4] flex items-center justify-center text-[#c5a572] text-2xl group-hover:scale-110 group-hover:bg-[#121d27] transition">
                    <FaUsers />
                  </div>
                </div>

                {/* 2. Total Table Bookings */}
                <div 
                  onClick={() => setActiveTab('bookings')}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8dfd3] hover:shadow-md hover:border-[#c5a572] transition cursor-pointer flex justify-between items-center group"
                >
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Total Table Bookings
                    </span>
                    <h3 className="text-4xl font-extrabold text-[#121d27] mt-2 group-hover:text-[#c5a572] transition">
                      {loading ? (
                        <span className="inline-block animate-pulse">...</span>
                      ) : (
                        stats.totalBookings
                      )}
                    </h3>
                    <p className="text-xs text-[#c5a572] font-medium mt-1">
                      Reservations made
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-[#F4EEE4] flex items-center justify-center text-[#c5a572] text-2xl group-hover:scale-110 group-hover:bg-[#121d27] transition">
                    <MdBookmarkAdded />
                  </div>
                </div>

                {/* 3. Total Comments */}
                <div 
                  onClick={() => setActiveTab('comments')}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8dfd3] hover:shadow-md hover:border-[#c5a572] transition cursor-pointer flex justify-between items-center group"
                >
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Total Comments
                    </span>
                    <h3 className="text-4xl font-extrabold text-[#121d27] mt-2 group-hover:text-[#c5a572] transition">
                      {loading ? (
                        <span className="inline-block animate-pulse">...</span>
                      ) : (
                        stats.totalComments
                      )}
                    </h3>
                    <p className="text-xs text-blue-600 font-medium mt-1">
                      Customer feedback & blogs
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-[#F4EEE4] flex items-center justify-center text-[#c5a572] text-2xl group-hover:scale-110 group-hover:bg-[#121d27] transition">
                    <FaRegComment />
                  </div>
                </div>

              </div>

              {/* 2 PREVIEWS ON ONE PAGE: Recent Bookings & Comments */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Recent Bookings Preview */}
                <div className="bg-white rounded-2xl p-6 border border-[#e8dfd3] shadow-sm">
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                    <h4 className="font-serif font-bold text-lg text-[#121d27] flex items-center gap-2">
                      <MdBookmarkAdded className="text-[#c5a572]" /> Recent Table Bookings
                    </h4>
                    <button
                      onClick={() => setActiveTab('bookings')}
                      className="text-xs text-[#c5a572] hover:underline font-semibold cursor-pointer"
                    >
                      See All →
                    </button>
                  </div>

                  {recentBookings.length === 0 ? (
                    <p className="text-sm text-gray-400 py-6 text-center">No bookings found yet.</p>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {recentBookings.map((b) => (
                        <div key={b._id} className="py-3 flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-sm text-[#121d27]">{b.name}</p>
                            <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                              <span className="flex items-center gap-1">
                                <FaCalendarAlt className="text-[10px]" /> 
                                {b.date ? new Date(b.date).toLocaleDateString() : 'N/A'}
                              </span>
                              <span className="flex items-center gap-1">
                                <FaClock className="text-[10px]" /> {b.time}
                              </span>
                            </div>
                          </div>
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F4EEE4] text-[#121d27]">
                            {b.seats} Seats
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent Comments Preview */}
                <div className="bg-white rounded-2xl p-6 border border-[#e8dfd3] shadow-sm">
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                    <h4 className="font-serif font-bold text-lg text-[#121d27] flex items-center gap-2">
                      <FaRegComment className="text-[#c5a572]" /> Recent Comments
                    </h4>
                    <button
                      onClick={() => setActiveTab('comments')}
                      className="text-xs text-[#c5a572] hover:underline font-semibold cursor-pointer"
                    >
                      See All →
                    </button>
                  </div>

                  {recentComments.length === 0 ? (
                    <p className="text-sm text-gray-400 py-6 text-center">No comments found yet.</p>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {recentComments.map((c) => (
                        <div key={c._id} className="py-3">
                          <div className="flex justify-between items-center">
                            <p className="font-semibold text-sm text-[#121d27]">{c.name}</p>
                            <span className="text-[11px] text-gray-400">
                              {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ''}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2 italic">
                            "{c.comments}"
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════
              TAB 2: USERS LIST
             ══════════════════════════════════════════════════════ */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-2xl p-6 border border-[#e8dfd3] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#121d27]">Registered Users</h3>
                  <p className="text-xs text-gray-500">Manage all registered accounts</p>
                </div>
                <button
                  onClick={() => fetchTabData('users')}
                  className="text-xs flex items-center gap-1 bg-[#F4EEE4] px-3 py-1.5 rounded-lg text-gray-700 hover:bg-[#e7dcce] cursor-pointer"
                >
                  <MdRefresh /> Refresh
                </button>
              </div>

              {usersList.length === 0 ? (
                <p className="text-sm text-gray-400 py-8 text-center">No users found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-[#FAF7F2] text-xs uppercase text-gray-700 font-bold border-b border-gray-200">
                      <tr>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Role</th>
                        <th className="py-3 px-4">Registered Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {usersList.map((u) => (
                        <tr key={u._id} className="hover:bg-[#FAF7F2]/60">
                          <td className="py-3 px-4 font-semibold text-[#121d27]">{u.name || 'Anonymous'}</td>
                          <td className="py-3 px-4">{u.email}</td>
                          <td className="py-3 px-4">
                            <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                              u.role === 'admin' 
                                ? 'bg-amber-100 text-amber-800' 
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {u.role || 'user'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-xs text-gray-400">
                            {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════
              TAB 3: TABLE BOOKINGS LIST
             ══════════════════════════════════════════════════════ */}
          {activeTab === 'bookings' && (
            <div className="bg-white rounded-2xl p-6 border border-[#e8dfd3] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#121d27]">Table Bookings</h3>
                  <p className="text-xs text-gray-500">Manage all customer table reservations</p>
                </div>
                <button
                  onClick={() => fetchTabData('bookings')}
                  className="text-xs flex items-center gap-1 bg-[#F4EEE4] px-3 py-1.5 rounded-lg text-gray-700 hover:bg-[#e7dcce] cursor-pointer"
                >
                  <MdRefresh /> Refresh
                </button>
              </div>

              {bookingsList.length === 0 ? (
                <p className="text-sm text-gray-400 py-8 text-center">No bookings found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-[#FAF7F2] text-xs uppercase text-gray-700 font-bold border-b border-gray-200">
                      <tr>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Date & Time</th>
                        <th className="py-3 px-4">Seats</th>
                        <th className="py-3 px-4">Notes</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {bookingsList.map((b) => (
                        <tr key={b._id} className="hover:bg-[#FAF7F2]/60">
                          <td className="py-3 px-4">
                            <p className="font-semibold text-[#121d27]">{b.name}</p>
                            <p className="text-xs text-gray-400">{b.email}</p>
                          </td>
                          <td className="py-3 px-4 font-mono text-xs">{b.phone}</td>
                          <td className="py-3 px-4 text-xs">
                            <p className="font-semibold">{b.date ? new Date(b.date).toLocaleDateString() : 'N/A'}</p>
                            <p className="text-gray-500">{b.time}</p>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#F4EEE4] text-[#121d27]">
                              {b.seats} Seats
                            </span>
                          </td>
                          <td className="py-3 px-4 text-xs text-gray-500 max-w-xs truncate">{b.notes}</td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleDeleteBooking(b._id)}
                              className="text-red-500 hover:text-red-700 p-1.5 rounded hover:bg-red-50 transition cursor-pointer"
                              title="Delete booking"
                            >
                              <MdDeleteOutline className="text-lg" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════
              TAB 4: COMMENTS LIST
             ══════════════════════════════════════════════════════ */}
          {activeTab === 'comments' && (
            <div className="bg-white rounded-2xl p-6 border border-[#e8dfd3] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#121d27]">Customer Comments</h3>
                  <p className="text-xs text-gray-500">Reviews & comments posted by customers</p>
                </div>
                <button
                  onClick={() => fetchTabData('comments')}
                  className="text-xs flex items-center gap-1 bg-[#F4EEE4] px-3 py-1.5 rounded-lg text-gray-700 hover:bg-[#e7dcce] cursor-pointer"
                >
                  <MdRefresh /> Refresh
                </button>
              </div>

              {commentsList.length === 0 ? (
                <p className="text-sm text-gray-400 py-8 text-center">No comments found.</p>
              ) : (
                <div className="space-y-4">
                  {commentsList.map((c) => (
                    <div key={c._id} className="p-4 rounded-xl border border-gray-100 hover:border-[#c5a572]/50 bg-[#FAF7F2]/40 flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="font-bold text-sm text-[#121d27]">{c.name}</h4>
                          <span className="text-xs text-gray-400">{c.email}</span>
                          <span className="text-[10px] text-gray-400 bg-white px-2 py-0.5 rounded border border-gray-200">
                            {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ''}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mt-2 font-serif italic">
                          "{c.comments}"
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteComment(c._id)}
                        className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50 transition cursor-pointer"
                        title="Delete comment"
                      >
                        <MdDeleteOutline className="text-lg" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════
              OTHER TABS (MENU & BLOG)
             ══════════════════════════════════════════════════════ */}
          {activeTab === 'menu' && (
            <div className="bg-white rounded-2xl p-8 border border-[#e8dfd3] shadow-sm text-center">
              <BiFoodMenu className="text-5xl text-[#c5a572] mx-auto mb-3" />
              <h3 className="text-2xl font-serif font-bold text-[#121d27]">Menu Management</h3>
              <p className="text-sm text-gray-500 mt-1">
                You can manage menu items through your existing menu controller and routes.
              </p>
            </div>
          )}

          {activeTab === 'blog' && (
            <div className="bg-white rounded-2xl p-8 border border-[#e8dfd3] shadow-sm text-center">
              <GrBlog className="text-5xl text-[#c5a572] mx-auto mb-3" />
              <h3 className="text-2xl font-serif font-bold text-[#121d27]">Blog Management</h3>
              <p className="text-sm text-gray-500 mt-1">
                You can view and publish blogs using your existing blog endpoints.
              </p>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

export default Admin