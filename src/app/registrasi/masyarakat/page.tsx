"use client";
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { toast } from 'sonner';

export default function RegistrasiMasyarakat() {
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            const response = await axios.get('/api/registrasi/masyarakat');
            setRegistrations(response.data);
        } catch (error) {
            toast.error('Failed to fetch registrations');
        }
    };

    const approveRegistration = async (id: any) => {
        setLoading(true);
        try {
            await axios.post('/api/registrations', { id });
            setRegistrations((prev) =>
                prev.map((reg) => (reg.id === id ? { ...reg, status: 'approved' } : reg))
            );
            toast.success('Registration approved successfully');
        } catch (error) {
            console.error('Failed to approve registration:', error);
            toast.error('Failed to approve registration');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-16 w-screen min-h-screen">
            <h1 className="text-xl font-semibold mb-4">Registrations Masyarakat Approval</h1>
            <table className="w-[80%] border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">No</th>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {registrations.map((registration, index) => (
                        <tr key={registration.id}>
                            <td className="p-2 border">{index + 1}</td>
                            <td className="p-2 border">{registration.name}</td>
                            <td className="p-2 border">{registration.email}</td>
                            <td className="p-2 border flex justify-center">
                                {registration.status === 'pending' ? (
                                    <span className="flextext-black font-normal text-sm border bg-yellow-500 rounded-xl px-2 py-1">
                                        Pending
                                    </span>
                                ) : (
                                    <span className="text-green-500 font-semibold">Approved</span>
                                )}
                            </td>
                            <td className="p-2 border">
                                {registration.status === 'pending' ? (
                                    <>
                                        <Button
                                            onClick={() => approveRegistration(registration.id)}
                                            disabled={loading}
                                            className="bg-green-500 text-white mr-2"
                                        >
                                            Approve
                                        </Button>

                                        <Button
                                            onClick={() => approveRegistration(registration.id)} // Ganti fungsi ini sesuai logika penolakan
                                            variant="destructive"
                                            disabled={loading}
                                            className="ml-2"
                                        >
                                            Reject
                                        </Button>
                                    </>
                                ) : (
                                    <span className="text-green-500">Approved</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
