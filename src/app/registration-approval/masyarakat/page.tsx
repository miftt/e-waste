'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function MasyarakatApprovalPage() {
    const [registrations, setRegistrations] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Pending' },
        { id: 3, name: 'Alice Johnson', email: 'alice@example.com', status: 'Approved' },
        { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', status: 'Rejected' },
    ])

    const approveRegistration = (id: number) => {
        setRegistrations(registrations.map(reg =>
            reg.id === id ? { ...reg, status: 'Approved' } : reg
        ))
    }

    const rejectRegistration = (id: number) => {
        setRegistrations(registrations.map(reg =>
            reg.id === id ? { ...reg, status: 'Rejected' } : reg
        ))
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
                                <TableHead className="w-[150px] text-center">Status</TableHead>
                                <TableHead className="w-[250px] text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {registrations.map((reg) => (
                                <TableRow key={reg.id}>
                                    <TableCell className="font-medium">{reg.name}</TableCell>
                                    <TableCell>{reg.email}</TableCell>
                                    <TableCell className="text-center">
                                        {getStatusBadge(reg.status)}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {reg.status === 'Pending' && (
                                            <div className="flex justify-center space-x-2">
                                                <Button
                                                    onClick={() => approveRegistration(reg.id)}
                                                    variant="outline"
                                                    size="sm"
                                                    className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    onClick={() => rejectRegistration(reg.id)}
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