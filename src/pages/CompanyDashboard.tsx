import { useState, useEffect } from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Center,
    Heading,
    IconButton,
    SimpleGrid,
    Stack,
    Text,
} from "@chakra-ui/react";
import IntroCard from "./sections/userDashboard/IntroCard";
import { Helmet } from "react-helmet-async";
import { getAllJobApplications, getAllPostedJobs } from "services/api/company";
import { Link } from "react-router-dom";
import { BsBookmarkPlus } from "react-icons/bs";
import LoadingComp from "components/helpers/LoadingComp";

export default function CompanyDashboard() {
    const [postedJobs, setPostedJobs] = useState<Job[] | null>(null);
    const [applications, setApplications] = useState<Application[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const postedJobsData = await getAllPostedJobs();
            const applicationsData = await getAllJobApplications();
            setPostedJobs(postedJobsData);
            setApplications(applicationsData);
            setLoading(false);
        })();
    }, []);

    if (loading) return <LoadingComp />;

    return (
        <>
            <Helmet>
                <title>Admerk - Dashboard</title>
            </Helmet>
            <Stack px={{ base: 4, xl: 12 }} py={{ base: 4, xl: 8 }}>
                <Heading fontSize={{ base: "2xl", xl: "3xl" }} fontWeight={500}>
                    Dashboard
                </Heading>
                <SimpleGrid
                    mt={{ base: 2, xl: 6 }}
                    gridTemplateColumns={
                        "repeat(auto-fit, minmax(min(12rem, 100%), 1fr))"
                    }
                    rowGap={4}
                    columnGap={5}
                >
                    {postedJobs && (
                        <IntroCard
                            title={postedJobs.length.toString()}
                            subtitle="Posted Jobs"
                        />
                    )}
                    {applications && (
                        <IntroCard
                            title={applications.length.toString()}
                            subtitle="Job Applications"
                        />
                    )}
                </SimpleGrid>
                <Card rounded={{ base: "xl", xl: "3xl" }} mt={{ base: 8, xl: 10 }}>
                    <CardHeader borderBottom="1px" borderColor="slate.200">
                        <Heading
                            fontSize="xl"
                            fontWeight={500}
                            lineHeight={1}
                            color="slate.800"
                        >
                            Posted Jobs
                        </Heading>
                    </CardHeader>
                    <CardBody px={{ base: 4, xl: 8 }} py={{ base: 4, xl: 8 }}>
                        <Stack spacing={{ base: 6, xl: 8 }}>
                            {postedJobs &&
                                postedJobs.map((job) => {
                                    return <JobCard key={job.name_id} job={job} />;
                                })}
                        </Stack>
                    </CardBody>
                </Card>
            </Stack>
        </>
    );
}

type CardProps = { job: Job };

function JobCard({ job }: CardProps) {
    return (
        <Stack justify="center">
            <Stack direction="row" spacing={6}>
                <Stack w="10%" justify="center" align="center">
                    <Center
                        w={12}
                        aspectRatio="1/1"
                        bgColor="pink.500"
                        rounded="lg"
                        fontSize="2xl"
                        color="white"
                        fontWeight={700}
                        pb={1}
                    >
                        {job.company.name[0]}
                    </Center>
                </Stack>
                <Stack w="30%" justify="center" spacing={0}>
                    <Text color="pink.500" fontWeight={500} textTransform="capitalize">
                        {job.job_type}
                    </Text>
                    <Heading
                        as={Link}
                        to={`/job-details/${job.id}`}
                        onClick={() => window.scrollTo(0, 0)}
                        my="auto"
                        fontSize="xl"
                        fontWeight={600}
                        color="slate.900"
                        lineHeight={1.3}
                        margin={0}
                        noOfLines={2}
                    >
                        {job.job_title}
                    </Heading>
                </Stack>
                <Stack w="40%" justify="center" spacing={0}>
                    <Text fontSize="lg" color="slate.700" fontWeight={400}>
                        {job.location.state}, {job.location.country}
                    </Text>
                    <Text fontSize="lg" color="slate.500" fontWeight={400}>
                        <Text as="b" color="slate.700">
                            ${job.salary_amount}
                        </Text>{" "}
                        / {job.salary_duration}
                    </Text>
                </Stack>
                <Stack direction="row" align="center" justify="end" w="20%" spacing={4}>
                    <IconButton
                        variant="outline"
                        isRound={true}
                        borderColor="slate.400"
                        color="slate.400"
                        aria-label="Search database"
                        icon={<BsBookmarkPlus />}
                    />
                    <Button variant="primary" rounded="full" fontSize="sm">
                        Apply
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}
