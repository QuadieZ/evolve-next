import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

export default function Login() {
  const stateUid = uuidv4();
  const lineLoginEndpoint = `${process.env.NEXT_PUBLIC_LINE_LOGIN_ENDPOINT}&client_id=${process.env.NEXT_PUBLIC_LINE_LOGIN_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_LINE_LOGIN_REDIRECT_URI}&state=${stateUid}&scope=${process.env.NEXT_PUBLIC_LINE_LOGIN_SCOPE}`;

  return (
    <Stack
      w="100vw"
      h="100vh"
      pos="absolute"
      top={0}
      right={0}
      bg="background.primary"
      align="center"
      justify="center"
      spacing={8}
      pb={8}
    >
      <Stack align="center" gap={0}>
        <Heading color="brand.primary">EVOLVE</Heading>
        <Text>By DevA</Text>
      </Stack>
      <Link href={lineLoginEndpoint} as={NextLink}>
        <Button
          bgColor="brand.primary"
          color="brand.contrast"
          px={8}
          py={4}
          borderRadius="md"
          _hover={{ bgColor: "brand.hoverPrimary" }}
        >
          Login with LINE account
        </Button>
      </Link>
    </Stack>
  );
}
