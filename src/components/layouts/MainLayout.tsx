import { useState } from "react";
import { Box, Stack } from "@chakra-ui/react";
import { Topbar, TopbarScroll } from "components/navigation/Topbar/Topbar";
import Footer from "../navigation/Footer/Footer";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../navigation/Sidebar/Sidebar";

export default function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    return (
        <Stack minH="100vh" w="full" overflowX="hidden" spacing={0}>
            <Topbar toggleSidebar={toggleSidebar} />
            <TopbarScroll toggleSidebar={toggleSidebar} />
            <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <Box flexGrow={1}>
                <Outlet />
            </Box>
            <Footer />
        </Stack>
    );
}
