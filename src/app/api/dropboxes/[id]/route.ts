import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, updateDoc, deleteDoc } from "firebase/firestore"

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const formData = await request.formData()
        const location = formData.get('location') as string
        const address = formData.get('address') as string
        const capacity = Number(formData.get('capacity'))

        const dropboxRef = doc(db, "dropboxes", params.id)
        
        await updateDoc(dropboxRef, {
            location,
            address,
            capacity,
            updatedAt: new Date().toISOString()
        })

        return NextResponse.json({ 
            message: 'Dropbox updated successfully',
            id: params.id 
        })
    } catch (error) {
        console.error('Error updating dropbox:', error)
        return NextResponse.json(
            { error: 'Failed to update dropbox' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const dropboxRef = doc(db, "dropboxes", params.id)
        await deleteDoc(dropboxRef)

        return NextResponse.json({ 
            message: 'Dropbox deleted successfully',
            id: params.id 
        })
    } catch (error) {
        console.error('Error deleting dropbox:', error)
        return NextResponse.json(
            { error: 'Failed to delete dropbox' },
            { status: 500 }
        )
    }
} 