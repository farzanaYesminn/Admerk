import { Box, Center, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import workStep from "assets/data/workStep.json";

export default function HowItWorks() {
    return (
        <SimpleGrid
            gridTemplateColumns={"repeat(auto-fit, minmax(min(15rem, 100%), 1fr))"}
            gap={6}
        >
            {workStep.map((step, idx) => {
                return (
                    <Box
                        key={`step-${idx}`}
                        px={8}
                        py={{ base: 8, lg: 16, xl: 20 }}
                        _hover={{
                            borderBottom: "1px",
                            borderColor: "purple.500",
                            transition: "500ms ease-in-out",
                        }}
                    >
                        <Stack align="center">
                            <Center
                                w={20}
                                aspectRatio="1/1"
                                opacity="70%"
                                rounded="full"
                                bgColor="purple.500"
                                padding={3}
                            >
                                <Text fontSize="4xl" color="white">
                                    <Icon icon={step.icon} />
                                </Text>
                            </Center>
                            <Text
                                mt={5}
                                fontSize="2xl"
                                fontWeight={600}
                                color="slate.700"
                                textAlign="center"
                            >
                                {step.title}
                            </Text>
                            <Text mt={3} textAlign="center" variant="lg">
                                {step.subtitle}
                            </Text>
                        </Stack>
                    </Box>
                );
            })}
        </SimpleGrid>
    );
}
