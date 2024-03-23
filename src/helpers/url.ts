export const apiBaseUrl = () => {
    let url;
    switch (process.env.NODE_ENV) {
        case "development":
            url = "http://localhost:8888/";
            break;
        case "production":
            url = "http://localhost:8888/";
            break;
        default:
            url = "http://localhost:8888/";
    }

    return url;
};
