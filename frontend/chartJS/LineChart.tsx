import { useRouter } from "next/navigation"
import React from "react"
import { ResponsiveContainer, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"

const LineCharts = ({payments}:{payments:{totalPaidAmount:number,razorpay_order_id:string}[]}) => {
  const router = useRouter()
  const handleClick = (data:any)=>{
    router.push(`/admin/payments?orderId=${data.activePayload[0].payload.razorpay_order_id}`)
  }
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <LineChart data={payments} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} onClick={handleClick}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="totalPaidAmount" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default LineCharts
