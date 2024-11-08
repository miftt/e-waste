'use client';

import { FaAddressCard } from "react-icons/fa6";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FaCoins, FaDropbox, FaRegEdit } from "react-icons/fa";
import { useState } from "react";

// Menu items.
const items = [
    {
        title: "Manage E-Waste",
        url: "/manage",
        icon: FaRegEdit,
    },
    {
        title: "Point",
        url: "#",
        icon: FaCoins,
    },
    {
        title: "Dropbox",
        url: "#",
        icon: FaDropbox,
    },
];

export function AppSidebar() {
    // State untuk menyimpan status terbuka/tutup submenu
    const [isApprovalOpen, setApprovalOpen] = useState(false);

    return (
        <div className="">

            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Admin E-Waste</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    {/* Menu utama "Registration Approval" */}
                                    <SidebarMenuButton onClick={() => setApprovalOpen(!isApprovalOpen)}>
                                        <FaAddressCard />
                                        <span>Registration Approval</span>
                                    </SidebarMenuButton>

                                    {/* Submenu untuk Masyarakat dan Kurir */}
                                    {isApprovalOpen && (
                                        <div className="pl-6 mt-2 space-y-1">
                                            <SidebarMenuItem>
                                                <SidebarMenuButton asChild>
                                                    <a href="/registrasi/masyarakat">
                                                        <span>Masyarakat</span>
                                                    </a>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                            <SidebarMenuItem>
                                                <SidebarMenuButton asChild>
                                                    <a href="/registrasi/kurir">
                                                        <span>Kurir</span>
                                                    </a>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        </div>
                                    )}
                                </SidebarMenuItem>

                                {/* Menu lainnya */}
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </div>
    );
}
