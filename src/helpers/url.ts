export const apiBaseUrl = () => {
    let url;
    switch (process.env.NODE_ENV) {
        case "development":
            url = "https://admerk-api-70423f972874.herokuapp.com/";
            break;
        case "production":
            url = "https://admerk-api-70423f972874.herokuapp.com/";
            break;
        default:
            url = "https://admerk-api-70423f972874.herokuapp.com/";
    }

    return url;
};
