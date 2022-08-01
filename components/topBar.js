import { Flex, Heading, Avatar, Box } from "@chakra-ui/react";
import { BigHead } from "@bigheads/core";
import { getRandomOptions } from "../utils/bigHeads";

export default function Topbar({ email }) {
  return (
    <Box borderWidth={2}>
      <Flex h="81px" w="100%" align="center" p={5}>
        <div style={{ width: "80px", marginBottom: "5px" }}>
          <BigHead
            {...getRandomOptions()}
          />
        </div>
        <Heading size="md" color="black" align="center">
          {email}
        </Heading>
      </Flex>
    </Box>
  );
}
