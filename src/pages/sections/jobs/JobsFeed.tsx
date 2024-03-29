import {
    Box,
    Button,
    Card,
    CardBody,
    Center,
    Heading,
    IconButton,
    Stack,
    Text,
    useToast,
} from "@chakra-ui/react";
import { BsBookmarkPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth } from "lib/context/AuthProvider";
import { applyJob } from "services/api/user";
import { useState } from "react";

type Props = {
    allJobs: JobSummary[];
};

export default function JobsFeed({ allJobs }: Props) {
    const { authInfo } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast();

    function formatJobType(jobType: string) {
        return jobType.replace("_", " ");
    }

    const applyJobHandler = async (jobId: string) => {
        setLoading(true);
        if (authInfo?.loginData.role === "user") {
            try {
                await applyJob(jobId);
                toast({
                    title: "Application Successful",
                    description: "You have successfully applied to this job.",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                });
            } catch (error) {
                toast({
                    title: "Application Failed",
                    description: "You may have applied to this job already.",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
            }
        } else {
            toast({
                title: "You cant apply to jobs",
                status: "error",
                duration: 4000,
            });
        }
        setLoading(false);
    };

    return (
        <Box mt={3}>
            <Stack spacing={5}>
                {allJobs &&
                    allJobs.map((job: JobSummary) => {
                        return (
                            <Card
                                variant="outline"
                                rounded="lg"
                                key={job.id}
                                h={{ base: "fit-content", md: 32 }}
                                shadow="0 4px 24px 0 var(--chakra-colors-blackAlpha-100)"
                            >
                                <CardBody as={Stack} justify="center">
                                    <Stack
                                        direction={{
                                            base: "column",
                                            md: "row",
                                        }}
                                        spacing={6}
                                    >
                                        <Stack
                                            w={{ base: "100%", md: "10%" }}
                                            justify="center"
                                            align={{
                                                base: "start",
                                                md: "center",
                                            }}
                                        >
                                            <Center
                                                w={12}
                                                aspectRatio="1/1"
                                                bgColor="pink.500"
                                                rounded="lg"
                                                fontSize="2xl"
                                                color="white"
                                                fontWeight={700}
                                            >
                                                {job.company.name[0]}
                                            </Center>
                                        </Stack>
                                        <Stack
                                            w={{ base: "100%", md: "30%" }}
                                            justify="center"
                                            spacing={0}
                                        >
                                            <Text
                                                color="pink.500"
                                                fontWeight={500}
                                                textTransform="capitalize"
                                            >
                                                {formatJobType(job.jobType)}
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
                                        <Stack
                                            w={{ base: "100%", md: "40%" }}
                                            justify="center"
                                            spacing={0}
                                        >
                                            <Text
                                                fontSize="lg"
                                                color="slate.700"
                                                fontWeight={400}
                                            >
                                                {job.location.state},{" "}
                                                {job.location.country}
                                            </Text>
                                            <Text
                                                fontSize="lg"
                                                color="slate.500"
                                                fontWeight={400}
                                            >
                                                <Text as="b" color="slate.700">
                                                    ${job.salaryAmount}
                                                </Text>{" "}
                                                / {job.salaryDuration}
                                            </Text>
                                        </Stack>
                                        <Stack
                                            direction="row"
                                            align="center"
                                            justify={{
                                                base: "space-between",
                                                md: "end",
                                            }}
                                            w={{ base: "100%", md: "20%" }}
                                            spacing={4}
                                        >
                                            <IconButton
                                                variant="outline"
                                                isRound={true}
                                                borderColor="slate.400"
                                                color="slate.400"
                                                aria-label="Search database"
                                                icon={<BsBookmarkPlus />}
                                            />
                                            <Button
                                                variant="primary"
                                                rounded="full"
                                                fontSize="sm"
                                                disabled={loading}
                                                onClick={() => applyJobHandler(job.jobId)}
                                                style={{ display: authInfo?.loginData.role === "user" && authInfo?.loginData.isRefugee ? "block" : "none" }}
                                            >
                                                Apply
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </CardBody>
                            </Card>
                        );
                    })}
            </Stack>
        </Box>
    );
}
