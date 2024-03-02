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
        if (!allowedRoles.includes(authInfo.login_data.role)) {
            toast({
                title: "Not allowed",
                status: "error",
                duration: 4000,
            });
            return <Navigate to="/" />;
        }
    } else {
        toast({
            title: "Not logged in",
            status: "error",
            duration: 4000,
        });
        return <Navigate to="/" />;
    }

    return <Outlet />;
}
