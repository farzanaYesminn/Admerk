import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import {
    Accordion,
    AccordionItem,
    AccordionPanel,
    AccordionButton,
    Box,
    Divider,
    Center,
} from "@chakra-ui/react";

export default function Filter() {
    return (
        <Accordion
            allowMultiple={true}
            bg="purple.50"
            variant="filter"
            border="1px"
            borderColor="blackAlpha.100"
        >
            <AccordionItem>
                {({ isExpanded }) => (
                    <>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                Location
                            </Box>
                            <AccordionIcon isExpanded={isExpanded} />
                        </AccordionButton>
                        <AccordionPanel pb={4}></AccordionPanel>
                    </>
                )}
            </AccordionItem>

            <Divider borderColor="purple.200" />

            <AccordionItem>
                {({ isExpanded }) => (
                    <>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                Job Type
                            </Box>
                            <AccordionIcon isExpanded={isExpanded} />
                        </AccordionButton>
                        <AccordionPanel pb={4}></AccordionPanel>
                    </>
                )}
            </AccordionItem>

            <Divider borderColor="purple.200" />

            <AccordionItem>
                {({ isExpanded }) => (
                    <>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                Experiences
                            </Box>
                            <AccordionIcon isExpanded={isExpanded} />
                        </AccordionButton>
                        <AccordionPanel pb={4}></AccordionPanel>
                    </>
                )}
            </AccordionItem>

            <Divider borderColor="purple.200" />

            <AccordionItem>
                {({ isExpanded }) => (
                    <>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                Salary
                            </Box>
                            <AccordionIcon isExpanded={isExpanded} />
                        </AccordionButton>
                        <AccordionPanel pb={4}></AccordionPanel>
                    </>
                )}
            </AccordionItem>

            <Divider borderColor="purple.200" />

            <AccordionItem>
                {({ isExpanded }) => (
                    <>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                Category
                            </Box>
                            <AccordionIcon isExpanded={isExpanded} />
                        </AccordionButton>
                        <AccordionPanel pb={4}></AccordionPanel>
                    </>
                )}
            </AccordionItem>
        </Accordion>
    );
}

type IconProps = { isExpanded: boolean };

function AccordionIcon({ isExpanded }: IconProps) {
    return (
        <Center
            bgColor="pink.300"
            h={5}
            w={5}
            color="white"
            rounded="full"
            _hover={{
                bgColor: "pink.300",
            }}
            _focus={{
                bgColor: "pink.300",
            }}
        >
            {isExpanded ? <MinusIcon fontSize="0.6rem" /> : <AddIcon fontSize="0.6rem" />}
        </Center>
    );
}
