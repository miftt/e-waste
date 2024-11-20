'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, Recycle, MapPin, LogOut, ChevronDown, ChevronRight, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Sidebar() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('dashboard')
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

    return (
        <aside className="w-80 bg-white shadow-md flex flex-col">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            </div>
            <nav className="flex-1 px-4">
                <Button
                    variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => {
                        setActiveTab('dashboard')
                        router.push('/')
                    }}
                >
                    <LayoutDashboard className="mr-2 h-5 w-5" />
                    Dashboard
                </Button>

                {/* Registration Approval Menu with Submenu */}
                <div className="my-2">
                    <Button
                        variant={activeTab.startsWith('registration') ? 'secondary' : 'ghost'}
                        className="w-full justify-between"
                        onClick={() => setIsRegistrationOpen(!isRegistrationOpen)}
                    >
                        <span className="flex items-center">
                            <Users className="mr-2 h-5 w-5" />
                            Registration Approval
                        </span>
                        {isRegistrationOpen ? (
                            <ChevronDown className="h-5 w-5" />
                        ) : (
                            <ChevronRight className="h-5 w-5" />
                        )}
                    </Button>

                    {isRegistrationOpen && (
                        <div className="ml-4 space-y-1 mt-2">
                            <Button
                                variant={activeTab === 'registration-masyarakat' ? 'secondary' : 'ghost'}
                                className="w-full justify-start pl-6"
                                onClick={() => {
                                    setActiveTab('registration-masyarakat')
                                    router.push('/registration-approval/masyarakat')
                                }}
                            >
                                Masyarakat
                            </Button>
                            <Button
                                variant={activeTab === 'registration-kurir' ? 'secondary' : 'ghost'}
                                className="w-full justify-start pl-6"
                                onClick={() => {
                                    setActiveTab('registration-kurir')
                                    router.push('/registration-approval/kurir')
                                }}
                            >
                                Kurir
                            </Button>
                        </div>
                    )}
                </div>

                <Button
                    variant={activeTab === 'waste-types' ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => {
                        setActiveTab('waste-types')
                        router.push('/waste-types')
                    }}
                >
                    <Recycle className="mr-2 h-5 w-5" />
                    Waste Types
                </Button>
                <Button
                    variant={activeTab === 'dropboxes' ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => {
                        setActiveTab('dropboxes')
                        router.push('/dropboxes')
                    }}
                >
                    <MapPin className="mr-2 h-5 w-5" />
                    Dropboxes
                </Button>
            </nav>

            {/* User Profile and Logout Section */}
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-4 mb-4 px-2">
                    <Avatar>
                        <AvatarImage src="/avatars/01.png" alt="Admin" />
                        <AvatarFallback>
                            <User className="h-5 w-5" />
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium">Admin User</p>
                        <p className="text-xs text-gray-500">admin@example.com</p>
                    </div>
                </div>
                <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                    <LogOut className="mr-2 h-5 w-5" />
                    Logout
                </Button>
            </div>
        </aside>
    )
} 