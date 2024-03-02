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
import { registerUser } from "services/api/auth";
import { useNavigate } from "react-router-dom";

function convertDateFormatBackend(inputDate: string) {
    const parts = inputDate.split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const date = new Date(year, month, day);
    const formattedDate = date.toISOString();
    return formattedDate;
}

export default function RegisterUser() {
    const navigate = useNavigate();
    const toast = useToast();

    const initialValues = {
        first_name: "",
        last_name: "",
        birth_date: null,
        username: "",
        password: "",
        confirm_password: "",
        email: "",
        country: "",
        is_refugee: false,
        terms: false,
    };

    const validationSchema = Yup.object().shape({
        first_name: Yup.string().required("First name is required"),
        last_name: Yup.string().required("Last name is required"),
        birth_date: Yup.date()
            .required("Birth date is required")
            .max(new Date(), "Birth date cannot be in the future"),
        username: Yup.string().required("Username is required"),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters long"),
        confirm_password: Yup.string()
            .oneOf([Yup.ref("password"), undefined], "Passwords must match")
            .required("Confirm Password is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        country: Yup.string().required("Country is required"),
        is_refugee: Yup.boolean().required("Please specify if you are a refugee or not"),
        terms: Yup.boolean().oneOf([true], "You must agree to our terms & conditions"),
    });

    const handleSubmit = async (values: FormikValues) => {
        const { confirm_password, terms, country, ...rest } =
            values as UserRegisterCredentials & {
                confirm_password: string;
                terms: string;
                country: string;
            };

        const credentials = {
            ...rest,
            birth_date: convertDateFormatBackend(values.birth_date),
            location: {
                country: values.country,
                state: "",
                map_url: "",
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
                            isInvalid={!!errors.first_name && touched.first_name}
                        >
                            <FormLabel htmlFor="first_name">First Name*</FormLabel>
                            <Field
                                as={Input}
                                id="first_name"
                                name="first_name"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.first_name}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={!!errors.last_name && touched.last_name}
                        >
                            <FormLabel htmlFor="last_name">Last Name*</FormLabel>
                            <Field
                                as={Input}
                                id="last_name"
                                name="last_name"
                                type="text"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.last_name}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            variant="auth"
                            as={GridItem}
                            isInvalid={!!errors.birth_date && touched.birth_date}
                        >
                            <FormLabel htmlFor="birth_date">Birth Date*</FormLabel>
                            <Field
                                as={Input}
                                id="birth_date"
                                name="birth_date"
                                type="date"
                                variant="unstyled"
                            />
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.birth_date}
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
                            isInvalid={!!errors.is_refugee && touched.is_refugee}
                        >
                            <Stack direction="row">
                                <Field
                                    as={Checkbox}
                                    id="is_refugee"
                                    name="is_refugee"
                                    variant="unstyled"
                                />
                                <FormLabel htmlFor="is_refugee" cursor="pointer">
                                    I am a refugee*
                                </FormLabel>
                            </Stack>
                            <FormErrorMessage mt={0} fontSize="md">
                                {errors.is_refugee}
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
