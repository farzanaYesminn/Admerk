import { Box, Button, FormControl, Input, Stack } from "@chakra-ui/react";
import { Formik, Form, Field, type FormikValues } from "formik";
import * as Yup from "yup";

export default function FooterNewsletter() {
    const initialValue = {
        email: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email address").required("Email is required"),
    });

    const handleSubmit = (values: FormikValues) => {
        alert(JSON.stringify(values, null, 2));
    };

    return (
        <Box width="full" rounded="xl">
            <Formik
                initialValues={initialValue}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, values, errors, touched }) => (
                    <Stack as={Form} direction="row" spacing={0}>
                        <FormControl isInvalid={!!errors.email && touched.email}>
                            <Field name="title">
                                {() => (
                                    <Input
                                        variant="filled"
                                        id="title"
                                        name="title"
                                        value={values.email}
                                        onChange={handleChange("email")}
                                        placeholder="Enter your email"
                                        autoComplete="off"
                                        rounded="none"
                                        roundedStart="lg"
                                        p={5}
                                        border="2px"
                                        borderColor="slate.300"
                                        bgColor="white"
                                        _hover={{
                                            borderColor: "slate.400",
                                        }}
                                        _focus={{
                                            borderColor: "purple.500",
                                        }}
                                    />
                                )}
                            </Field>
                        </FormControl>
                        <Box>
                            <Button
                                type="submit"
                                px={4}
                                height="full"
                                variant="primary"
                                alignSelf="stretch"
                                rounded="none"
                                roundedEnd="lg"
                                fontWeight="medium"
                            >
                                Subscribe
                            </Button>
                        </Box>
                    </Stack>
                )}
            </Formik>
        </Box>
    );
}
