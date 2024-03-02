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
    Select,
    SimpleGrid,
    Stack,
    Text,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikValues } from "formik";
import { Helmet } from "react-helmet-async";
import { createJob } from "services/api/company";
import * as Yup from "yup";
import allCategories from "assets/data/serverCategories.json";

const convertFromSnake = (str: string) => {
    return str.split("_").join(" ");
};

export default function CompanyCreateJob() {
    const toast = useToast();
    const allJobTypes = ["fixed_price", "full_time", "part_time", "freelance"];
    const allExperiences = [
        "fresher",
        "no_experience",
        "expert",
        "internship",
        "intermediate",
    ];
    const allSalaryDurations = ["weekly", "monthly", "hourly"];

    const initialValues = {
        job_title: "",
        category: "",
        job_type: "",
        overview: "",
        job_description: "",
        location: {
            country: "",
            state: "",
            map_url: "",
        },
        salary_amount: "",
        salary_duration: "",
        responsibility: "",
        required_skills: "",
        experience: "",
        benefits: "",
        job_url: "",
    };

    const validationSchema = Yup.object().shape({
        benefits: Yup.string().required("Benefits are required"),
        category: Yup.string()
            .oneOf(allCategories, "Invalid job category")
            .required("Category is required"),
        experience: Yup.string().oneOf(allExperiences, "Invalid experience level"),
        job_description: Yup.string().required("Job description is required"),
        job_title: Yup.string().required("Job title is required"),
        job_type: Yup.string()
            .oneOf(allJobTypes, "Invalid job type")
            .required("Category is required"),
        job_url: Yup.string().url("Invalid URL format"),
        location: Yup.object().shape({
            country: Yup.string().required("Country is required"),
            state: Yup.string().required("State is required"),
            map_url: Yup.string().url("Invalid URL format"),
        }),
        overview: Yup.string().required("Overview is required"),
        required_skills: Yup.string().required("Required skills are required"),
        responsibility: Yup.string().required("Responsibility is required"),
        salary_amount: Yup.number()
            .typeError("Salary amount must be a number")
            .positive("Salary amount must be a positive number")
            .required("Salary amount is required"),
        salary_duration: Yup.string()
            .oneOf(allSalaryDurations, "Invalid salary duration")
            .required("Salary duration is required"),
    });

    const handleSubmit = async (values: FormikValues) => {
        const formData = values as JobCreate;
        try {
            await createJob(formData);
            toast({
                title: "New job created",
                status: "success",
                duration: 4000,
            });
        } catch (error) {
            toast({
                title: "Failed to create job",
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
                    Create Job
                </Heading>
                <Card rounded={{ base: "xl", xl: "3xl" }} mt={{ base: 4, xl: 8 }}>
                    <CardHeader borderBottom="1px" borderColor="slate.200">
                        <Heading
                            fontSize="xl"
                            fontWeight={500}
                            lineHeight={1}
                            color="slate.800"
                        >
                            Job Information
                        </Heading>
                    </CardHeader>
                    <CardBody px={{ base: 4, xl: 8 }} py={{ base: 4, xl: 8 }}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched }) => (
                                <SimpleGrid columns={2} as={Form} spacing={6}>
                                    <FormControl
                                        variant="auth"
                                        as={GridItem}
                                        colSpan={2}
                                        isInvalid={
                                            !!errors.job_title && touched.job_title
                                        }
                                    >
                                        <FormLabel htmlFor="job_title">
                                            Job Title*
                                        </FormLabel>
                                        <Field
                                            as={Input}
                                            id="job_title"
                                            name="job_title"
                                            type="text"
                                            variant="unstyled"
                                        />
                                        <FormErrorMessage mt={0} fontSize="md">
                                            {errors.job_title}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl
                                        variant="auth"
                                        as={GridItem}
                                        isInvalid={!!errors.category && touched.category}
                                    >
                                        <FormLabel htmlFor="category">
                                            Category*
                                        </FormLabel>
                                        <Field
                                            as={Select}
                                            id="category"
                                            name="category"
                                            cursor="pointer"
                                            variant="unstyled"
                                            textTransform="capitalize"
                                        >
                                            <option value=""></option>
                                            {allCategories.map((category) => (
                                                <Text
                                                    as="option"
                                                    key={category}
                                                    value={category}
                                                    textTransform="capitalize"
                                                >
                                                    {convertFromSnake(category)}
                                                </Text>
                                            ))}
                                        </Field>
                                        <FormErrorMessage mt={0} fontSize="md">
                                            {errors.category}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl
                                        variant="auth"
                                        as={GridItem}
                                        isInvalid={!!errors.job_type && touched.job_type}
                                    >
                                        <FormLabel htmlFor="job_type">
                                            Job Type*
                                        </FormLabel>
                                        <Field
                                            as={Select}
                                            id="job_type"
                                            name="job_type"
                                            cursor="pointer"
                                            variant="unstyled"
                                            textTransform="capitalize"
                                        >
                                            <option value=""></option>
                                            {allJobTypes.map((jobType) => (
                                                <Text
                                                    as="option"
                                                    key={jobType}
                                                    value={jobType}
                                                    textTransform="capitalize"
                                                >
                                                    {convertFromSnake(jobType)}
                                                </Text>
                                            ))}
                                        </Field>
                                        <FormErrorMessage mt={0} fontSize="md">
                                            {errors.job_type}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl
                                        variant="auth"
                                        as={GridItem}
                                        isInvalid={
                                            !!errors.experience && touched.experience
                                        }
                                    >
                                        <FormLabel htmlFor="experience">
                                            Experience*
                                        </FormLabel>
                                        <Field
                                            as={Select}
                                            id="experience"
                                            name="experience"
                                            cursor="pointer"
                                            variant="unstyled"
                                            textTransform="capitalize"
                                        >
                                            <option value=""></option>
                                            {allExperiences.map((experience) => (
                                                <Text
                                                    as="option"
                                                    key={experience}
                                                    value={experience}
                                                    textTransform="capitalize"
                                                >
                                                    {convertFromSnake(experience)}
                                                </Text>
                                            ))}
                                        </Field>
                                        <FormErrorMessage mt={0} fontSize="md">
                                            {errors.experience}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl
                                        variant="auth"
                                        as={GridItem}
                                        colSpan={2}
                                        isInvalid={!!errors.overview && touched.overview}
                                    >
                                        <FormLabel htmlFor="overview">
                                            Overview*
                                        </FormLabel>
                                        <Field
                                            as={Textarea}
                                            id="overview"
                                            name="overview"
                                            type="text"
                                            variant="unstyled"
                                        />
                                        <FormErrorMessage mt={0} fontSize="md">
                                            {errors.overview}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl
                                        variant="auth"
                                        as={GridItem}
                                        colSpan={2}
                                        isInvalid={
                                            !!errors.job_description &&
                                            touched.job_description
                                        }
                                    >
                                        <FormLabel htmlFor="job_description">
                                            Job Description*
                                        </FormLabel>
                                        <Field
                                            as={Textarea}
                                            id="job_description"
                                            name="job_description"
                                            type="text"
                                            variant="unstyled"
                                        />
                                        <FormErrorMessage mt={0} fontSize="md">
                                            {errors.job_description}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl
                                        variant="auth"
                                        as={GridItem}
                                        isInvalid={
                                            !!errors.location?.country &&
                                            touched.location?.country
                                        }
                                    >
                                        <FormLabel htmlFor="location.country">
                                            Country*
                                        </FormLabel>
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
                                            !!errors.location?.state &&
                                            touched.location?.state
                                        }
                                    >
                                        <FormLabel htmlFor="location.state">
                                            State*
                                        </FormLabel>
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
                                        colSpan={2}
                                        isInvalid={
                                            !!errors.location?.map_url &&
                                            touched.location?.map_url
                                        }
                                    >
                                        <FormLabel htmlFor="location.map_url">
                                            Map URL*
                                        </FormLabel>
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
                                        isInvalid={
                                            !!errors.salary_amount &&
                                            touched.salary_amount
                                        }
                                    >
                                        <FormLabel htmlFor="salary_amount">
                                            Salary*
                                        </FormLabel>
                                        <Field
                                            as={Input}
                                            id="salary_amount"
                                            name="salary_amount"
                                            type="number"
                                            variant="unstyled"
                                        />
                                        <FormErrorMessage mt={0} fontSize="md">
                                            {errors.salary_amount}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl
                                        variant="auth"
                                        as={GridItem}
                                        isInvalid={
                                            !!errors.salary_duration &&
                                            touched.salary_duration
                                        }
                                    >
                                        <FormLabel htmlFor="salary_duration">
                                            Salary Duration*
                                        </FormLabel>
                                        <Field
                                            as={Select}
                                            id="salary_duration"
                                            name="salary_duration"
                                            cursor="pointer"
                                            variant="unstyled"
                                            textTransform="capitalize"
                                        >
                                            <option value=""></option>
                                            {allSalaryDurations &&
                                                allSalaryDurations.map((duration) => (
                                                    <Text
                                                        as="option"
                                                        key={duration}
                                                        value={duration}
                                                        textTransform="capitalize"
                                                    >
                                                        {convertFromSnake(duration)}
                                                    </Text>
                                                ))}
                                        </Field>
                                        <FormErrorMessage mt={0} fontSize="md">
                                            {errors.salary_duration}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl
                                        variant="auth"
                                        as={GridItem}
                                        colSpan={2}
                                        isInvalid={
                                            !!errors.responsibility &&
                                            touched.responsibility
                                        }
                                    >
                                        <FormLabel htmlFor="responsibility">
                                            Responsibility*
                                        </FormLabel>
                                        <Field
                                            as={Textarea}
                                            id="responsibility"
                                            name="responsibility"
                                            type="text"
                                            variant="unstyled"
                                        />
                                        <FormErrorMessage mt={0} fontSize="md">
                                            {errors.responsibility}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl
                                        variant="auth"
                                        as={GridItem}
                                        colSpan={2}
                                        isInvalid={
                                            !!errors.required_skills &&
                                            touched.required_skills
                                        }
                                    >
                                        <FormLabel htmlFor="required_skills">
                                            Required Skills*
                                        </FormLabel>
                                        <Field
                                            as={Textarea}
                                            id="required_skills"
                                            name="required_skills"
                                            type="text"
                                            variant="unstyled"
                                        />
                                        <FormErrorMessage mt={0} fontSize="md">
                                            {errors.required_skills}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl
                                        variant="auth"
                                        as={GridItem}
                                        colSpan={2}
                                        isInvalid={!!errors.benefits && touched.benefits}
                                    >
                                        <FormLabel htmlFor="benefits">
                                            Benefits*
                                        </FormLabel>
                                        <Field
                                            as={Textarea}
                                            id="benefits"
                                            name="benefits"
                                            type="text"
                                            variant="unstyled"
                                        />
                                        <FormErrorMessage mt={0} fontSize="md">
                                            {errors.benefits}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl
                                        variant="auth"
                                        as={GridItem}
                                        colSpan={2}
                                        isInvalid={!!errors.job_url && touched.job_url}
                                    >
                                        <FormLabel htmlFor="job_url">Job URL*</FormLabel>
                                        <Field
                                            as={Input}
                                            id="job_url"
                                            name="job_url"
                                            type="text"
                                            variant="unstyled"
                                        />
                                        <FormErrorMessage mt={0} fontSize="md">
                                            {errors.job_url}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size={{ base: "lg" }}
                                        fontSize="md"
                                        letterSpacing="wides"
                                    >
                                        Create new Job
                                    </Button>
                                </SimpleGrid>
                            )}
                        </Formik>
                    </CardBody>
                </Card>
            </Stack>
        </>
    );
}
