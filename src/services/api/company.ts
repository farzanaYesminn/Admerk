import axios from "axios";
import { apiBaseUrl } from "helpers/url";

export const getAllPostedJobs = async () => {
    try {
        const res = await axios.get(apiBaseUrl().concat("company/job"));
        return res.data;
    } catch (error) {
        throw new Error("Failed to fetch all posted jobs by company");
    }
};

export const createJob = async (newJob: JobCreate) => {
    try {
        await axios.post(apiBaseUrl().concat("company/job"), newJob);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to create job");
    }
};

export const getAllJobApplications = async () => {
    try {
        const res = await axios.get(apiBaseUrl().concat("company/application"));
        return res.data;
    } catch (error) {
        throw new Error("Failed to fetch job applications");
    }
};

export const changeCompanyPassword = async (
    companyPasswords: CompanyPasswordCredentials
) => {
    try {
        await axios.put(apiBaseUrl().concat("company/password"), companyPasswords);
    } catch (error) {
        throw new Error("Failed to change password");
    }
};

export const getCompanyInfo = async () => {
    try {
        const res = await axios.get(apiBaseUrl().concat("company/account"));
        return res.data;
    } catch (error) {
        throw new Error("Failed to fetch company information");
    }
};

export const getApplicantInfo = async (userId: number) => {
    try {
        const res = await axios.get(apiBaseUrl().concat(`company/application/${userId}`));
        return res.data;
    } catch (error) {
        throw new Error("Failed to fetch applicant information");
    }
};

export const respondToApplicant = async (userId: number, response: string) => {
    try {
        const res = await axios.post(apiBaseUrl().concat(`company/application/respond/${userId}`), response, {
            headers: {
                'Content-Type': 'text/plain'
            }
        });
        return res.data;
    } catch (error) {
        throw new Error("Failed to respond to applicant");
    }
};
