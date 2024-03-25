import {getApplicantInfo, respondToApplicant} from "../services/api/company";
import {
    Box,
    Button,
    Container,
    GridItem,
    SimpleGrid,
    Stack,
    Text,
    useToast,
} from "@chakra-ui/react";
import {Helmet} from "react-helmet-async";
import {useLoaderData, useNavigate} from "react-router-dom";
import CallToAction from "./sections/CallToAction";

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
    return `${formattedMonth} ${day}, ${year}`;
}

export default function ApplicantDetails() {
    const applications = useLoaderData() as Application[];
    const toast = useToast();
    const navigate = useNavigate();

    const respondToJob = async (userId: number, response: string) => {
        try {
            await respondToApplicant(userId, response);
            toast({
                title: "Application responded successfully",
                status: "success",
                duration: 4000,
            });
            navigate('/dashboard/company/applications');
        } catch (error) {
            toast({
                title: "Failed to respond to application",
                status: "error",
                duration: 4000,
            });
        }
    };

    const calculateAge = (birthdate: string) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <>
            <Helmet>
                <title>Admerk - Applicant Details</title>
            </Helmet>

            {applications && applications.map((application, index) => (
                <Box key={index} mt={4} pt={12} pb={24}>
                    <Container
                        variant="wider"
                        maxW="container.xl"
                        px={{ base: 4, md: 14, lg: 16 }}
                    >
                        <SimpleGrid
                            columns={{ base: 1, xl: 2 }}
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
                                    {/* Display Applicant Details */}
                                    <Stack spacing={4}>
                                        <ApplicantDetail
                                            title="Name"
                                            subtitle={`${application.user_info.firstName} ${application.user_info.lastName}`}
                                        />
                                        <ApplicantDetail
                                            title="Email"
                                            subtitle={application.user_info.email}
                                        />
                                        <ApplicantDetail
                                            title="Location"
                                            subtitle={`${application.user_info.location.state} / ${application.user_info.location.country}`}
                                        />
                                        <ApplicantDetail
                                            title="Age"
                                            subtitle={calculateAge(application.user_info.birthDate).toString()}
                                        />
                                        <ApplicantDetail
                                            title="Refugee Number"
                                            subtitle={application.user_info.refugeeNumber}
                                        />
                                        <ApplicantDetail
                                            title="Applied On"
                                            subtitle={formatDate(application.applied_on)}
                                        />
                                    </Stack>
                                </Stack>
                            </GridItem>
                        </SimpleGrid>
                        {application.application_status !== 'ACCEPTED' && application.application_status !== 'REJECTED' && (
                            <Stack mt={6} direction="row" spacing={4}>
                                <Button
                                    variant="primary"
                                    rounded="full"
                                    onClick={() => respondToJob(application.user_info.userId, "ACCEPTED")}
                                >
                                    Accept
                                </Button>
                                <Button
                                    variant="danger"
                                    rounded="full"
                                    onClick={() => respondToJob(application.user_info.userId, "REJECTED")}
                                >
                                    Reject
                                </Button>
                            </Stack>
                        )}
                    </Container>
                </Box>
            ))}
            <CallToAction />
        </>
    );
}

type DetailProps = {
    title: string;
    subtitle: string;
};

function ApplicantDetail({ title, subtitle }: DetailProps) {
    return (
        <Stack spacing={0}>
            <Text fontSize="md" color="slate.400">
                {title}
            </Text>
            <Text
                fontSize="lg"
                fontWeight={500}
                color="slate.900"
            >
                {subtitle}
            </Text>
        </Stack>
    );
}
export const applicantDetailsLoader = async ({ params }: any) => {
    const { id } = params;
    if (!id) return null;
    return await getApplicantInfo(parseInt(id));
};