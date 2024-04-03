import React, { useState, useEffect } from "react";
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
    Button,
    useToast,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { getCompanyInfo, updateCompanyProfile } from "services/api/company";
import LoadingComp from "components/helpers/LoadingComp";

interface CompanyInfo {
    companyId: number;
    name: string;
    companyName: string;
    companyMail: string;
    website: string;
    social: {
        facebook: string;
        instagram: string;
        linkedIn: string;
        twitter: string;
        whatsApp: string;
    };
    location: {
        country: string;
        state: string;
        city: string;
        address: string;
        zipCode: string;
    };
}

export default function CompanyProfile (){
    const toast = useToast();
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const data = await getCompanyInfo();
                setCompanyInfo(data);
            } catch (error) {
                console.error("Failed to fetch company info:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            if (companyInfo) {
                const updatedCompanyInfo: CompanyInfo = {
                    ...companyInfo,
                };

                await updateCompanyProfile(companyInfo.companyId, updatedCompanyInfo);
                setEditing(false);
                toast({
                    title: "Profile Updated",
                    description: "Your company profile has been updated successfully.",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error("Failed to update company profile:", error);
            toast({
                title: "Failed to Update Profile",
                description: "An error occurred while updating your company profile. Please try again.",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingComp />;

    return (
        <>
            <Helmet>
                <title>Admerk - Company Profile</title>
            </Helmet>
            <Stack px={{ base: 4, xl: 12 }} py={{ base: 4, xl: 8 }}>
                <Heading fontSize={{ base: "2xl", xl: "3xl" }} fontWeight={500}>
                    Company Profile
                </Heading>
                {companyInfo ? (
                    <Card rounded={{ base: "xl", xl: "3xl" }} mt={{ base: 4, xl: 8 }}>
                        <CardHeader borderBottom="1px" borderColor="slate.200" display="flex" alignItems="center">
                            <Heading
                                fontSize="xl"
                                fontWeight={500}
                                lineHeight={1}
                                color="slate.800"
                                flex="1"
                            >
                                Account Information
                            </Heading>
                            {!editing ? (
                                <Button onClick={handleEdit} ml="auto">
                                    Edit
                                </Button>
                            ) : (
                                <Button onClick={handleSave} colorScheme="blue">
                                    Save
                                </Button>
                            )}
                        </CardHeader>
                        <CardBody px={{ base: 4, xl: 8 }} py={{ base: 4, xl: 8 }}>
                            <SimpleGrid columns={1} spacing={6}>

                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="companyName">Company Name</FormLabel>
                                    <Input
                                        id="companyName"
                                        name="companyName"
                                        type="text"
                                        variant="unstyled"
                                        value={companyInfo.companyName}
                                        disabled
                                    />
                                </FormControl>

                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="companyMail">Company Mail</FormLabel>
                                    <Input
                                        id="companyMail"
                                        name="companyMail"
                                        type="text"
                                        variant="unstyled"
                                        value={editing ? companyInfo.companyMail : companyInfo.companyMail}
                                        onChange={(e) =>
                                            setCompanyInfo({
                                                ...companyInfo,
                                                companyMail: e.target.value,
                                            })}
                                        disabled={!editing}
                                    />
                                </FormControl>

                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="website">Company Website</FormLabel>
                                    <Input
                                        id="website"
                                        name="website"
                                        type="text"
                                        variant="unstyled"
                                        value={editing ? companyInfo.website : companyInfo.website}
                                        onChange={(e) =>
                                            setCompanyInfo({
                                                ...companyInfo,
                                                website: e.target.value,
                                            })}
                                        disabled={!editing}
                                    />
                                </FormControl>

                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="facebook">Facebook</FormLabel>
                                    <Input
                                        id="facebook"
                                        name="facebook"
                                        type="text"
                                        variant="unstyled"
                                        value={editing ? companyInfo.social.facebook : companyInfo.social.facebook}
                                        onChange={(e) =>
                                            setCompanyInfo({
                                                ...companyInfo,
                                                social: {
                                                    ...companyInfo.social,
                                                    facebook: e.target.value,
                                                },
                                            })
                                        }
                                        disabled={!editing}
                                    />
                                </FormControl>

                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="instagram">Instagram</FormLabel>
                                    <Input
                                        id="instagram"
                                        name="instagram"
                                        type="text"
                                        variant="unstyled"
                                        value={editing ? companyInfo.social.instagram : companyInfo.social.instagram}
                                        onChange={(e) =>
                                            setCompanyInfo({
                                                ...companyInfo,
                                                social: {
                                                    ...companyInfo.social,
                                                    instagram: e.target.value,
                                                },
                                            })
                                        }
                                        disabled={!editing}
                                    />
                                </FormControl>

                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="linkedIn">LinkedIn</FormLabel>
                                    <Input
                                        id="linkedIn"
                                        name="linkedIn"
                                        type="text"
                                        variant="unstyled"
                                        value={editing ? companyInfo.social.linkedIn : companyInfo.social.linkedIn}
                                        onChange={(e) =>
                                            setCompanyInfo({
                                                ...companyInfo,
                                                social: {
                                                    ...companyInfo.social,
                                                    linkedIn: e.target.value,
                                                },
                                            })
                                        }
                                        disabled={!editing}
                                    />
                                </FormControl>

                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="twitter">Twitter</FormLabel>
                                    <Input
                                        id="twitter"
                                        name="twitter"
                                        type="text"
                                        variant="unstyled"
                                        value={editing ? companyInfo.social.twitter : companyInfo.social.twitter}
                                        onChange={(e) =>
                                            setCompanyInfo({
                                                ...companyInfo,
                                                social: {
                                                    ...companyInfo.social,
                                                    twitter: e.target.value,
                                                },
                                            })
                                        }
                                        disabled={!editing}
                                    />
                                </FormControl>

                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="whatsApp">WhatsApp</FormLabel>
                                    <Input
                                        id="whatsApp"
                                        name="whatsApp"
                                        type="text"
                                        variant="unstyled"
                                        value={editing ? companyInfo.social.whatsApp : companyInfo.social.whatsApp}
                                        onChange={(e) =>
                                            setCompanyInfo({
                                                ...companyInfo,
                                                social: {
                                                    ...companyInfo.social,
                                                    whatsApp: e.target.value,
                                                },
                                            })
                                        }
                                        disabled={!editing}
                                    />
                                </FormControl>

                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="country">Country</FormLabel>
                                    <Input
                                        id="country"
                                        name="country"
                                        type="text"
                                        variant="unstyled"
                                        value={editing ? companyInfo.location.country : companyInfo.location.country}
                                        onChange={(e) =>
                                            setCompanyInfo({
                                                ...companyInfo,
                                                location: {
                                                    ...companyInfo.location,
                                                    country: e.target.value,
                                                },
                                            })
                                        }
                                        disabled={!editing}
                                    />
                                </FormControl>

                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="state">State</FormLabel>
                                    <Input
                                        id="state"
                                        name="state"
                                        type="text"
                                        variant="unstyled"
                                        value={editing ? companyInfo.location.state : companyInfo.location.state}
                                        onChange={(e) =>
                                            setCompanyInfo({
                                                ...companyInfo,
                                                location: {
                                                    ...companyInfo.location,
                                                    state: e.target.value,
                                                },
                                            })
                                        }
                                        disabled={!editing}
                                    />
                                </FormControl>

                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="address">City</FormLabel>
                                    <Input
                                        id="city"
                                        name="city"
                                        type="text"
                                        variant="unstyled"
                                        value={editing ? companyInfo.location.city : companyInfo.location.city}
                                        onChange={(e) =>
                                            setCompanyInfo({
                                                ...companyInfo,
                                                location: {
                                                    ...companyInfo.location,
                                                    city: e.target.value,
                                                },
                                            })
                                        }
                                        disabled={!editing}
                                    />
                                </FormControl>

                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="address">Address</FormLabel>
                                    <Input
                                        id="address"
                                        name="address"
                                        type="text"
                                        variant="unstyled"
                                        value={editing ? companyInfo.location.address : companyInfo.location.address}
                                        onChange={(e) =>
                                            setCompanyInfo({
                                                ...companyInfo,
                                                location: {
                                                    ...companyInfo.location,
                                                    address: e.target.value,
                                                },
                                            })
                                        }
                                        disabled={!editing}
                                    />
                                </FormControl>

                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="zipCode">ZIP Code</FormLabel>
                                    <Input
                                        id="zipCode"
                                        name="zipCode"
                                        type="text"
                                        variant="unstyled"
                                        value={editing ? companyInfo.location.zipCode : companyInfo.location.zipCode}
                                        onChange={(e) =>
                                            setCompanyInfo({
                                                ...companyInfo,
                                                location: {
                                                    ...companyInfo.location,
                                                    zipCode: e.target.value,
                                                },
                                            })
                                        }
                                        disabled={!editing}
                                    />
                                </FormControl>
                            </SimpleGrid>
                        </CardBody>
                    </Card>
                ) : (
                    <div>Loading user information...</div>
                )}
            </Stack>
        </>
    );
}
