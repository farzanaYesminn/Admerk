import * as Yup from "yup";
import {
    AbsoluteCenter,
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormErrorMessage,
    FormLabel,
    GridItem,
    Input,
    SimpleGrid,
    Stack,
    Text,
    useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikValues } from "formik";
import { Icon } from "@iconify/react/dist/iconify.js";
import { registerCompany } from "services/api/auth";
import { useNavigate } from "react-router-dom";

export default function RegisterCompany() {
    const navigate = useNavigate();
    const toast = useToast();

    const initialValues = {
        companyName: "",
        name: "",
        companyMail: "",
        password: "",
        website: "",
        location: {
            country: "",
            state: "",
            division: "",
            city: "",
            address: "",
            zipCode: "",
        },
        social: {
            facebook: "",
            instagram: "",
            linkedIn: "",
            twitter: "",
            whatsApp: "",
        },
        confirmPassword: "",
        terms: false,
    };

    const validationSchema = Yup.object().shape({
        companyName: Yup.string().required("Company Title is required"),
        name: Yup.string().required("Company Username is required"),
        companyMail: Yup.string().email("Invalid email address").required("Email is required"),
        website: Yup.string()
            .matches(
                /^(?=.{4,2048}$)((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]{1,63}(\.[a-zA-Z]{1,63}){1,5}(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/,
                "Website should be a valid URL"
            )
            .required("Website is required"),
        location: Yup.object().shape({
            country: Yup.string().required("Country is required"),
            state: Yup.string().required("State is required"),
            division: Yup.string().required("Division is required"),
            city: Yup.string().required("City is required"),
            address: Yup.string().required("Address is required"),
            zipCode: Yup.string().required("ZIP Code is required"),
        }),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), undefined], "Passwords must match")
            .required("Confirm password is required"),
        social: Yup.object().shape({
            facebook: Yup.string().matches(
                /^(?=.{4,2048}$)((http|https):\/\/)?(www.)?(?!.*(http|https|www.))(facebook\.com\/[a-zA-Z0-9_-]{1,63})(\/)?.*$/,
                "Website should be a valid URL"
            ),
            instagram: Yup.string().matches(
                /^(?=.{4,2048}$)((http|https):\/\/)?(www.)?(?!.*(http|https|www.))(instagram\.com\/[a-zA-Z0-9_-]{1,63})(\/)?.*$/,
                "Website should be a valid URL"
            ),
            linkedIn: Yup.string().matches(
                /^(?=.{4,2048}$)((http|https):\/\/)?(www.)?(?!.*(http|https|www.))(linkedin\.com\/[a-zA-Z0-9_-]{1,63})(\/)?.*$/,
                "Website should be a valid URL"
            ),
            twitter: Yup.string().matches(
                /^(?=.{4,2048}$)((http|https):\/\/)?(www.)?(?!.*(http|https|www.))(twitter\.com\/[a-zA-Z0-9_-]{1,63})(\/)?.*$/,
                "Website should be a valid URL"
            ),
            whatsApp: Yup.string().matches(
                /^(?=.{4,2048}$)((http|https):\/\/)?(www.)?(?!.*(http|https|www.))(whatsapp\.com\/[a-zA-Z0-9_-]{1,63})(\/)?.*$/,
                "Website should be a valid URL"
            ),
        }),
        terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
    });

    const handleSubmit = async (values: FormikValues) => {
        const { confirmPassword, terms, ...credentials } =
            values as CompanyRegisterCredentials & {
                confirmPassword: string;
                terms: string;
            };

        try {
            await registerCompany(credentials);
            navigate("/");
            toast({
                title: "Account Created",
                status: "success",
                duration: 6000,
            });
        } catch (error) {
            toast({
                title: "Account Creation Failed",
                status: "error",
                duration: 6000,
            });
        }
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <SimpleGrid columns={1} mt={8} as={Form} spacing={6}>
                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={!!errors.companyName && touched.companyName}
                        >
                            <FormLabel htmlFor="companyName">Company Title*</FormLabel>
                            <Field
                                as={Input}
                                id="companyName"
                                name="companyName"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.companyName}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={!!errors.name && touched.name}
                        >
                            <FormLabel htmlFor="name">Company Username*</FormLabel>
                            <Field
                                as={Input}
                                id="name"
                                name="name"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.name}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={!!errors.companyMail && touched.companyMail}
                        >
                            <FormLabel htmlFor="companyMail">Email*</FormLabel>
                            <Field
                                as={Input}
                                id="companyMail"
                                name="companyMail"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.companyMail}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={!!errors.website && touched.website}
                        >
                            <FormLabel htmlFor="website">Website*</FormLabel>
                            <Field
                                as={Input}
                                id="website"
                                name="website"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.website}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={
                                !!errors.location?.country && touched.location?.country
                            }
                        >
                            <FormLabel htmlFor="location.country">Country</FormLabel>
                            <Field
                                as={Input}
                                id="location.country"
                                name="location.country"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.location?.country}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={
                                !!errors.location?.state && touched.location?.state
                            }
                        >
                            <FormLabel htmlFor="location.state">State</FormLabel>
                            <Field
                                as={Input}
                                id="location.state"
                                name="location.state"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.location?.state}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={
                                !!errors.location?.division && touched.location?.division
                            }
                        >
                            <FormLabel htmlFor="location.division">Division</FormLabel>
                            <Field
                                as={Input}
                                id="location.division"
                                name="location.division"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.location?.division}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={
                                !!errors.location?.city && touched.location?.city
                            }
                        >
                            <FormLabel htmlFor="location.city">City</FormLabel>
                            <Field
                                as={Input}
                                id="location.city"
                                name="location.city"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.location?.city}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={
                                !!errors.location?.address && touched.location?.address
                            }
                        >
                            <FormLabel htmlFor="location.address">Address</FormLabel>
                            <Field
                                as={Input}
                                id="location.address"
                                name="location.address"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.location?.address}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={
                                !!errors.location?.zipCode && touched.location?.zipCode
                            }
                        >
                            <FormLabel htmlFor="location.zipCode">ZIP Code</FormLabel>
                            <Field
                                as={Input}
                                id="location.zipCode"
                                name="location.zipCode"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.location?.zipCode}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={!!errors.password && touched.password}
                        >
                            <FormLabel htmlFor="password">Password*</FormLabel>
                            <Field
                                as={Input}
                                id="password"
                                name="password"
                                type="password"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.password}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={
                                !!errors.confirmPassword && touched.confirmPassword
                            }
                        >
                            <FormLabel htmlFor="confirmPassword">
                                Confirm Password*
                            </FormLabel>
                            <Field
                                as={Input}
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.confirmPassword}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={
                                !!errors.social?.facebook && touched.social?.facebook
                            }
                        >
                            <FormLabel htmlFor="social.facebook">Facebook</FormLabel>
                            <Field
                                as={Input}
                                id="social.facebook"
                                name="social.facebook"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.social?.facebook}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={
                                !!errors.social?.instagram && touched.social?.instagram
                            }
                        >
                            <FormLabel htmlFor="social.instagram">Instagram</FormLabel>
                            <Field
                                as={Input}
                                id="social.instagram"
                                name="social.instagram"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.social?.instagram}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={
                                !!errors.social?.linkedIn && touched.social?.linkedIn
                            }
                        >
                            <FormLabel htmlFor="social.linkedIn">Linkedin</FormLabel>
                            <Field
                                as={Input}
                                id="social.linkedIn"
                                name="social.linkedIn"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.social?.linkedIn}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={
                                !!errors.social?.twitter && touched.social?.twitter
                            }
                        >
                            <FormLabel htmlFor="social.twitter">Twitter</FormLabel>
                            <Field
                                as={Input}
                                id="social.twitter"
                                name="social.twitter"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.social?.twitter}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={
                                !!errors.social?.whatsApp && touched.social?.whatsApp
                            }
                        >
                            <FormLabel htmlFor="social.whatsApp">Whatsapp</FormLabel>
                            <Field
                                as={Input}
                                id="social.whatsApp"
                                name="social.whatsApp"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.social?.whatsApp}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={!!errors.terms && touched.terms}
                        >
                            <Stack direction="row" align="start">
                                <Field
                                    as={Checkbox}
                                    mt={2}
                                    id="terms"
                                    name="terms"
                                    variant="unstyled"
                                />
                                <FormLabel htmlFor="terms" cursor="pointer">
                                    i agree to the Terms conditions & Privacy Policy*
                                </FormLabel>
                            </Stack>
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.terms}
                            </FormErrorMessage>
                        </FormControl>
                        <Button size="xl" fontSize="md" variant="primary" type="submit">
                            REGISTER
                        </Button>
                    </SimpleGrid>
                )}
            </Formik>
            <Box position="relative" mt={4} py={4}>
                <Divider borderColor="blackAlpha.500" />
                <AbsoluteCenter bg="white" px="4">
                    <Text variant="lg">OR</Text>
                </AbsoluteCenter>
            </Box>
            <Stack
                mt={4}
                spacing={{ base: 4, lg: 8 }}
                direction={{ base: "column", lg: "row" }}
                width="full"
            >
                <Button
                    variant="social"
                    leftIcon={
                        <Text fontSize="2xl">
                            <Icon icon="devicon:google" />
                        </Text>
                    }
                    w="full"
                >
                    Login with Google
                </Button>
                <Button
                    variant="social"
                    leftIcon={
                        <Text fontSize="2xl">
                            <Icon icon="logos:facebook" />
                        </Text>
                    }
                    w="full"
                >
                    Login with Facebook
                </Button>
            </Stack>
        </>
    );
}
