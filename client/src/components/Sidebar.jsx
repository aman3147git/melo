import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi"
import OtherUsers from './OtherUsers'
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice'
import { setMessages } from '../redux/messageSlice'
import { BASE_URL } from '../main'

const Sidebar = () => {
  const [search, setSearch] = useState("")
  const { otherUsers } = useSelector(store => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/user/logout`)
      navigate("/login")
      toast.success(res.data.message)
      dispatch(setAuthUser(null))
      dispatch(setMessages(null))
      dispatch(setOtherUsers(null))
      dispatch(setSelectedUser(null))
    } catch (error) {
      console.log(error)
    }
  }

  const searchSubmitHandler = (e) => {
    e.preventDefault()
    const conversationUser = otherUsers?.find(user =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    )
    if (conversationUser) {
      dispatch(setOtherUsers([conversationUser]))
    } else {
      toast.error("User not found!")
    }
  }

  return (
    <div className=" text-white h-screen w-72 flex flex-col justify-between p-4 border-r border-gray-700">
      
      <div>
        <form onSubmit={searchSubmitHandler} className="flex items-center gap-2 mb-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 text-white outline-none rounded-md"
            type="text"
            placeholder="Search..."
          />
          <button
            type="submit"
            className="p-2 bg-purple-600 hover:bg-purple-700 "
          >
            <BiSearchAlt2 className="w-5 h-5" />
          </button>
        </form>

        <div className="border-t border-gray-700 my-2"></div>

        <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
          <OtherUsers />
        </div>
      </div>

      
      <div className="pt-4">
        <button
          onClick={logoutHandler}
          className="w-full py-2 bg-indigo-600 rounded-md font-semibold "
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar
