import {
    Box,
    Card,
    CardBody,
    Center,
    Container,
    Heading,
    Link,
    Stack,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { NavLink as RouterLink, Outlet } from "react-router-dom";

export default function RegisterLayout() {
    return (
        <>
            <Helmet>
                <title>Admerk - Register</title>
            </Helmet>
            <Box>
                <Container maxW="container.xl" px={4} py={12}>
                    <Center>
                        <Card
                            rounded="2xl"
                            border="1px"
                            borderColor="blackAlpha.100"
                            w="full"
                            maxW={{
                                base: "full",
                                sm: "container.sm",
                                md: "container.md",
                            }}
                            shadow={{
                                base: "0 2px 8px 0 var(--chakra-colors-purple-200)",
                            }}
                        >
                            <CardBody
                                px={{ base: 4, md: 16, xl: 20 }}
                                py={{ base: 4, md: 8, xl: 16 }}
                            >
                                <Heading
                                    fontSize={{
                                        base: "3xl",
                                        md: "4xl",
                                        lg: "5xl",
                                    }}
                                    fontWeight={{ base: 400 }}
                                    color="purple.900"
                                    textAlign="center"
                                >
                                    Create Account
                                </Heading>
                                <Stack
                                    mt={8}
                                    direction="row"
                                    rounded="full"
                                    overflow="hidden"
                                    justify="center"
                                    width="90%"
                                    mx="auto"
                                    border="2px"
                                    borderColor="purple.500"
                                >
                                    <RegNavLink to="/register/user">User</RegNavLink>
                                    <RegNavLink to="/register/company">
                                        Company
                                    </RegNavLink>
                                </Stack>
                                <Outlet />
                            </CardBody>
                        </Card>
                    </Center>
                </Container>
            </Box>
        </>
    );
}

type RegNavLinkProps = {
    children: string;
    to?: string;
};

function RegNavLink({ children, to = "/" }: RegNavLinkProps) {
    return (
        <Link
            as={RouterLink}
            to={to}
            w="full"
            textAlign="center"
            px={4}
            py={2}
            color="purple.500"
            fontSize={{ base: "md", lg: "lg" }}
            fontWeight={500}
            rounded="none"
            _hover={{
                textDecoration: "none",
            }}
            _activeLink={{
                // border: "2px",
                // borderColor: "purple.300",
                // bgColor: "purple.50",
                // color: "purple.700",
                bgColor: "purple.500",
                color: "white",
            }}
        >
            {children}
        </Link>
    );
}
