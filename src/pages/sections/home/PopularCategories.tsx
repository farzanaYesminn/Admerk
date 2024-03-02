import {
    Card,
    CardBody,
    Center,
    Heading,
    IconButton,
    SimpleGrid,
    Text,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import categories from "assets/data/categories.json";

export default function PopularCategories() {
    const popularCategories = categories.slice(0, 7);

    return (
        <SimpleGrid
            gridTemplateColumns={"repeat(auto-fit, minmax(min(15rem, 100%), 1fr))"}
            gap={6}
        >
            {popularCategories &&
                popularCategories.map((category) => {
                    return (
                        <Card variant="category" role="group" key={category.id}>
                            <CardBody>
                                <IconButton
                                    variant="catIcon"
                                    aria-label={category.name}
                                    icon={<Icon icon={category.icon} />}
                                    _groupHover={{
                                        borderColor: "transparent",
                                        bgColor: "pink.100",
                                        color: "pink.600",
                                        transition: "300ms ease-in-out",
                                    }}
                                />
                                <Text
                                    mt={5}
                                    fontSize="2xl"
                                    fontWeight={600}
                                    color="slate.700"
                                    _groupHover={{
                                        color: "pink.500",
                                        transition: "300ms ease-in-out",
                                    }}
                                >
                                    {category.name}
                                </Text>
                                <Text mt={3} variant="lg">
                                    3200 vacancy
                                </Text>
                            </CardBody>
                        </Card>
                    );
                })}
            <Card
                variant="category"
                bgColor="purple.500"
                role="group"
                _hover={{
                    transform: "translateY(-0.25rem)",
                    transitionDuration: "500ms",
                    transitionTimingFunction: "ease-in-out",
                }}
            >
                <CardBody>
                    <Heading size="2xl" color="white">
                        13k+
                    </Heading>
                    <Text fontSize="xl" color="white">
                        Jobs Already <br /> Posted
                    </Text>
                    <Center
                        mt="auto"
                        ml="auto"
                        w={16}
                        aspectRatio="1/1"
                        opacity="70%"
                        rounded="full"
                        border="1px"
                        borderColor="white"
                        padding={3}
                        _groupHover={{
                            bgColor: "pink.500",
                            transition: "300ms ease-in-out",
                        }}
                    >
                        <Text fontSize="4xl" color="white">
                            <Icon icon="iconoir:arrow-tr" />
                        </Text>
                    </Center>
                </CardBody>
            </Card>
        </SimpleGrid>
    );
}
