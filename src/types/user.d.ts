type UserPasswordCredentials = {
    newPassword: string;
    password: string;
};

type UserInfo = {
    firstName: string;
    lastName: string;
    birthDate: string;
    username: string;
    email: string;
    location: Site;
    isRefugee: boolean;
    refugeeNumber: string;
};

type Application = {
    id: number;
    application_id: string;
    applied_on: string;
    job_info: Job;
    user_info: UserInfo;
};
