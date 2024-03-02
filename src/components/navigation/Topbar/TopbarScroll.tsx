import { useState, useEffect } from "react";
import { Box, Button, Center, Container, Stack } from "@chakra-ui/react";
import { userSitemap, companySitemap, type Route } from "components/navigation/sitemap";
import BrandLogo from "../BrandLogo";
import Navlink from "./Navlink";
import AuthBtn from "./AuthBtn";
import { useAuth } from "lib/context/AuthProvider";

export default function TopbarScroll() {
    const [sticky, setSticky] = useState<boolean>();
    const { authInfo } = useAuth();

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
    }, []);

    return (
        <Box
            bg="white"
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
                <Stack h="4.5rem" direction="row" w="full" justify="space-between">
                    <Center>
                        <Box as="a" href="/">
                            <BrandLogo h={8} />
                        </Box>
                    </Center>
                    <Stack direction="row" spacing={16}>
                        <Stack direction="row">
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
                            <Center>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    fontSize="md"
                                    rounded="full"
                                >
                                    Post A Job
                                </Button>
                            </Center>
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}
