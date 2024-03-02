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

export function Sidebar({ sidebarOpen, toggleSidebar }: Props) {
    const { authInfo } = useAuth();

    return (
        <AnimatePresence>
            {sidebarOpen && (
                <Box display={{ base: "block", md: "none" }}>
                    <MotionBox
                        position="fixed"
                        zIndex={40}
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
                        zIndex={50}
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
            {authInfo && (
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
            )}
            <Stack spacing={1} mt={{ base: 2, md: 4, lg: 8 }}>
                <SidebarNavlink icon="radix-icons:home" title="Home" to="/" />
                <SidebarNavlink
                    icon="radix-icons:backpack"
                    title="Jobs"
                    to="/job-list/"
                />
                <SidebarNavlink
                    icon="radix-icons:envelope-open"
                    title="Contact"
                    to="/contact"
                />
                {authInfo.login_data.role === "user" && (
                    <>
                        <SidebarNavlink
                            icon="radix-icons:component-2"
                            title="Dashboard"
                            to="/dashboard/user/"
                        />
                    </>
                )}
                {authInfo.login_data.role === "company" && (
                    <>
                        <SidebarNavlink
                            icon="radix-icons:component-2"
                            title="Dashboard"
                            to="/dashboard/company/"
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
