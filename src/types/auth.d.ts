type AuthInfo = {
    access_token: string;
    token_type: string;
    login_data: {
        username: string;
        email: string;
        role: user;
    };
};

type LoginCredentials = {
    username: string;
    password: string;
};

type UserRegisterCredentials = {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    birth_date: string;
    location: {
        country: string;
        state: string;
        map_url: string;
    };
    password: string;
    is_refugee: boolean;
};

type CompanyRegisterCredentials = {
    c_mail: string;
    c_name: string;
    location: {
        country: string;
        map_url?: string;
        state?: string;
    };
    name: string;
    password: string;
    social: {
        facebook?: string;
        instagram?: string;
        linkedin?: string;
        twitter?: string;
        whatsapp?: string;
    };
    website: string;
};
