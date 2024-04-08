type AuthInfo = {
    accessToken: string;
    tokenType: string;
    loginData: {
        username: string;
        email: string;
        name: string;
        role: string;
        isRefugee: boolean;
        refugeeNumberOrAddress: string;
        profilePictureUrl: string;
    };
};

type LoginCredentials = {
    username: string;
    password: string;
};

type UserRegisterCredentials = {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    birthDate: string;
    location: {
        country: string;
        state: string;
        city: string;
        address: string;
        zipCode: string;
    };
    password: string;
    isRefugee: boolean;
};

type CompanyRegisterCredentials = {
    companyMail: string;
    companyName: string;
    location: {
        country: string;
        mapUrl?: string;
        state?: string;
    };
    name: string;
    password: string;
    social: {
        facebook?: string;
        instagram?: string;
        linkedIn?: string;
        twitter?: string;
        whatsApp?: string;
    };
    website: string;
};
