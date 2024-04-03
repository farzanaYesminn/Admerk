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
// import allCategories from "assets/data/serverCategories.json";

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
        "intermediate"
    ];
    const allSalaryDurations = ["weekly", "monthly", "hourly"];
    const allCategories = [
        "accounting",
        "administration",
        "advertising",
        "agriculture",
        "arts_and_design",
        "banking",
        "biotechnology",
        "business_development",
        "consulting",
        "customer_service",
        "education",
        "engineering",
        "finance",
        "healthcare",
        "human_resource",
        "information_technology",
        "legal",
        "manufacturing",
        "marketing",
        "media_and_communication",
        "nonprofit",
        "retail",
        "sales",
        "science",
        "sports_and_recreation",
        "telecommunications",
        "transportation_and_logistics",
        "travel_and_tourism",
        "utilities"
    ];

    const initialValues = {
        jobTitle: "",
        category: "",
        jobType: "",
        overview: "",
        jobDescription: "",
        location: {
            country: "",
            state: "",
            city: "",
            address: "",
            zipCode: "",
        },
        salaryAmount: "",
        salaryDuration: "",
        responsibility: "",
        requiredSkills: "",
        experience: "",
        benefits: "",
        jobUrl: "",
    };

    const validationSchema = Yup.object().shape({
        benefits: Yup.string().required("Benefits are required"),
        category: Yup.string()
            .oneOf(allCategories, "Invalid job category")
            .required("Category is required"),
        experience: Yup.string().oneOf(allExperiences, "Invalid experience level"),
        jobDescription: Yup.string().required("Job description is required"),
        jobTitle: Yup.string().required("Job title is required"),
        jobType: Yup.string()
            .oneOf(allJobTypes, "Invalid job type")
            .required("Category is required"),
        jobUrl: Yup.string().url("Invalid URL format"),
        overview: Yup.string().required("Overview is required"),
        requiredSkills: Yup.string().required("Required skills are required"),
        responsibility: Yup.string().required("Responsibility is required"),
        salaryAmount: Yup.number()
            .typeError("Salary amount must be a number")
            .positive("Salary amount must be a positive number")
            .required("Salary amount is required"),
        salaryDuration: Yup.string()
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
                                            !!errors.jobTitle && touched.jobTitle
                                        }
                                    >
                                        <FormLabel htmlFor="jobTitle">
                                            Job Title*
                                        </FormLabel>
                                        <Field
                                            as={Input}
                                            id="jobTitle"
                                            name="jobTitle"
                                            type="text"
                                            variant="unstyled"
                                        />
                                        <FormErrorMessage mt={0} fontSize="md">
                                            {errors.jobTitle}
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
                                        isInvalid={!!errors.jobType && touched.jobType}
                                    >
                                        <FormLabel htmlFor="jobType">
                                            Job Type*
                                        </FormLabel>
                                        <Field
                                            as={Select}
                                            id="jobType"
                                            name="jobType"
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
                                            {errors.jobType}
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
                                            !!errors.jobDescription &&
                                            touched.jobDescription
                                        }
                                    >
                                        <FormLabel htmlFor="jobDescription">
                                            Job Description*
                                        </FormLabel>
                                        <Field
                                            as={Textarea}
                                            id="jobDescription"
                                            name="jobDescription"
                                            type="text"
                                            variant="unstyled"
                                        />
                                        <FormErrorMessage mt={0} fontSize="md">
                                            {errors.jobDescription}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl
                                        variant="auth"
                                        as={GridItem}
                                        isInvalid={
                                            !!errors.salaryAmount &&
                                            touched.salaryAmount
                                        }
                                    >
                                        <FormLabel htmlFor="salaryAmount">
                                            Salary*
                                        </FormLabel>
                                        <Field
                                            as={Input}
                                            id="salaryAmount"
                                            name="salaryAmount"
                                            type="number"
                                            variant="unstyled"
                                        />
                                        <FormErrorMessage mt={0} fontSize="md">
                                            {errors.salaryAmount}
                                        </FormErrorMessage>
                                    </FormControl>

                                    <FormControl
                                        variant="auth"
                                        as={GridItem}
                                        isInvalid={
                                            !!errors.salaryDuration &&
                                            touched.salaryDuration
                                        }
                                    >
                                        <FormLabel htmlFor="salaryDuration">
                                            Salary Duration*
                                        </FormLabel>
                                        <Field
                                            as={Select}
                                            id="salaryDuration"
                                            name="salaryDuration"
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
                                            {errors.salaryDuration}
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
                                            !!errors.requiredSkills &&
                                            touched.requiredSkills
                                        }
                                    >
                                        <FormLabel htmlFor="requiredSkills">
                                            Required Skills*
                                        </FormLabel>
                                        <Field
                                            as={Textarea}
                                            id="requiredSkills"
                                            name="requiredSkills"
                                            type="text"
                                            variant="unstyled"
                                        />
                                        <FormErrorMessage mt={0} fontSize="md">
                                            {errors.requiredSkills}
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
                                        isInvalid={!!errors.jobUrl && touched.jobUrl}
                                    >
                                        <FormLabel htmlFor="jobUrl">Job URL*</FormLabel>
                                        <Field
                                            as={Input}
                                            id="jobUrl"
                                            name="jobUrl"
                                            type="text"
                                            variant="unstyled"
                                        />
                                        <FormErrorMessage mt={0} fontSize="md">
                                            {errors.jobUrl}
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
