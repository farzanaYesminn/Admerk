import { useState, useEffect } from "react";
import { Card, CardBody, Heading, Stack } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { getAllJobApplications } from "services/api/company";
import ApplicationCard from "./sections/companyApplications/ApplicationCard";
import LoadingComp from "components/helpers/LoadingComp";

export default function CompanyApplications() {
    const [applications, setApplications] = useState<Application[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const applicationsData = await getAllJobApplications();
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
                    Job Application
                </Heading>
                <Card rounded={{ base: "xl", xl: "3xl" }} mt={{ base: 8, xl: 10 }}>
                    <CardBody p={{ base: 4, xl: 8 }}>
                        <Stack spacing={{ base: 6, xl: 8 }}>
                            {applications &&
                                applications.map((application, idx) => {
                                    return (
                                        <ApplicationCard
                                            key={`application-${idx}`}
                                            application={application}
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
