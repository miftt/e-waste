import { db } from "@/lib/firebase"
import { collection, getDocs, addDoc, query, orderBy } from "firebase/firestore"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const wasteTypesRef = collection(db, "wasteTypes")
        const q = query(wasteTypesRef, orderBy("createdAt", "desc"))
        const querySnapshot = await getDocs(q)
        
        const wasteTypes = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        return NextResponse.json(wasteTypes)
    } catch (error) {
        console.error("Error fetching waste types:", error)
        return NextResponse.json(
            { error: "Failed to fetch waste types" },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData()

        const name = formData.get('name') as string
        const category = formData.get('category') as string
        const points = formData.get('points') as string

        // Validate required fields
        if (!name || !category || !points) {
            return NextResponse.json(
                { error: "Name, category, and points are required" },
                { status: 400 }
            )
        }

        const wasteTypeData = {
            name,
            category,
            points: Number(points),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        const wasteTypesRef = collection(db, "wasteTypes")
        const docRef = await addDoc(wasteTypesRef, wasteTypeData)

        return NextResponse.json({
            id: docRef.id,
            ...wasteTypeData
        }, { status: 201 })

    } catch (error) {
        console.error("Error creating waste type:", error)
        return NextResponse.json(
            { error: "Failed to create waste type" },
            { status: 500 }
        )
    }
} 