import { Flex, Heading, Avatar,Box } from "@chakra-ui/react";
import { BigHead } from "@bigheads/core";
import { getRandomOptions } from "../utils/bigHeads";

export default function Topbar({ email }) {
  return (
    <Box bgGradient='linear(to-r, violet.100, pink.500)' >
      <Flex  h="81px" w="100%" align="center" p={5}>
        <div style={{ width: "80px" }}>
          <BigHead {...getRandomOptions()} />
        </div>
        <Heading size="lg">{email}</Heading>
      </Flex>
    </Box>
  );
}
