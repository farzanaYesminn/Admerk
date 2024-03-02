import axios from "axios";
import { ReactNode, createContext, useState, useEffect, useContext } from "react";
import { checkJwtValidity } from "services/api/auth";

export type AuthInfoContextType = {
    authInfo: AuthInfo | null;
    setAuthInfo: (authInfo: AuthInfo | null) => void;
    authLoading: boolean;
};

export const AuthContext = createContext<AuthInfoContextType | undefined>(undefined);

const getStorageAuthInfo = () => {
    const authInfo = localStorage.getItem("authInfo");
    return authInfo ? JSON.parse(authInfo) : null;
};

const setStorageAuthInfo = (authInfo: AuthInfo | null) => {
    if (authInfo) {
        localStorage.setItem("authInfo", JSON.stringify(authInfo));
    } else {
        localStorage.removeItem("authInfo");
    }
};

const setAxiosAuthorizationHeader = (authInfo: AuthInfo | null) => {
    if (authInfo) {
        const { access_token, token_type } = authInfo;
        const authHeader = `${token_type} ${access_token}`;
        axios.defaults.headers.common["Authorization"] = authHeader;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

type Props = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
    const [authLoading, setAuthLoading] = useState<boolean>(true);
    const [authInfo, setAuthInfo_] = useState<AuthInfo | null>(getStorageAuthInfo());

    const setAuthInfo = (newAuthInfo: AuthInfo | null) => {
        setAuthInfo_(newAuthInfo);
        setStorageAuthInfo(newAuthInfo);
        setAxiosAuthorizationHeader(newAuthInfo);
    };

    useEffect(() => {
        (async () => {
            setAuthLoading(true);
            const storedAuthInfo = getStorageAuthInfo() as AuthInfo | null;

            if (!storedAuthInfo) {
                setAuthInfo(null);
                setAuthLoading(false);
                return;
            }

            const authValid = await checkJwtValidity(storedAuthInfo);
            if (!authValid) setAuthInfo(null);
            else setAuthInfo(storedAuthInfo);

            setAuthLoading(false);
        })();
    }, []);

    useEffect(() => {
        setAuthInfo(authInfo);
    }, [authInfo]);

    return (
        <AuthContext.Provider value={{ authInfo, setAuthInfo, authLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthInfoContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider;
