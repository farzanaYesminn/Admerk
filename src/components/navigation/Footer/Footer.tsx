import {
    Box,
    Container,
    GridItem,
    Heading,
    SimpleGrid,
    Stack,
    Text,
} from "@chakra-ui/react";
import BrandLogo from "../BrandLogo";
import { Link } from "react-router-dom";
import FooterNewsletter from "components/forms/FooterNewsletter";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Footer() {
    return (
        <Box>
            <Container variant="wider" maxW="container.xl" py={12} mt={8}>
                <Stack>
                    <SimpleGrid columns={{ base: 1, lg: 6 }} gap={{ base: 8, lg: 4 }}>
                        <GridItem>
                            <BrandLogo mt={2} h={{ base: 8, lg: 7 }} />
                        </GridItem>
                        <GridItem mt={{ base: 4, lg: 0 }}>
                            <Stack>
                                <Heading
                                    fontSize={{ base: "xl", lg: "2xl" }}
                                    fontWeight={500}
                                >
                                    Services
                                </Heading>
                                <Stack mt={{ base: 2, lg: 6 }} spacing={3}>
                                    <Text
                                        as={Link}
                                        to="/"
                                        variant="link"
                                        fontSize={{ base: "md", lg: "lg" }}
                                    >
                                        Browse Jobs
                                    </Text>
                                    <Text
                                        as={Link}
                                        to="/"
                                        variant="link"
                                        fontSize={{ base: "md", lg: "lg" }}
                                    >
                                        Companies
                                    </Text>
                                    <Text
                                        as={Link}
                                        to="/"
                                        variant="link"
                                        fontSize={{ base: "md", lg: "lg" }}
                                    >
                                        Candidates
                                    </Text>
                                    <Text
                                        as={Link}
                                        to="/"
                                        variant="link"
                                        fontSize={{ base: "md", lg: "lg" }}
                                    >
                                        Pricing
                                    </Text>
                                </Stack>
                            </Stack>
                        </GridItem>
                        <GridItem>
                            <Stack>
                                <Heading
                                    fontSize={{ base: "xl", lg: "2xl" }}
                                    fontWeight={500}
                                >
                                    Company
                                </Heading>
                                <Stack mt={{ base: 2, lg: 6 }} spacing={3}>
                                    <Text
                                        as={Link}
                                        to="/"
                                        variant="link"
                                        fontSize={{ base: "md", lg: "lg" }}
                                    >
                                        About Us
                                    </Text>
                                    <Text
                                        as={Link}
                                        to="/"
                                        variant="link"
                                        fontSize={{ base: "md", lg: "lg" }}
                                    >
                                        Blogs
                                    </Text>
                                    <Text
                                        as={Link}
                                        to="/"
                                        variant="link"
                                        fontSize={{ base: "md", lg: "lg" }}
                                    >
                                        FAQ's
                                    </Text>
                                    <Text
                                        as={Link}
                                        to="/"
                                        variant="link"
                                        fontSize={{ base: "md", lg: "lg" }}
                                    >
                                        Contact
                                    </Text>
                                </Stack>
                            </Stack>
                        </GridItem>
                        <GridItem>
                            <Stack>
                                <Heading
                                    fontSize={{ base: "xl", lg: "2xl" }}
                                    fontWeight={500}
                                >
                                    Support
                                </Heading>
                                <Stack mt={{ base: 2, lg: 6 }} spacing={3}>
                                    <Text
                                        as={Link}
                                        to="/"
                                        variant="link"
                                        fontSize={{ base: "md", lg: "lg" }}
                                    >
                                        Terms of use
                                    </Text>
                                    <Text
                                        as={Link}
                                        to="/"
                                        variant="link"
                                        fontSize={{ base: "md", lg: "lg" }}
                                    >
                                        Terms & conditions
                                    </Text>
                                    <Text
                                        as={Link}
                                        to="/"
                                        variant="link"
                                        fontSize={{ base: "md", lg: "lg" }}
                                    >
                                        Privacy
                                    </Text>
                                    <Text
                                        as={Link}
                                        to="/"
                                        variant="link"
                                        fontSize={{ base: "md", lg: "lg" }}
                                    >
                                        Cookie policy
                                    </Text>
                                </Stack>
                            </Stack>
                        </GridItem>
                        <GridItem colSpan={{ base: 1, lg: 2 }}>
                            <Stack>
                                <Heading
                                    fontSize={{ base: "xl", lg: "2xl" }}
                                    fontWeight={500}
                                >
                                    Newsletter
                                </Heading>
                                <Stack mt={{ base: 2, lg: 6 }} spacing={3}>
                                    <Text variant="link">
                                        Join & get important new regularly
                                    </Text>
                                    <FooterNewsletter />
                                    <Text fontSize="sm" color="slate.400">
                                        We only send interesting and relevant emails.
                                    </Text>
                                </Stack>
                            </Stack>
                        </GridItem>
                    </SimpleGrid>
                </Stack>
            </Container>
            <Container variant="wider" maxW="container.xl" py={{ base: 4, lg: 12 }}>
                <SimpleGrid columns={{ base: 1, lg: 3 }} gap={2}>
                    <GridItem>
                        <Stack direction="row" justify={{ base: "center", lg: "left" }}>
                            <Text fontSize="lg" fontWeight={500}>
                                Privacy & Terms.
                            </Text>
                            <Text fontSize="lg" fontWeight={500}>
                                Contact us
                            </Text>
                        </Stack>
                    </GridItem>
                    <GridItem>
                        <Text mx="auto" fontSize="lg" color="slate.500" w="fit-content">
                            Copyright @2023 admerk corp inc.
                        </Text>
                    </GridItem>
                    <GridItem>
                        <Stack
                            ml="auto"
                            direction="row"
                            spacing={4}
                            justify={{ base: "center", lg: "right" }}
                        >
                            <Text as={Link} to="/" fontSize="xl" color="slate.600">
                                <Icon icon="ic:baseline-whatsapp" />
                            </Text>
                            <Text as={Link} to="/" fontSize="xl" color="slate.600">
                                <Icon icon="ri:facebook-fill" />
                            </Text>
                            <Text as={Link} to="/" fontSize="xl" color="slate.600">
                                <Icon icon="ri:twitter-line" />
                            </Text>
                            <Text as={Link} to="/" fontSize="xl" color="slate.600">
                                <Icon icon="material-symbols:mail-outline" />
                            </Text>
                        </Stack>
                    </GridItem>
                </SimpleGrid>
            </Container>
        </Box>
    );
}
