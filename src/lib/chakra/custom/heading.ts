import { defineStyleConfig } from "@chakra-ui/react";

export const headingTheme = defineStyleConfig({
    variants: {
        primary: {
            color: "slate.950",
        },
        title: {
            fontSize: "5xl",
            fontWeight: 500,
            color: "slate.800",
            lineHeight: 1,
        },
        accordion: {
            fontSize: "2xl",
            fontWeight: 500,
            color: "slate.700",
        },
        card: {
            fontSize: "2xl",
            fontWeight: 500,
            color: "slate.700",
        },
        footer: {
            fontSize: "2xl",
            fontWeight: 500,
            color: "slate.900",
        },
        lg: {
            fontSize: "lg",
            fontWeight: 500
        },
        xl: {
            fontSize: "xl",
        },
        "2xl": {
            fontSize: "2xl",
        },
    },
    defaultProps: {
        variant: "primary",
    },
});
