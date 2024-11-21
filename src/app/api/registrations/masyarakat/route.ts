import { db } from "@/lib/firebase"
import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const masyarakatRef = collection(db, "registration_masyarakat")
    const q = query(
      masyarakatRef,
      where("role", "==", "masyarakat"),
      orderBy("createdAt", "desc")
    )

    const querySnapshot = await getDocs(q)
    const masyarakats = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    return NextResponse.json(masyarakats)
  } catch (error) {
    console.log("Error fetching masyarakat registrations: ", error)
    return NextResponse.json(
      { error: "Failed to fetch masyarakat registrations" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request){
  try{
    const formData = await request.formData()

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const address = formData.get('address') as string

    if (!name || !email || !phone || !address) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    const masyarakatData = {
      name,
      email,
      phone,
      address,
      role: "masyarakat",
      status: "Pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const registrationsRef = collection(db, "registration_masyarakat")
    const q = query(
      registrationsRef,
      where("role", "==", "masyarakat"),
      orderBy("createdAt", "desc")
    )
    const querySnapshot = await getDocs(q)
    const checkEmail = querySnapshot.docs.map(doc => ({
      id: doc.id,
      email: doc.data().email,  
    }))

    if(checkEmail.length > 0 && checkEmail[0].email === email){
      return NextResponse.json(
        { error: "Email already exists", status: false, statusCode: 400 },
        { status: 400 }
      )
    }

    const docRef = await addDoc(registrationsRef, masyarakatData)
    return NextResponse.json({
      id: docRef.id,
      statusCode: 201,
      ...masyarakatData,
    }, { status: 201})

  } catch (error) {
    console.log("Error creating masyarakat registration: ", error)
    return NextResponse.json(
      { error: "Failed to create masyarakat registration" },
      { status: 500 }
    )
  }
}