type JobCreate = {
    benefits: string;
    category: string;
    experience: string;
    job_description: string;
    job_title: string;
    job_type: string;
    job_url: string;
    location: Site;
    overview: string;
    required_skills: string;
    responsibility: string;
    salary_amount: string;
    salary_duration: string;
};

type CompanyInfo = {
    name: string;
    c_name: string;
    c_mail: string;
    social: {
        facebook?: string;
        instagram?: string;
        linkedin?: string;
        twitter?: string;
        whatsapp?: string;
    };
    location: {
        id: number;
        data_id: string;
        country: string;
        map_url?: string;
        state?: string;
    };
    website: string;
};

type CompanyPasswordCredentials = {
    new_password: string;
    password: string;
};
