import { useState, useEffect } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Checkbox,
    FormControl,
    FormLabel,
    GridItem,
    Heading,
    Input,
    SimpleGrid,
    Stack,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { getUserInfo } from "services/api/user";
import Loading from "components/helpers/Loading";

export default function UserProfile() {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const data = await getUserInfo();
            setUserInfo(data);
            setLoading(false);
        })();
    }, []);

    if (loading) return <Loading />;

    return (
        <>
            <Helmet>
                <title>Admerk - Profile</title>
            </Helmet>
            <Stack px={{ base: 4, xl: 12 }} py={{ base: 4, xl: 8 }}>
                <Heading fontSize={{ base: "2xl", xl: "3xl" }} fontWeight={500}>
                    Profile
                </Heading>
                {userInfo && (
                    <Card rounded={{ base: "xl", xl: "3xl" }} mt={{ base: 4, xl: 8 }}>
                        <CardHeader borderBottom="1px" borderColor="slate.200">
                            <Heading
                                fontSize="xl"
                                fontWeight={500}
                                lineHeight={1}
                                color="slate.800"
                            >
                                Account Informations
                            </Heading>
                        </CardHeader>
                        <CardBody px={{ base: 4, xl: 8 }} py={{ base: 4, xl: 8 }}>
                            <SimpleGrid columns={1} spacing={6}>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="first_name">First Name</FormLabel>
                                    <Input
                                        id="first_name"
                                        name="first_name"
                                        type="text"
                                        variant="unstyled"
                                        value={userInfo.first_name}
                                        disabled
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="last_name">Last Name*</FormLabel>
                                    <Input
                                        id="last_name"
                                        name="last_name"
                                        type="text"
                                        variant="unstyled"
                                        value={userInfo.last_name}
                                        disabled
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="birth_date">Birth Date</FormLabel>
                                    <Input
                                        id="birth_date"
                                        name="birth_date"
                                        type="text"
                                        variant="unstyled"
                                        value={new Date(
                                            userInfo.birth_date
                                        ).toLocaleDateString()}
                                        disabled
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="username">Username</FormLabel>
                                    <Input
                                        id="username"
                                        name="username"
                                        type="text"
                                        variant="unstyled"
                                        value={userInfo.username}
                                        disabled
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="email">Email Address</FormLabel>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="text"
                                        variant="unstyled"
                                        value={userInfo.email}
                                        disabled
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="country">Country</FormLabel>
                                    <Input
                                        id="country"
                                        name="country"
                                        type="text"
                                        variant="unstyled"
                                        value={userInfo.location.country}
                                        disabled
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <Stack direction="row">
                                        <Checkbox
                                            id="is_refugee"
                                            name="is_refugee"
                                            variant="unstyled"
                                            checked={userInfo.is_refugee}
                                        />
                                        <FormLabel htmlFor="is_refugee" cursor="pointer">
                                            I am a refugee*
                                        </FormLabel>
                                    </Stack>
                                </FormControl>
                            </SimpleGrid>
                        </CardBody>
                    </Card>
                )}
            </Stack>
        </>
    );
}
