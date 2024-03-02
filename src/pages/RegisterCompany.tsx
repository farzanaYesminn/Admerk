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
        c_name: "",
        name: "",
        c_mail: "",
        password: "",
        website: "",
        location: {
            country: "",
            map_url: "",
            state: "",
        },
        social: {
            facebook: "",
            instagram: "",
            linkedin: "",
            twitter: "",
            whatsapp: "",
        },
        confirm_password: "",
        terms: false,
    };

    const validationSchema = Yup.object().shape({
        c_name: Yup.string().required("Company name is required"),
        name: Yup.string().required("Name is required"),
        c_mail: Yup.string().email("Invalid email address").required("Email is required"),
        website: Yup.string()
            .matches(
                /^(?=.{4,2048}$)((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]{1,63}(\.[a-zA-Z]{1,63}){1,5}(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/,
                "Website should be a valid URL"
            )
            .required("Website is required"),
        location: Yup.object().shape({
            country: Yup.string().required("Country is required"),
            map_url: Yup.string().url("Invalid Map URL"),
            state: Yup.string().required("State is required"),
        }),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
        confirm_password: Yup.string()
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
            linkedin: Yup.string().matches(
                /^(?=.{4,2048}$)((http|https):\/\/)?(www.)?(?!.*(http|https|www.))(linkedin\.com\/[a-zA-Z0-9_-]{1,63})(\/)?.*$/,
                "Website should be a valid URL"
            ),
            twitter: Yup.string().matches(
                /^(?=.{4,2048}$)((http|https):\/\/)?(www.)?(?!.*(http|https|www.))(twitter\.com\/[a-zA-Z0-9_-]{1,63})(\/)?.*$/,
                "Website should be a valid URL"
            ),
            whatsapp: Yup.string().matches(
                /^(?=.{4,2048}$)((http|https):\/\/)?(www.)?(?!.*(http|https|www.))(whatsapp\.com\/[a-zA-Z0-9_-]{1,63})(\/)?.*$/,
                "Website should be a valid URL"
            ),
        }),
        terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
    });

    const handleSubmit = async (values: FormikValues) => {
        const { confirm_password, terms, ...credentials } =
            values as CompanyRegisterCredentials & {
                confirm_password: string;
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
                            isInvalid={!!errors.name && touched.name}
                        >
                            <FormLabel htmlFor="name">Company Title*</FormLabel>
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
                            isInvalid={!!errors.c_name && touched.c_name}
                        >
                            <FormLabel htmlFor="c_name">Company Username*</FormLabel>
                            <Field
                                as={Input}
                                id="c_name"
                                name="c_name"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.c_name}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={!!errors.c_mail && touched.c_mail}
                        >
                            <FormLabel htmlFor="c_mail">Email*</FormLabel>
                            <Field
                                as={Input}
                                id="c_mail"
                                name="c_mail"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.c_mail}
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
                                !!errors.location?.map_url && touched.location?.map_url
                            }
                        >
                            <FormLabel htmlFor="location.map_url">Map URL</FormLabel>
                            <Field
                                as={Input}
                                id="location.map_url"
                                name="location.map_url"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.location?.map_url}
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
                                !!errors.confirm_password && touched.confirm_password
                            }
                        >
                            <FormLabel htmlFor="confirm_password">
                                Confirm Password*
                            </FormLabel>
                            <Field
                                as={Input}
                                id="confirm_password"
                                name="confirm_password"
                                type="password"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.confirm_password}
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
                                !!errors.social?.linkedin && touched.social?.linkedin
                            }
                        >
                            <FormLabel htmlFor="social.linkedin">Linkedin</FormLabel>
                            <Field
                                as={Input}
                                id="social.linkedin"
                                name="social.linkedin"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.social?.linkedin}
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
                                !!errors.social?.whatsapp && touched.social?.whatsapp
                            }
                        >
                            <FormLabel htmlFor="social.whatsapp">Whatsapp</FormLabel>
                            <Field
                                as={Input}
                                id="social.whatsapp"
                                name="social.whatsapp"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.social?.whatsapp}
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
