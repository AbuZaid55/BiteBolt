import React from 'react'
import { ResponsiveContainer, Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'

interface order {
  name:string,
  count:number
}
const BarCharts = ({order}:{order:order[]}) => {
  return (
    <ResponsiveContainer width="100%" height={'100%'}>
      <BarChart data={order} >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarCharts

