'use client'

import { useState } from 'react'
import { WasteTypes } from '@/components/dashboard/waste-types'

export default function WasteTypesPage() {
    const [wasteTypes, setWasteTypes] = useState([
        { id: 1, name: 'Elektronik', category: 'Baterai', points: 5 },
        { id: 2, name: 'Elektronik', category: 'Smartphone', points: 10 },
    ])

    const addWasteType = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newWasteType = {
            id: wasteTypes.length + 1,
            name: formData.get('name') as string,
            category: formData.get('category') as string,
            points: Number(formData.get('points')),
        }
        setWasteTypes([...wasteTypes, newWasteType])
        event.currentTarget.reset()
    }

    return <WasteTypes wasteTypes={wasteTypes} onAdd={addWasteType} />
} 