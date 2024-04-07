import React, { useState, useEffect } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    FormControl,
    FormLabel,
    SimpleGrid,
    Input,
    Stack,
    Heading,
    Checkbox,
    GridItem,
    useToast,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { getUserInfo, updateUserProfile, downloadCV } from "services/api/user";
import Loading from "components/helpers/Loading";
import { FaDownload } from "react-icons/fa";

interface UserInfo {
    userId: number;
    firstName: string;
    lastName: string;
    username: string;
    isRefugee: boolean;
    refugeeNumber: string;
    birthDate: string;
    email: string;
    contactNumber: string;
    profilePicture: File;
    curriculumVitae: File;
    cvUploaded: boolean;
    location: {
        country: string;
        state: string;
        city: string;
        address: string;
        zipCode: string;
    };
}

export default function UserProfile() {
    const toast = useToast();
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);
    const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);
    const [curriculumVitaeFile, setCurriculumVitaeFile] = useState<File | null>(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const data = await getUserInfo();
                setUserInfo(data);
            } catch (error) {
                console.error("Failed to fetch user info:", error);
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
            if (userInfo) {
                const updatedUserInfo: UserInfo = {
                    ...userInfo,
                    profilePicture: profilePictureFile ? profilePictureFile : userInfo.profilePicture,
                    curriculumVitae: curriculumVitaeFile ? curriculumVitaeFile : userInfo.curriculumVitae,
                };
                await updateUserProfile(userInfo.userId!, updatedUserInfo);
                setEditing(false);
                toast({
                    title: "Profile Updated",
                    description: "Your profile has been updated successfully.",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
            toast({
                title: 'Failed to Update Profile',
                description: 'An error occurred while updating your profile. Please try again.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const profilePicture = e.target.files?.[0] || new File([], '');
        setProfilePictureFile(profilePicture);
    };

    const handleCurriculumVitaeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const curriculumVitae = e.target.files?.[0] || new File([], '');
        setCurriculumVitaeFile(curriculumVitae);
    }

    const handleDownloadCV = async () => {
        try {
            if (userInfo?.userId) {
                await downloadCV(userInfo.userId);
            }
        } catch (error) {
            toast({
                title: "CV Downloaded",
                description: "Your CV is downloaded.",
                status: "success",
                duration: 4000,
                isClosable: true,
            });
        }
    };

    if (loading) return <Loading />;

    return (
        <>
            <Helmet>
                <title>Admerk - Profile</title>
            </Helmet>
            <Stack px={{base: 4, xl: 12}} py={{base: 4, xl: 8}}>
                <Heading fontSize={{base: "2xl", xl: "3xl"}} fontWeight={500}>
                    Profile
                </Heading>
                {userInfo ? (
                    <Card rounded={{base: "xl", xl: "3xl"}} mt={{base: 4, xl: 8}}>
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
                        <CardBody px={{base: 4, xl: 8}} py={{base: 4, xl: 8}}>
                            <SimpleGrid columns={1} spacing={6}>
                                {editing &&

                                    <>
                                        <FormControl variant="auth" as={GridItem}>
                                            <FormLabel htmlFor="curriculumVitae">Curriculum Vitae</FormLabel>
                                            <Input
                                                id="curriculumVitae"
                                                name="curriculumVitae"
                                                type="file"
                                                variant="unstyled"
                                                onChange={handleCurriculumVitaeChange}
                                                disabled={!editing}
                                            />
                                        </FormControl>

                                        <FormControl variant="auth" as={GridItem}>
                                            <FormLabel htmlFor="profilePicture">Profile Picture</FormLabel>
                                            <Input
                                                id="profilePicture"
                                                name="profilePicture"
                                                type="file"
                                                variant="unstyled"
                                                onChange={handleProfilePictureChange}
                                                disabled={!editing}
                                            />
                                        </FormControl>
                                    </>

                                }

                                {userInfo.profilePicture && (
                                    <GridItem colSpan={2} alignSelf="center">
                                        <img src={URL.createObjectURL(userInfo.profilePicture)} alt="Profile" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                    </GridItem>
                                )}

                                <FormControl variant="auth" as={GridItem}>
                                    {userInfo.cvUploaded && !editing ? (
                                        <Button
                                            onClick={handleDownloadCV}
                                            leftIcon={<FaDownload />}
                                        >
                                            {`CV_${userInfo.firstName} ${userInfo.lastName}.pdf`}
                                        </Button>
                                    ) : null}
                                </FormControl>

                                <FormControl variant="auth" as={GridItem}>
                                    <Stack direction="row">
                                        <Checkbox
                                            id="isRefugee"
                                            name="isRefugee"
                                            variant="unstyled"
                                            defaultChecked={userInfo.isRefugee}
                                            disabled={!editing}
                                            onChange={(e) =>
                                                setUserInfo({
                                                    ...userInfo,
                                                    isRefugee: e.target.checked,
                                                })
                                            }
                                        />
                                        <FormLabel htmlFor="isRefugee" cursor="pointer">
                                            Refugee
                                        </FormLabel>
                                    </Stack>
                                </FormControl>
                                {userInfo.isRefugee && (
                                    <FormControl variant="auth" as={GridItem}>
                                        <FormLabel htmlFor="refugeeNumber">Refugee Number</FormLabel>
                                        <Input
                                            id="refugeeNumber"
                                            name="refugeeNumber"
                                            type="text"
                                            variant="unstyled"
                                            value={userInfo.refugeeNumber}
                                            disabled/>
                                    </FormControl>
                                )}
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        variant="unstyled"
                                        value={editing ? userInfo.firstName : userInfo.firstName}
                                        onChange={(e) =>
                                            setUserInfo({
                                                ...userInfo,
                                                firstName: e.target.value,
                                            })
                                        }
                                        disabled={!editing}
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        variant="unstyled"
                                        value={editing ? userInfo.lastName : userInfo.lastName}
                                        onChange={(e) =>
                                            setUserInfo({
                                                ...userInfo,
                                                lastName: e.target.value,
                                            })
                                        }
                                        disabled={!editing}
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="birthDate">Birth Date</FormLabel>
                                    <Input
                                        id="birthDate"
                                        name="birthDate"
                                        type="text"
                                        variant="unstyled"
                                        value={editing ? userInfo.birthDate : userInfo.birthDate}
                                        onChange={(e) =>
                                            setUserInfo({
                                                ...userInfo,
                                                birthDate: e.target.value,
                                            })
                                        }
                                        disabled={!editing}
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
                                    <FormLabel htmlFor="contactNumber">Contact Number</FormLabel>
                                    <Input
                                        id="contactNumber"
                                        name="contactNumber"
                                        type="text"
                                        variant="unstyled"
                                        value={editing ? userInfo.contactNumber : userInfo.contactNumber}
                                        onChange={(e) =>
                                            setUserInfo({
                                                ...userInfo,
                                                contactNumber: e.target.value,
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
                                        value={userInfo.location.country}
                                        disabled
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="state">State</FormLabel>
                                    <Input
                                        id="state"
                                        name="state"
                                        type="text"
                                        variant="unstyled"
                                        value={userInfo.location.state || ''}
                                        onChange={(e) =>
                                            setUserInfo({
                                                ...userInfo,
                                                location: {
                                                    ...userInfo.location,
                                                    state: e.target.value,
                                                },
                                            })
                                        }
                                        disabled={!editing}
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="city">City</FormLabel>
                                    <Input
                                        id="city"
                                        name="city"
                                        type="text"
                                        variant="unstyled"
                                        value={userInfo.location.city || ''}
                                        onChange={(e) =>
                                            setUserInfo({
                                                ...userInfo,
                                                location: {
                                                    ...userInfo.location,
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
                                        value={userInfo.location.address || ''}
                                        onChange={(e) =>
                                            setUserInfo({
                                                ...userInfo,
                                                location: {
                                                    ...userInfo.location,
                                                    address: e.target.value,
                                                },
                                            })
                                        }
                                        disabled={!editing}
                                    />
                                </FormControl>
                                <FormControl variant="auth" as={GridItem}>
                                    <FormLabel htmlFor="zipcode">Zip Code</FormLabel>
                                    <Input
                                        id="zipcode"
                                        name="zipcode"
                                        type="text"
                                        variant="unstyled"
                                        value={userInfo.location.zipCode || ''}
                                        onChange={(e) =>
                                            setUserInfo({
                                                ...userInfo,
                                                location: {
                                                    ...userInfo.location,
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
