import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const link = defineStyle({
    fontSize: "lg",
    color: "slate.500",
    lineHeight: "1.75",
});

const cardSubtitle = defineStyle({
    fontSize: "lg",
    color: "slate.500",
    lineHeight: "1.75",
});

const lg = defineStyle({
    fontSize: "lg",
    color: "slate.400",
});

const xl = defineStyle({
    fontSize: "xl",
    color: "slate.500",
});

const xl2 = defineStyle({
    fontSize: "2xl",
    color: "slate.600",
});

const accordion = defineStyle({
    fontSize: "lg",
    color: "slate.600",
    lineHeight: "1.75",
});

export const textTheme = defineStyleConfig({
    variants: { cardSubtitle, accordion, link, lg, xl, xl2 },
});
