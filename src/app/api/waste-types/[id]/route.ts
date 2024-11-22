import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, updateDoc, deleteDoc } from "firebase/firestore"

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const formData = await request.formData()
        const name = formData.get('name') as string
        const category = formData.get('category') as string
        const points = formData.get('points') as string

        const wasteTypeRef = doc(db, "wasteTypes", params.id)
        
        await updateDoc(wasteTypeRef, {
            name,
            category,
            points,
            updatedAt: new Date().toISOString()
        })

        return NextResponse.json({ 
            message: 'Waste type updated successfully',
            id: params.id 
        })
    } catch (error) {
        console.error('Error updating waste type:', error)
        return NextResponse.json(
            { error: 'Failed to update waste type' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const wasteTypeRef = doc(db, "wasteTypes", params.id)
        await deleteDoc(wasteTypeRef)

        return NextResponse.json({ 
            message: 'Waste type deleted successfully',
            id: params.id 
        })
    } catch (error) {
        console.error('Error deleting waste type:', error)
        return NextResponse.json(
            { error: 'Failed to delete waste type' },
            { status: 500 }
        )
    }
} 