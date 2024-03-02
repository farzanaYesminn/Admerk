type Job = {
    id: number;
    name_id: string;
    company: {
        id: number;
        c_mail: string;
        location: string;
        name: string;
        c_name: string;
        social: string;
        website: string;
    };
    job_type: string;
    posted_on: string;
    job_title: string;
    location: Site;
    salary_amount: string;
    salary_duration: string;
    experience: string;
    overview: string;
    job_description: string;
    category: string;
    responsibility: string;
    required_skills: string;
    benefits: string;
    job_url: string;
};

type JobSummary = Omit<
    Job,
    | "overview"
    | "job_description"
    | "responsibility"
    | "required_skills"
    | "benefits"
>;
