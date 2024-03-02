import {
    Box,
    Container,
    Stack,
    type BoxProps,
    Center,
    Text,
    Button,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "lib/context/AuthProvider";
import { logoutUser } from "services/api/auth";

type Props = BoxProps & {
    toggleSidebar: () => void;
};

export default function TopbarDash({ toggleSidebar }: Props) {
    const { setAuthInfo } = useAuth();
    const navigate = useNavigate();

    return (
        <Box
            position="sticky"
            zIndex={10}
            top={0}
            bg="purple.50"
            borderBottom={{ base: "1px", md: "none" }}
            borderColor="purple.100"
        >
            <Container w="full" maxW="none">
                <Stack
                    h={{ base: 16, lg: 20 }}
                    direction="row"
                    w="full"
                    justify={{ base: "space-between", md: "end" }}
                >
                    <Center
                        display={{ base: "flex", md: "none" }}
                        cursor="pointer"
                        onClick={toggleSidebar}
                    >
                        <Text fontSize="4xl" color="purple.800">
                            <Icon icon="quill:hamburger" />
                        </Text>
                    </Center>
                    <Stack direction="row">
                        <Center cursor="pointer">
                            <Text fontSize="3xl" color="purple.800">
                                <Icon icon="basil:notification-outline" />
                            </Text>
                        </Center>
                        <Center>
                            <Button
                                variant="primary"
                                size={{ base: "md", lg: "lg" }}
                                fontSize={{ base: "sm", lg: "md" }}
                                rounded="full"
                                onClick={() => {
                                    logoutUser(setAuthInfo);
                                    navigate("/");
                                }}
                            >
                                Logout
                            </Button>
                        </Center>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}
