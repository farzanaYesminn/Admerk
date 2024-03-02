import { Box, Container, Text } from "@chakra-ui/react";

export default function NotFound() {
    return (
        <Box>
            <Container variant="wider" maxW="container.xl">
                <Text fontSize="lg">Page not found</Text>
            </Container>
        </Box>
    );
}
