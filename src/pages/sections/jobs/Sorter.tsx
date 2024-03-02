import { Heading, Select, Stack } from "@chakra-ui/react";

export default function Sorter() {
    return (
        <Stack direction="row" align="center" spacing={2}>
            <Heading size="sm" fontWeight={600} color="slate.700">
                Sort:
            </Heading>
            <Select
                rounded="full"
                bgColor="slate.100"
                placeholder="Select option"
                cursor="pointer"
            >
                <option value="option1">Price</option>
                <option value="option2">Posted On</option>
                <option value="option3">Nearest</option>
            </Select>
        </Stack>
    );
}
