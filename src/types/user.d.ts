type UserPasswordCredentials = {
    newPassword: string;
    password: string;
};

type UserInfo = {
    userId: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    username: string;
    email: string;
    location: Site;
    isRefugee: boolean;
    refugeeNumber: string;
    contactNumber: string;
    cvUploaded: boolean;
    profilePicture: File;
    curriculumVitae: File;
};

type Application = {
    id: number;
    application_id: string;
    applied_on: string;
    job_info: Job;
    user_info: UserInfo;
    application_status: string;
};
