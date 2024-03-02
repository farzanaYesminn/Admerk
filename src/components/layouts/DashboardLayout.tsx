import { useState } from "react";
import { Box, Stack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import TopbarDash from "../navigation/TopbarDash/TopbarDash";
import { SidebarDash, SidebarDashFixed } from "../navigation/SidebarDash/SidebarDash";

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    return (
        <Stack h="100vh" w="full" overflow="hidden" spacing={0}>
            <Stack direction="row" h="full" spacing={0}>
                <SidebarDashFixed />
                <SidebarDash sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <Stack bgColor="purple.50" flexGrow={1} overflowY="auto">
                    <TopbarDash toggleSidebar={toggleSidebar} />
                    <Box pb={8} flexGrow={1}>
                        <Outlet />
                    </Box>
                </Stack>
            </Stack>
        </Stack>
    );
}
