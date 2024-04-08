import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import LoginModal from "./LoginModal";
import { useAuth } from "lib/context/AuthProvider";
import { Spinner } from "@chakra-ui/react";
import { logoutUser } from "services/api/auth";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import {getProfilePicture} from "../../../services/api/user";

export default function AuthBtn() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { authInfo, setAuthInfo, authLoading } = useAuth();
    const navigate = useNavigate();
    const [profilePicture, setProfilePicture] = useState<string | null>(null);

    useEffect(() => {
        if (authInfo && authInfo.loginData.profilePictureUrl) {
            (async () => {
                const imageUrl = await getProfilePicture(authInfo.loginData.profilePictureUrl);
                setProfilePicture(imageUrl);
            })();
        }
    }, [authInfo]);

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
                    {profilePicture ? (
                        <img src={profilePicture} alt="Profile" style={{ borderRadius: '50%', width: '44px', height: '44px' }} />
                    ) : (
                        <div style={{ borderRadius: '50%', width: '44px', height: '44px', backgroundColor: '#ccc', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#555' }}>{authInfo.loginData.name[0]}</span>
                        </div>
                    )}
                </MenuButton>
                <MenuList>
                    <MenuItem
                        onClick={() => {
                            if (authInfo.loginData.role === "user") {
                                navigate("dashboard/user/");
                            }
                            if (authInfo.loginData.role === "company") {
                                navigate("dashboard/company/");
                            }
                        }}
                    >
                        Dashboard
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            if (authInfo.loginData.role === "user") {
                                navigate("dashboard/user/profile/");
                            }
                            if (authInfo.loginData.role === "company") {
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
