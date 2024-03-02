import axios from "axios";
import { apiBaseUrl } from "helpers/url";

export const loginAll = async ({ username, password }: LoginCredentials) => {
    const formData = new URLSearchParams();

    formData.append("username", username);
    formData.append("password", password);

    const res = await axios.post(apiBaseUrl().concat("auth/login"), formData);
    const receivedAuthInfo = res.data;
    if (!receivedAuthInfo) return null;
    return receivedAuthInfo;
};

export const logoutUser = async (setAuthInfo: (authInfo: AuthInfo | null) => void) => {
    setAuthInfo(null);
};

export const registerUser = async (credentials: UserRegisterCredentials) => {
    const res = await axios.post(apiBaseUrl().concat("auth/user/register"), credentials, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res) return true;
    return false;
};

export const registerCompany = async (credentials: CompanyRegisterCredentials) => {
    const res = await axios.post(
        apiBaseUrl().concat("auth/company/register"),
        credentials,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    if (res) return true;
    return false;
};

export const checkJwtValidity = async (authInfo: AuthInfo) => {
    if (!authInfo) return false;

    const { access_token, token_type } = authInfo;
    const { role } = authInfo.login_data;

    const authHeader = `${token_type} ${access_token}`;

    let response;
    try {
        switch (role) {
            case "user":
                response = await axios.get(apiBaseUrl().concat("user/account"), {
                    headers: {
                        Authorization: authHeader,
                    },
                });
                break;

            case "company":
                response = await axios.get(apiBaseUrl().concat("company/account"), {
                    headers: {
                        Authorization: authHeader,
                    },
                });
                break;

            default:
                response = null;
                break;
        }
    } catch (error) {
        response = null;
    }

    if (!response) return false;
    return true;
};

export const checkUniqueUsername = async (username: string) => {
    const res = await axios.post(
        apiBaseUrl().concat("auth/validate"),
        { username },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    if (res) {
        return res.data.status !== "exist";
    }
    return false;
};

export const checkUniqueEmail = async (email: string) => {
    const res = await axios.post(
        apiBaseUrl().concat("auth/validate"),
        { email },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    if (res) {
        return res.data.status !== "exist";
    }
    return false;
};
