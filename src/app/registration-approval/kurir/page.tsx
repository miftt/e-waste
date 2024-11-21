'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

interface Courier {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    ktpNumber: string;
    ktpImage: string;
    createdAt: Date;
    updatedAt: Date;
}

export default function KurirApprovalPage() {
    const [selectedCourier, setSelectedCourier] = useState<Courier | null>(null)
    const [couriers, setCouriers] = useState<Courier[]>([])
    const [loading, setLoading] = useState(true)

    const fetchCouriers = async () => {
        try {
            const response = await fetch('/api/registrations/kurir')
            if (!response.ok) throw new Error('Failed to fetch couriers')
            const data = await response.json()
            setCouriers(data)
        } catch (error) {
            console.error('Error fetching couriers:', error)
            toast.error('Failed to load courier data')
        } finally {
            setLoading(false)
        }
    }

    const updateCourierStatus = async (id: string, status: 'Approved' | 'Rejected') => {
        try {
            const response = await fetch(`/api/registrations/kurir/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            })

            if (!response.ok) throw new Error('Failed to update status')

            // Update local state
            setCouriers(couriers.map(courier =>
                courier.id === id ? { ...courier, status } : courier
            ))
            setSelectedCourier(null)
            toast.success(`Courier successfully ${status.toLowerCase()}`)
        } catch (error) {
            console.error('Error updating courier status:', error)
            toast.error('Failed to update courier status')
        }
    }

    useEffect(() => {
        fetchCouriers()
    }, [])

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Pending':
                return <Badge variant="warning">{status}</Badge>
            case 'Approved':
                return <Badge variant="success">{status}</Badge>
            case 'Rejected':
                return <Badge variant="destructive">{status}</Badge>
            default:
                return <Badge>{status}</Badge>
        }
    }

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Kurir Registration Approval</CardTitle>
                    <CardDescription>Approve or reject kurir registrations</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[300px]">Name</TableHead>
                                    <TableHead className="w-[150px] text-center">Status</TableHead>
                                    <TableHead className="w-[200px] text-center">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[...Array(5)].map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Skeleton className="h-5 w-[250px]" />
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Skeleton className="h-5 w-[100px] mx-auto" />
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Skeleton className="h-9 w-[100px] mx-auto" />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Kurir Registration Approval</CardTitle>
                <CardDescription>Approve or reject kurir registrations</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative w-full overflow-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]">Name</TableHead>
                                <TableHead className="w-[150px] text-center">Status</TableHead>
                                <TableHead className="w-[200px] text-center">Requested at</TableHead>
                                <TableHead className="w-[200px] text-center">updated at</TableHead>
                                <TableHead className="w-[200px] text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {couriers.map((courier) => (
                                <TableRow key={courier.id}>
                                    <TableCell className="font-medium">{courier.name}</TableCell>
                                    <TableCell className="text-center">
                                        {getStatusBadge(courier.status)}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {courier.createdAt ? `${new Date(courier.createdAt).toLocaleDateString('id-ID')} ${new Date(courier.createdAt).toLocaleTimeString('id-ID')}` : '-'}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {courier.updatedAt ? `${new Date(courier.updatedAt).toLocaleDateString('id-ID')} ${new Date(courier.updatedAt).toLocaleTimeString('id-ID')}` : '-'}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {courier.status === 'Pending' && (
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        onClick={() => setSelectedCourier(courier)}
                                                        variant="outline"
                                                        size="sm"
                                                        className="bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                                                    >
                                                        Review
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Review Courier Application</DialogTitle>
                                                        <DialogDescription>
                                                            Review the couriers KTP information before approving or rejecting.
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
                                                                    <Label htmlFor="email">Email</Label>
                                                                    <Input id="name" value={selectedCourier.email} readOnly />
                                                                </div>
                                                                <div>
                                                                    <Label htmlFor="email">Phone Number</Label>
                                                                    <Input id="name" value={selectedCourier.phone} readOnly />
                                                                </div>
                                                                <div>
                                                                    <Label htmlFor="ktpNumber">KTP Number</Label>
                                                                    <Input id="ktpNumber" value={selectedCourier.ktpNumber} readOnly />
                                                                </div>
                                                                <div>
                                                                    <Label htmlFor="ktpImage">KTP Image</Label>
                                                                    <div className="mt-2 rounded-md border">
                                                                        <Image
                                                                            src='/contohktp.jpg'
                                                                            alt="KTP"
                                                                            width={400}
                                                                            height={300}
                                                                            className="rounded-md"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </ScrollArea>
                                                    )}
                                                    <div className="flex justify-end space-x-2 mt-4">
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => selectedCourier && updateCourierStatus(selectedCourier.id, 'Rejected')}
                                                            className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                                                        >
                                                            Reject
                                                        </Button>
                                                        <Button
                                                            onClick={() => selectedCourier && updateCourierStatus(selectedCourier.id, 'Approved')}
                                                            className="bg-green-600 text-white hover:bg-green-700"
                                                        >
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
                </div>
            </CardContent>
        </Card>
    )
} 