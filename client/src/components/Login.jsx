import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setAuthUser } from '../redux/userSlice'
import { BASE_URL } from '../main'

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      dispatch(setAuthUser(res.data))
      toast.success("Login Successful!")
      navigate("/")
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    }
    setUser({
      email: "",
      password: ""
    })
  }

  return (
    <div className="">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6 text-white">
        <h1 className="text-3xl font-bold text-center mb-4">Welcome Back</h1>
        <form onSubmit={onSubmitHandler} className="space-y-5">
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

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-md hover:shadow-xl transition text-white font-semibold"
          >
            Login
          </button>

          <p className="text-center text-sm text-white/80">
            Don’t have an account?{" "}
            <Link to="/signup" className="underline text-white font-medium">Register</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
