import { NextResponse } from "next/server"
let registrations = [
    { id: "1", name: 'Ajat Sudrajat', email: 'ajatsudrajat@gmail.com', status: 'pending', detail: 'Photo' },
    { id: "2", name: 'Tatang Sutarman', email: 'tatang@gmail.com', status: 'pending', detail: 'Photo' },
    { id: "3", name: 'So Lee Hin', email: 'solihin@gmail.com', status: 'pending', detail: 'Approved' },
  ];

export const GET = async () => {
    const res = JSON.stringify(registrations)
    return new NextResponse(res, { status: 200 })
}

export const POST = async (req: Request) => {
    const body = await req.json()
    console.log(body)
    registrations.push(body)
    return NextResponse.json({
        message: 'Registration created successfully'
    })
}