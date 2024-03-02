import { Formik, Form, Field, type FormikValues } from "formik";
import {
    Box,
    FormControl,
    Input,
    Button,
    Stack,
    type BoxProps,
} from "@chakra-ui/react";
import * as Yup from "yup";

type Props = BoxProps;

export default function HomeSearch(props: Props) {
    const initialValue = {
        searchKeyword: "",
    };

    const validationSchema = Yup.object().shape({
        searchKeyword: Yup.string(),
    });

    const handleSubmit = (values: FormikValues) => {
        alert(JSON.stringify(values, null, 4));
    };

    return (
        <Box mx="auto" width="full" rounded="xl" {...props}>
            <Formik
                initialValues={initialValue}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, values, errors, touched }) => (
                    <Stack as={Form} direction="row" spacing={0}>
                        <Box flexGrow={1}>
                            <FormControl
                                isInvalid={!!errors.searchKeyword && touched.searchKeyword}
                            >
                                <Field name="searchKeyword">
                                    {() => (
                                        <Input
                                            variant="unstyled"
                                            id="searchKeyword"
                                            name="searchKeyword"
                                            value={values.searchKeyword}
                                            onChange={handleChange("searchKeyword")}
                                            placeholder="What type of job are you looking for?"
                                            autoComplete="off"
                                            rounded="none"
                                            roundedStart="full"
                                            height={14}
                                            px={8}
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
                        </Box>
                        <Box>
                            <Button
                                type="submit"
                                width="full"
                                height="full"
                                px={5}
                                variant="primary"
                                rounded="none"
                                roundedEnd="full"
                                fontWeight="medium"
                            >
                                Search Jobs
                            </Button>
                        </Box>
                    </Stack>
                )}
            </Formik>
        </Box>
    );
}
