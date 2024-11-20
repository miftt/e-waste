'use client'

import { useState } from 'react'
import { Dropboxes } from '@/components/dashboard/dropboxes'

export default function DropboxesPage() {
    const [dropboxes, setDropboxes] = useState([
        { id: 1, location: 'Mall A', address: 'Jl. Merdeka No. 1', capacity: 100 },
        { id: 2, location: 'Pasar B', address: 'Jl. Sudirman No. 50', capacity: 150 },
    ])

    const addDropbox = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newDropbox = {
            id: dropboxes.length + 1,
            location: formData.get('location') as string,
            address: formData.get('address') as string,
            capacity: Number(formData.get('capacity')),
        }
        setDropboxes([...dropboxes, newDropbox])
        event.currentTarget.reset()
    }

    return <Dropboxes dropboxes={dropboxes} onAdd={addDropbox} />
} 