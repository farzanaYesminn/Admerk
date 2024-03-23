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
                                {/*<FormControl variant="auth" as={GridItem}>*/}
                                {/*    <Stack direction="row">*/}
                                {/*        <Checkbox*/}
                                {/*            id="isRefugee"*/}
                                {/*            name="isRefugee"*/}
                                {/*            variant="unstyled"*/}
                                {/*            defaultChecked={userInfo.isRefugee}*/}
                                {/*            disabled*/}
                                {/*        />*/}
                                {/*        <FormLabel htmlFor="isRefugee" cursor="pointer">*/}
                                {/*            Refugee*/}
                                {/*        </FormLabel>*/}
                                {/*    </Stack>*/}
                                {/*</FormControl>*/}
                                {userInfo.isRefugee && (
                                    <FormControl variant="auth" as={GridItem}>
                                        <FormLabel htmlFor="refugeeNumber">Refugee Number</FormLabel>
                                        <Input
                                            id="refugeeNumber"
                                            name="refugeeNumber"
                                            type="text"
                                            variant="unstyled"
                                            value={userInfo.refugeeNumber}
                                            disabled
                                        />
                                    </FormControl>
                                )}
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        variant="unstyled"
                                        value={userInfo.firstName}
                                        disabled
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="lastName">Last Name*</FormLabel>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        variant="unstyled"
                                        value={userInfo.lastName}
                                        disabled
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="birthDate">Birth Date</FormLabel>
                                    <Input
                                        id="birthDate"
                                        name="birthDate"
                                        type="text"
                                        variant="unstyled"
                                        value={new Date(
                                            userInfo.birthDate
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
                            </SimpleGrid>
                        </CardBody>
                    </Card>
                )}
            </Stack>
        </>
    );
}
