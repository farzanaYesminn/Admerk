import {
    Button,
    Card,
    CardBody,
    CardHeader,
    FormControl,
    FormErrorMessage,
    FormLabel,
    GridItem,
    Heading,
    Input,
    SimpleGrid,
    Stack,
    useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik, type FormikValues } from "formik";
import { Helmet } from "react-helmet-async";
import { changeCompanyPassword } from "services/api/company";
import * as Yup from "yup";

export default function CompanySettings() {
    const toast = useToast();

    const initialValues = {
        password: "",
        new_password: "",
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters long"),
        new_password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters long"),
    });

    const handleSubmit = async (values: FormikValues) => {
        const credentials = values as CompanyPasswordCredentials;
        try {
            await changeCompanyPassword(credentials);
            toast({
                title: "Account Password Changed",
                status: "success",
                duration: 4000,
            });
        } catch (error) {
            toast({
                title: "Password change failed",
                status: "error",
                duration: 4000,
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Admerk - Settings</title>
            </Helmet>
            <Stack px={{ base: 4, xl: 12 }} py={{ base: 4, xl: 8 }}>
                <Heading fontSize={{ base: "2xl", xl: "3xl" }} fontWeight={500}>
                    Settings
                </Heading>
                <Card rounded={{ base: "xl", xl: "3xl" }} mt={{ base: 4, xl: 8 }}>
                    <CardHeader borderBottom="1px" borderColor="slate.200">
                        <Heading
                            fontSize="xl"
                            fontWeight={500}
                            lineHeight={1}
                            color="slate.800"
                        >
                            Change Password
                        </Heading>
                    </CardHeader>
                    <CardBody px={{ base: 4, xl: 8 }} py={{ base: 4, xl: 8 }}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched }) => (
                                <SimpleGrid
                                    columns={{ base: 1, lg: 2 }}
                                    as={Form}
                                    spacing={6}
                                >
                                    <GridItem>
                                        <FormControl
                                            variant="auth"
                                            as={GridItem}
                                            isInvalid={
                                                !!errors.password && touched.password
                                            }
                                        >
                                            <FormLabel htmlFor="password">
                                                Old Password*
                                            </FormLabel>
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
                                    </GridItem>
                                    <GridItem>
                                        <FormControl
                                            variant="auth"
                                            as={GridItem}
                                            isInvalid={
                                                !!errors.new_password &&
                                                touched.new_password
                                            }
                                        >
                                            <FormLabel htmlFor="new_password">
                                                New Password*
                                            </FormLabel>
                                            <Field
                                                as={Input}
                                                id="new_password"
                                                name="new_password"
                                                type="password"
                                                variant="unstyled"
                                            />
                                            <FormErrorMessage mt={0} fontSize="md">
                                                {errors.new_password}
                                            </FormErrorMessage>
                                        </FormControl>
                                    </GridItem>
                                    <GridItem>
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            size={{ base: "lg" }}
                                            fontSize="md"
                                            letterSpacing="wides"
                                        >
                                            Change Password
                                        </Button>
                                    </GridItem>
                                </SimpleGrid>
                            )}
                        </Formik>
                    </CardBody>
                </Card>
            </Stack>
        </>
    );
}
