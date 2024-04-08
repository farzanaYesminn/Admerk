import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";

export default function CallToAction() {
    return (
        <Container variant="wider" maxW="container.xl">
            <Stack
                direction={{ base: "column", lg: "row" }}
                py={{ base: 12, lg: 20 }}
                borderY="1px"
                borderColor="slate.300"
                justify="space-between"
                align="center"
            >
                <Box>
                    <Heading
                        fontSize={{ base: "4xl", lg: "5xl" }}
                        fontWeight={500}
                        lineHeight={1.1}
                        color="slate.900"
                        textAlign={{ base: "center", lg: "left" }}
                    >
                        Most Complete job portal
                    </Heading>
                    <Text
                        mt={{ base: 2, lg: 4 }}
                        fontSize={{ base: "lg", lg: "xl" }}
                        color="slate.500"
                        textAlign={{ base: "center", lg: "left" }}
                    >
                        Signup and start finding job or talents
                    </Text>
                </Box>
            </Stack>
        </Container>
    );
}
