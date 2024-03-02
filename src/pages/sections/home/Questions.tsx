import { Fragment } from "react";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Divider,
    Heading,
    Text,
} from "@chakra-ui/react";

const sets = [
    {
        question: "How does this website benefit refugees seeking employment?",
        answer: "This website is tailored to support refugees in their job search by connecting them with companies that are open to hiring refugees. We understand the unique challenges refugees face and aim to provide a platform where they can access job opportunities from refugee-friendly employers.",
    },
    {
        question:
            "Are the job listings on this platform open to refugees, or are there specific eligibility criteria?",
        answer: "The job listings on our platform are open to refugees, and we do not impose specific eligibility criteria for refugee applicants. We aim to create an inclusive environment where refugees have equal access to job opportunities.",
    },
    {
        question: "How do I create an account and start searching for jobs as a refugee?",
        answer: "Creating an account is easy. Simply visit our website and click on the 'Sign Up' or 'Register' button. Follow the prompts to provide your information. Once your account is set up, you can start searching for jobs by entering keywords, location, or other preferences in the search bar.",
    },
    {
        question:
            "Can I receive notifications about new job listings that match my skills and preferences?",
        answer: "Yes, you can receive notifications about new job listings that match your skills and preferences. After creating an account, go to your profile settings, and you'll find options to set up job alerts. You can specify your job preferences, and we will notify you when relevant job listings become available, ensuring you never miss an opportunity.",
    },
];

export default function Questions() {
    return (
        <>
            <Accordion px={2} allowMultiple={true}>
                {sets.map((set, idx) => {
                    return (
                        <Fragment key={`set-${idx}`}>
                            {!!idx && <Divider borderColor="slate.400" />}
                            <AccordionItem border="none" py={{ base: 4, lg: 5 }}>
                                <AccordionButton
                                    px={0}
                                    _hover={{
                                        bgColor: "white",
                                    }}
                                >
                                    <Box flex="1" textAlign="left">
                                        <Heading
                                            fontSize={{ base: "xl", lg: "2xl" }}
                                            fontWeight={600}
                                            color="slate.900"
                                        >
                                            {set.question}
                                        </Heading>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pt={6} pb={4} px={0}>
                                    <Text
                                        fontSize={{ base: "lg", lg: "xl" }}
                                        lineHeight={1.8}
                                        w="90%"
                                    >
                                        {set.answer}
                                    </Text>
                                </AccordionPanel>
                            </AccordionItem>
                        </Fragment>
                    );
                })}
            </Accordion>
        </>
    );
}
