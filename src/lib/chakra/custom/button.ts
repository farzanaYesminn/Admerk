import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const primary = defineStyle({
    bgColor: "purple.500",
    lineHeight: "none",
    color: "white",
    _hover: {
        bgColor: "purple.600",
    },
    _active: {
        bgColor: "purple.400",
    },
});

const secondary = defineStyle({
    bgColor: "transparent",
    border: "1px",
    color: "pink.500",
    borderColor: "pink.500",
    _hover: {
        color: "white",
        bgColor: "pink.500",
    },
    _active: {
        color: "pink.500",
        bgColor: "transparent",
        borderColor: "pink.400",
    },
});

const cardButton = defineStyle({
    bgColor: "transparent",
    border: "1px",
    color: "pink.500",
    rounded: "full",
    borderColor: "pink.500",
    _hover: {
        color: "white",
        bgColor: "pink.500",
    },
    _active: {
        bgColor: "transparent",
        borderColor: "pink.400",
    },
});

const catIcon = defineStyle({
    w: 16,
    h: 16,
    rounded: "full",
    fontSize: "4xl",
    border: "1px",
    borderColor: "blackAlpha.300",
    color: "pink.500",
});

const xl = defineStyle({
    fontSize: "xl",
    px: "8",
    h: "16",
    borderRadius: "md",
});

const social = defineStyle({
    border: "1px",
    borderColor: "slate.300",
    fontWeight: 400,
    fontSize: { base: "md", lg: "lg" },
    py: { base: 6, lg: 8 },
});

const accordion = defineStyle({
    size: "xs",
    bgColor: "pink.400",
    color: "white",
    isRound: true,
});

export const buttonTheme = defineStyleConfig({
    variants: { primary, secondary, catIcon, cardButton, social, accordion },
    sizes: { xl },
});
