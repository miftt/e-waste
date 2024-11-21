import { db } from '@/lib/firebase'
import { doc, updateDoc } from 'firebase/firestore';


export async function PATCH(
    request: Request,
    {params}: {params: {id: string}}
) {
    try {
        const { id } = params;
        const { status } = await request.json();

        const masyarakatRef = doc(db, "registration_masyarakat", id);
        await updateDoc(masyarakatRef, {
            status: status,
            updatedAt: new Date().toISOString()
        });

        return Response.json({
            status: "success",
            statusCode: 200,
            message: "Registration updated successfully"
        }, {
            status: 200
        });
    } catch (error) {
        console.log("Error updating registration masyarakat: ", error)
        return Response.json({
            status: "error",
            statusCode: 500,
            message: "Failed to update registration masyarakat"
        }, {
            status: 500
        });
    }
}