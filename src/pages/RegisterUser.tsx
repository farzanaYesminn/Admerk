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
import {Field, Form, Formik, FormikValues} from "formik";
import {Icon} from "@iconify/react/dist/iconify.js";
import {registerUser} from "services/api/auth";
import {useNavigate} from "react-router-dom";

function convertDateFormatBackend(inputDate: string) {
    const parts = inputDate.split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const date = new Date(year, month, day);
    return date.toISOString();
}

export default function RegisterUser() {
    const navigate = useNavigate();
    const toast = useToast();

    const initialValues = {
        firstName: "",
        lastName: "",
        birthDate: null,
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        contactNumber: "",
        country: "",
        state: "",
        isRefugee: false,
        terms: false,
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        birthDate: Yup.date()
            .required("Birth date is required")
            .max(new Date(), "Birth date cannot be in the future"),
        username: Yup.string().required("Username is required"),
        password: Yup.string()
            .required("Password is required")
            .min(4, "Password must be at least 4 characters long"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), undefined], "Passwords must match")
            .required("Confirm Password is required"),
        contactNumber: Yup.string().required("Contact Number is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        country: Yup.string().required("Country is required"),
        state: Yup.string().required("State is required"),
        isRefugee: Yup.boolean().required("Please specify if you are a refugee or not"),
        terms: Yup.boolean().oneOf([true], "You must agree to our terms & conditions"),
    });

    const handleSubmit = async (values: FormikValues) => {
        const { confirmPassword, terms, country, ...rest } =
            values as UserRegisterCredentials & {
                confirmPassword: string;
                terms: string;
                country: string;
                state: string;
                isRefugee: boolean;
            };

        const credentials = {
            ...rest,
            birthDate: convertDateFormatBackend(values.birthDate),
            location: {
                country: values.country,
                state: values.state,
                division: "",
                city: "",
                address: "",
                zipCode: "",
            },
        };

        try {
            await registerUser(credentials);
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
                            isInvalid={!!errors.firstName && touched.firstName}
                        >
                            <FormLabel htmlFor="firstName">First Name*</FormLabel>
                            <Field
                                as={Input}
                                id="firstName"
                                name="firstName"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.firstName}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={!!errors.lastName && touched.lastName}
                        >
                            <FormLabel htmlFor="lastName">Last Name*</FormLabel>
                            <Field
                                as={Input}
                                id="lastName"
                                name="lastName"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.lastName}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={!!errors.birthDate && touched.birthDate}
                        >
                            <FormLabel htmlFor="birthDate">Birth Date*</FormLabel>
                            <Field
                                as={Input}
                                id="birthDate"
                                name="birthDate"
                                type="date"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.birthDate}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={!!errors.username && touched.username}
                        >
                            <FormLabel htmlFor="username">Username*</FormLabel>
                            <Field
                                as={Input}
                                id="username"
                                name="username"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.username}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={!!errors.email && touched.email}
                        >
                            <FormLabel htmlFor="email">Email Address*</FormLabel>
                            <Field
                                as={Input}
                                id="email"
                                name="email"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.email}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={!!errors.contactNumber && touched.contactNumber}
                        >
                            <FormLabel htmlFor="contactNumber">Contact Number</FormLabel>
                            <Field
                                as={Input}
                                id="contactNumber"
                                name="contactNumber"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.contactNumber}
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
                            isInvalid={!!errors.country && touched.country}
                        >
                            <FormLabel htmlFor="country">Country*</FormLabel>
                            <Field
                                as={Input}
                                id="country"
                                name="country"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.country}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={!!errors.state && touched.state}
                        >
                            <FormLabel htmlFor="state">State*</FormLabel>
                            <Field
                                as={Input}
                                id="state"
                                name="state"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.state}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={!!errors.isRefugee && touched.isRefugee}
                        >
                            <Stack direction="row">
                                <Field
                                    as={Checkbox}
                                    id="isRefugee"
                                    name="isRefugee"
                                    variant="unstyled"
                                />
                                <FormLabel htmlFor="isRefugee" cursor="pointer">
                                    I am a refugee*
                                </FormLabel>
                            </Stack>
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.isRefugee}
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
                                    I agree to the Terms conditions & Privacy Policy*
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
