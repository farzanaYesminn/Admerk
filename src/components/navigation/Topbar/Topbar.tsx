import { useState, useEffect } from "react";
import {
    Box,
    type BoxProps,
    Button,
    Center,
    Container,
    Stack,
    IconButton,
} from "@chakra-ui/react";
import { userSitemap, companySitemap, type Route } from "components/navigation/sitemap";
import BrandLogo from "../BrandLogo";
import Navlink from "./Navlink";
import AuthBtn from "./AuthBtn";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuth } from "lib/context/AuthProvider";

type Props = BoxProps & {
    toggleSidebar: () => void;
};

export function Topbar({ toggleSidebar, ...props }: Props) {
    return (
        <Box bg="white" {...props}>
            <Container w="full" maxW="none">
                <Stack
                    h={{ base: 20, lg: 28 }}
                    direction="row"
                    w="full"
                    justify="space-between"
                >
                    <TopbarContents toggleSidebar={toggleSidebar} />
                </Stack>
            </Container>
        </Box>
    );
}

export function TopbarScroll({ toggleSidebar, ...props }: Props) {
    const [sticky, setSticky] = useState<boolean>();

    function setStickyNav() {
        if (window.scrollY >= 80) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", setStickyNav);
        return () => window.removeEventListener("scroll", setStickyNav);
    }, [window, setStickyNav]);

    return (
        <Box
            bg="white"
            {...props}
            w="full"
            position="fixed"
            zIndex={50}
            top={0}
            left={0}
            transform={sticky ? "" : "translateY(-100%)"}
            shadow="0 4px 16px 0 var(--chakra-colors-blackAlpha-100)"
            transition="500ms ease-in-out"
        >
            <Container w="full" maxW="none">
                <Stack h={20} w="full" direction="row" justify="space-between">
                    <TopbarContents toggleSidebar={toggleSidebar} />
                </Stack>
            </Container>
        </Box>
    );
}

type ContentProps = {
    toggleSidebar: () => void;
};

function TopbarContents({ toggleSidebar }: ContentProps) {
    const { authInfo } = useAuth();

    return (
        <>
            <Center>
                <Box as={Link} to="/">
                    <BrandLogo h={{ base: 7, sm: 8 }} aspectRatio="5/1" />
                </Box>
            </Center>
            <Stack direction="row" spacing={{ lg: 4, xl: 6 }}>
                {/* navlinks */}
                <Stack display={{ base: "none", lg: "flex" }} direction="row">
                    {!authInfo &&
                        userSitemap.map((route: Route) => {
                            return <Navlink key={route.title} route={route} />;
                        })}

                    {authInfo?.login_data.role === "user" &&
                        userSitemap.map((route: Route) => {
                            return <Navlink key={route.title} route={route} />;
                        })}

                    {authInfo?.login_data.role === "company" &&
                        companySitemap.map((route: Route) => {
                            return <Navlink key={route.title} route={route} />;
                        })}
                </Stack>
                <Stack direction="row" spacing={4}>
                    <Center>
                        <AuthBtn />
                    </Center>
                    <Center display={{ base: "none", lg: "flex" }}>
                        <Button variant="primary" size="lg" fontSize="md" rounded="full">
                            Post A Job
                        </Button>
                    </Center>
                    <Center display={{ base: "flex", lg: "none" }}>
                        <IconButton
                            aria-label="menu"
                            fontSize="3xl"
                            icon={<Icon icon="quill:hamburger" />}
                            onClick={toggleSidebar}
                        />
                    </Center>
                </Stack>
            </Stack>
        </>
    );
}
