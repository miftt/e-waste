'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutDashboard, Users, Recycle, MapPin, LogOut } from 'lucide-react'
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

export function ModernAdminDashboardComponent() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedCourier, setSelectedCourier] = useState<Courier | null>(null)

  const [registrations, setRegistrations] = useState([
    { id: 1, name: 'John Doe', type: 'Masyarakat', status: 'Pending' },
    { id: 2, name: 'Jane Smith', type: 'Kurir', status: 'Pending' },
    { id: 3, name: 'Alice Johnson', type: 'Masyarakat', status: 'Approved' },
    { id: 4, name: 'Bob Williams', type: 'Kurir', status: 'Approved' },
    { id: 5, name: 'Charlie Brown', type: 'Masyarakat', status: 'Pending' },
  ])

  const [couriers, setCouriers] = useState<Courier[]>([
    { id: 1, name: 'Jane Smith', status: 'Pending', ktpNumber: '1234567890', ktpImage: '/placeholder.svg?height=300&width=400' },
    { id: 2, name: 'Bob Johnson', status: 'Pending', ktpNumber: '0987654321', ktpImage: '/placeholder.svg?height=300&width=400' },
  ])

  const [wasteTypes, setWasteTypes] = useState([
    { id: 1, name: 'Elektronik', category: 'Baterai', points: 5 },
    { id: 2, name: 'Elektronik', category: 'Smartphone', points: 10 },
  ])

  const [dropboxes, setDropboxes] = useState([
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

  const approveRegistration = (id: number) => {
    setRegistrations(registrations.map(reg => 
      reg.id === id ? { ...reg, status: 'Approved' } : reg
    ))
  }

  const approveCourier = (id: number) => {
    setCouriers(couriers.map(courier => 
      courier.id === id ? { ...courier, status: 'Approved' } : courier
    ))
    setSelectedCourier(null)
  }

  const rejectCourier = (id: number) => {
    setCouriers(couriers.map(courier => 
      courier.id === id ? { ...courier, status: 'Rejected' } : courier
    ))
    setSelectedCourier(null)
  }

  const addWasteType = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newWasteType = {
      id: wasteTypes.length + 1,
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      points: Number(formData.get('points')),
    }
    setWasteTypes([...wasteTypes, newWasteType])
    event.currentTarget.reset()
  }

  const addDropbox = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newDropbox = {
      id: dropboxes.length + 1,
      location: formData.get('location') as string,
      address: formData.get('address') as string,
      capacity: Number(formData.get('capacity')),
    }
    setDropboxes([...dropboxes, newDropbox])
    event.currentTarget.reset()
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
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
                      <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
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
                      <Line type="monotone" dataKey="total" stroke="#adfa1d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      case 'registrations':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Registrations</CardTitle>
              <CardDescription>Approve or reject user registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registrations.map((reg) => (
                    <TableRow key={reg.id}>
                      <TableCell>{reg.name}</TableCell>
                      <TableCell>{reg.type}</TableCell>
                      <TableCell>{reg.status}</TableCell>
                      <TableCell>
                        {reg.status === 'Pending' && (
                          <Button onClick={() => approveRegistration(reg.id)}>Approve</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )
      case 'couriers':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Couriers</CardTitle>
              <CardDescription>Manage courier registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {couriers.map((courier) => (
                    <TableRow key={courier.id}>
                      <TableCell>{courier.name}</TableCell>
                      <TableCell>{courier.status}</TableCell>
                      <TableCell>
                        {courier.status === 'Pending' && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button onClick={() => setSelectedCourier(courier)}>Review</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Review Courier Application</DialogTitle>
                                <DialogDescription>
                                  Review the courier's KTP information before approving or rejecting.
                                </DialogDescription>
                              </DialogHeader>
                              {selectedCourier && (
                                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor="name">Name</Label>
                                      <Input id="name" value={selectedCourier.name} readOnly />
                                    </div>
                                    <div>
                                      <Label htmlFor="ktpNumber">KTP Number</Label>
                                      <Input id="ktpNumber" value={selectedCourier.ktpNumber} readOnly />
                                    </div>
                                    <div>
                                      <Label htmlFor="ktpImage">KTP Image</Label>
                                      <img src={selectedCourier.ktpImage} alt="KTP" className="w-full h-auto rounded-md" />
                                    </div>
                                  </div>
                                </ScrollArea>
                              )}
                              <div className="flex justify-end space-x-2 mt-4">
                                <Button variant="outline" onClick={() => rejectCourier(selectedCourier!.id)}>
                                  Reject
                                </Button>
                                <Button onClick={() => approveCourier(selectedCourier!.id)}>
                                  Approve
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )
      case 'waste-types':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Waste Types</CardTitle>
              <CardDescription>Manage electronic waste types and categories</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={addWasteType} className="space-y-4 mb-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" name="category" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="points">Points</Label>
                    <Input id="points" name="points" type="number" required />
                  </div>
                </div>
                <Button type="submit">Add Waste Type</Button>
              </form>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wasteTypes.map((type) => (
                    <TableRow key={type.id}>
                      <TableCell>{type.name}</TableCell>
                      <TableCell>{type.category}</TableCell>
                      <TableCell>{type.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )
      case 'dropboxes':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Dropboxes</CardTitle>
              <CardDescription>Manage dropbox locations</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={addDropbox} className="space-y-4 mb-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" name="address" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input id="capacity" name="capacity" type="number" required />
                  </div>
                </div>
                <Button type="submit">Add Dropbox</Button>
              </form>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Location</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Capacity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dropboxes.map((dropbox) => (
                    <TableRow key={dropbox.id}>
                      <TableCell>{dropbox.location}</TableCell>
                      <TableCell>{dropbox.address}</TableCell>
                      <TableCell>{dropbox.capacity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        <nav className="mt-4">
          <Button
            variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant={activeTab === 'registrations' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('registrations')}
          >
            <Users className="mr-2 h-4 w-4" />
            Registrations
          </Button>
          <Button
            variant={activeTab === 'couriers' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('couriers')}
          >
            <Users className="mr-2 h-4 w-4" />
            Couriers
          </Button>
          <Button
            variant={activeTab === 'waste-types' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('waste-types')}
          >
            <Recycle className="mr-2 h-4 w-4" />
            Waste Types
          </Button>
          <Button
            variant={activeTab === 'dropboxes' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveTab('dropboxes')}
          >
            <MapPin className="mr-2 h-4 w-4" />
            Dropboxes
          </Button>
        </nav>
        <div className="absolute bottom-4 left-4">
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  )
}

interface Courier {
  id: number;
  name: string;
  status: string;
  ktpNumber: string;
  ktpImage: string;
}