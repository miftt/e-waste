'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Recycle, MapPin } from 'lucide-react'
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

interface Registration {
  id: string;
  name: string;
  role: 'masyarakat' | 'kurir';
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
}

export default function Home() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [wasteTypes] = useState([
    { id: 1, name: 'Elektronik', category: 'Baterai', points: 5 },
    { id: 2, name: 'Elektronik', category: 'Smartphone', points: 10 },
  ])

  const [dropboxes] = useState([
    { id: 1, location: 'Mall A', address: 'Jl. Merdeka No. 1', capacity: 100 },
    { id: 2, location: 'Pasar B', address: 'Jl. Sudirman No. 50', capacity: 150 },
  ])

  const fetchRegistrations = async () => {
    try {
      // Fetch both masyarakat and kurir registrations
      const [masyarakatRes, kurirRes] = await Promise.all([
        fetch('/api/registrations/masyarakat'),
        fetch('/api/registrations/kurir')
      ])

      if (!masyarakatRes.ok || !kurirRes.ok) {
        throw new Error('Failed to fetch registrations')
      }

      const masyarakatData = await masyarakatRes.json()
      const kurirData = await kurirRes.json()

      // Combine both registrations
      setRegistrations([...masyarakatData, ...kurirData])
    } catch (error) {
      console.error('Error fetching registrations:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRegistrations()
  }, [])

  // Data untuk chart registrasi
  const registrationChartData = [
    {
      name: 'Masyarakat',
      total: registrations.filter(r => r.role === 'masyarakat').length
    },
    {
      name: 'Kurir',
      total: registrations.filter(r => r.role === 'kurir').length
    },
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading dashboard data...</p>
      </div>
    )
  }

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
                <CardTitle className="text-sm font-medium">Pending Registrations</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {registrations.filter(r => r.status === 'Pending').length}
                </div>
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
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar
                  dataKey="total"
                  radius={[4, 4, 0, 0]}
                  fill="#4F46E5" // Indigo color
                  animationDuration={1500}
                  animationBegin={0}
                  animationEasing="ease-out"
                >
                </Bar>
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
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}kg`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#10B981" // Emerald color
                  strokeWidth={2}
                  dot={{
                    fill: '#10B981',
                    stroke: '#10B981',
                    strokeWidth: 2,
                    r: 4
                  }}
                  activeDot={{
                    fill: '#10B981',
                    stroke: '#fff',
                    strokeWidth: 2,
                    r: 6
                  }}
                  animationDuration={1500}
                  animationBegin={0}
                  animationEasing="ease-out"
                />
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Tooltip
                  cursor={{ stroke: '#888888', strokeWidth: 1 }}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}