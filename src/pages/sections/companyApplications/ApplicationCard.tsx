import { Badge, Center, Heading, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import {getProfilePicture} from "../../../services/api/user";

type Props = {
    application: Application;
};

export default function ApplicationCard({ application }: Props) {
    const { job_info, user_info } = application;
    const applied_on = new Date(application.applied_on).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    });
    const application_status = application.application_status;
    const [profilePicture, setProfilePicture] = useState<string | null>(null);

    useEffect(() => {
        if (user_info.profilePictureUrl) {
            (async () => {
                try {
                    const imageUrl = await getProfilePicture(user_info.profilePictureUrl);
                    setProfilePicture(imageUrl);
                } catch (error) {
                    console.error("Failed to fetch profile picture:", error);
                }
            })();
        }
    }, [user_info.profilePictureUrl]);

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
                    {profilePicture ? (
                        <img
                            src={profilePicture}
                            alt={`${user_info.firstName}'s Profile Picture`}
                            style={{
                                width: "56px",
                                height: "56px",
                                borderRadius: "50%"
                            }}
                        />
                    ) : (
                        <Center
                            w={14}
                            aspectRatio="1/1"
                            bgColor="pink.500"
                            rounded="full"
                            fontSize="2xl"
                            color="white"
                            fontWeight={700}
                            pb={1}
                        >
                            {user_info.firstName[0]}
                        </Center>
                    )}
                </Stack>
                <Stack w="30%" justify="center" spacing={0}>
                    <Heading
                        as={Link}
                        to={`/applicant-details/${user_info.userId}`}
                        onClick={() => window.scrollTo(0, 0)}
                        my="auto"
                        fontSize="xl"
                        fontWeight={600}
                        color={statusColor}
                        lineHeight={1.3}
                        margin={0}
                        noOfLines={2}
                        textTransform="capitalize"
                    >
                        {user_info.firstName} {user_info.lastName}
                    </Heading>
                    <Text
                        fontSize="md"
                        color="slate.700"
                        fontWeight={400}
                        textTransform="capitalize"
                    >
                        {user_info.location.state &&
                            `${user_info.location.state},`}{" "}
                        {user_info.location.country}
                    </Text>
                </Stack>
                <Stack w="52%" justify="center" spacing={0}>
                    <Text fontSize="md" color="slate.500" fontWeight={400}>
                        {job_info.jobTitle}
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