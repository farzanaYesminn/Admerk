type JobCreate = {
    benefits: string;
    category: string;
    experience: string;
    jobDescription: string;
    jobTitle: string;
    jobType: string;
    jobUrl: string;
    location: Site;
    overview: string;
    requiredSkills: string;
    responsibility: string;
    salaryAmount: string;
    salaryDuration: string;
};

type CompanyInfo = {
    companyId: number;
    name: string;
    companyName: string;
    companyMail: string;
    social: {
        facebook?: string;
        instagram?: string;
        linkedIn?: string;
        twitter?: string;
        whatsApp?: string;
    };
    location: Site;
    website: string;
};

type CompanyPasswordCredentials = {
    newPassword: string;
    password: string;
};
