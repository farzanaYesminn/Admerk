import { useState, useEffect } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    FormControl,
    FormLabel,
    GridItem,
    Heading,
    Input,
    SimpleGrid,
    Stack,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { getCompanyInfo } from "services/api/company";
import LoadingComp from "components/helpers/LoadingComp";

export default function CompanyProfile() {
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const companyInfoData = await getCompanyInfo();
            setCompanyInfo(companyInfoData);
            setLoading(false);
        })();
    }, []);

    if (loading) return <LoadingComp />;

    return (
        <>
            <Helmet>
                <title>Admerk - Profile</title>
            </Helmet>
            <Stack px={{ base: 4, xl: 12 }} py={{ base: 4, xl: 8 }}>
                <Heading fontSize={{ base: "2xl", xl: "3xl" }} fontWeight={500}>
                    Profile
                </Heading>
                {companyInfo && (
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
                                    <FormLabel htmlFor="companyName">
                                        Company Title
                                    </FormLabel>
                                    <Input
                                        id="companyName"
                                        type="text"
                                        variant="unstyled"
                                        value={companyInfo.companyName}
                                        readOnly
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="name">Company Username</FormLabel>
                                    <Input
                                        id="name"
                                        type="text"
                                        variant="unstyled"
                                        value={companyInfo.name}
                                        readOnly
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="companyMail">Company Email</FormLabel>
                                    <Input
                                        id="companyMail"
                                        type="text"
                                        variant="unstyled"
                                        value={companyInfo.companyMail}
                                        readOnly
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="website">
                                        Company Website URL
                                    </FormLabel>
                                    <Input
                                        id="website"
                                        type="text"
                                        variant="unstyled"
                                        value={companyInfo.website}
                                        readOnly
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="location.country">
                                        Country
                                    </FormLabel>
                                    <Input
                                        id="location.country"
                                        type="text"
                                        variant="unstyled"
                                        value={companyInfo.location.country}
                                        readOnly
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="location.state">State</FormLabel>
                                    <Input
                                        id="location.state"
                                        type="text"
                                        variant="unstyled"
                                        value={companyInfo.location.state}
                                        readOnly
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="location.division">Division</FormLabel>
                                    <Input
                                        id="location.state"
                                        type="text"
                                        variant="unstyled"
                                        value={companyInfo.location.division}
                                        readOnly
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="location.city">City</FormLabel>
                                    <Input
                                        id="location.state"
                                        type="text"
                                        variant="unstyled"
                                        value={companyInfo.location.city}
                                        readOnly
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="location.address">Address</FormLabel>
                                    <Input
                                        id="location.state"
                                        type="text"
                                        variant="unstyled"
                                        value={companyInfo.location.address}
                                        readOnly
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="location.zipCode">ZIP Code</FormLabel>
                                    <Input
                                        id="location.state"
                                        type="text"
                                        variant="unstyled"
                                        value={companyInfo.location.zipCode}
                                        readOnly
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="social.facebook">
                                        Facebook
                                    </FormLabel>
                                    <Input
                                        id="social.facebook"
                                        type="text"
                                        variant="unstyled"
                                        value={companyInfo.social.facebook}
                                        readOnly
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="social.instagram">
                                        Instagram
                                    </FormLabel>
                                    <Input
                                        id="social.instagram"
                                        type="text"
                                        variant="unstyled"
                                        value={companyInfo.social.instagram}
                                        readOnly
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="social.linkedIn">
                                        Linkedin
                                    </FormLabel>
                                    <Input
                                        id="social.linkedIn"
                                        type="text"
                                        variant="unstyled"
                                        value={companyInfo.social.linkedIn}
                                        readOnly
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="social.twitter">
                                        Twitter
                                    </FormLabel>
                                    <Input
                                        id="social.twitter"
                                        type="text"
                                        variant="unstyled"
                                        value={companyInfo.social.twitter}
                                        readOnly
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="social.whatsApp">
                                        Whatsapp
                                    </FormLabel>
                                    <Input
                                        id="social.whatsApp"
                                        type="text"
                                        variant="unstyled"
                                        value={companyInfo.social.whatsApp}
                                        readOnly
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
