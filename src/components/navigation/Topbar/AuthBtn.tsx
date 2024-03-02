import { Avatar, Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import LoginModal from "./LoginModal";
import { useAuth } from "lib/context/AuthProvider";
import { Spinner } from "@chakra-ui/react";
import { logoutUser } from "services/api/auth";
import { useNavigate } from "react-router-dom";

export default function AuthBtn() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { authInfo, setAuthInfo, authLoading } = useAuth();
    const navigate = useNavigate();

    if (authLoading) return <Spinner />;

    return !authInfo ? (
        <>
            <Button
                variant="secondary"
                size="lg"
                fontSize="md"
                rounded="full"
                onClick={onOpen}
            >
                Login/Register
            </Button>
            <LoginModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </>
    ) : (
        <>
            <Menu>
                <MenuButton>
                    <Avatar
                        w="2.75rem"
                        h="2.75rem"
                        border="2px"
                        bgColor="slate.100"
                        color="pink.500"
                        name={authInfo.login_data.username[0]}
                    />
                </MenuButton>
                <MenuList>
                    <MenuItem
                        onClick={() => {
                            if (authInfo.login_data.role === "user") {
                                navigate("dashboard/user/");
                            }
                            if (authInfo.login_data.role === "company") {
                                navigate("dashboard/company/");
                            }
                        }}
                    >
                        Dashboard
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            if (authInfo.login_data.role === "user") {
                                navigate("dashboard/user/profile/");
                            }
                            if (authInfo.login_data.role === "company") {
                                navigate("dashboard/company/profile/");
                            }
                        }}
                    >
                        Profile
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            logoutUser(setAuthInfo);
                            navigate("/");
                        }}
                    >
                        Logout
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    );
}
