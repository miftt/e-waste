import { db } from "@/lib/firebase"
import { collection, getDocs, addDoc, query, orderBy } from "firebase/firestore"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const dropboxesRef = collection(db, "dropboxes")
        const q = query(dropboxesRef, orderBy("createdAt", "desc"))
        const querySnapshot = await getDocs(q)
        
        const dropboxes = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        return NextResponse.json(dropboxes)
    } catch (error) {
        console.error("Error fetching dropboxes:", error)
        return NextResponse.json(
            { error: "Failed to fetch dropboxes" },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData()

        const location = formData.get('location') as string
        const address = formData.get('address') as string
        const capacity = formData.get('capacity') as string

        const capacityNumber = Number(capacity)

        // Validate required fields
        if (!location || !address || !capacity) {
            return NextResponse.json(
                { error: "Location, address, and capacity are required" },
                { status: 400 }
            )
        }
        
        let status = null
        if(capacityNumber <= 50) {
            status = "Available"
        } else if (capacityNumber > 50) {
            status = "Full"
        }

        const dropboxData = {
            location,
            address,
            capacity: Number(capacity),
            currentCapacity: 0, // Initial capacity is 0
            status: status, // Initial status
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        const dropboxesRef = collection(db, "dropboxes")
        const docRef = await addDoc(dropboxesRef, dropboxData)

        return NextResponse.json({
            id: docRef.id,
            ...dropboxData
        }, { status: 201 })

    } catch (error) {
        console.error("Error creating dropbox:", error)
        return NextResponse.json(
            { error: "Failed to create dropbox" },
            { status: 500 }
        )
    }
} 