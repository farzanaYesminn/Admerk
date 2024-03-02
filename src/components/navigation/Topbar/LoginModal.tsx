import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Text,
    Heading,
    Stack,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Checkbox,
    Button,
    Box,
    Divider,
    AbsoluteCenter,
    useToast,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, type FormikValues } from "formik";
import * as Yup from "yup";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuth } from "lib/context/AuthProvider";
import { loginAll } from "services/api/auth";

type Props = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: Props) {
    const { setAuthInfo } = useAuth();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const toast = useToast();

    const navigate = useNavigate();
    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
    });

    const handleSubmit = async (values: FormikValues) => {
        try {
            const newAuthInfo = await loginAll({
                username: values.username,
                password: values.password,
            });
            if (newAuthInfo) {
                setAuthInfo(newAuthInfo);
                navigate(from, { replace: true });
                onClose();
                toast({
                    title: "Logged in",
                    status: "success",
                    duration: 4000,
                });
            }
        } catch (error) {
            toast({
                title: "Logged in failed",
                status: "error",
                duration: 4000,
            });
        }
    };

    return (
        <Modal
            variant="auth"
            size="3xl"
            isOpen={isOpen}
            onClose={onClose}
            motionPreset="slideInTop"
        >
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                    <Heading
                        size="2xl"
                        fontWeight="500"
                        color="purple.900"
                        textAlign="center"
                    >
                        Hi, Login Here
                    </Heading>
                    <Text mt={4} textAlign="center" variant="lg">
                        Don't have an account? Create one{" "}
                        <Button
                            variant="link"
                            color="pink.400"
                            onClick={() => {
                                onClose();
                                navigate("/register/user");
                            }}
                        >
                            here
                        </Button>
                    </Text>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Stack as={Form}>
                                <FormControl
                                    mt={6}
                                    variant="auth"
                                    isInvalid={
                                        !!errors.username && touched.username
                                    }
                                >
                                    <FormLabel htmlFor="username">
                                        Username*
                                    </FormLabel>
                                    <Input
                                        as={Field}
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="johndoe@mail.com"
                                        variant="unstyled"
                                        autoComplete="off"
                                    />
                                    {errors.username && (
                                        <FormErrorMessage mt={1} fontSize="md">
                                            {errors.username}
                                        </FormErrorMessage>
                                    )}
                                </FormControl>
                                <FormControl
                                    mt={4}
                                    variant="auth"
                                    isInvalid={
                                        !!errors.password && touched.password
                                    }
                                >
                                    <FormLabel htmlFor="password">
                                        Password*
                                    </FormLabel>
                                    <Input
                                        as={Field}
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter Password"
                                        variant="unstyled"
                                    />
                                    {errors.password && (
                                        <FormErrorMessage mt={1} fontSize="md">
                                            {errors.password}
                                        </FormErrorMessage>
                                    )}
                                </FormControl>
                                <Stack
                                    direction="row"
                                    align="center"
                                    mt={3}
                                    justify="space-between"
                                >
                                    <FormControl>
                                        <Checkbox>Keep me logged in</Checkbox>
                                    </FormControl>
                                    <Text
                                        as={Link}
                                        to="/"
                                        variant="link"
                                        whiteSpace="nowrap"
                                        _hover={{
                                            textDecoration: "underline",
                                        }}
                                    >
                                        Forgot Password
                                    </Text>
                                </Stack>
                                <Button
                                    mt={4}
                                    type="submit"
                                    variant="primary"
                                    size={{ base: "lg", lg: "xl" }}
                                    fontSize="md"
                                    letterSpacing="wides"
                                >
                                    LOGIN
                                </Button>
                            </Stack>
                        )}
                    </Formik>
                    <Box position="relative" mt={4} py={4}>
                        <Divider borderColor="blackAlpha.500" />
                        <AbsoluteCenter bg="white" px="4">
                            <Text variant="lg">OR</Text>
                        </AbsoluteCenter>
                    </Box>
                    <Stack
                        mt={4}
                        spacing={{ base: 4, lg: 8 }}
                        direction={{ base: "column", lg: "row" }}
                        width="full"
                    >
                        <Button
                            variant="social"
                            leftIcon={
                                <Text fontSize="2xl">
                                    <Icon icon="devicon:google" />
                                </Text>
                            }
                            w="full"
                        >
                            Login with Google
                        </Button>
                        <Button
                            variant="social"
                            leftIcon={
                                <Text fontSize="2xl">
                                    <Icon icon="logos:facebook" />
                                </Text>
                            }
                            w="full"
                        >
                            Login with Facebook
                        </Button>
                    </Stack>
                    <Text mt={4} textAlign="center" variant="lg">
                        Don't have an account? Create one{" "}
                        <Text variant="link" color="pink.400" as={Link} to="/">
                            here
                        </Text>
                    </Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
