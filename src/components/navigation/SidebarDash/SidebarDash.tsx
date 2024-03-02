import { Avatar, Box, Center, Stack, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import BrandLogo from "../BrandLogo";
import { Link, NavLink as RouterLink } from "react-router-dom";
import { useAuth } from "lib/context/AuthProvider";

type Props = {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
};

const MotionBox = motion(Box);

export function SidebarDash({ sidebarOpen, toggleSidebar }: Props) {
    const { authInfo } = useAuth();

    return (
        <AnimatePresence>
            {sidebarOpen && (
                <Box display={{ base: "block", md: "none" }}>
                    <MotionBox
                        position="fixed"
                        zIndex={30}
                        inset={0}
                        bgColor="blackAlpha.100"
                        onClick={toggleSidebar}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.4,
                            ease: [0, 0.71, 0.2, 1],
                        }}
                    />
                    <MotionBox
                        position="fixed"
                        zIndex={40}
                        left={0}
                        top={0}
                        w={72}
                        bgColor="white"
                        h="100vh"
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{
                            duration: 0.4,
                            ease: [0, 0.71, 0.2, 1],
                        }}
                        shadow="4px 0 24px 0 var(--chakra-colors-blackAlpha-300)"
                    >
                        {authInfo && (
                            <Box
                                py={6}
                                h="full"
                                overflowY="scroll"
                                sx={{
                                    "::-webkit-scrollbar": {
                                        display: "none",
                                    },
                                }}
                            >
                                <SidebarContent
                                    authInfo={authInfo}
                                    toggleSidebar={toggleSidebar}
                                />
                            </Box>
                        )}
                    </MotionBox>
                </Box>
            )}
        </AnimatePresence>
    );
}

export function SidebarDashFixed() {
    const { authInfo } = useAuth();

    return (
        <Box
            position="relative"
            zIndex={20}
            display={{ base: "none", md: "block" }}
            w="16rem"
            bgColor="white"
            h="100vh"
            shadow="2px 0 4px 0 var(--chakra-colors-blackAlpha-100)"
        >
            {authInfo && (
                <Box
                    py={{ base: 6, lg: 10 }}
                    h="full"
                    overflowY="scroll"
                    sx={{
                        "::-webkit-scrollbar": {
                            display: "none",
                        },
                    }}
                >
                    <SidebarContent authInfo={authInfo} />
                </Box>
            )}
        </Box>
    );
}

type ContentProps = {
    authInfo: AuthInfo;
    toggleSidebar?: () => void;
};

function SidebarContent({ authInfo }: ContentProps) {
    return (
        <Stack h="full" pl={{ base: 2, md: 4, lg: 6 }} pr={{ base: 4, lg: 8 }}>
            <Stack direction="row" justify="center">
                <Center>
                    <Box as={Link} to="/">
                        <BrandLogo
                            objectPosition="left"
                            h={{ base: 7, md: 8 }}
                            aspectRatio="5/1"
                        />
                    </Box>
                </Center>
            </Stack>
            <Stack mt={8}>
                <Center>
                    <Avatar
                        size={{ base: "md", lg: "lg" }}
                        border="2px"
                        bgColor="white"
                        color="pink.500"
                        name={authInfo.login_data.username[0]}
                    />
                </Center>
                <Center>
                    <Text fontSize={{ base: "lg", lg: "xl" }} fontWeight={500}>
                        {authInfo.login_data.username}
                    </Text>
                </Center>
            </Stack>
            <Stack spacing={1} mt={{ base: 2, md: 4, lg: 8 }}>
                {authInfo.login_data.role === "user" && (
                    <>
                        <SidebarNavlink
                            icon="radix-icons:dashboard"
                            title="Dashboard"
                            to="/dashboard/user/"
                        />
                        <SidebarNavlink
                            icon="radix-icons:avatar"
                            title="My Profile"
                            to="/dashboard/user/profile"
                        />
                        <SidebarNavlink
                            icon="solar:settings-linear"
                            title="Settings"
                            to="/dashboard/user/settings"
                        />
                    </>
                )}
                {authInfo.login_data.role === "company" && (
                    <>
                        <SidebarNavlink
                            icon="radix-icons:dashboard"
                            title="Dashboard"
                            to="/dashboard/company/"
                        />
                        <SidebarNavlink
                            icon="radix-icons:avatar"
                            title="Our Profile"
                            to="/dashboard/company/profile"
                        />
                        <SidebarNavlink
                            icon="solar:pen-new-square-linear"
                            title="Create Job"
                            to="/dashboard/company/create-job"
                        />
                        <SidebarNavlink
                            icon="radix-icons:backpack"
                            title="Job Applications"
                            to="/dashboard/company/applications"
                        />
                        <SidebarNavlink
                            icon="solar:settings-linear"
                            title="Settings"
                            to="/dashboard/company/settings"
                        />
                    </>
                )}
            </Stack>
        </Stack>
    );
}

type SidebarNavlinkProps = {
    icon: string;
    title: string;
    to?: string;
};

function SidebarNavlink({ icon, title, to = "" }: SidebarNavlinkProps) {
    return (
        <Stack
            as={RouterLink}
            to={to}
            direction="row"
            align="center"
            spacing={3}
            px={4}
            py={{ base: 4, lg: 5 }}
            rounded={{ base: "lg", lg: "xl" }}
            cursor="pointer"
            _activeLink={{
                bgColor: "purple.500",
                color: "white",
                _hover: {
                    color: "white",
                },
            }}
            _hover={{
                color: "purple.500",
            }}
        >
            <Text fontSize="xl">
                <Icon icon={icon} />
            </Text>
            <Text fontSize={{ base: "md", md: "lg" }} fontWeight={500} lineHeight={1.2}>
                {title}
            </Text>
        </Stack>
    );
}
