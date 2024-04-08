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

export const updateCompanyProfile = async (companyId: number, updatedCompanyInfo: CompanyInfo) => {
    const formData = new FormData();

    formData.append('profilePicture', updatedCompanyInfo.profilePicture);
    formData.append('companyName', updatedCompanyInfo.companyName);
    formData.append('companyMail', updatedCompanyInfo.companyMail);
    formData.append('social', JSON.stringify(updatedCompanyInfo.social));
    formData.append('location', JSON.stringify(updatedCompanyInfo.location));
    formData.append('website', updatedCompanyInfo.website);

    try {
        const response = await axios.put(apiBaseUrl().concat(`company/account/${companyId}`), formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};

export const downloadCV = async (userId: number) => {
    try {
        const res = await axios.get(apiBaseUrl().concat(`company/download-cv/${userId}`), {
            responseType: 'blob',
        });
        const blob = new Blob([res.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `CV_${userId}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        throw new Error("Failed to download CV");
    }
};