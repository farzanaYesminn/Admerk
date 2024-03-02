import {
    Box,
    Button,
    Card,
    CardBody,
    Center,
    Heading,
    SimpleGrid,
    Stack,
    Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import companyData from "assets/data/companies.json";

const colors = ["blue", "orange", "green", "yellow"];

export default function TopCompanies() {
    const companies = companyData.slice(0, 4);
    return (
        <SimpleGrid
            gridTemplateColumns={"repeat(auto-fit, minmax(min(15rem, 100%), 1fr))"}
            gap={6}
        >
            {companies.map((company, idx) => {
                return (
                    <Card
                        bgColor="white"
                        key={`company-card-${idx}`}
                        rounded={{ base: "xl", lg: "2.5rem" }}
                        shadow="0 4px 24px 0 var(--chakra-colors-blackAlpha-200)"
                    >
                        <CardBody as={Stack} alignItems="center" p={8}>
                            <Center
                                bgColor={`${colors[idx]}.500`}
                                color="white"
                                fontSize="3xl"
                                w={20}
                                h={20}
                                rounded="full"
                            >
                                {company.title[0]}
                            </Center>
                            <Heading
                                mt={2}
                                fontSize="2xl"
                                fontWeight={600}
                                color="slate.700"
                                textAlign="center"
                            >
                                {company.title}
                            </Heading>
                            <Text mt={4} variant="cardSubtitle" textAlign="center">
                                San Fransisco, New York, Los Angles, Austin
                            </Text>
                            <Box mt="auto">
                                <Button
                                    mt={4}
                                    as={Link}
                                    to="/"
                                    variant="secondary"
                                    rounded="full"
                                >
                                    3 open jobs
                                </Button>
                            </Box>
                        </CardBody>
                    </Card>
                );
            })}
        </SimpleGrid>
    );
}
