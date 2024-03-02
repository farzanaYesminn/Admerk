import axios from "axios";
import { apiBaseUrl } from "helpers/url";

export const getAllJobs = async () => {
    try {
        const res = await axios.get(apiBaseUrl().concat("job"));
        return res.data;
    } catch (error) {
        throw new Error("Failed to fetch jobs");
    }
};

export const getJobInfo = async (id: number) => {
    try {
        const res = await axios.get(apiBaseUrl().concat(`job/${id}`));
        return res.data;
    } catch (error) {
        throw new Error("Failed to fetch job information");
    }
};

export const getAllCategories = async () => {
    try {
        const res = await axios.get(apiBaseUrl().concat(`job/category`));
        return res.data;
    } catch (error) {
        throw new Error("Failed to fetch categories");
    }
};
