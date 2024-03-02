import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(parts.keys);

const auth = definePartsStyle({
    dialogContainer: {
        px: 4,
    },
    body: {
        p: 0,
    },
    dialog: {
        rounded: "2xl",
        px: { base: 4, md: 16, xl: 20 },
        py: { base: 4, md: 8, xl: 16 },
    },
    header: {
        textAlign: "center",
        fontSize: "5xl",
        fontWeight: 400,
        color: "purple.800",
    },
});

export const modalTheme = defineMultiStyleConfig({
    variants: { auth },
});
