import { db } from "@/lib/firebase"
import { doc, updateDoc } from "firebase/firestore"
import { NextResponse } from "next/server"

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params
        const { status } = await request.json()

        const courierRef = doc(db, "registration_kurir", id)
        await updateDoc(courierRef, {
            status: status,
            updatedAt: new Date().toISOString()
        })

        return NextResponse.json({ message: "Status updated successfully" })
    } catch (error) {
        console.error("Error updating courier status:", error)
        return NextResponse.json(
            { error: "Failed to update courier status" },
            { status: 500 }
        )
    }
} 