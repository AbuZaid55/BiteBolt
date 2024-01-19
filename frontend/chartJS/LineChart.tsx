import React from "react"
import { ResponsiveContainer, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"

const LineCharts = ({payments}:{payments:{totalPaidAmount:number}[]}) => {
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <LineChart data={payments} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="totalPaidAmount" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default LineCharts
