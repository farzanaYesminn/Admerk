import { useAuth } from "lib/context/AuthProvider";
import Loading from "./Loading";
import { Outlet, Navigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

type Props = { allowedRoles: string[] };

export default function ProtectedRoute({ allowedRoles }: Props) {
    const toast = useToast();
    const { authInfo, authLoading } = useAuth();
    if (authLoading) return <Loading />;

    if (authInfo) {
        if (!allowedRoles.includes(authInfo.loginData.role)) {
            toast({
                title: "Oops! You are not allowed here.",
                description: "You have your own space, please go back!",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            return <Navigate to="/" />;
        }
    } else {
        toast({
            title: "Oops! You are not logged in yet!",
            description: "Please log in and try again.",
            status: "error",
            duration: 4000,
            isClosable: true,
        });
        return <Navigate to="/" />;
    }

    return <Outlet />;
}
