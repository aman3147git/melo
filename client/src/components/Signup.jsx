import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from "react-hot-toast"
import { BASE_URL } from '../main'

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  })

  const navigate = useNavigate()

  const handleGender = (gender) => {
    setUser({ ...user, gender })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/login")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    }

    setUser({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
    })
  }

  return (
    <div className="">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 space-y-2 text-white">
        <h1 className="text-3xl font-bold text-center mb-4">Create your Account</h1>
        <form onSubmit={onSubmitHandler} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              placeholder="You"
              className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/30 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/30 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/30 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Confirm Password</label>
            <input
              type="password"
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/30 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div>
            <p className="text-sm mb-1">Select Gender</p>
            <div className="flex gap-6 items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={user.gender === "male"}
                  onChange={() => handleGender("male")}
                  className="accent-purple-500"
                />
                <span>Male</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={user.gender === "female"}
                  onChange={() => handleGender("female")}
                  className="accent-pink-400"
                />
                <span>Female</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-md hover:shadow-xl transition text-white font-semibold"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-white/80">
            Already have an account?{" "}
            <Link to="/login" className="underline text-white font-medium">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup
