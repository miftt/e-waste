export interface CourierRegistration {
    name: string;
    email: string;
    phone: string;
    ktpNumber: string;
    ktpImage: File;
}

export interface CourierResponse {
    id: string;
    name: string;
    email: string;
    phone: string;
    ktpNumber: string;
    ktpImage: string;
    role: 'kurir';
    status: 'Pending' | 'Approved' | 'Rejected';
    createdAt: string;
    updatedAt: string;
} 