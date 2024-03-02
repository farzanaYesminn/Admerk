import {
    Box,
    Button,
    Card,
    CardBody,
    Center,
    Container,
    Divider,
    GridItem,
    Heading,
    SimpleGrid,
    Stack,
    Text,
    useToast,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import { getJobInfo } from "services/api/jobs";
import CallToAction from "./sections/CallToAction";
import { applyJob } from "services/api/user";

function formatDate(inputDateString: string) {
    const inputDate = new Date(inputDateString);
    const year = inputDate.getFullYear();
    const month = inputDate.getMonth();
    const day = inputDate.getDate();

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const formattedMonth = monthNames[month];
    const formattedDateString = `${formattedMonth} ${day}, ${year}`;
    return formattedDateString;
}

export default function JobDetails() {
    const job = useLoaderData() as Job;
    const toast = useToast();

    const applyJobHandler = async () => {
        try {
            await applyJob(job.name_id);
            toast({
                title: "Application successful",
                status: "success",
                duration: 4000,
            });
        } catch (error) {
            toast({
                title: "Application failed",
                status: "error",
                duration: 4000,
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Admerk - Job</title>
            </Helmet>

            {job && (
                <Box mt={4} pt={12} pb={24}>
                    <Container
                        variant="wider"
                        maxW="container.xl"
                        px={{ base: 4, md: 14, lg: 16 }}
                    >
                        <SimpleGrid
                            columns={{ base: 1, xl: 3 }}
                            gap={{ base: 12, lg: 16 }}
                        >
                            <GridItem colSpan={{ base: 1, xl: 2 }}>
                                <Stack
                                    mx="auto"
                                    maxW={{
                                        sm: "container.sm",
                                        lg: "container.lg",
                                    }}
                                >
                                    <Stack direction="row">
                                        <Text
                                            fontSize={{
                                                base: "md",
                                                lg: "lg",
                                            }}
                                            color="slate.500"
                                        >
                                            {job.posted_on} by,{" "}
                                            <Text as="b" color="slate.700">
                                                {job.company.name}
                                            </Text>
                                        </Text>
                                    </Stack>
                                    <Heading
                                        mt={2}
                                        fontSize={{
                                            base: "3xl",
                                            lg: "4xl",
                                        }}
                                        fontWeight={500}
                                        color="slate.900"
                                    >
                                        {job.job_title}
                                    </Heading>
                                    <Stack mt={4} direction="row">
                                        {/* {job.company.socials.map(
                                            (social, idx) => {
                                                return (
                                                    <SocialBtn
                                                        key={`social-${idx}`}
                                                        social={social}
                                                    />
                                                );
                                            }
                                        )} */}
                                        <Button
                                            bgColor="slate.200"
                                            color="slate.800"
                                            width="fit-content"
                                            leftIcon={
                                                <Text fontSize="md">
                                                    <Icon icon="solar:link-bold" />
                                                </Text>
                                            }
                                        >
                                            Copy
                                        </Button>
                                    </Stack>
                                    <Stack
                                        mt={{ base: 8, lg: 12 }}
                                        spacing={{ base: 4, lg: 8 }}
                                    >
                                        <JobDetail id={1} title="Overview">
                                            {job.overview}
                                        </JobDetail>
                                        <JobDetail id={2} title="Job Description">
                                            {job.job_description}
                                        </JobDetail>
                                        <JobDetail id={3} title="Responsibility">
                                            {job.responsibility}
                                        </JobDetail>
                                        <JobDetail id={4} title="Required Skills:">
                                            {job.required_skills}
                                        </JobDetail>
                                        <JobDetail id={5} title="Benefits:">
                                            {job.benefits}
                                        </JobDetail>
                                    </Stack>
                                </Stack>
                            </GridItem>
                            <GridItem>
                                <Box
                                    w="full"
                                    rounded="2xl"
                                    bgColor="purple.75"
                                    py={8}
                                    px={6}
                                >
                                    <Stack>
                                        <Center>
                                            <Center
                                                border="2px"
                                                borderColor="purple.300"
                                                color="purple.500"
                                                fontSize="3xl"
                                                w={12}
                                                h={12}
                                                rounded="full"
                                            >
                                                {job.company.name[0]}
                                            </Center>
                                        </Center>
                                        <Center mt={2}>
                                            <Heading
                                                fontSize={{ base: "xl" }}
                                                fontWeight={400}
                                            >
                                                {job.company.name}
                                            </Heading>
                                        </Center>
                                        <Center mt={4}>
                                            <Button variant="primary" rounded="full">
                                                Visit Website
                                            </Button>
                                        </Center>
                                        <Box py={8}>
                                            <Divider borderColor="slate.300" />
                                        </Box>
                                        <Stack spacing={4}>
                                            <CompanyDetail
                                                title="Salary"
                                                subtitle={`$${job.salary_amount} / ${job.salary_duration}`}
                                            />
                                            <CompanyDetail
                                                title="Expertise"
                                                subtitle={job.experience}
                                            />
                                            <CompanyDetail
                                                title="Location"
                                                subtitle={`${job.location.state}/${job.location.country}`}
                                            />
                                            <CompanyDetail
                                                title="Job Type"
                                                subtitle={job.job_type}
                                            />
                                            <CompanyDetail
                                                title="Date"
                                                subtitle={formatDate(job.posted_on)}
                                            />
                                        </Stack>
                                        <Button
                                            mt={6}
                                            variant="primary"
                                            rounded="full"
                                            onClick={applyJobHandler}
                                        >
                                            Apply Now
                                        </Button>
                                    </Stack>
                                </Box>
                            </GridItem>
                        </SimpleGrid>
                    </Container>
                </Box>
            )}
            <CallToAction />
        </>
    );
}

type JobDetailProps = {
    id: number;
    title: string;
    children: ReactNode;
};

function JobDetail({ id, title, children }: JobDetailProps) {
    return (
        <Card
            variant="outline"
            rounded="lg"
            shadow="0 4px 24px 0 var(--chakra-colors-blackAlpha-100)"
        >
            <CardBody as={Stack}>
                <Stack>
                    <Stack direction="row" align="center">
                        <Center
                            bgColor="pink.500"
                            w={{ base: 5, lg: 6 }}
                            h={{ base: 5, lg: 6 }}
                            fontSize="sm"
                            rounded="full"
                            color="white"
                        >
                            {id}
                        </Center>
                        <Heading
                            fontSize={{
                                base: "xl",
                                lg: "2xl",
                            }}
                            fontWeight={500}
                        >
                            {title}
                        </Heading>
                    </Stack>
                </Stack>
                <Text
                    mt={4}
                    color="slate.700"
                    lineHeight={1.7}
                    fontSize={{
                        base: "md",
                        lg: "lg",
                    }}
                >
                    {children}
                </Text>
            </CardBody>
        </Card>
    );
}

type DetailProps = {
    title: string;
    subtitle: string;
};

function CompanyDetail({ title, subtitle }: DetailProps) {
    return (
        <Stack spacing={0}>
            <Text fontSize="md" color="slate.400">
                {title}
            </Text>
            <Text
                fontSize="lg"
                fontWeight={500}
                color="slate.900"
                textTransform="capitalize"
            >
                {subtitle}
            </Text>
        </Stack>
    );
}

// loader data
export const loader = async ({ params }: any) => {
    const { id } = params;
    if (!id) return null;
    const job = await getJobInfo(parseInt(id));
    return job;
};
