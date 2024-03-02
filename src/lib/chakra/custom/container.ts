import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const wide = defineStyle({
    px: { base: 4, lg: 6 },
});

const wider = defineStyle({
    px: { base: 4, sm: 8, xl: 16 },
});

export const containerTheme = defineStyleConfig({
    variants: {
        wide,
        wider,
    },
    defaultProps: {
        variant: "wide",
    },
});
