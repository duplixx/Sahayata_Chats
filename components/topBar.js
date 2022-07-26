import { Flex, Heading, Avatar } from "@chakra-ui/react";
import { BigHead } from "@bigheads/core";
import { getRandomOptions } from "../utils/bigHeads";

export default function Topbar({ email }) {
  return (
    <Flex bg="gray.100" h="81px" w="100%" align="center" p={5}>
      <div style={{ width: "80px" }}>
        <BigHead {...getRandomOptions()} />
      </div>
      <Heading size="lg">{email}</Heading>
    </Flex>
  );
}
