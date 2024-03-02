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
                                    <FormLabel htmlFor="name">Company Name</FormLabel>
                                    <Input
                                        id="name"
                                        type="text"
                                        variant="unstyled"
                                        value={companyInfo.name}
                                        readOnly
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="c_name">
                                        Company Username*
                                    </FormLabel>
                                    <Input
                                        id="c_name"
                                        type="text"
                                        variant="unstyled"
                                        value={companyInfo.c_name}
                                        readOnly
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="c_mail">Company Email</FormLabel>
                                    <Input
                                        id="c_mail"
                                        type="text"
                                        variant="unstyled"
                                        value={companyInfo.c_mail}
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
                                    <FormLabel htmlFor="location.map_url">
                                        Map URL
                                    </FormLabel>
                                    <Input
                                        id="location.map_url"
                                        type="text"
                                        variant="unstyled"
                                        value={companyInfo.location.map_url}
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
                                    <FormLabel htmlFor="social.linkedin">
                                        Linkedin
                                    </FormLabel>
                                    <Input
                                        id="social.linkedin"
                                        type="text"
                                        variant="unstyled"
                                        value={companyInfo.social.linkedin}
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
                                    <FormLabel htmlFor="social.whatsapp">
                                        Whatsapp
                                    </FormLabel>
                                    <Input
                                        id="social.whatsapp"
                                        type="text"
                                        variant="unstyled"
                                        value={companyInfo.social.whatsapp}
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
