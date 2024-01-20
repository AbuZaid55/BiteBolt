import { useRouter } from 'next/navigation'
import React from 'react'
import { ResponsiveContainer, Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'

interface order {
  name:string,
  count:number
}
const BarCharts = ({order}:{order:order[]}) => {
  const router = useRouter()
  const handleClick = (data:any)=>{
    router.push(`/admin/orders?status=${data.name}`)
  }
  return (
    <ResponsiveContainer width="100%" height={'100%'}>
      <BarChart data={order} >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar className=' cursor-pointer' onClick={handleClick} dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarCharts

