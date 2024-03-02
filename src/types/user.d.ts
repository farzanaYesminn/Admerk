type UserPasswordCredentials = {
    new_password: string;
    password: string;
};

type UserInfo = {
    first_name: string;
    last_name: string;
    birth_date: string;
    username: string;
    email: string;
    location: Site;
    is_refugee: boolean;
};

type Application = {
    id: number;
    application_id: string;
    applied_on: string;
    job_info: Job;
    user_info: UserInfo;
};
