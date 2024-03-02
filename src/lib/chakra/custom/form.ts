import { formAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(formAnatomy.keys);

const auth = definePartsStyle({
    container: {
        label: {
            color: "slate.700",
            fontWeight: 500,
            mb: 1,
        },
        input: {
            rounded: "md",
            px: 5,
            py: 3,
            border: "1px",
            fontSize: "17px",
            bgColor: "purple.50",
            color: "slate.600",
            borderColor: "purple.200",
            _placeholder: {
                color: "blackAlpha.600",
            },
            _focus: {
                bgColor: "purple.50",
                borderColor: "blackAlpha.100",
            },
            _hover: {
                bgColor: "purple.50",
                borderColor: "purple.200",
            },
            _disabled: {
                color: "black",
                bgColor: "white",
                border: "1px",
                borderColor: "slate.400",
            },
        },
        select: {
            rounded: "md",
            px: 5,
            py: 3,
            border: "1px",
            fontSize: "17px",
            bgColor: "purple.50",
            color: "slate.600",
            borderColor: "purple.200",
            _placeholder: {
                color: "blackAlpha.600",
            },
            _focus: {
                bgColor: "purple.50",
                borderColor: "blackAlpha.100",
            },
            _hover: {
                bgColor: "purple.50",
                borderColor: "purple.200",
            },
            _disabled: {
                color: "black",
                bgColor: "white",
                border: "1px",
                borderColor: "slate.400",
            },
        },
        textarea: {
            rounded: "md",
            px: 5,
            py: 3,
            border: "1px",
            fontSize: "17px",
            bgColor: "purple.50",
            color: "slate.600",
            borderColor: "purple.200",
            _placeholder: {
                color: "blackAlpha.600",
            },
            _focus: {
                bgColor: "purple.50",
                borderColor: "blackAlpha.100",
            },
            _hover: {
                bgColor: "purple.50",
                borderColor: "purple.200",
            },
            _disabled: {
                color: "black",
                bgColor: "white",
                border: "1px",
                borderColor: "slate.400",
            },
        },
    },
});

export const formTheme = defineMultiStyleConfig({
    variants: { auth },
});
