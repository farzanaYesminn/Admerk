import axios from "axios";
import { apiBaseUrl } from "helpers/url";

export const applyJob = async (company_name_id: string) => {
    try {
        await axios.post(apiBaseUrl().concat("user/application"), {
            job_id: company_name_id,
        });
    } catch (error) {
        throw new Error("Job Application Failed");
    }
};

export const getAppliedJobs = async () => {
    try {
        const res = await axios.get(apiBaseUrl().concat("user/application"));
        return res.data;
    } catch (error) {
        throw new Error("Failed to fetch all applied jobs");
    }
};

export const changeAccountPassword = async (userPasswords: UserPasswordCredentials) => {
    try {
        await axios.put(apiBaseUrl().concat("user/password"), userPasswords);
    } catch (error) {
        throw new Error("Failed to change password");
    }
};

export const getUserInfo = async () => {
    try {
        const res = await axios.get(apiBaseUrl().concat("user/account"));
        return res.data;
    } catch (error) {
        throw new Error("Failed to fetch user info");
    }
};
