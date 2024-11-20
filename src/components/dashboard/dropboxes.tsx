'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Dropbox {
    id: number;
    location: string;
    address: string;
    capacity: number;
}

interface DropboxesProps {
    dropboxes: Dropbox[];
    onAdd: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function Dropboxes({ dropboxes, onAdd }: DropboxesProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Dropboxes</CardTitle>
                <CardDescription>Manage dropbox locations</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onAdd} className="space-y-4 mb-4">
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
} 