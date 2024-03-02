import categories from "assets/data/categories.json";

export const getPopularCategories = async () => {
    return categories;
};

export const getSuggestCategories = async () => {
    return categories.slice(0, 3).map((category) => {
        return category.name;
    });
};
