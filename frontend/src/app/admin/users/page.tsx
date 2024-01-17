"use client"
import React, { useEffect, useState } from 'react'
import { FaTrash} from "react-icons/fa";
import AdminSiderbar from '../../components/AdminSiderbar';
import { Roboto_Slab } from "next/font/google"
import { useAppDispatch, useAppSelector } from '../../../../Redux/hook';
import { useRouter } from 'next/navigation';
import { useMyContext } from '@/app/MyContextProvider';
import { ChangeUserType, DeleteUser, GetAllUser, SearchUser } from '../../../../Redux/asyncThunk';

const robotoSlab = Roboto_Slab({
  weight: "500",
  subsets: ["greek"],
  display: "swap",
})

const page = () => {
  const [showConfirm, setShowConfirm] = useState(false)
  const user = useAppSelector((state)=>state.user)
  const router = useRouter()
  const [search,setSearch]=useState('')
  const dispatch = useAppDispatch()
  const {setLoader}=useMyContext()
  const [type,setType]=useState("")
  const [users,setUsers]=useState([])
  const [deleteUserId,setDeleteUserId]=useState('')

  const getAllUser = async()=>{
    if(user._id && user.admin){
      setLoader(true)
      const result = await dispatch(GetAllUser({admin:type}))
      if(result.payload && result.payload.data){
        setUsers(result.payload.data)
      }
      setLoader(false)
    }
  }

  const changeUserType = async(userId:string,typee:string)=>{
    setLoader(true)
    const resp = await dispatch(ChangeUserType({userId,type:typee}))
    if(resp.payload && resp.payload.data){
      if(resp.payload.data===user._id){
        router.push('/')
      }
    }
    const result = await dispatch(GetAllUser({admin:type}))
      if(result.payload && result.payload.data){
        setUsers(result.payload.data)
      }
    setLoader(false)
  }

  const searchUser = async()=>{
    const result = await dispatch(SearchUser({searchStr:search}))
    if(result.payload && result.payload.data){
      setUsers(result.payload.data)
    }
  }

  const deleteUser = async()=>{
    setShowConfirm(false)
    setLoader(true)
    await dispatch(DeleteUser({userId:deleteUserId}))
    const result = await dispatch(GetAllUser({admin:type}))
    if(result.payload && result.payload.data){
      setUsers(result.payload.data)
    }
    setLoader(false)
  }

  useEffect(()=>{
    if(user._id!=="1" && !user.admin){
      router.push('/login')
    }else{
      getAllUser()
    }
  },[user])
  useEffect(()=>{
      if(user._id && user._id!=="1"){
        searchUser()
      }
  },[search])
  useEffect(()=>{
    getAllUser()
  },[type])
  return (
    <div className='flex bg-slate-200'>
      <AdminSiderbar />
      <div className='pl-16 sm:pl-20 w-full min-h-[100vh] overflow-hidden overflow-y-scroll text-slate-700' >
        <h1 className={`${robotoSlab.className} text-4xl sm:text-5xl text-center my-6 text-main-800`}>Users</h1>
            <div className='w-full flex flex-col items-start p-4'>
              <input value={search} onChange={(e)=>{setSearch(e.target.value)}} className=" outline-none w-full py-1 px-4 text-xl border-2 border-main-800 rounded-md rounded-bl-none shadow-md max-w-[600px]" type="search"  placeholder='Search Users' />
              <label className='bg-main-800 text-white py-1 px-2 sm:px-4 rounded-b-md sm:text-xl shadow-md'>Filter:- 
                <select value={type} onChange={(e)=>{setType(e.target.value)}} className='text-slate-700 sm:px-4 ml-2 outline-none rounded-md cursor-pointer'>
                  <option value={""}>Default</option>
                  <option value={"false"}>User</option>
                  <option value={"true"}>Admin</option>
                </select>
              </label>
            </div>
            <div className='flex items-center justify-end w-full px-6'><span className='bg-main-800 text-white text-xl py-1 px-4 rounded-md shadow-md'>Total Users: {users.length}</span></div>


        <table className='mt-4'>
          <thead className='bg-main-800 border-main-800 border-2'>
            <tr>
              <th>Profile</th>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {
              users.map((object:any)=>{
                return <tr key={object._id}>
                <td className='border border-main-800' aria-label='Profile'><img style={{ height: "60px", width: "60px", margin: " 8px auto", borderRadius: '5px' }} src={object.profile.secure_url} alt="Pic" /></td>
                <td className='border border-main-800' aria-label={"User Id"}>{object._id}</td>
                <td className='border border-main-800' aria-label={"Name"}>{object.name}</td>
                <td className='border border-main-800' aria-label={"Email"}>{object.email}</td>
                <td className='border border-main-800' aria-label={"Type"}>
                  <select value={object.admin.toString()} onChange={(e)=>{changeUserType(object._id,e.target.value)}} className='text-slate-700 sm:px-4 ml-2 outline-none rounded-md cursor-pointer border-2 border-main-800'>
                    <option value={"false"}>User</option>
                    <option value={"true"}>Admin</option>
                  </select>
                </td>
                <td onClick={()=>{setDeleteUserId(object._id);setShowConfirm(true)}} className='border border-main-800' aria-label={"Delete"}><FaTrash className='icon delete'/></td>
              </tr>
              })
            }
            
          </tbody>

        </table>
      </div>
      <div className={`${(showConfirm) ? 'flex' : 'hidden'} fixed top-0 left-0 w-full h-full items-center justify-center bg-[#3341557f]`}>
        <div className=' w-56 h-56 border p-4  bg-white rounded  flex items-stretch justify-between flex-col border-main-800 shadow-lg'>
          <h1 className=' text-center text-2xl'>Are your sure you want to delete?</h1>
          <div className='flex items-center justify-between'>
            <button onClick={()=>{deleteUser()}} className=' bg-red-700 text-white px-3 py-2 rounded hover:bg-[#3341551f] border-2 border-red-700 hover:text-red-700 transition-all duration-300 ease-in-out'>YES</button>
            <button className=' bg-main-800 text-white px-3 py-2 rounded hover:bg-[#44b67721] border-2 border-main-800 hover:text-main-800 transition-all duration-300 ease-in-out' onClick={()=>{setShowConfirm(false);setDeleteUserId('')}}>NO</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
