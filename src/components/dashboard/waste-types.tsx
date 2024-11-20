'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface WasteType {
    id: number;
    name: string;
    category: string;
    points: number;
}

interface WasteTypesProps {
    wasteTypes: WasteType[];
    onAdd: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function WasteTypes({ wasteTypes, onAdd }: WasteTypesProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Waste Types</CardTitle>
                <CardDescription>Manage electronic waste types and categories</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onAdd} className="space-y-4 mb-4">
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
} 