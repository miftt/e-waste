'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Recycle, MapPin } from 'lucide-react'
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

interface Courier {
  id: number;
  name: string;
  status: string;
  ktpNumber: string;
  ktpImage: string;
}

export default function Home() {
  const [registrations] = useState([
    { id: 1, name: 'John Doe', type: 'Masyarakat', status: 'Pending' },
    { id: 2, name: 'Jane Smith', type: 'Kurir', status: 'Pending' },
    { id: 3, name: 'Alice Johnson', type: 'Masyarakat', status: 'Approved' },
    { id: 4, name: 'Bob Williams', type: 'Kurir', status: 'Approved' },
    { id: 5, name: 'Charlie Brown', type: 'Masyarakat', status: 'Pending' },
  ])

  const [couriers] = useState<Courier[]>([
    { id: 1, name: 'Jane Smith', status: 'Pending', ktpNumber: '1234567890', ktpImage: '/placeholder.svg?height=300&width=400' },
    { id: 2, name: 'Bob Johnson', status: 'Pending', ktpNumber: '0987654321', ktpImage: '/placeholder.svg?height=300&width=400' },
  ])

  const [wasteTypes] = useState([
    { id: 1, name: 'Elektronik', category: 'Baterai', points: 5 },
    { id: 2, name: 'Elektronik', category: 'Smartphone', points: 10 },
  ])

  const [dropboxes] = useState([
    { id: 1, location: 'Mall A', address: 'Jl. Merdeka No. 1', capacity: 100 },
    { id: 2, location: 'Pasar B', address: 'Jl. Sudirman No. 50', capacity: 150 },
  ])

  // Data untuk chart registrasi
  const registrationChartData = [
    { name: 'Masyarakat', total: registrations.filter(r => r.type === 'Masyarakat').length },
    { name: 'Kurir', total: registrations.filter(r => r.type === 'Kurir').length },
  ]

  // Data untuk chart tren sampah elektronik
  const wasteCollectionData = [
    { name: 'Jan', total: 120 },
    { name: 'Feb', total: 132 },
    { name: 'Mar', total: 101 },
    { name: 'Apr', total: 134 },
    { name: 'May', total: 90 },
    { name: 'Jun', total: 172 },
    { name: 'Jul', total: 178 },
    { name: 'Aug', total: 165 },
    { name: 'Sep', total: 190 },
    { name: 'Oct', total: 212 },
    { name: 'Nov', total: 230 },
    { name: 'Dec', total: 220 },
  ]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Overview of your admin activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{registrations.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Couriers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{couriers.filter(c => c.status === 'Pending').length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Waste Types</CardTitle>
                <Recycle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{wasteTypes.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Dropboxes</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dropboxes.length}</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Registrations by Type</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={registrationChartData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Bar dataKey="total" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>E-Waste Collection Trend</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={wasteCollectionData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}kg`} />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="black" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}