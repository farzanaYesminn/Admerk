import { Center, Button } from "@chakra-ui/react";
import { Route } from "../sitemap";
import { Link } from "react-router-dom";

type Props = { route: Route };

export default function Navlink({ route }: Props) {
    return (
        <Center key={route.title}>
            <Button
                variant="unstyled"
                as={Link}
                to={`/${route.href}`}
                onClick={() => window.scrollTo(0, 0)}
                px={4}
                py={2}
                color="slate.900"
                textTransform="capitalize"
                _hover={{
                    color: "pink.500",
                }}
            >
                {route.title}
            </Button>
        </Center>
    );
}
