'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from 'sonner'

interface Registration {
    id: string
    name: string
    email: string
    status: string
    phone: string
    address: string
    createdAt: Date
    updatedAt: Date
}

export default function MasyarakatApprovalPage() {
    const [registrations, setRegistrations] = useState<Registration[]>([])

    const fetchRegistrationMasyarakat = async () => {
        const response = await fetch("/api/registrations/masyarakat")
        const data = await response.json()
        setRegistrations(data)
    }

    const updateMasyarakatStatus = async (id: string, status: 'Approved' | 'Rejected') => {
        try {
            const response = await fetch(`/api/registrations/masyarakat/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            })

            if (!response.ok) throw new Error('Failed to update status')
            console.log(response);
            setRegistrations(registrations.map(registration =>
                registration.id === id ? { ...registration, status } : registration
            ))
            toast.success(`Masyarakat registration successfully ${status.toLowerCase()}`)
        } catch (error) {
            console.log("Error updating masyarakat status: ", error)
            toast.error('Failed to update masyarakat status')
        }
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

    useEffect(() => {
        fetchRegistrationMasyarakat()
    }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Masyarakat Registration Approval</CardTitle>
                <CardDescription>Approve or reject masyarakat registrations</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative w-full overflow-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[250px]">Name</TableHead>
                                <TableHead className="w-[300px]">Email</TableHead>
                                <TableHead className="w-[150px]">Phone Number</TableHead>
                                <TableHead className="w-[150px]">Address</TableHead>
                                <TableHead className="w-[150px] text-center">Status</TableHead>
                                <TableHead className="w-[250px] text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {registrations.map((reg) => (
                                <TableRow key={reg.id}>
                                    <TableCell className="font-medium">{reg.name}</TableCell>
                                    <TableCell>{reg.email}</TableCell>
                                    <TableCell>{reg.phone}</TableCell>
                                    <TableCell>{reg.address}</TableCell>
                                    <TableCell className="text-center">
                                        {getStatusBadge(reg.status)}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {reg.status === 'Pending' && (
                                            <div className="flex justify-center space-x-2">
                                                <Button
                                                    onClick={() => updateMasyarakatStatus(reg.id, 'Approved')}
                                                    variant="outline"
                                                    size="sm"
                                                    className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    onClick={() => updateMasyarakatStatus(reg.id, 'Rejected')}
                                                    variant="outline"
                                                    size="sm"
                                                    className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                                                >
                                                    Reject
                                                </Button>
                                            </div>
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