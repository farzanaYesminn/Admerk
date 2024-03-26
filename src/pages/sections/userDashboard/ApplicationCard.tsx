import { Badge, Center, Heading, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Props = {
    application: Application;
};

export default function ApplicationCard({ application }: Props) {
    const { job_info } = application;
    const { company: company_info } = job_info;
    const applied_on = new Date(application.applied_on).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    });
    const application_status = application.application_status;

    let statusColor;
    let statusText;
    switch (application_status) {
        case 'ACCEPTED':
            statusColor = 'green';
            statusText = 'Accepted';
            break;
        case 'REJECTED':
            statusColor = 'red';
            statusText = 'Rejected';
            break;
        default:
            statusColor = 'slate';
            statusText = 'Pending';
            break;
    }

    return (
        <Stack justify="center">
            <Stack direction="row" spacing={6}>
                <Stack w="8%" justify="center" align="center">
                    <Center
                        w={14}
                        aspectRatio="1/1"
                        bgColor="pink.500"
                        rounded="2xl"
                        fontSize="2xl"
                        color="white"
                        fontWeight={700}
                        pb={1}
                    >
                        {company_info.companyName[0]}
                    </Center>
                </Stack>
                <Stack w="30%" justify="center" spacing={0}>
                    <Heading
                        as={Link}
                        to={`/job-details/${job_info.jobId}`}
                        onClick={() => window.scrollTo(0, 0)}
                        my="auto"
                        fontSize="xl"
                        fontWeight={600}
                        color="slate.900"
                        lineHeight={1.3}
                        margin={0}
                        noOfLines={2}
                    >
                        {job_info.jobTitle}
                    </Heading>
                    <Text
                        fontSize="md"
                        color="slate.700"
                        fontWeight={400}
                        textTransform="capitalize"
                    >
                        {company_info.name}, {job_info.location.country}
                    </Text>
                </Stack>
                <Stack w="52%" justify="center" spacing={0}>
                    <Text
                        fontSize="md"
                        color="slate.500"
                        fontWeight={400}>
                        <Text
                            as="b"
                            color="slate.500">
                            ${job_info.salaryAmount}
                        </Text>{" "}/{" "}{job_info.salaryDuration}
                    </Text>
                    <Text
                        fontSize="md"
                        color="slate.700"
                        fontWeight={500}
                        textTransform="capitalize"
                    >
                        <Text
                            as="b"
                            color="slate.500">
                            Applied on:
                        </Text> {applied_on}
                    </Text>
                </Stack>
                <Stack w="10%" justify="center" align="center">
                    <Badge colorScheme={statusColor}>{statusText}</Badge>
                </Stack>
            </Stack>
        </Stack>
    );
}
