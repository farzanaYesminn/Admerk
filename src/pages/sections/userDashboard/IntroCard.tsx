import { Card, CardBody, Center, Heading, Text } from "@chakra-ui/react";

type Props = {
    icon?: string;
    title: string;
    subtitle: string;
};

export default function IntroCard({ title, subtitle }: Props) {
    return (
        <Card rounded={{ base: "xl", xl: "3xl" }}>
            <CardBody>
                <Center>
                    <Heading fontSize="2xl" fontWeight={500} color="slate.900">
                        {title}
                    </Heading>
                </Center>
                <Center>
                    <Text color="slate.500">{subtitle}</Text>
                </Center>
            </CardBody>
        </Card>
    );
}
