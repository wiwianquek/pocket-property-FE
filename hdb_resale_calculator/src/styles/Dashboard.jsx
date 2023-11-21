import { Box, SimpleGrid } from "@chakra-ui/react";

export default function Dashboard() {

    return (
        <SimpleGrid minChildWidth={"200px"} spacing={10}>
            <Box bg="white" h="200px" border="1px solid"></Box>
            <Box bg="white" h="200px" border="1px solid"></Box>
            <Box bg="white" h="200px" border="1px solid"></Box>
            <Box bg="white" h="200px" border="1px solid"></Box>
            <Box bg="white" h="200px" border="1px solid"></Box>
            <Box bg="white" h="200px" border="1px solid"></Box>
        </SimpleGrid>
    )
}