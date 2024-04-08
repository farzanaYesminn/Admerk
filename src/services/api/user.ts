import axios from "axios";
import { apiBaseUrl } from "helpers/url";

export const applyJob = async (jobId: string) => {
    try {
        await axios.post(apiBaseUrl().concat("user/application/" + jobId));
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

export const getProfilePicture = async (profilePictureUrl: string): Promise<string | null> => {
    try {
        const response = await axios.get(apiBaseUrl().concat(profilePictureUrl), {
            responseType: "blob",
        });

        const blob = new Blob([response.data], { type: response.headers["content-type"] });
        const imageUrl = URL.createObjectURL(blob);

        return imageUrl;
    } catch (error) {
        console.error("Failed to fetch profile picture:", error);
        return null;
    }
};

export const updateUserProfile = async (userId: number, updatedUserInfo: UserInfo) => {
    const formData = new FormData();
    formData.append('profilePicture', updatedUserInfo.profilePicture);
    formData.append('curriculumVitae', updatedUserInfo.curriculumVitae);
    formData.append('firstName', updatedUserInfo.firstName);
    formData.append('lastName', updatedUserInfo.lastName);
    formData.append('isRefugee', updatedUserInfo.isRefugee.toString());
    formData.append('birthDate', updatedUserInfo.birthDate);
    formData.append('email', updatedUserInfo.email);
    formData.append('location', JSON.stringify(updatedUserInfo.location));
    formData.append('contactNumber', updatedUserInfo.contactNumber);

    try {
        const response = await axios.put(apiBaseUrl().concat(`user/account/${userId}`), formData, {
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

export const downloadCV = async (userId:number, fileName:string) => {
    try {
        const res = await axios.get(apiBaseUrl().concat(`user/download-cv/${userId}`), {
            responseType: 'blob',
        });

        const blob = new Blob([res.data], { type: res.headers['content-type'] });

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        return true;
    } catch (error) {
        console.error('Failed to download CV:', error);
        return false;
    }
};
