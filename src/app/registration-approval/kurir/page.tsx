'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface Courier {
    id: number;
    name: string;
    email: string;
    status: string;
    ktpNumber: string;
    ktpImage: string;
}

export default function KurirApprovalPage() {
    const [selectedCourier, setSelectedCourier] = useState<Courier | null>(null)
    const [couriers, setCouriers] = useState<Courier[]>([
        { id: 1, name: 'Jane Smith', email: 'jane@example.com', status: 'Pending', ktpNumber: '1234567890', ktpImage: '/contohktp.jpg' },
        { id: 2, name: 'Bob Johnson', email: 'bob@example.com', status: 'Approved', ktpNumber: '0987654321', ktpImage: '/contohktp.jpg' },
        { id: 3, name: 'Alice Williams', email: 'alice@example.com', status: 'Rejected', ktpNumber: '5678901234', ktpImage: '/contohktp.jpg' },
    ])

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
                                <TableHead className="w-[300px]">Email</TableHead>
                                <TableHead className="w-[150px] text-center">Status</TableHead>
                                <TableHead className="w-[200px] text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {couriers.map((courier) => (
                                <TableRow key={courier.id}>
                                    <TableCell className="font-medium">{courier.name}</TableCell>
                                    <TableCell className="font-medium">{courier.email}</TableCell>
                                    <TableCell className="text-center">
                                        {getStatusBadge(courier.status)}
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
                                                                    <Label htmlFor="ktpNumber">KTP Number</Label>
                                                                    <Input id="ktpNumber" value={selectedCourier.ktpNumber} readOnly />
                                                                </div>
                                                                <div>
                                                                    <Label htmlFor="ktpImage">KTP Image</Label>
                                                                    <Image src={selectedCourier.ktpImage} alt="KTP" width={400} height={300} className="w-full h-auto rounded-md" />
                                                                </div>
                                                            </div>
                                                        </ScrollArea>
                                                    )}
                                                    <div className="flex justify-end space-x-2 mt-4">
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => rejectCourier(selectedCourier!.id)}
                                                            className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                                                        >
                                                            Reject
                                                        </Button>
                                                        <Button
                                                            onClick={() => approveCourier(selectedCourier!.id)}
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