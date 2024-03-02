import { accordionAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(accordionAnatomy.keys);

const home = definePartsStyle({
    panel: {},
    container: {
        paddingY: 4,
    },
    button: {
        _hover: {
            bgColor: "transparent",
        },
    },
    icon: {},
});

const filter = definePartsStyle({
    root: {
        rounded: "2xl",
        overflow: "hidden",
        px: 5,
    },
    container: {
        px: 0,
        py: 4,
        border: "none",
    },
    button: {
        fontSize: "lg",
        fontWeight: 500,
        color: "slate.700",
        px: 0,

        _hover: {
            bgColor: "transparent",
        },
    },
});

export const accordionTheme = defineMultiStyleConfig({
    variants: { home, filter },
});
