import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import IntroCard from "./sections/userDashboard/IntroCard";
import { getAppliedJobs } from "services/api/user";
import ApplicationCard from "./sections/userDashboard/ApplicationCard";
import { Helmet } from "react-helmet-async";
import Loading from "components/helpers/Loading";

export default function UserDashboard() {
    const [appliedJobs, setAppliedJobs] = useState<Application[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const data = await getAppliedJobs();
            setAppliedJobs(data);
            setLoading(false);
        })();
    }, []);

    if (loading) return <Loading />;

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
                    {appliedJobs && (
                        <IntroCard
                            title={appliedJobs.length.toString()}
                            subtitle="Applied Job"
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
                            Applied Jobs
                        </Heading>
                    </CardHeader>
                    <CardBody px={{ base: 4, xl: 8 }} py={{ base: 4, xl: 8 }}>
                        <Stack spacing={{ base: 6, xl: 8 }}>
                            {appliedJobs &&
                                appliedJobs.map((job) => {
                                    return (
                                        <ApplicationCard
                                            key={job.application_id}
                                            job={job}
                                        />
                                    );
                                })}
                        </Stack>
                    </CardBody>
                </Card>
            </Stack>
        </>
    );
}
