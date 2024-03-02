import {
    Stack,
    Text,
    Box,
    Heading,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Button,
    Divider,
} from "@chakra-ui/react";
import { Fragment } from "react";
import whyUs from "assets/data/whyus.json";

export default function WhyUs() {
    return (
        <Stack>
            <Text fontSize="xl" fontWeight={600} color="purple.500">
                Why choose us?
            </Text>
            <Heading
                fontSize={{ base: "4xl", md: "5xl" }}
                fontWeight={600}
                lineHeight="120%"
            >
                A pool of talent within your reach
            </Heading>
            <Accordion mt={8} px={2} variant="home" allowMultiple={true}>
                {whyUs.map((topic, idx) => {
                    return (
                        <Fragment key={`topic-${idx}`}>
                            {!!idx && <Divider borderColor="slate.400" />}
                            <AccordionItem border="none" py={2}>
                                <AccordionButton px={0}>
                                    <Box flex="1" textAlign="left">
                                        <Heading
                                            fontSize="xl"
                                            fontWeight={600}
                                            color="slate.700"
                                        >
                                            {topic.title}
                                        </Heading>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel pb={4}>
                                    <Text variant="accordion">{topic.description}</Text>
                                </AccordionPanel>
                            </AccordionItem>
                        </Fragment>
                    );
                })}
            </Accordion>

            <Button
                mt={8}
                variant="primary"
                width="fit-content"
                size={{ base: "lg", lg: "xl" }}
                rounded="full"
            >
                Learn More
            </Button>
        </Stack>
    );
}
