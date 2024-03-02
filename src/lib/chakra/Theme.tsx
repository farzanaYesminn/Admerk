import { extendTheme } from "@chakra-ui/react";
import colors from "./custom/colors";
import { headingTheme as Heading } from "./custom/heading";
import { containerTheme as Container } from "./custom/container";
import { buttonTheme as Button } from "./custom/button";
import { cardTheme as Card } from "./custom/card";
import { accordionTheme as Accordion } from "./custom/accordion";
import { textTheme as Text } from "./custom/text";
import { modalTheme as Modal } from "./custom/modal";
import { formTheme as Form } from "./custom/form";

export const theme = extendTheme({
    colors,
    components: {
        Container,
        Heading,
        Button,
        Card,
        Accordion,
        Text,
        Modal,
        Form,
    },
});
