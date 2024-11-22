'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Pencil, Trash2 } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Dropbox {
    id: string;
    location: string;
    address: string;
    capacity: number;
    status: string;
}

// Komponen TableSkeleton untuk loading state
function TableSkeleton() {
    return (
        <>
            {[1, 2, 3, 4].map((i) => (
                <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[300px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                </TableRow>
            ))}
        </>
    )
}

export default function Dropboxes() {
    const [dropboxes, setDropboxes] = useState<Dropbox[]>([])
    const [loading, setLoading] = useState(true)
    const [editingDropbox, setEditingDropbox] = useState<Dropbox | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const fetchDropboxes = async () => {
        try {
            const response = await fetch('/api/dropboxes')
            if (!response.ok) throw new Error('Failed to fetch dropboxes')
            const data = await response.json()
            setDropboxes(data)
        } catch (error) {
            console.error('Error fetching dropboxes:', error)
            toast.error('Failed to load courier data')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        try {
            const response = await fetch('/api/dropboxes', {
                method: 'POST',
                body: formData, // Kirim langsung FormData tanpa mengubah ke JSON
            })

            if (!response.ok) {
                const error = await response.text()
                throw new Error(error)
            }

            toast.success('Dropbox added successfully')
            fetchDropboxes() // Refresh data
            e.currentTarget.reset() // Reset form
        } catch (error) {
            console.error('Error adding dropbox:', error)
        }
    }

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!editingDropbox) return

        const formData = new FormData(e.currentTarget)

        try {
            const response = await fetch(`/api/dropboxes/${editingDropbox.id}`, {
                method: 'PUT',
                body: formData,
            })

            if (!response.ok) {
                const error = await response.text()
                throw new Error(error)
            }

            toast.success('Dropbox updated successfully')
            fetchDropboxes()
            setIsDialogOpen(false)
            setEditingDropbox(null)
        } catch (error) {
            console.error('Error updating dropbox:', error)
            toast.error('Failed to update dropbox')
        }
    }

    const handleDelete = async () => {
        if (!deletingId) return

        try {
            const response = await fetch(`/api/dropboxes/${deletingId}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                const error = await response.text()
                throw new Error(error)
            }

            toast.success('Dropbox deleted successfully')
            fetchDropboxes()
        } catch (error) {
            console.error('Error deleting dropbox:', error)
            toast.error('Failed to delete dropbox')
        } finally {
            setIsDeleteDialogOpen(false)
            setDeletingId(null)
        }
    }

    useEffect(() => {
        fetchDropboxes()
    }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Dropboxes</CardTitle>
                <CardDescription>Manage dropbox locations</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 mb-4">
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
                            <TableHead>Status</TableHead>
                            <TableHead>Capacity</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableSkeleton />
                        ) : (
                            dropboxes.map((dropbox) => (
                                <TableRow key={dropbox.id}>
                                    <TableCell>{dropbox.location}</TableCell>
                                    <TableCell>{dropbox.address}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={dropbox.status === 'Full' ? 'destructive' : 'success'}
                                        >
                                            {dropbox.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{dropbox.capacity}</TableCell>
                                    <TableCell className="space-x-2">
                                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => setEditingDropbox(dropbox)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Edit Dropbox</DialogTitle>
                                                </DialogHeader>
                                                <form onSubmit={handleUpdate} className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="edit-location">Location</Label>
                                                        <Input
                                                            id="edit-location"
                                                            name="location"
                                                            defaultValue={editingDropbox?.location}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="edit-address">Address</Label>
                                                        <Textarea
                                                            id="edit-address"
                                                            name="address"
                                                            defaultValue={editingDropbox?.address}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="edit-capacity">Capacity</Label>
                                                        <Input
                                                            id="edit-capacity"
                                                            name="capacity"
                                                            type="number"
                                                            defaultValue={editingDropbox?.capacity}
                                                            required
                                                        />
                                                    </div>
                                                    <Button type="submit">Update</Button>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => {
                                                setDeletingId(dropbox.id)
                                                setIsDeleteDialogOpen(true)
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure to delete {dropboxes.find(dropbox => dropbox.id === deletingId)?.location}?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the dropbox data.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => {
                                setDeletingId(null)
                                setIsDeleteDialogOpen(false)
                            }}>
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDelete}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardContent>
        </Card>
    )
} 