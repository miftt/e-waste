'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
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

interface WasteType {
    id: string;
    name: string;
    category: string;
    points: string;
}

function TableSkeleton() {
    return (
        <>
            {[1, 2, 3].map((i) => (
                <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                </TableRow>
            ))}
        </>
    )
}

export default function WasteTypes() {
    const [wasteTypes, setWasteTypes] = useState<WasteType[]>([])
    const [loading, setLoading] = useState(true)
    const [editingWaste, setEditingWaste] = useState<WasteType | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const fetchWasteTypes = async () => {
        try {
            const response = await fetch('/api/waste-types')
            if (!response.ok) throw new Error('Failed to fetch waste types')
            const data = await response.json()
            setWasteTypes(data)
        } catch (error) {
            console.error('Error fetching waste types:', error)
            toast.error('Failed to load waste types data')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        try {
            const response = await fetch('/api/waste-types', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                const error = await response.text()
                throw new Error(error)
            }

            toast.success('Waste type added successfully')
            fetchWasteTypes()
            e.currentTarget.reset()
        } catch (error) {
            console.error('Error adding waste type:', error)
            toast.error('Failed to add waste type')
        }
    }

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!editingWaste) return

        const formData = new FormData(e.currentTarget)

        try {
            const response = await fetch(`/api/waste-types/${editingWaste.id}`, {
                method: 'PUT',
                body: formData,
            })

            if (!response.ok) {
                const error = await response.text()
                throw new Error(error)
            }

            toast.success('Waste type updated successfully')
            fetchWasteTypes()
            setIsDialogOpen(false)
            setEditingWaste(null)
        } catch (error) {
            console.error('Error updating waste type:', error)
        }
    }

    const handleDelete = async () => {
        if (!deletingId) return

        try {
            const response = await fetch(`/api/waste-types/${deletingId}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                const error = await response.text()
                throw new Error(error)
            }

            toast.success('Waste type deleted successfully')
            fetchWasteTypes()
        } catch (error) {
            console.error('Error deleting waste type:', error)
            toast.error('Failed to delete waste type')
        } finally {
            setIsDeleteDialogOpen(false)
            setDeletingId(null)
        }
    }

    useEffect(() => {
        fetchWasteTypes()
    }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Waste Types</CardTitle>
                <CardDescription>Manage waste types and their points</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4 mb-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="points">Category</Label>
                            <Input
                                id="category"
                                name="category"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="points">Point</Label>
                            <Input id="points" name="points" required />
                        </div>
                    </div>
                    <Button type="submit">Add Waste Type</Button>
                </form>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Point</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableSkeleton />
                        ) : (
                            wasteTypes.map((wasteType) => (
                                <TableRow key={wasteType.id}>
                                    <TableCell>{wasteType.name}</TableCell>
                                    <TableCell>{wasteType.category}</TableCell>
                                    <TableCell>{wasteType.points}</TableCell>
                                    <TableCell className="space-x-2">
                                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => setEditingWaste(wasteType)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Edit Waste Type</DialogTitle>
                                                </DialogHeader>
                                                <form onSubmit={handleUpdate} className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="edit-name">Name</Label>
                                                        <Input
                                                            id="edit-name"
                                                            name="name"
                                                            defaultValue={editingWaste?.name}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="edit-category">Category</Label>
                                                        <Input
                                                            id="edit-category"
                                                            name="category"
                                                            defaultValue={editingWaste?.category}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="edit-points">Points</Label>
                                                        <Input
                                                            id="edit-points"
                                                            name="points"
                                                            defaultValue={editingWaste?.points}
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
                                                setDeletingId(wasteType.id)
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
                            <AlertDialogTitle>Are you delete {wasteTypes.find(wasteType => wasteType.id === deletingId)?.category}?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the waste type data.
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