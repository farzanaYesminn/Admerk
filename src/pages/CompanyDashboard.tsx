import React, {useState, useEffect} from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Center,
    Heading,
    SimpleGrid,
    Stack,
    Text,
    Image,
} from "@chakra-ui/react";
import IntroCard from "./sections/userDashboard/IntroCard";
import {Helmet} from "react-helmet-async";
import {getAllJobApplications, getAllPostedJobs} from "services/api/company";
import {Link} from "react-router-dom";
import LoadingComp from "components/helpers/LoadingComp";
import {getProfilePicture} from "../services/api/user";

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

    if (loading) return <LoadingComp/>;

    return (
        <>
            <Helmet>
                <title>Admerk - Dashboard</title>
            </Helmet>
            <Stack px={{base: 4, xl: 12}} py={{base: 4, xl: 8}}>
                <Heading fontSize={{base: "2xl", xl: "3xl"}} fontWeight={500}>
                    Dashboard
                </Heading>
                <SimpleGrid
                    mt={{base: 2, xl: 6}}
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
                <Card rounded={{base: "xl", xl: "3xl"}} mt={{base: 8, xl: 10}}>
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
                    <CardBody px={{base: 4, xl: 8}} py={{base: 4, xl: 8}}>
                        <Stack spacing={{base: 6, xl: 8}}>
                            {postedJobs &&
                                postedJobs.map((job) => {
                                    return <JobCard key={job.jobId} job={job}/>;
                                })}
                        </Stack>
                    </CardBody>
                </Card>
            </Stack>
        </>
    );
}

type CardProps = { job: Job };

function JobCard({job}: CardProps) {
    const [profilePicture, setProfilePicture] = useState<string | null>(null);

    useEffect(() => {
        if (job.company.profilePictureUrl) {
            (async () => {
                try {
                    const imageUrl = await getProfilePicture(job.company.profilePictureUrl);
                    setProfilePicture(imageUrl);
                } catch (error) {
                    console.error("Failed to fetch profile picture:", error);
                }
            })();
        }
    }, [job.company.profilePictureUrl]);

    return (
        <Stack justify="center">
            <Stack direction="row" spacing={6}>
                <Stack w="10%" justify="center" align="center">
                    {profilePicture ? (
                        <Image src={profilePicture} alt="Profile Picture" w={12} h={12} rounded="full" />
                    ) : (
                        <Center
                            w={12}
                            h={12}
                            bgColor="pink.500"
                            rounded="full"
                            fontSize="2xl"
                            color="white"
                            fontWeight={700}
                            boxShadow="md"
                        >
                            {job.company.companyName[0]}
                        </Center>
                    )}
                </Stack>

                <Stack w="30%" justify="center" spacing={0}>
                    <Text color="pink.500" fontWeight={500} textTransform="capitalize">
                        {job.jobType}
                    </Text>
                    <Heading
                        as={Link}
                        to={`/job-details/${job.jobId}`}
                        onClick={() => window.scrollTo(0, 0)}
                        my="auto"
                        fontSize="xl"
                        fontWeight={600}
                        color="slate.900"
                        lineHeight={1.3}
                        margin={0}
                        noOfLines={2}
                    >
                        {job.jobTitle}
                    </Heading>
                </Stack>
                <Stack w="40%" justify="center" spacing={0}>
                    <Text fontSize="lg" color="slate.700" fontWeight={400}>
                        {job.location.state}, {job.location.country}
                    </Text>
                    <Text fontSize="lg" color="slate.500" fontWeight={400}>
                        <Text as="b" color="slate.700">
                            ${job.salaryAmount}
                        </Text>{" "}
                        / {job.salaryDuration}
                    </Text>
                </Stack>
            </Stack>
        </Stack>
    );
}