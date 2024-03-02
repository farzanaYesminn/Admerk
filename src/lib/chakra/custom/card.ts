import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(cardAnatomy.keys);

const variants = {
    category: definePartsStyle({
        container: {
            rounded: "lg",
            shadow: "0 4px 24px 0 var(--chakra-colors-blackAlpha-200)",
            cursor: "pointer",
            bgColor: "white",
            _hover: {
                transform: "translateY(-0.25rem)",
                transitionDuration: "500ms",
                transitionTimingFunction: "ease-in-out",
            },
        },
        body: {
            p: 8,
        },
    }),
    company: definePartsStyle({
        container: {
            bgColor: "white",
            rounded: "2.5rem",
            shadow: "0 4px 24px 0 var(--chakra-colors-blackAlpha-200)",
        },
        body: {
            p: 8,
        },
    }),
};

export const cardTheme = defineMultiStyleConfig({ variants });
