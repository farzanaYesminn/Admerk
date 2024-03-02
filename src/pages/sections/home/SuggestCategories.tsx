import { Button, Stack, Text } from "@chakra-ui/react";
import categories from "assets/data/categories.json";

export default function SuggestCategories() {
    const suggestCategories = categories.slice(0, 3).map((category) => category.name);

    return (
        <Stack
            direction={{ base: "column", sm: "row" }}
            align="center"
            spacing={{ base: 2, sm: 4 }}
        >
            <Text fontSize="lg" color="slate.400">
                Popular Categories:{" "}
            </Text>
            <Stack mt={{ base: 2, sm: 0 }} direction="row" spacing={1}>
                {suggestCategories &&
                    suggestCategories.map((category, idx) => (
                        <Button
                            key={`category-${idx}`}
                            size="sm"
                            rounded="full"
                            bgColor="slate.400"
                            color="white"
                            _hover={{
                                bgColor: "pink.400",
                            }}
                        >
                            {category}
                        </Button>
                    ))}
            </Stack>
        </Stack>
    );
}
