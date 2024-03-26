type Job = {
    id: number;
    jobId: string;
    company: {
        id: number;
        companyMail: string;
        location: string;
        name: string;
        companyName: string;
        social: string;
        website: string;
    };
    jobType: string;
    postedOn: string;
    jobTitle: string;
    location: Site;
    salaryAmount: string;
    salaryDuration: string;
    experience: string;
    overview: string;
    jobDescription: string;
    category: string;
    responsibility: string;
    requiredSkills: string;
    benefits: string;
    jobUrl: string;
};

type JobSummary = Omit<
    Job,
    | "overview"
    | "jobDescription"
    | "responsibility"
    | "requiredSkills"
    | "benefits"
>;
