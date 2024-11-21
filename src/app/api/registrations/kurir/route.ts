// import { db, storage } from "@/lib/firebase"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, where, orderBy, addDoc } from "firebase/firestore"
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const courierRef = collection(db, "registration_kurir")
        const q = query(
            courierRef,
            where("role", "==", "kurir"),
            orderBy("createdAt", "desc")
        )
        
        const querySnapshot = await getDocs(q)
        const couriers = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }))

        return NextResponse.json(couriers)
    } catch (error) {
        console.error("Error fetching couriers:", error)
        return NextResponse.json(
            { error: "Failed to fetch couriers" },
            { status: 500 }
        )
    }
} 

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        
        // Get form fields
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const phone = formData.get('phone') as string
        const ktpNumber = formData.get('ktpNumber') as string
        // const ktpFile = formData.get('ktpImage') as File

        // Validate required fields
        if (!name || !email || !phone || !ktpNumber) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            )
        }

        // // Upload KTP image to Firebase Storage
        // const ktpStorageRef = ref(storage, `ktp/${Date.now()}-${ktpFile.name}`)
        // const ktpSnapshot = await uploadBytes(ktpStorageRef, ktpFile)
        // const ktpImageUrl = await getDownloadURL(ktpSnapshot.ref)

        // Create new courier registration document
        const courierData = {
            name,
            email,
            phone,
            ktpNumber,
            // ktpImage: ktpImageUrl,
            role: 'kurir',
            status: 'Pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        const registrationsRef = collection(db, "registration_kurir")
        const docRef = await addDoc(registrationsRef, courierData)

        return NextResponse.json({
            id: docRef.id,
            ...courierData
        }, { status: 201 })

    } catch (error) {
        console.error("Error creating courier registration:", error)
        return NextResponse.json(
            { error: "Failed to create courier registration" },
            { status: 500 }
        )
    }
} 
