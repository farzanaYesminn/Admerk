import { Center, Heading, IconButton, Stack, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

type Props = {
    job: Application;
};

export default function ApplicationCard({ job }: Props) {
    const { job_info } = job;
    const { company: company_info } = job_info;
    const apply_date = new Date(job.applied_on).toLocaleDateString();
    const apply_time = new Date(job.applied_on).toLocaleTimeString();
    const applied_on = apply_date + " " + apply_time;

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
                        {company_info.name[0]}
                    </Center>
                </Stack>
                <Stack w="30%" justify="center" spacing={0}>
                    <Heading
                        as={Link}
                        to={`/job-details/${job_info.id}`}
                        onClick={() => window.scrollTo(0, 0)}
                        my="auto"
                        fontSize="xl"
                        fontWeight={600}
                        color="slate.900"
                        lineHeight={1.3}
                        margin={0}
                        noOfLines={2}
                    >
                        {job_info.job_title}
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
                    <Text fontSize="md" color="slate.500" fontWeight={400}>
                        <Text as="b" color="slate.500">
                            ${job_info.salary_amount}
                        </Text>{" "}
                        / {job_info.salary_duration}
                    </Text>
                    <Text
                        fontSize="md"
                        color="slate.400"
                        fontWeight={500}
                        textTransform="capitalize"
                    >
                        Applied on: {applied_on}
                    </Text>
                </Stack>
                <Stack
                    direction="row"
                    align="center"
                    justify="end"
                    w="10%"
                    spacing={4}
                >
                    <IconButton
                        variant="outline"
                        isRound={true}
                        borderColor="slate.400"
                        color="slate.400"
                        aria-label="Search database"
                        icon={<Icon icon="iwwa:option" />}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
}
