import {
    Box,
    Container,
    GridItem,
    Heading,
    SimpleGrid,
    Stack,
    Text,
} from "@chakra-ui/react";
import HomeSearch from "components/forms/HomeSearch";
import Filter from "./sections/jobs/Filter";
import Sorter from "./sections/jobs/Sorter";
import JobsFeed from "./sections/jobs/JobsFeed";
import { Helmet } from "react-helmet-async";
import CallToAction from "./sections/CallToAction";
import { useLoaderData } from "react-router-dom";

export default function JobList() {
    const allJobs = useLoaderData() as JobSummary[] | null;

    return (
        <>
            <Helmet>
                <title>Admerk - Jobs</title>
            </Helmet>

            <Box>
                <Container maxW="container.xl" pt={8}>
                    <Stack align="center">
                        <Heading
                            size="3xl"
                            fontWeight={500}
                            lineHeight="none"
                            textAlign="center"
                        >
                            Job Listing
                        </Heading>
                        <Text mt={6} variant="xl">
                            We provide an exceptionally rapid and impressive solution.
                        </Text>
                        <Box mt={8} w="full">
                            <HomeSearch maxW="container.md" />
                        </Box>
                    </Stack>
                </Container>
            </Box>
            <Box>
                <Container
                    variant="wider"
                    maxW="container.xl"
                    px={{ base: 4, md: 16 }}
                    py={{ base: 14, md: 28 }}
                >
                    <SimpleGrid
                        gridTemplateColumns={
                            "repeat(auto-fit, minmax(min(15rem, 100%), 1fr))"
                        }
                        gap={12}
                    >
                        <GridItem>
                            <Stack>
                                <Heading size="lg" fontWeight={500} color="slate.700">
                                    Filter By
                                </Heading>
                                <Box mt={4}>
                                    <Filter />
                                </Box>
                            </Stack>
                        </GridItem>
                        <GridItem colSpan={{ base: 1, lg: 3 }}>
                            <Stack>
                                <Stack
                                    direction="row"
                                    justify="space-between"
                                    align="center"
                                >
                                    <Text variant="lg">
                                        All{" "}
                                        <Text as="b">{allJobs && allJobs.length}</Text>{" "}
                                        jobs found
                                    </Text>
                                    <Sorter />
                                </Stack>
                                {allJobs && <JobsFeed allJobs={allJobs} />}
                            </Stack>
                        </GridItem>
                    </SimpleGrid>
                </Container>
                <CallToAction />
            </Box>
        </>
    );
}
