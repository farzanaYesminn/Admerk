import {
    Box,
    Container,
    Stack,
    Heading,
    Text,
    Button,
    SimpleGrid,
    Image,
    GridItem,
    Center,
    Divider,
} from "@chakra-ui/react";
import HomeSearch from "components/forms/HomeSearch";
import WhyUs from "./sections/home/WhyUs";
import TopCompanies from "./sections/home/TopCompanies";
import UploadCvImage from "assets/images/upload-cv.png";
import WhyUsImage from "assets/images/why-us.jpeg";
import SuggestCategories from "./sections/home/SuggestCategories";
import PopularCategories from "./sections/home/PopularCategories";
import Questions from "./sections/home/Questions";
import HowItWorks from "./sections/home/HowItWorks";
import { Helmet } from "react-helmet-async";

export default function Home() {
    return (
        <>
            <Helmet>
                <title>Admerk - Home</title>
            </Helmet>

            <Box>
                <Container maxW="container.xl" pt={16} pb={32}>
                    <Stack align="center">
                        <Heading
                            fontSize={{ base: "5xl", md: "6xl" }}
                            fontWeight={600}
                            lineHeight="120%"
                            textAlign="center"
                        >
                            An Odyssey to
                            <br />
                            <Text as={"span"} color={"pink.400"}>
                                Fresh starts
                            </Text>
                        </Heading>
                        <Text
                            mt={6}
                            fontSize={{ base: "xl", md: "2xl" }}
                            textAlign="center"
                            color="slate.500"
                        >
                            At{" "}
                            <Text as={"span"} color={"pink.400"}>
                                Admerk,
                            </Text>{" "}
                            we link refugees to jobs, fostering economic integration.
                        </Text>
                        <Box mt={12} w="full">
                            <HomeSearch maxW="container.sm" />
                        </Box>
                        <Box mt={8}>
                            <SuggestCategories />
                        </Box>
                    </Stack>
                </Container>
            </Box>
            <Box bg="purple.50">
                <Container
                    variant="wider"
                    maxW="container.xl"
                    py={{ base: 24, sm: 28, xl: 32 }}
                >
                    <Stack>
                        <Stack direction="row" justify="space-between" align="end">
                            <Heading
                                fontSize={{ base: "4xl", md: "5xl" }}
                                fontWeight={600}
                                lineHeight="120%"
                            >
                                Most Demanding Categories
                            </Heading>
                            <Button
                                display={{ base: "none", lg: "block" }}
                                variant="link"
                                color="pink.500"
                                size="lg"
                            >
                                All Categories {">"}
                            </Button>
                        </Stack>
                        <Box mt={{ base: 16, lg: 24 }}>
                            <PopularCategories />
                        </Box>
                    </Stack>
                </Container>
            </Box>
            <Box>
                <Container
                    variant="wider"
                    maxW="container.xl"
                    py={{ base: 24, sm: 28, xl: 32 }}
                >
                    <Stack spacing={0}>
                        <Center>
                            <Heading
                                fontSize={{ base: "5xl", md: "6xl" }}
                                fontWeight={600}
                                lineHeight="120%"
                            >
                                How it works
                            </Heading>
                        </Center>
                        <Box mt={8}>
                            <HowItWorks />
                        </Box>
                        <Divider />
                        <SimpleGrid
                            mt={{ base: 16, lg: 32 }}
                            gap={{ base: 16, lg: 20 }}
                            gridTemplateColumns={
                                "repeat(auto-fit, minmax(min(30rem, 100%), 1fr))"
                            }
                        >
                            <GridItem>
                                <Box
                                    h="full"
                                    overflow="hidden"
                                    rounded={{ base: "lg", lg: "3.5rem" }}
                                >
                                    <Image
                                        src={WhyUsImage}
                                        h="full"
                                        w="full"
                                        fit="cover"
                                        alt=""
                                    />
                                </Box>
                            </GridItem>
                            <GridItem>
                                <WhyUs />
                            </GridItem>
                        </SimpleGrid>
                    </Stack>
                </Container>
            </Box>
            <Box bg="purple.50">
                <Container
                    variant="wider"
                    maxW="container.xl"
                    py={{ base: 24, sm: 28, xl: 32 }}
                >
                    <Stack>
                        <Stack direction="row" justify="space-between" align="end">
                            <Heading
                                fontSize={{ base: "4xl", md: "5xl" }}
                                fontWeight={600}
                                lineHeight="120%"
                            >
                                Top Companies
                            </Heading>
                            <Button
                                display={{ base: "none", lg: "block" }}
                                variant="link"
                                color="pink.500"
                                size="lg"
                            >
                                Explore More {">"}
                            </Button>
                        </Stack>
                        <Box mt={{ base: 16, lg: 24 }}>
                            <TopCompanies />
                        </Box>
                    </Stack>
                </Container>
            </Box>
            <Box>
                <Container
                    variant="wider"
                    maxW="container.xl"
                    py={{ base: 24, sm: 28, xl: 32 }}
                >
                    <Stack>
                        <Heading
                            fontSize={{ base: "5xl", md: "6xl" }}
                            fontWeight={600}
                            lineHeight="120%"
                            textAlign="center"
                        >
                            Questions & Answers
                        </Heading>
                        <Box mt={{ base: 10, lg: 20 }}>
                            <Questions />
                        </Box>
                    </Stack>
                </Container>
            </Box>
            <Box>
                <Container
                    variant="wider"
                    maxW="container.xl"
                    pb={{ base: 24, sm: 28, xl: 32 }}
                >
                    <Box
                        h="full"
                        w="full"
                        bg="purple.100"
                        rounded={{ base: "xl", lg: "2.5rem" }}
                        px={{ base: 6, lg: 12 }}
                    >
                        <SimpleGrid
                            gridTemplateColumns={
                                "repeat(auto-fit, minmax(min(28rem, 100%), 1fr))"
                            }
                            gap={{ base: 14, lg: 28 }}
                        >
                            <GridItem
                                as={Stack}
                                align="center"
                                pt={{ base: 0, lg: 12 }}
                                order={{ base: 1, lg: 0 }}
                            >
                                <Image
                                    h="auto"
                                    src={UploadCvImage}
                                    fit="contain"
                                    objectPosition="end"
                                    alt="upload-cv-model"
                                />
                            </GridItem>
                            <GridItem py={{ base: 10, lg: 14 }}>
                                <Heading
                                    fontSize={{ base: "4xl", md: "5xl" }}
                                    fontWeight={600}
                                    lineHeight="120%"
                                >
                                    Find suitable job opportunities within few minutes.
                                </Heading>
                                <Text mt={8} fontSize={{ base: "lg", lg: "2xl" }}>
                                    Discover your career with renowned global companies.
                                    Submit your resume today.
                                </Text>
                                <Button
                                    mt={14}
                                    variant="primary"
                                    size="xl"
                                    // rounded="full"
                                    w="fit-content"
                                >
                                    Upload your CV
                                </Button>
                            </GridItem>
                        </SimpleGrid>
                    </Box>
                </Container>
            </Box>
        </>
    );
}
